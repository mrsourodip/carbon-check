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
  Button,
  Checkbox,
  Tag,
} from 'carbon-components-react';
import { Filter, Filter16 } from '@carbon/icons-react';
import { mockData } from '../../MOCK_DATA';
import '../../index.css';

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
  const [isFilterPanelOpen, setIsFilterPanelOpen] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
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

  const handleFilterChange = (headerKey, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [headerKey]: {
        ...prev[headerKey],
        [value]: !prev[headerKey]?.[value],
      },
    }));
  };

  const applyFilters = () => {
    const filteredRows = initialRows.filter((row) =>
      Object.keys(selectedFilters).every((key) =>
        Object.keys(selectedFilters[key]).every(
          (value) => !selectedFilters[key][value] || row[key] === value
        )
      )
    );
    setRows(filteredRows);
  };

  const clearFilters = () => {
    setSelectedFilters({});
    setRows(initialRows);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = sortedRows.slice(startIndex, startIndex + itemsPerPage);

  const totalItems = rows.length;
  const pageSizes = [5, 10, 20, 50];

  return (
    <>
      <div className='header'>
        <Button onClick={() => setIsFilterPanelOpen(true)} renderIcon={Filter}>
          Filter
        </Button>
      </div>
      <div className='main-container'>
        <div className={`filter-panel ${isFilterPanelOpen ? 'open' : ''}`}>
          <h4>Filter Options</h4>
          {headers.map((header) => (
            <div key={header.key} className='filter-option'>
              <label>
                {header.header} (
                {
                  Object.keys(
                    initialRows.reduce((acc, row) => {
                      acc[row[header.key]] = true;
                      return acc;
                    }, {})
                  ).length
                }
                )
              </label>
              <div className='filter-dropdown'>
                <Button size='small'>Select {header.header}</Button>
                <div className='filter-options'>
                  {Object.keys(
                    initialRows.reduce((acc, row) => {
                      acc[row[header.key]] = true;
                      return acc;
                    }, {})
                  ).map((value) => (
                    <div key={value}>
                      <Checkbox
                        labelText={value}
                        id={`${header.key}-${value}`}
                        checked={selectedFilters[header.key]?.[value] || false}
                        onChange={() => handleFilterChange(header.key, value)}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div className='filter-actions'>
            <Button kind='secondary' onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button kind='primary' onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
        <div className='data-table-container'>
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
                              header.key === sortColumn
                                ? sortDirection
                                : 'NONE',
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
            pageSizes={pageSizes}
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
        </div>
      </div>
    </>
  );
};

export default DataModel;
