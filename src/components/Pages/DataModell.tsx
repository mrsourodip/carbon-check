import React, { useState } from 'react';
import {
  DataTable,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Pagination,
  Modal,
  TextInput,
  MultiSelect,
} from '@carbon/react';

type RowType = {
  id: string;
  name: string;
  rule: string;
  status: string;
  other: string;
  example: string;
};

const initialRows: RowType[] = [
  { id: 'load-balancer-1', name: 'Cerro Largo International Airport', rule: 'UY-CL', status: 'SA', other: 'UY', example: 'SUMO' },
  { id: 'load-balancer-2', name: 'Chesterfield Inlet Airport', rule: 'CA-NU', status: 'NA', other: 'CA', example: 'CYCS' },
  { id: 'load-balancer-3', name: 'Chevak Airport', rule: 'US-AK', status: 'NA', other: 'US', example: 'PAVA' },
  { id: 'load-balancer-4', name: 'Chitral Airport', rule: 'PK-NW', status: 'AS', other: 'PK', example: 'OPCH' },
  { id: 'load-balancer-5', name: 'Christchurch International Airport', rule: 'NZ-CAN', status: 'OC', other: 'NZ', example: 'NZCH' },
];

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'rule', header: 'Rule' },
  { key: 'status', header: 'Status' },
  { key: 'other', header: 'Other' },
  { key: 'example', header: 'Example' },
];

const statusOptions = [
  { id: 'SA', text: 'SA' },
  { id: 'NA', text: 'NA' },
  { id: 'AS', text: 'AS' },
  { id: 'OC', text: 'OC' },
];

const DataModel: React.FC = () => {
  const [rows, setRows] = useState<RowType[]>(initialRows);
  const [sortDirection, setSortDirection] = useState<'ASC' | 'DESC'>('ASC');
  const [sortColumn, setSortColumn] = useState<keyof RowType>('name');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRow, setEditRow] = useState<RowType | null>(null);
  const [editField, setEditField] = useState<keyof RowType>('name');
  const [editValue, setEditValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleSort = (headerKey: keyof RowType) => {
    const isAsc = sortColumn === headerKey && sortDirection === 'ASC';
    setSortDirection(isAsc ? 'DESC' : 'ASC');
    setSortColumn(headerKey);
  };

  const sortedRows = rows.sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (aValue < bValue) return sortDirection === 'ASC' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'ASC' ? 1 : -1;
    return 0;
  });

  const handleOpenModal = (row: RowType, field: keyof RowType, value: string) => {
    setEditRow(row);
    setEditField(field);
    setEditValue(value);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditRow(null);
    setEditField('name');
    setEditValue('');
  };

  const handleSave = () => {
    if (editRow) {
      const updatedRows = rows.map((row) =>
        row.id === editRow.id ? { ...row, [editField]: editValue } : row
      );
      setRows(updatedRows);
    }
    handleCloseModal();
  };

  const onPageChange = (paginationProps: any) => {
    setCurrentPage(paginationProps.page);
    setItemsPerPage(paginationProps.pageSize);
  };

  const handleMultiSelectChange = ({ selectedItems }: { selectedItems: { id: string }[] | null }) => {
    if (selectedItems) {
      setSelectedCategories(selectedItems.map(item => item.id));
    }
  };

  const filteredRows = rows.filter((row) =>
    selectedCategories.length === 0 || selectedCategories.includes(row.status)
  );

  const currentItems = filteredRows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalItems = filteredRows.length;
  const pageSizes = [5, 10, 20, 50];

  return (
    <>
      {/* <div style={{ marginBottom: '1rem' }}>
        <MultiSelect
          id="status-filter"
          titleText="Filter by Status"
          items={statusOptions}
          itemToString={(item:any) => (item ? item.text : '')}
          onChange={handleMultiSelectChange}
          label="Statuses"
          translateWithId={(id) => {
            if (id === 'open.menu') return 'Open menu';
            if (id === 'clear.all') return 'Clear all';
            return '';
          }}
        />
      </div>
      <DataTable rows={currentItems} headers={headers}>
        {({ rows, headers, getHeaderProps, getRowProps, getTableProps }) => (
          <TableContainer title="Load Balancers">
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader
                      {...getHeaderProps({
                        header,
                        isSortable: true,
                        onClick: () => handleSort(header.key as keyof RowType),
                        sortDirection: header.key === sortColumn ? sortDirection : 'NONE',
                      })}
                      key={header.key}
                    >
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id} {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell
                        key={cell.id}
                        onClick={() => handleOpenModal(row as unknown as RowType, cell.info.header as keyof RowType, cell.value)}
                      >
                        {cell.value}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </DataTable>
      <Pagination
        page={currentPage}
        pageSize={itemsPerPage}
        pageSizes={pageSizes}
        totalItems={totalItems}
        onChange={onPageChange}
      />
      <Modal
        open={isModalOpen}
        onRequestClose={handleCloseModal}
        modalHeading="Edit Field"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onSecondarySubmit={handleCloseModal}
        onRequestSubmit={handleSave}
        size="sm"
      >
        <TextInput
          id="edit-field"
          labelText={`Edit ${editField}`}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
      </Modal> */}
    </>
  );
};

export default DataModel;
