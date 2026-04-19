import { ReactFlowProvider } from '@xyflow/react'
import { useWorkflow } from './hooks/useWorkflow'
import { useAutomations } from './hooks/useAutomations'
import { Sidebar } from './components/sidebar/Sidebar'
import { WorkflowCanvas } from './components/canvas/WorkflowCanvas'
import { Toolbar } from './components/canvas/Toolbar'
import { ConfigPanel, EmptyPanel } from './components/panel/ConfigPanel'
import { SimulationPanel } from './components/simulation/SimulationPanel'
import type { WorkflowNode } from './types'

function AppInner() {
  const wf = useWorkflow()
  const { automations, loading } = useAutomations()

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100vh', background:'#0a0f1a', color:'#c8cdd8', fontFamily:"'DM Sans', sans-serif" }}>
      <Toolbar validation={wf.validation} isSimulating={wf.isSimulating} onRun={wf.runSimulation} onExport={wf.exportWorkflow} />
      <div style={{ display:'flex', flex:1, overflow:'hidden' }}>
        <Sidebar onAddNode={(kind) => wf.addNode(kind, { x: 250, y: 200 })} />
        <WorkflowCanvas
          nodes={wf.nodes} edges={wf.edges}
          onNodesChange={wf.onNodesChange} onEdgesChange={wf.onEdgesChange}
          onConnect={wf.onConnect} onNodeClick={wf.onNodeClick}
          onPaneClick={wf.onPaneClick} onAddNode={wf.addNode}
        />
        {wf.selectedNode
          ? <ConfigPanel node={wf.selectedNode as WorkflowNode} automations={automations} loadingAutomations={loading} onChange={wf.updateNodeData} onDelete={wf.deleteNode} />
          : <EmptyPanel />}
      </div>
      {wf.showSimPanel && (
        <SimulationPanel logs={wf.simulationLogs} isSimulating={wf.isSimulating} onClose={() => wf.setShowSimPanel(false)} />
      )}
    </div>
  )
}

export default function App() {
  return <ReactFlowProvider><AppInner /></ReactFlowProvider>
}