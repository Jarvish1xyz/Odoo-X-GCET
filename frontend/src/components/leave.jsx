import React, { useState } from 'react';
import { 
  Calendar, Clock, FileText, Send, 
  CheckCircle, XCircle, AlertCircle, Info 
} from 'lucide-react';

const LeaveManagement = () => {
  const [leaveRequests] = useState([
    { id: 1, type: 'Paid Leave', start: '2026-01-10', end: '2026-01-12', days: 3, status: 'Approved', remarks: 'Family function' },
    { id: 2, type: 'Sick Leave', start: '2026-01-02', end: '2026-01-02', days: 1, status: 'Rejected', remarks: 'Flu symptoms' },
    { id: 3, type: 'Unpaid Leave', start: '2026-01-20', end: '2026-01-21', days: 2, status: 'Pending', remarks: 'Personal work' },
  ]);

  const [formData] = useState({
    type: 'Paid Leave',
    startDate: '',
    endDate: '',
    remarks: ''
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved': 
        return <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100"><CheckCircle size={12}/> Approved</span>;
      case 'Rejected': 
        return <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-rose-700 bg-rose-50 px-3 py-1 rounded-full border border-rose-100"><XCircle size={12}/> Rejected</span>;
      default: 
        return <span className="flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-100"><Clock size={12}/> Pending</span>;
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Time Off Management</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Request leave and track your history</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Paid Leaves Left', val: '12 / 15', icon: Calendar, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Sick Leaves Left', val: '05 / 07', icon: Info, color: 'text-emerald-600', bg: 'bg-emerald-50' },
          { label: 'Pending Requests', val: '01', icon: AlertCircle, color: 'text-amber-600', bg: 'bg-amber-50' },
        ].map((stat) => (
          <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-slate-200 flex items-center gap-4">
            <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
              <stat.icon size={24} />
            </div>
            <div>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
              <p className="text-xl font-black text-slate-900 leading-tight">{stat.val}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Leave Form */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm h-full">
            <div className="bg-slate-50 px-8 py-5 border-b border-slate-200">
              <h3 className="font-black text-slate-800 uppercase tracking-tighter text-sm">New Request</h3>
            </div>
            <div className="p-8 space-y-4">
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Leave Type</label>
                <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold focus:ring-2 focus:ring-blue-500/20 outline-none transition-all">
                  <option>Paid Leave</option>
                  <option>Sick Leave</option>
                  <option>Unpaid Leave</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Start</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" />
                </div>
                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">End</label>
                  <input type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">Remarks</label>
                <textarea className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-bold outline-none h-24" placeholder="Reason for leave..."></textarea>
              </div>
              <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all flex items-center justify-center gap-2 mt-4">
                <Send size={18} /> Submit Request
              </button>
            </div>
          </div>
        </div>

        {/* History Table */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm h-full">
            <div className="px-8 py-5 border-b border-slate-100 flex justify-between items-center">
              <h3 className="font-black text-slate-800 uppercase tracking-tighter text-sm">My Leave History</h3>
              <FileText size={18} className="text-slate-300" />
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50/50 text-[10px] uppercase font-black text-slate-400 tracking-[0.15em]">
                  <tr>
                    <th className="px-8 py-5 text-left">Leave Type</th>
                    <th className="px-6 py-5 text-left">Duration</th>
                    <th className="px-6 py-5 text-left">Status</th>
                    <th className="px-8 py-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50">
                  {leaveRequests.map((request) => (
                    <tr key={request.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-8 py-5">
                        <p className="font-black text-slate-800 text-sm leading-tight">{request.type}</p>
                        <p className="text-[10px] font-bold text-slate-400 tracking-wider">REF: #LV-00{request.id}</p>
                      </td>
                      <td className="px-6 py-5 text-sm font-bold text-slate-600">
                        {request.start} <span className="text-slate-300 mx-1">→</span> {request.end}
                        <div className="text-[10px] text-blue-500 font-black tracking-widest uppercase mt-1">{request.days} Day(s)</div>
                      </td>
                      <td className="px-6 py-5">{getStatusBadge(request.status)}</td>
                      <td className="px-8 py-5 text-right">
                        <button className="p-2 text-slate-300 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all">
                          <Info size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { LeaveManagement };