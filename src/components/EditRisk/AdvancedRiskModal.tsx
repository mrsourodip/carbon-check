import React, { useState, useEffect } from 'react';
import {
 Modal,
 DataTable,
 Table,
 TableBody,
 TableCell,
 TableContainer,
 TableHead,
 TableHeader,
 TableRow,
 Pagination,
 Button,
 Select,
 SelectItem,
 TextInput,
} from '@carbon/react';
import { generateRandomUserData } from './utils';
import './AdvancedModal.css';

const headers = [
 { key: 'name', header: 'Name' },
 { key: 'email', header: 'Email Address' },
 { key: 'lastName', header: 'Last Name' },
 { key: 'businessUnit', header: 'Business Unit' },
 { key: 'status', header: 'Status' },
];

interface AdvancedModalProps {
 isOpen: boolean;
 onClose: () => void;
 onSelect: (selectedRow: any) => void;
}

const AdvancedModal: React.FC<AdvancedModalProps> = ({ isOpen, onClose, onSelect }) => {
 const [tableData, setTableData] = useState<any[]>([]);
 const [searchQuery, setSearchQuery] = useState('');
 const [searchColumn, setSearchColumn] = useState(headers[0].key); // Default to the first column
 const [currentPage, setCurrentPage] = useState(1);
 const [pageSize, setPageSize] = useState(5);

 useEffect(() => {
  const data = generateRandomUserData(100);
  setTableData(data);
 }, []);

 const handleSelect = (selectedRow: any) => {
  onSelect(selectedRow);
  onClose();
 };

 const filteredData = tableData.filter((user) => {
  return user[searchColumn]
   .toString()
   .toLowerCase()
   .includes(searchQuery.toLowerCase());
 });

 const paginatedData = filteredData.slice(
  (currentPage - 1) * pageSize,
  currentPage * pageSize
 );

 return (
  <Modal
   open={isOpen}
   modalHeading='Advanced Options'
   primaryButtonText='Add'
   secondaryButtonText='Cancel'
   onRequestClose={onClose}
   onRequestSubmit={() => handleSelect(null)}
   size='md' // Increase size to medium
   className='modal-content'
  >
   <div className='table-toolbar'>
    <TextInput
     id='search-bar'
     labelText=''
     placeholder='Search'
     value={searchQuery}
     onChange={(e) => setSearchQuery(e.target.value)}
     className='search-bar'
    />
    <Select
     id='column-select'
     value={searchColumn}
     onChange={(e) => setSearchColumn(e.target.value)}
     className='select-dropdown'
    >
     {headers.map((header) => (
      <SelectItem
       key={header.key}
       value={header.key}
       text={header.header}
      />
     ))}
    </Select>
    <Button onClick={() => setCurrentPage(1)}>Search</Button>
   </div>
   <DataTable rows={paginatedData} headers={headers} isSortable>
    {({ rows, headers, getHeaderProps, getRowProps }) => (
     <TableContainer className='table-container'>
      <Table>
       <TableHead>
        <TableRow>
         {headers.map((header) => (
          <TableHeader
           {...(getHeaderProps({ header }) as any)}
           key={header.key}
          >
           {header.header}
          </TableHeader>
         ))}
        </TableRow>
       </TableHead>
       <TableBody>
        {rows.map((row) => (
         <TableRow
          {...getRowProps({ row })}
          onClick={() => handleSelect(row)}
          key={row.id}
         >
          {row.cells.map((cell) => (
           <TableCell key={cell.id}>{cell.value}</TableCell>
          ))}
         </TableRow>
        ))}
       </TableBody>
      </Table>
     </TableContainer>
    )}
   </DataTable>
   <Pagination
    totalItems={filteredData.length}
    pageSize={pageSize}
    pageSizes={[5, 10, 20, 30]}
    onChange={({ page, pageSize }) => {
     setCurrentPage(page);
     setPageSize(pageSize);
    }}
   />
  </Modal>
 );
};

export default AdvancedModal;
