import React, { useState } from 'react';
import TreeView from '@carbon/react/lib/components/TreeView/TreeView';
import TreeNode from '@carbon/react/lib/components/TreeView/TreeNode';
import {
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  Button,
  Grid,
  Column,
} from '@carbon/react';
import { List, TreeViewAlt, Document, Edit, Delete } from '@carbon/icons-react';
import './Toggler.css'

interface TreeNodeData {
  id: string;
  name: string;
  path: string;
  description: string;
  children?: TreeNodeData[];
}

const data: TreeNodeData[] = [
  {
    id: 'node-1',
    name: 'Finance',
    path: 'Root',
    description: 'Activity for Sales scenario',
    children: [
      {
        id: 'node-1-1',
        name: 'Business Intelligence',
        path: 'Root/Finance',
        description: 'Activity for Sales scenario',
      },
      {
        id: 'node-1-2',
        name: 'Final Stock Evaluation',
        path: 'Root/Finance',
        description: 'Activity for Sales scenario',
      },
      {
        id: 'node-1-3',
        name: 'General Balance Monitoring',
        path: 'Root/Finance',
        description: 'Activity for Sales scenario',
      },
      {
        id: 'node-1-4',
        name: 'Data Critical Access',
        path: 'Root/Finance',
        description: 'Activity for Sales scenario',
      },
    ],
  },
  {
    id: 'node-2',
    name: 'Data Management',
    path: 'Root',
    description: 'Activity for Sales scenario',
  },
  {
    id: 'node-3',
    name: 'Consultants Access',
    path: 'Root',
    description: 'Activity for Sales scenario',
  },
  {
    id: 'node-4',
    name: 'MyActivity',
    path: 'Root',
    description: 'Activity for Sales scenario',
  },
  {
    id: 'node-5',
    name: 'GAPA1Activity',
    path: 'Root',
    description: 'Activity for Sales scenario',
  },
  {
    id: 'node-6',
    name: 'East Activity',
    path: 'Root',
    description: 'Activity for Sales scenario',
  },
  {
    id: 'node-7',
    name: 'West Activity',
    path: 'Root',
    description: 'Activity for Sales scenario',
  },
];

const flattenData = (nodes: TreeNodeData[]): TreeNodeData[] => {
  let flatList: TreeNodeData[] = [];
  nodes.forEach((node) => {
    flatList.push({
      id: node.id,
      name: node.name,
      path: node.path,
      description: node.description,
    });
    if (node.children) {
      flatList = flatList.concat(flattenData(node.children));
    }
  });
  return flatList;
};

const findParentNodes = (nodes: TreeNodeData[], targetId: string): string[] => {
  let parents: string[] = [];

  const traverse = (node: TreeNodeData, currentPath: string[]) => {
    if (node.id === targetId) {
      parents = currentPath;
      return;
    }
    if (node.children) {
      for (let child of node.children) {
        traverse(child, [...currentPath, node.id]);
      }
    }
  };

  nodes.forEach((node) => traverse(node, []));
  return parents;
};

const ToggleControlComponent: React.FC = () => {
  const [isTreeView, setIsTreeView] = useState(true);
  const [selectedNodes, setSelectedNodes] = useState<string[]>([]);
  const [expandedNodes, setExpandedNodes] = useState<{ [key: string]: boolean }>({
    'node-1': true,
    'node-3': true,
    'node-4': true,
  });

  const handleSelect = (event: { id: string }) => {
    const selectedId = event.id;
    setSelectedNodes([selectedId]);

    // Find and expand parent nodes if any
    const parentNodes = findParentNodes(data, selectedId);
    if (parentNodes.length > 0) {
      setExpandedNodes((prev) => {
        const updatedExpandedNodes = { ...prev };
        parentNodes.forEach((id) => {
          updatedExpandedNodes[id] = true;
        });
        return updatedExpandedNodes;
      });
    }
  };

  const handleToggle = (id: string) => {
    setExpandedNodes((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderTreeNodes = (nodes: TreeNodeData[]) => {
    return nodes.map((node) => (
      <TreeNode
        key={node.id}
        id={node.id}
        label={
          <div className="node-container" style={{ display: 'flex', alignItems: 'center', width: '100%' }}>
            <span style={{ flexGrow: 1 }}>
              <Document /> {node.name}
            </span>
            <div className="hover-icons">
              <Edit />
              <Delete />
            </div>
          </div>
        }
        isSelected={selectedNodes.includes(node.id)}
        isExpanded={expandedNodes[node.id]}
        onSelect={() => handleSelect({ id: node.id })}
        onToggle={() => handleToggle(node.id)}
      >
        {node.children && renderTreeNodes(node.children)}
      </TreeNode>
    ));
  };

  const renderTableRows = (rows: TreeNodeData[]) => {
    return rows.map((row) => (
      <TableRow
        key={row.id}
        onClick={() => handleSelect({ id: row.id })}
        isSelected={row.id === selectedNodes[0]}
        className="row-container"
      >
        <TableCell>{row.name}</TableCell>
        <TableCell>{row.path}</TableCell>
        <TableCell>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            {row.description}
            <div className="hover-icons">
              <Edit />
              <Delete />
            </div>
          </div>
        </TableCell>
      </TableRow>
    ));
  };

  const flatData = flattenData(data);

  const headers = [
    { key: 'name', header: 'Name' },
    { key: 'path', header: 'Path' },
    { key: 'description', header: 'Description' },
  ];

  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
          <Button
            renderIcon={isTreeView ? List : TreeViewAlt}
            iconDescription='Toggle view'
            onClick={() => setIsTreeView(!isTreeView)}
          >
            Toggle View
          </Button>
        </div>
        {isTreeView ? (
          <TreeView selected={selectedNodes} onSelect={handleSelect}>
            {renderTreeNodes(data)}
          </TreeView>
        ) : (
          <DataTable rows={flatData} headers={headers}>
            {({ rows, headers, getHeaderProps, getRowProps }) => (
              <Table>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => (
                      <TableHeader {...(getHeaderProps({ header }) as any)} key={header.key}>
                        {header.header}
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

export default ToggleControlComponent;
