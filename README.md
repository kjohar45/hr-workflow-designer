HR WORKFLOW DESIGNER

A visual workflow builder for HR processes – onboarding, leave approval, document verification – built with React, TypeScript, and React Flow.

OVERVIEW

This project is a complete prototype of an HR Workflow Designer module. It allows an HR admin to:

Drag and drop workflow nodes onto a canvas

Connect nodes to define process flows

Configure each node with type‑specific forms

Validate the workflow (start/end nodes, connectivity, cycles)

Simulate the workflow and see step‑by‑step execution logs

Export the workflow as a JSON file

The application demonstrates clean architecture, modular React components, custom hooks, and mock API integration.

FEATURES

Core Requirements (All Implemented)

React Flow canvas with custom nodes

5 node types: Start, Task, Approval, Automated, End

Drag and drop from sidebar

Connect nodes with edges

Select node → edit in configuration panel

Delete nodes/edges

Node‑specific configuration forms

Automated node: dynamic fields from mock API

Mock API: GET /automations

Mock API: POST /simulate

Workflow simulation panel with logs

Validation (start node, end node, cycles, connectivity)

Export workflow as JSON

Clean folder structure and custom hooks

Bonus (optional – time permitting)

Validation errors shown in toolbar

Simulation panel with timestamped logs

Visual node colours and handles

Reusable form components for all node types

TECH STACK

React 18 – UI library

TypeScript – type safety

Vite – fast build tool and dev server

React Flow (@xyflow/react) – canvas, nodes, edges

CSS – plain styling (no extra frameworks)

No external state management (React hooks are sufficient for this scope).

PROJECT STRUCTURE

src/
├── components/
│ ├── canvas/WorkflowCanvas.tsx # React Flow wrapper
│ ├── nodes/NodeTypes.tsx # 5 custom node components
│ ├── forms/NodeForms.tsx # Dynamic per‑node config forms
│ ├── sidebar/Sidebar.tsx # Draggable node palette
│ ├── panel/ConfigPanel.tsx # Edit panel for selected node
│ ├── simulation/SimulationPanel.tsx # Log viewer panel
│ └── toolbar/Toolbar.tsx # Validation, simulate, export
├── hooks/
│ ├── useWorkflow.ts # Core state and logic
│ └── useAutomations.ts # Fetches mock actions
├── services/
│ └── api.ts # Mock API (automations, simulate)
├── types/
│ └── index.ts # All TypeScript interfaces
├── utils/
│ └── validation.ts # Graph validation (DFS cycles)
├── App.tsx
├── main.tsx
└── index.css

ARCHITECTURE & DESIGN DECISIONS

Separation of Concerns

useWorkflow hook manages all nodes, edges, validation, simulation – completely decoupled from UI.

api.ts isolates mock data and async behaviour.

Forms are split by node type but share a common onChange interface.

React Flow Integration

Used @xyflow/react (v12) – modern API, excellent TypeScript support.

Custom node types are defined in NodeTypes.tsx and passed via nodeTypes prop.

Drag and drop works by setting dataTransfer in sidebar and listening to onDrop on canvas.

Validation Logic

Runs after every mutation (add, delete, connect) – immediate feedback.

Checks: exactly one start, at least one end, all nodes connected (except start/end), no cycles (DFS).

Errors are displayed in the toolbar as a popup.

Simulation

Simple linear walk following edges (supports linear flows only – no parallel branches in mock).

Each step returns a log with node title, type, timestamp, and details.

Async simulation uses setTimeout to mimic network delay.

Mock API

GET /automations returns three actions (send_email, generate_doc, slack_notify) with dynamic parameters.

POST /simulate accepts workflow JSON and returns an execution log.

Both are Promise‑based with 400–800 ms delay.

Extensibility

Adding a new node type requires:

Adding to NodeType union in types/index.ts

Creating a new component in NodeTypes.tsx

Adding a case in NodeForms.tsx

Adding a new automation action only requires updating mockAutomations in api.ts.

HOW TO RUN

Prerequisites: Node.js 18+ and npm

Steps:

Open a terminal in the project folder.

Install dependencies: npm install

Start the development server: npm run dev

Open your browser at http://localhost:5173

Build for production: npm run build then npm run preview

USAGE GUIDE

Add a node – drag any node type from the left sidebar onto the canvas.

Connect nodes – click the handle at the bottom of a node and drag to the top handle of another node.

Edit a node – click on a node → the configuration panel opens on the right.

Delete a node – select it and click “Delete Node” in the config panel (edges are auto‑removed).

Validate – the toolbar button turns green/red; click it to see detailed errors.

Simulate – click “Run Simulation” (only enabled if workflow is valid). A panel appears at the bottom‑right with step‑by‑step logs.

Export – click “Export JSON” to download the workflow as a .json file.

FUTURE ENHANCEMENTS (Given More Time)

Branching / parallel paths – extend simulation to handle multiple outgoing edges.

Undo / Redo – history stack for nodes/edges.

Import workflow – upload JSON to restore a saved design.

Auto‑layout – arrange nodes neatly with a single click.

Minimap and zoom controls – already available in React Flow but could be styled.

Node templates – library of pre‑configured nodes (e.g., “Manager Approval”).

Persistent storage – save workflows to localStorage or a real backend.

Dark mode – toggle theme.

E2E tests – with Cypress/Playwright.

ASSUMPTIONS & LIMITATIONS

Workflow is assumed to be a Directed Acyclic Graph (DAG) – validation prevents cycles.

Only one start node is allowed – validation enforces this.

Simulation follows a single path (first outgoing edge only) – no parallel execution.

Automated actions are mocked – they do not actually send emails or generate documents.

No authentication / backend persistence – as required by the case study.

Styling is minimal but functional – focus on architecture, not pixel perfection.

TESTING THE MOCK API

You can test the mock API endpoints directly (for example, in the browser console after running the app):
fetch('/automations').then(r => r.json()).then(console.log)

But the app integrates them automatically in the Automated Node form and Simulation panel.

LICENSE

This project is submitted as part of an internship application for Tredence Studio.
All code is original and written within the given time frame.

AUTHOR

Karuna Johar
karunajohar1712@gmail.com

ACKNOWLEDGEMENTS

React Flow team for the excellent library

Vite for fast builds

The Tredence Studio team for this challenging and realistic case study


