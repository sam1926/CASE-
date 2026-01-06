import React, { useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, 
  LineChart, Line 
} from 'recharts';
import MermaidChart from './components/MermaidChart';
import PrototypeWidget from './components/PrototypeWidget';
import { 
  NavigationTab, 
} from './types';
import {
  DIAGRAM_CURRENT_STATE,
  DIAGRAM_FUTURE_STATE,
  DISPUTE_TIME_DATA,
  TICKET_VOLUME_DATA,
  BUSINESS_RULES,
  USER_STORIES,
  SQL_QUERY
} from './constants';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<NavigationTab>('executive-summary');

  const renderSidebar = () => (
    <div className="w-full md:w-64 bg-slate-900 text-slate-300 flex-shrink-0 flex flex-col h-screen sticky top-0">
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-white text-xl font-bold tracking-tight">GigFlow<span className="text-primary">.io</span></h1>
        <p className="text-xs text-slate-500 mt-1 uppercase tracking-wider">Case Study: Dispute Ops</p>
      </div>
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {[
          { id: 'executive-summary', label: 'Executive Summary', icon: 'fa-briefcase' },
          { id: 'process-modelling', label: 'Process Modelling', icon: 'fa-diagram-project' },
          { id: 'requirements', label: 'Requirements & Stories', icon: 'fa-list-check' },
          { id: 'data-analysis', label: 'Data Analysis', icon: 'fa-chart-line' },
          { id: 'prototype', label: 'Interactive Prototype', icon: 'fa-mobile-screen' },
          { id: 'full-case-study', label: 'Full Case Study', icon: 'fa-book-open' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id as NavigationTab)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              activeTab === item.id 
                ? 'bg-primary text-white shadow-lg shadow-indigo-900/50' 
                : 'hover:bg-slate-800 hover:text-white'
            }`}
          >
            <i className={`fa-solid ${item.icon} w-5`}></i>
            {item.label}
          </button>
        ))}
      </nav>
      <div className="p-6 border-t border-slate-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white font-bold">SV</div>
          <div>
            <p className="text-white text-sm font-medium">Sam Varghese</p>
            <p className="text-xs text-slate-500">Business Analyst</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderExecutiveSummary = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-3xl font-bold text-slate-900">Executive Summary</h2>
        <p className="text-slate-500 mt-2 text-lg">Optimizing marketplace liquidity through automated dispute resolution.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-red-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <h3 className="text-sm font-bold text-red-600 uppercase tracking-wide mb-2 relative z-10">The Problem</h3>
          <p className="text-slate-700 relative z-10">
            Current manual dispute resolution averages <span className="font-bold text-slate-900">14 days</span>, locking up capital and causing a <span className="font-bold text-slate-900">15% churn rate</span> among top-tier freelancers.
          </p>
        </div>
        
        <div className="bg-white p-6 rounded-xl border border-blue-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-2 relative z-10">The Solution</h3>
          <p className="text-slate-700 relative z-10">
            Implement <span className="font-bold text-slate-900">Automated Milestone Workflows</span> with a 7-day silent approval timer and mandatory rejection reason codes to structure data.
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl border border-green-100 shadow-sm relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110"></div>
          <h3 className="text-sm font-bold text-green-600 uppercase tracking-wide mb-2 relative z-10">KPI Targets</h3>
          <ul className="text-slate-700 space-y-2 relative z-10 text-sm font-medium">
            <li className="flex items-center gap-2">
                <i className="fa-solid fa-arrow-down text-green-500"></i>
                Resolution Time: -50%
            </li>
            <li className="flex items-center gap-2">
                <i className="fa-solid fa-arrow-up text-green-500"></i>
                Freelancer Retention: +10%
            </li>
            <li className="flex items-center gap-2">
                <i className="fa-solid fa-arrow-down text-green-500"></i>
                Support Tickets: -35%
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-gradient-to-r from-slate-900 to-slate-800 rounded-xl p-8 text-white shadow-xl">
        <div className="flex items-start gap-4">
            <div className="bg-white/10 p-3 rounded-lg">
                <i className="fa-regular fa-lightbulb text-2xl text-yellow-300"></i>
            </div>
            <div>
                <h3 className="text-xl font-bold mb-2">Business Value Proposition</h3>
                <p className="text-slate-300 leading-relaxed max-w-3xl">
                    By shifting from a "Human-in-the-loop" default to a "Management-by-Exception" model, GigFlow can scale transaction volume 3x without increasing support headcount. This feature directly impacts Net Promoter Score (NPS) by ensuring freelancers get paid faster.
                </p>
            </div>
        </div>
      </div>
    </div>
  );

  const renderProcessModelling = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-200 pb-6 flex justify-between items-end">
        <div>
            <h2 className="text-3xl font-bold text-slate-900">Process Modelling</h2>
            <p className="text-slate-500 mt-2 text-lg">Visualizing the shift from manual chaos to automated order.</p>
        </div>
        <div className="text-xs font-mono bg-slate-100 text-slate-500 px-3 py-1 rounded">
            Rendered with Mermaid.js
        </div>
      </div>

      <div className="grid grid-cols-1 gap-10">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold uppercase">Diagram A</span>
            <h3 className="text-xl font-bold text-slate-800">Current State (As-Is)</h3>
          </div>
          <p className="text-slate-600 mb-4 text-sm max-w-3xl">
            The current process relies heavily on email notifications and manual checking. If a client goes silent, the freelancer is left in limbo until they raise a support ticket, which triggers a manual admin review.
          </p>
          <MermaidChart chart={DIAGRAM_CURRENT_STATE} id="current" />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
             <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-bold uppercase">Diagram B</span>
             <h3 className="text-xl font-bold text-slate-800">Future State (To-Be)</h3>
          </div>
          <p className="text-slate-600 mb-4 text-sm max-w-3xl">
            The new logic introduces a system-managed timer. The system acts as the arbitrator unless a specific "Reject" event occurs. This removes the need for support intervention in 90% of happy-path cases.
          </p>
          <MermaidChart chart={DIAGRAM_FUTURE_STATE} id="future" />
        </section>
      </div>
    </div>
  );

  const renderRequirements = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
       <div className="border-b border-slate-200 pb-6">
        <h2 className="text-3xl font-bold text-slate-900">Requirements & Stories</h2>
        <p className="text-slate-500 mt-2 text-lg">Translation of strategy into actionable technical specifications.</p>
      </div>

      {/* Business Rules Table */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-gavel text-slate-400"></i> Business Rules
        </h3>
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 font-semibold text-slate-700 w-32">ID</th>
                <th className="px-6 py-3 font-semibold text-slate-700 w-48">Rule Name</th>
                <th className="px-6 py-3 font-semibold text-slate-700">Description</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {BUSINESS_RULES.map((rule) => (
                <tr key={rule.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4 font-mono text-slate-500">{rule.id}</td>
                  <td className="px-6 py-4 font-medium text-slate-900">{rule.rule}</td>
                  <td className="px-6 py-4 text-slate-600">{rule.description}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Jira Board Mockup */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
            <i className="fa-brands fa-jira text-blue-500"></i> Sprint Backlog (User Stories)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {USER_STORIES.map((story) => (
            <div key={story.id} className="bg-white p-5 rounded-lg border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full border-t-4 border-t-primary">
              <div className="flex justify-between items-start mb-2">
                <span className="text-xs font-bold text-primary bg-indigo-50 px-2 py-1 rounded">{story.id}</span>
                <span className="text-xs font-semibold bg-slate-100 text-slate-600 px-2 py-1 rounded-full">{story.points} pts</span>
              </div>
              <h4 className="font-bold text-slate-800 mb-2">{story.title}</h4>
              <p className="text-xs text-slate-500 italic mb-4 flex-grow">"{story.description}"</p>
              
              <div className="bg-slate-50 p-3 rounded border border-slate-100">
                <p className="text-xs font-bold text-slate-700 mb-2 uppercase tracking-wide">Acceptance Criteria</p>
                <ul className="space-y-1">
                  {story.criteria.map((crit, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-600">
                       <i className="fa-regular fa-square-check text-green-500 mt-0.5"></i>
                       {crit}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderDataAnalysis = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="border-b border-slate-200 pb-6">
        <h2 className="text-3xl font-bold text-slate-900">Data Analysis</h2>
        <p className="text-slate-500 mt-2 text-lg">Projected impact based on historical dispute data.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-1">Average Dispute Resolution Time</h3>
          <p className="text-xs text-slate-500 mb-6">Comparison of Current vs. Projected Future State</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={DISPUTE_TIME_DATA} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" unit=" days" />
                <YAxis dataKey="name" type="category" width={120} tick={{fontSize: 12}} />
                <Tooltip 
                    cursor={{fill: 'transparent'}}
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="days" fill="#4f46e5" radius={[0, 4, 4, 0]} barSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Chart 2 */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-slate-800 mb-1">Projected Support Ticket Volume</h3>
          <p className="text-xs text-slate-500 mb-6">6-Month forecast post-implementation</p>
          <div className="h-64">
             <ResponsiveContainer width="100%" height="100%">
              <LineChart data={TICKET_VOLUME_DATA} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 12}} axisLine={false} tickLine={false} />
                <Tooltip 
                     contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Legend />
                <Line type="monotone" dataKey="tickets" name="Ticket Volume" stroke="#10b981" strokeWidth={3} dot={{r: 4, fill: '#10b981'}} activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* SQL Snippet */}
      <section>
        <h3 className="text-lg font-bold text-slate-800 mb-4">KPI Tracking Query</h3>
        <div className="bg-slate-900 rounded-lg p-4 shadow-inner overflow-x-auto">
            <div className="flex gap-2 mb-2">
                <span className="w-3 h-3 rounded-full bg-red-500"></span>
                <span className="w-3 h-3 rounded-full bg-yellow-500"></span>
                <span className="w-3 h-3 rounded-full bg-green-500"></span>
            </div>
            <pre className="font-mono text-sm text-blue-300 leading-relaxed">
                {SQL_QUERY.trim()}
            </pre>
        </div>
        <p className="text-slate-500 text-sm mt-2 italic">Query to be scheduled weekly in Snowflake/Tableau dashboard.</p>
      </section>
    </div>
  );

  const renderPrototype = () => (
    <div className={`space-y-8 animate-in fade-in duration-500 flex flex-col ${activeTab === 'prototype' ? 'h-full' : 'min-h-[600px]'}`}>
       <div className="border-b border-slate-200 pb-6">
        <h2 className="text-3xl font-bold text-slate-900">Interactive Prototype</h2>
        <p className="text-slate-500 mt-2 text-lg">Functional proof-of-concept for the client approval widget.</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center bg-slate-100 rounded-xl border border-slate-200 border-dashed p-8 relative">
        <div className="absolute top-4 left-4 text-xs font-mono text-slate-400">
            COMPONENT: Widget_Approval_V2.tsx
        </div>
        
        <PrototypeWidget />

        <div className="mt-8 max-w-lg text-center">
            <p className="text-sm text-slate-500">
                <i className="fa-solid fa-circle-info mr-2"></i>
                <strong>Instructions:</strong> Try clicking "Reject" to see the mandatory reason logic, or wait for the timer (simulated speed) to see auto-approval.
            </p>
        </div>
      </div>
    </div>
  );

  const renderFullCaseStudy = () => (
    <div className="space-y-24 animate-in fade-in duration-500 pb-20">
      <section>
        <div className="mb-8">
           <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Part 1</span>
        </div>
        {renderExecutiveSummary()}
      </section>
      
      <section>
        <div className="mb-8 border-t border-slate-200 pt-16">
           <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Part 2</span>
        </div>
        {renderProcessModelling()}
      </section>

      <section>
        <div className="mb-8 border-t border-slate-200 pt-16">
           <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Part 3</span>
        </div>
        {renderRequirements()}
      </section>

      <section>
        <div className="mb-8 border-t border-slate-200 pt-16">
           <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Part 4</span>
        </div>
        {renderDataAnalysis()}
      </section>

      <section>
        <div className="mb-8 border-t border-slate-200 pt-16">
           <span className="bg-slate-100 text-slate-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Part 5</span>
        </div>
        {renderPrototype()}
      </section>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-slate-50 font-sans text-slate-900">
      {renderSidebar()}
      
      <main className="flex-1 h-screen overflow-y-auto">
        <div className="max-w-6xl mx-auto p-8 md:p-12">
          {activeTab === 'executive-summary' && renderExecutiveSummary()}
          {activeTab === 'process-modelling' && renderProcessModelling()}
          {activeTab === 'requirements' && renderRequirements()}
          {activeTab === 'data-analysis' && renderDataAnalysis()}
          {activeTab === 'prototype' && renderPrototype()}
          {activeTab === 'full-case-study' && renderFullCaseStudy()}
        </div>
      </main>
    </div>
  );
};

export default App;