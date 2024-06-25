import React, { useState, useEffect } from 'react';
import {
  Grid,
  Column,
  TableContainer,
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableBody,
  TableCell,
  Button,
} from '@carbon/react';
import { ChevronDown, ChevronUp, Edit, Delete } from '@carbon/icons-react';
import './DataTable.css';

interface HeaderData {
  header: string;
  key: string;
}

interface RowData {
  id: number;
  name: string;
  tier: string;
  description: string;
  children?: RowData[];
}

const headerData: HeaderData[] = [
  { header: '', key: 'checkbox' },
  { header: 'Business Activity Name', key: 'name' },
  { header: 'Tick', key: 'tier' },
  { header: 'Description', key: 'description' },
  { header: '', key: 'actions' },
];

const rowData: RowData[] = [
  {
    id: 1,
    name: 'Finance',
    tier: '✔',
    description: 'Activity for Sales scenario',
    children: [
      {
        id: 9,
        name: 'Business Intelligence',
        tier: '',
        description: 'Activity for Sales scenario',
      },
      {
        id: 10,
        name: 'Final Stock Evaluation',
        tier: '',
        description: 'Activity for Sales scenario',
      },
      {
        id: 11,
        name: 'General Balance Monitoring',
        tier: '',
        description: 'Activity for Sales scenario',
      },
      {
        id: 12,
        name: 'Data Critical Access',
        tier: '',
        description: 'Activity for Sales scenario',
      },
    ],
  },
  {
    id: 2,
    name: 'Marketing',
    tier: '✔',
    description: 'Activity for Marketing scenario',
    children: [
      {
        id: 13,
        name: 'SEO Optimization',
        tier: '',
        description: 'Activity for Marketing scenario',
      },
      {
        id: 14,
        name: 'Content Creation',
        tier: '',
        description: 'Activity for Marketing scenario',
      },
    ],
  },
];

const DataTables: React.FC = () => {
  const [expandedRows, setExpandedRows] = useState<{ [key: number]: boolean }>({});
  const [selectedRows, setSelectedRows] = useState<{ [key: number]: boolean }>({});
  const [indeterminateRows, setIndeterminateRows] = useState<{ [key: number]: boolean }>({});

  const toggleRowExpansion = (id: number) => {
    setExpandedRows((prevExpandedRows) => ({
      ...prevExpandedRows,
      [id]: !prevExpandedRows[id],
    }));
  };

  const updateParentCheckboxState = (parentId: number, children: RowData[]) => {
    const allSelected = children.every((child) => selectedRows[child.id]);
    const noneSelected = children.every((child) => !selectedRows[child.id]);
    const someSelected = children.some((child) => selectedRows[child.id]);

    if (allSelected) {
      setIndeterminateRows((prev) => ({ ...prev, [parentId]: false }));
      setSelectedRows((prev) => ({ ...prev, [parentId]: true }));
    } else if (noneSelected) {
      setIndeterminateRows((prev) => ({ ...prev, [parentId]: false }));
      setSelectedRows((prev) => ({ ...prev, [parentId]: false }));
    } else if (someSelected) {
      setIndeterminateRows((prev) => ({ ...prev, [parentId]: true }));
      setSelectedRows((prev) => ({ ...prev, [parentId]: false }));
    }
  };

  const handleParentCheckboxChange = (id: number, children: RowData[] = []) => {
    const newSelectedRows = { ...selectedRows, [id]: !selectedRows[id] };
    const newIndeterminateRows = { ...indeterminateRows, [id]: false };

    children.forEach((child) => {
      newSelectedRows[child.id] = !selectedRows[id];
    });

    setSelectedRows(newSelectedRows);
    setIndeterminateRows(newIndeterminateRows);
  };

  const handleChildCheckboxChangeWithParent = (parentId: number, childId: number) => {
    const newSelectedRows = { ...selectedRows, [childId]: !selectedRows[childId] };

    setSelectedRows(newSelectedRows);
    const parent = rowData.find((row) => row.id === parentId);
    if (parent && parent.children) {
      updateParentCheckboxState(parentId, parent.children);
    }
  };

  useEffect(() => {
    rowData.forEach((row) => {
      if (row.children) {
        updateParentCheckboxState(row.id, row.children);
      }
    });
  }, [selectedRows]);

  const renderNestedRows = (row: RowData) => {
    if (expandedRows[row.id] && row.children) {
      return row.children.map((child) => (
        <TableRow key={child.id} className='nested-row'>
          <TableCell className='nested-cell'>
            <input
              type='checkbox'
              className='table-checkbox'
              checked={!!selectedRows[child.id]}
              onChange={() => handleChildCheckboxChangeWithParent(row.id, child.id)}
            />
          </TableCell>
          <TableCell className='table-cell-nested'>{child.name}</TableCell>
          <TableCell className='table-cell'>{child.tier}</TableCell>
          <TableCell className='table-cell'>{child.description}</TableCell>
          <TableCell className='table-cell-buttons'>
            <Button
              hasIconOnly
              renderIcon={Edit}
              tooltipAlignment="center"
              iconDescription="Edit"
              size="sm"
              kind="ghost"
            />
            <Button
              hasIconOnly
              renderIcon={Delete}
              tooltipAlignment="center"
              iconDescription="Delete"
              size="sm"
              kind="ghost"
            />
          </TableCell>
        </TableRow>
      ));
    }
    return null;
  };

  return (
    <Grid style={{ justifyContent: 'center', alignItems: 'center', minHeight: '100vh', minWidth: '800px' }}>
      <Column lg={16}>
        <div className='header-section'>
          <div className='header-title'>Business Activities</div>
        </div>
        <TableContainer title='' className='table-container'>
          <Table>
            <TableHead className='table-header'>
              <TableRow>
                {headerData.map((header) => (
                  <TableHeader key={header.key} className='table-header-cell'>
                    {header.header}
                  </TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {rowData.map((row) => (
                <React.Fragment key={row.id}>
                  <TableRow className='table-row'>
                    <TableCell className='table-cell'>
                      <div onClick={() => toggleRowExpansion(row.id)} style={{ display: 'flex', alignItems: 'center' }}>
                        {expandedRows[row.id] ? <ChevronUp /> : <ChevronDown />}
                        <input
                          type='checkbox'
                          className='table-checkbox'
                          checked={!!selectedRows[row.id]}
                          onChange={(e) => {
                            e.stopPropagation();
                            handleParentCheckboxChange(row.id, row.children || []);
                          }}
                          ref={(input) => {
                            if (input) input.indeterminate = !!indeterminateRows[row.id];
                          }}
                        />
                      </div>
                    </TableCell>
                    <TableCell className='table-cell'>{row.name}</TableCell>
                    <TableCell className='table-cell'>{row.tier}</TableCell>
                    <TableCell className='table-cell'>{row.description}</TableCell>
                    <TableCell className='table-cell-buttons'>
                      <Button
                        hasIconOnly
                        renderIcon={Edit}
                        tooltipAlignment="center"
                        iconDescription="Edit"
                        size="sm"
                        kind="ghost"
                      />
                      <Button
                        hasIconOnly
                        renderIcon={Delete}
                        tooltipAlignment="center"
                        iconDescription="Delete"
                        size="sm"
                        kind="ghost"
                      />
                    </TableCell>
                  </TableRow>
                  {renderNestedRows(row)}
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Column>
    </Grid>
  );
};

export default DataTables;
