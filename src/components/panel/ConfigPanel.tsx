import React from 'react';
import { Node } from '@xyflow/react';
import { NodeData, Automation } from '../../types';
import { NodeForms } from '../forms/NodeForms';

interface ConfigPanelProps {
  selectedNode: Node | null;
  automations: Automation[];
  onUpdateNode: (id: string, newData: Partial<NodeData>) => void;
  onDeleteNode: (id: string) => void;
}

const ConfigPanel: React.FC<ConfigPanelProps> = ({
  selectedNode,
  automations,
  onUpdateNode,
  onDeleteNode,
}) => {
  if (!selectedNode) {
    return (
      <div style={{
        width: '300px',
        background: '#fff',
        borderLeft: '1px solid #ddd',
        padding: '16px',
        overflowY: 'auto',
      }}>
        <p style={{ color: '#888' }}>Select a node to edit</p>
      </div>
    );
  }

  const handleChange = (newData: Partial<NodeData>) => {
    onUpdateNode(selectedNode.id, newData);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete node "${selectedNode.data.title}"?`)) {
      onDeleteNode(selectedNode.id);
    }
  };

  return (
    <div style={{
      width: '320px',
      background: '#fff',
      borderLeft: '1px solid #ddd',
      padding: '16px',
      overflowY: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
    }}>
      <div>
        <h3 style={{ marginTop: 0 }}>Configure Node</h3>
        <button
          onClick={handleDelete}
          style={{
            background: '#e74c3c',
            color: 'white',
            border: 'none',
            padding: '6px 12px',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          Delete Node
        </button>
      </div>
      <NodeForms
        nodeType={selectedNode.type as any}
        data={selectedNode.data as NodeData}
        automations={automations}
        onChange={handleChange}
      />
    </div>
  );
};

export default ConfigPanel;