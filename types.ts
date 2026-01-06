export type NavigationTab =
  | 'executive-summary'
  | 'process-modelling'
  | 'requirements'
  | 'data-analysis'
  | 'prototype'
  | 'full-case-study';

export interface UserStory {
  id: string;
  title: string;
  description: string;
  points: number;
  criteria: string[];
}

export interface BusinessRule {
  id: string;
  rule: string;
  description: string;
}

// Global type declarations
declare global {
  interface Window {
    mermaid: {
      initialize: (config: any) => void;
      render: (id: string, text: string) => Promise<{ svg: string }>;
    };
  }
}
}

// Extend Window interface for Mermaid CDN
declare global {
  interface Window {
    mermaid: {
      initialize: (config: any) => void;
      contentLoaded: () => void;
      run: (config: any) => Promise<void>;
      render: (id: string, text: string) => Promise<{ svg: string }>;
    };
  }
}