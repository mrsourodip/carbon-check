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
  Modal,
  TextInput,
} from 'carbon-components-react';

const initialRows = [
  {
    id: 'load-balancer-1',
    name: 'Load Balancer 1',
    rule: 'Round robin',
    status: 'Starting',
    other: 'Test',
    example: '22',
  },
  {
    id: 'load-balancer-2',
    name: 'Load Balancer 2',
    rule: 'DNS delegation',
    status: 'Active',
    other: 'Test',
    example: '22',
  },
  {
    id: 'load-balancer-3',
    name: 'Load Balancer 3',
    rule: 'Round robin',
    status: 'Disabled',
    other: 'Test',
    example: '22',
  },
  {
    id: 'load-balancer-4',
    name: 'Load Balancer 4',
    rule: 'Round robin',
    status: 'Disabled',
    other: 'Test',
    example: '22',
  },
  {
    id: 'load-balancer-5',
    name: 'Load Balancer 5',
    rule: 'Round robin',
    status: 'Disabled',
    other: 'Test',
    example: '22',
  },
];

const headers = [
  { key: 'name', header: 'Name' },
  { key: 'rule', header: 'Rule' },
  { key: 'status', header: 'Status' },
  { key: 'other', header: 'Other' },
  { key: 'example', header: 'Example' },
];

const DataTableComponent = () => {
  const [rows, setRows] = useState(initialRows);
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

  const sortedRows = rows.sort((a, b) => {
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

  return (
    <>
      <DataTable
        rows={sortedRows}
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

export default DataTableComponent;