import React from 'react';
import TreeView from '@carbon/react/lib/components/TreeView/TreeView';
import TreeNode from '@carbon/react/lib/components/TreeView/TreeNode';
import { Document } from '@carbon/icons-react';

interface TreeNodeComponentProps {
  selectedNodes: string[];
  handleSelect: (event: { id: string }) => void;
  toggleNode3Expansion: () => void;
  isNode3Expanded: boolean;
}

const TreeNodeComponent: React.FC<TreeNodeComponentProps> = ({ selectedNodes, handleSelect, toggleNode3Expansion, isNode3Expanded }) => {
  return (
    <TreeView selected={selectedNodes} onSelect={handleSelect}>
      <TreeNode id="node-1" label={<><Document /> Node 1</>} isExpanded>
        <TreeNode id="node-1-1" label="Node 1.1" />
      </TreeNode>
      <TreeNode id="node-2" label={<><Document /> Node 2</>} />
      <TreeNode id="node-3" label={<><Document /> Node 3</>} isExpanded={isNode3Expanded}>
        <TreeNode id="node-3-1" label="Node 3.1" />
        <TreeNode id="node-3-2" label="Node 3.2" />
        <TreeNode id="node-3-3" label="Node 3.3" disabled />
      </TreeNode>
      <TreeNode id="node-4" label={<><Document /> Node 4</>} isExpanded>
        <TreeNode id="node-4-1" label="Node 4.1" disabled />
        <TreeNode id="node-4-2" label="Node 4.2">
          <TreeNode id="node-4-2-1" label="Node 4.2.1" />
        </TreeNode>
        <TreeNode id="node-4-3" label="Node 4.3" disabled />
      </TreeNode>
    </TreeView>
  );
};

export default TreeNodeComponent;
