import React, { useState } from 'react';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from '@carbon/react';
import { TreeView, TreeNode } from '@carbon/react';
import { Button, Grid, Column } from '@carbon/react';
import { List, TreeViewAlt } from '@carbon/icons-react';

const data = [
  {
    id: '1',
    name: 'Finance',
    path: 'Root',
    description: 'Activity for Sales scenario',
    children: [
      {
        id: '1-1',
        name: 'Business Intelligence',
        path: 'Root/Finance',
        description: 'Activity for Sales scenario',
      },
      {
        id: '1-2',
        name: 'Final Stock Evaluation',
        path: 'Root/Finance',
        description: 'Activity for Sales scenario',
      },
      {
        id: '1-3',
        name: 'General Balance Monitoring',
        path: 'Root/Finance',
        description: 'Activity for Sales scenario',
      },
      {
        id: '1-4',
        name: 'Data Critical Access',
        path: 'Root/Finance',
        description: 'Activity for Sales scenario',
      },
    ],
  },
  {
    id: '2',
    name: 'Data Management',
    path: 'Root',
    description: 'Activity for Sales scenario',
  },
];

const flattenData = (nodes) => {
  let flatList = [];
  nodes.forEach((node) => {
    flatList.push(node);
    if (node.children) {
      flatList = flatList.concat(flattenData(node.children));
    }
  });
  return flatList;
};

const App = () => {
  const [isTreeView, setIsTreeView] = useState(true);
  const [selectedId, setSelectedId] = useState(null);
  const [expandedNodes, setExpandedNodes] = useState({});

  const handleSelect = (id) => {
    setSelectedId(id);
  };

  const handleToggle = (id) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderTreeNodes = (nodes) => {
    return nodes.map((node) => (
      <TreeNode
        key={node.id}
        id={node.id}
        label={node.name}
        isSelected={node.id === selectedId}
        isExpanded={expandedNodes[node.id]}
        onSelect={() => handleSelect(node.id)}
        onToggle={() => handleToggle(node.id)}
      >
        {node.children && renderTreeNodes(node.children)}
      </TreeNode>
    ));
  };

  const renderTableRows = (rows) => {
    return rows.map((row) => (
      <TableRow
        key={row.id}
        onClick={() => handleSelect(row.id)}
        isSelected={row.id === selectedId}
      >
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.path}</TableCell>
        <TableCell>{row.description}</TableCell>
      </TableRow>
    ));
  };

  const flatData = flattenData(data);

  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <div style={{ marginBottom: '1rem' }}>
          <Button
            renderIcon={isTreeView ? List : TreeViewAlt}
            iconDescription='Toggle view'
            onClick={() => setIsTreeView(!isTreeView)}
          >
            Toggle View
          </Button>
        </div>
        {isTreeView ? (
          <TreeView active={selectedId} selected={selectedId}>
            {renderTreeNodes(data)}
          </TreeView>
        ) : (
          <DataTable rows={flatData} headers={['Name', 'Path', 'Description']}>
            {({ rows, headers, getHeaderProps, getRowProps }) => (
              <Table {...getRowProps}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>{renderTableRows(flatData)}</TableBody>
              </Table>
            )}
          </DataTable>
        )}
      </Column>
    </Grid>
  );
};
export default App;
