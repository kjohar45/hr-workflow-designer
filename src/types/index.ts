export type NodeType = 'start' | 'task' | 'approval' | 'automated' | 'end';

export interface NodeDataConfig {
  // Common fields
  label?: string;
  description?: string;
  // Task specific
  assignee?: string;
  dueDate?: string;
  // Approval specific
  approvers?: string[];
  requireAll?: boolean;
  // Automated specific
  actionId?: string;
  actionParams?: Record<string, any>;
}

export interface NodeData {
  title: string;
  config: NodeDataConfig;
}

export interface WorkflowNode {
  id: string;
  type: NodeType;
  position: { x: number; y: number };
  data: NodeData;
}

export interface WorkflowEdge {
  id: string;
  source: string;
  target: string;
  sourceHandle?: string;
  targetHandle?: string;
}

export interface Automation {
  id: string;
  label: string;
  params: {
    name: string;
    type: 'text' | 'number' | 'boolean' | 'select';
    label: string;
    options?: { value: string; label: string }[];
    defaultValue?: any;
  }[];
}

export interface SimulationStep {
  nodeId: string;
  nodeType: NodeType;
  title: string;
  timestamp: string;
  details?: string;
}

export interface SimulationResponse {
  success: boolean;
  logs: SimulationStep[];
  error?: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}