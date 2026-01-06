import { BusinessRule, UserStory } from "./types";

// Mermaid Diagrams
export const DIAGRAM_CURRENT_STATE = `
graph TD
    A[Freelancer Submits Milestone] -->|Email Notification| B(Client)
    B --> C{Client Actions?}
    C -->|No Action| D[Wait 14 Days]
    D --> E[Support Ticket Created]
    E --> F[Manual Admin Review]
    F --> G[Funds Released/Returned]
    C -->|Dispute| E
    C -->|Approve| H[Funds Released]
    
    style A fill:#f1f5f9,stroke:#64748b
    style F fill:#fee2e2,stroke:#ef4444,stroke-width:2px
    style D fill:#fee2e2,stroke:#ef4444
`;

export const DIAGRAM_FUTURE_STATE = `
sequenceDiagram
    participant F as Freelancer
    participant S as System (GigFlow)
    participant C as Client
    
    F->>S: Submit Milestone
    S->>C: Notification (Push/Email)
    S->>S: Start 168hr Timer (7 Days)
    
    rect rgb(240, 253, 250)
    Note over S,C: Auto-Approval Workflow
    alt Client Approves
        C->>S: Click "Approve"
        S->>F: Release Funds Immediate
    else Client Rejects
        C->>S: Click "Reject" + Reason Code
        S->>F: Notify & Pause Timer
    else Timer Expires
        S->>F: Auto-Release Funds
        S->>C: Notification of Auto-Approval
    end
    end
`;

// Chart Data
export const DISPUTE_TIME_DATA = [
  { name: 'Manual Process', days: 14, fill: '#94a3b8' },
  { name: 'Automated Workflow', days: 2, fill: '#4f46e5' },
];

export const TICKET_VOLUME_DATA = [
  { month: 'Jan', tickets: 450 },
  { month: 'Feb', tickets: 420 },
  { month: 'Mar', tickets: 380 },
  { month: 'Apr', tickets: 200 },
  { month: 'May', tickets: 120 },
  { month: 'Jun', tickets: 80 },
];

// Business Rules
export const BUSINESS_RULES: BusinessRule[] = [
  { id: 'BR-01', rule: 'Auto-Release Timer', description: 'Funds must be automatically released to the freelancer 168 hours (7 days) after milestone submission if no action is taken by the client.' },
  { id: 'BR-02', rule: 'Mandatory Rejection Reason', description: 'Clients cannot reject a milestone without selecting a standardized Reason Code from the provided list.' },
  { id: 'BR-03', rule: 'Dispute Escalation Window', description: 'Manual dispute escalation is only available after a rejection has occurred and the freelancer contests the rejection.' },
];

// Jira Stories
export const USER_STORIES: UserStory[] = [
  {
    id: 'GF-1024',
    title: 'Automated 7-Day Approval Timer',
    description: 'As a Freelancer, I want my funds auto-released after 7 days so that I don’t have to chase unresponsive clients.',
    points: 5,
    criteria: [
      'System starts countdown upon submission',
      'Timer pauses if "Reject" is clicked',
      'Funds transfer triggered at T=0',
      'Email sent to both parties on execution'
    ]
  },
  {
    id: 'GF-1025',
    title: 'Rejection Reason Enforcement',
    description: 'As a Product Manager, I want to capture structured data on rejections so we can analyze dispute trends.',
    points: 3,
    criteria: [
      'Reject button opens modal/dropdown',
      'Submit disabled until reason selected',
      'Reason saved to transaction log'
    ]
  },
  {
    id: 'GF-1026',
    title: 'Client Action Dashboard Widget',
    description: 'As a Client, I want a clear card showing pending approvals so I can act quickly.',
    points: 8,
    criteria: [
      'Visual countdown timer visible',
      'One-click approval action',
      'Mobile responsive layout'
    ]
  }
];

export const SQL_QUERY = `
SELECT 
  DATE_TRUNC('month', created_at) as month,
  AVG(EXTRACT(EPOCH FROM (resolved_at - created_at))/86400) as avg_resolution_days,
  COUNT(CASE WHEN resolution_type = 'auto' THEN 1 END) as auto_approvals
FROM disputes
WHERE created_at >= '2023-01-01'
GROUP BY 1
ORDER BY 1 DESC;
`;