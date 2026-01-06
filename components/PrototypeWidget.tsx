import React, { useState, useEffect } from 'react';

const PrototypeWidget: React.FC = () => {
  const [status, setStatus] = useState<'pending' | 'approved' | 'rejected'>('pending');
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectReason, setRejectReason] = useState('');
  const [timeLeft, setTimeLeft] = useState(168 * 3600); // 7 days in seconds

  // Simulate Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 60 : 0)); // Speed up time for demo
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const d = Math.floor(seconds / (3600 * 24));
    const h = Math.floor((seconds % (3600 * 24)) / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    return `${d}d ${h}h ${m}m`;
  };

  const handleApprove = () => {
    setStatus('approved');
    setShowRejectForm(false);
  };

  const handleRejectClick = () => {
    setShowRejectForm(true);
  };

  const submitRejection = () => {
    if (rejectReason) {
      setStatus('rejected');
      setShowRejectForm(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-slate-200 font-sans">
      {/* Header */}
      <div className="bg-slate-900 text-white p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
            <i className="fa-solid fa-cube text-slate-400"></i>
            <span className="font-semibold">GigFlow Milestone</span>
        </div>
        <div className="text-xs bg-slate-700 px-2 py-1 rounded">
          ID: #8821
        </div>
      </div>

      {/* Body */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h3 className="font-bold text-slate-800 text-lg">Website Redesign Phase 1</h3>
            <p className="text-slate-500 text-sm mt-1">Submitted by: Alex Dev</p>
          </div>
          <div className="text-right">
            <span className="block text-2xl font-bold text-slate-900">$1,500.00</span>
            <span className="text-xs text-slate-400 uppercase font-semibold">Escrow</span>
          </div>
        </div>

        {/* Auto-Approval Timer */}
        {status === 'pending' && (
          <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 mb-6 flex items-center gap-3">
            <div className="bg-blue-100 text-blue-600 p-2 rounded-full w-8 h-8 flex items-center justify-center">
                <i className="fa-regular fa-clock"></i>
            </div>
            <div>
              <p className="text-xs text-blue-600 font-bold uppercase">Auto-Approval Timer</p>
              <p className="text-blue-900 font-mono font-medium">{formatTime(timeLeft)} remaining</p>
            </div>
          </div>
        )}

        {/* Content Area Based on Status */}
        {status === 'approved' && (
          <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                <i className="fa-solid fa-check"></i>
            </div>
            <h4 className="text-xl font-bold text-green-700">Funds Released!</h4>
            <p className="text-slate-500 text-sm mt-2">Transaction ID: tx_992831</p>
            <button 
                onClick={() => setStatus('pending')}
                className="mt-6 text-sm text-slate-400 hover:text-slate-600 underline"
            >
                Reset Prototype
            </button>
          </div>
        )}

        {status === 'rejected' && (
          <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
             <div className="w-16 h-16 bg-red-100 text-red-600 rounded-full flex items-center justify-center mx-auto mb-3 text-2xl">
                <i className="fa-solid fa-xmark"></i>
            </div>
            <h4 className="text-xl font-bold text-red-700">Milestone Rejected</h4>
            <p className="text-slate-500 text-sm mt-2">Reason: {rejectReason}</p>
             <button 
                onClick={() => { setStatus('pending'); setRejectReason(''); }}
                className="mt-6 text-sm text-slate-400 hover:text-slate-600 underline"
            >
                Reset Prototype
            </button>
          </div>
        )}

        {status === 'pending' && !showRejectForm && (
          <div className="flex gap-3 mt-4">
            <button 
              onClick={handleRejectClick}
              className="flex-1 px-4 py-3 bg-white border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors shadow-sm"
            >
              Reject
            </button>
            <button 
              onClick={handleApprove}
              className="flex-1 px-4 py-3 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors shadow-md"
            >
              Approve & Release
            </button>
          </div>
        )}

        {status === 'pending' && showRejectForm && (
          <div className="mt-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Reason for Rejection <span className="text-red-500">*</span>
            </label>
            <select 
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              className="w-full p-2 border border-slate-300 rounded-md text-sm focus:ring-2 focus:ring-primary focus:border-primary outline-none"
            >
              <option value="">Select a reason code...</option>
              <option value="Incomplete Work">Incomplete Work</option>
              <option value="Quality Issues">Quality Issues</option>
              <option value="Wrong Files">Wrong Files Attached</option>
            </select>
            <div className="flex gap-2 mt-4">
              <button 
                onClick={() => setShowRejectForm(false)}
                className="flex-1 px-3 py-2 text-sm text-slate-600 hover:bg-slate-200 rounded-md"
              >
                Cancel
              </button>
              <button 
                disabled={!rejectReason}
                onClick={submitRejection}
                className="flex-1 px-3 py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Confirm Reject
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PrototypeWidget;