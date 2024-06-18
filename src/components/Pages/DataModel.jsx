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
} from 'carbon-components-react';
import { mockData } from '../../MOCK_DATA';

const initialRows = mockData;

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'rule', header: 'Rule' },
  { key: 'status', header: 'Status' },
  { key: 'other', header: 'Other' },
  { key: 'example', header: 'Example' },
];

const DataModel = () => {
  const [rows, setRows] = useState(initialRows);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortDirection, setSortDirection] = useState('ASC');
  const [sortColumn, setSortColumn] = useState('name');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editField, setEditField] = useState('');
  const [editValue, setEditValue] = useState('');

  const handleSort = (headerKey) => {
    const isAsc = sortColumn === headerKey && sortDirection === 'ASC';
    setSortDirection(isAsc ? 'DESC' : 'ASC');
    setSortColumn(headerKey);
  };

  const sortedRows = [...rows].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];
    if (aValue < bValue) return sortDirection === 'ASC' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'ASC' ? 1 : -1;
    return 0;
  });

  const handleOpenModal = (row, field, value) => {
    setEditRow(row);
    setEditField(field);
    setEditValue(value);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditRow(null);
    setEditField('');
    setEditValue('');
  };

  const handleSave = () => {
    const updatedRows = rows.map((row) => {
      if (row.id === editRow.id) {
        return { ...row, [editField]: editValue };
      }
      return row;
    });
    setRows(updatedRows);
    handleCloseModal();
  };

  const onPageChange = ({ page, pageSize }) => {
    setCurrentPage(page);
    setItemsPerPage(pageSize);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedRows.slice(startIndex, startIndex + itemsPerPage);

  const totalItems = rows.length;
  const pageSizes = [5, 10, 20, 50];

  return (
    <>
      <DataTable
        rows={currentItems}
        headers={headers}
        render={({
          rows,
          headers,
          getHeaderProps,
          getRowProps,
          getTableProps,
        }) => (
          <TableContainer title='Load Balancers'>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader
                      key={header.key}
                      {...getHeaderProps({
                        header,
                        isSortable: true,
                        onClick: () => handleSort(header.key),
                        sortDirection:
                          header.key === sortColumn ? sortDirection : 'NONE',
                      })}
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
                        onClick={() =>
                          handleOpenModal(row, cell.info.header, cell.value)
                        }
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
      />
      <Pagination
        totalItems={totalItems}
        pageSize={itemsPerPage}
        pageSizes={pageSizes} // Allow standard page sizes
        page={currentPage}
        onChange={onPageChange}
      />
      <Modal
        open={isModalOpen}
        onRequestClose={handleCloseModal}
        modalHeading='Edit Field'
        primaryButtonText='Save'
        secondaryButtonText='Cancel'
        onSecondarySubmit={handleCloseModal}
        onRequestSubmit={handleSave}
        size='sm'
      >
        <TextInput
          id='edit-field'
          labelText={`Edit ${editField}`}
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
      </Modal>
    </>
  );
};

export default DataModel;
