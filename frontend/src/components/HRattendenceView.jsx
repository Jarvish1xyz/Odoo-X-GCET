import React, { useState } from 'react';
import { 
  Search, Download, CheckCircle, 
  Clock, AlertCircle, Coffee, Users, Zap 
} from 'lucide-react';

export const HRAttendanceDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  const employees = [
    { id: 'EMP-001', name: 'Arjun Mehta', checkIn: '09:00 AM', checkOut: '07:00 PM', workHours: '09:00', extraHours: '01:00', status: 'Present' },
    { id: 'EMP-002', name: 'Sana Khan', checkIn: '09:45 AM', checkOut: '01:30 PM', workHours: '03:45', extraHours: '00:00', status: 'Half-day' },
    { id: 'EMP-003', name: 'Rahul Verma', checkIn: '-', checkOut: '-', workHours: '00:00', extraHours: '00:00', status: 'Leave' },
    { id: 'EMP-004', name: 'Priya Das', checkIn: '08:30 AM', checkOut: '06:30 PM', workHours: '10:00', extraHours: '02:00', status: 'Present' },
    { id: 'EMP-005', name: 'Amit Singh', checkIn: '-', checkOut: '-', workHours: '00:00', extraHours: '00:00', status: 'Absent' },
  ];

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || emp.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === 'All' || emp.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const styles = {
      'Present': 'bg-emerald-50 text-emerald-700 border-emerald-100',
      'Absent': 'bg-rose-50 text-rose-700 border-rose-100',
      'Half-day': 'bg-amber-50 text-amber-700 border-amber-100',
      'Leave': 'bg-blue-50 text-blue-700 border-blue-100'
    };
    return styles[status] || 'bg-slate-50 text-slate-700 border-slate-100';
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-1">
            <Users size={14} /> HR Operations
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Workforce Attendance</h1>
          <p className="text-slate-500 text-sm font-medium">Monitoring logs for {dateString}</p>
        </div>
        <button className="group flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl text-slate-700 font-bold text-sm hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">
          <Download size={18} className="group-hover:translate-y-0.5 transition-transform" /> 
          Export Data
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Present', val: '124', icon: CheckCircle, color: 'text-emerald-500', bg: 'bg-emerald-50', type: 'Present' },
          { label: 'Half-Day', val: '12', icon: Clock, color: 'text-amber-500', bg: 'bg-amber-50', type: 'Half-day' },
          { label: 'On Leave', val: '04', icon: Coffee, color: 'text-blue-500', bg: 'bg-blue-50', type: 'Leave' },
          { label: 'Absent', val: '03', icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50', type: 'Absent' },
        ].map((stat) => (
          <button 
            key={stat.label} 
            onClick={() => setFilterStatus(stat.type)}
            className={`p-5 md:p-6 rounded-[2rem] border transition-all flex flex-col md:flex-row items-center gap-4 text-center md:text-left ${filterStatus === stat.type ? 'bg-white border-blue-500 ring-4 ring-blue-50 shadow-lg' : 'bg-white border-slate-100 shadow-sm hover:shadow-md'}`}
          >
            <div className={`${stat.bg} w-12 h-12 rounded-xl flex items-center justify-center`}>
              <stat.icon size={24} className={stat.color} />
            </div>
            <div>
              <p className="text-xl font-black text-slate-900 leading-tight">{stat.val}</p>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Advanced Table Card */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
        <div className="p-6 md:p-8 border-b border-slate-100 flex flex-col md:flex-row justify-between gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder="Search by Employee Name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-sm font-medium"
            />
          </div>
          <button 
            onClick={() => {setFilterStatus('All'); setSearchTerm('')}}
            className="px-6 py-3 text-slate-500 font-bold text-sm hover:bg-slate-100 rounded-2xl transition-colors"
          >
            Clear Filters
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50/80 text-slate-400 text-[10px] uppercase font-bold tracking-[0.15em]">
              <tr>
                <th className="px-8 py-5 text-left">Employee Name</th>
                <th className="px-6 py-5 text-center">Check-In</th>
                <th className="px-6 py-5 text-center">Check-Out</th>
                <th className="px-6 py-5 text-center">Work Hours</th>
                <th className="px-6 py-5 text-center">Extra Hours</th>
                <th className="px-8 py-5 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredEmployees.map((emp) => (
                <tr key={emp.id} className="group hover:bg-blue-50/30 transition-all duration-200">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 font-bold text-xs ring-2 ring-white shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                        {emp.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-black text-slate-800 leading-none">{emp.name}</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1.5 tracking-wider">{emp.id}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-6 text-center text-xs font-mono font-bold text-slate-600 italic">{emp.checkIn}</td>
                  <td className="px-6 py-6 text-center text-xs font-mono font-bold text-slate-600 italic">{emp.checkOut}</td>
                  <td className="px-6 py-6 text-center">
                      <span className="text-xs font-black text-slate-700 bg-slate-100 px-3 py-1 rounded-lg">{emp.workHours}</span>
                  </td>
                  <td className="px-6 py-6 text-center">
                      <div className="flex items-center justify-center gap-1.5">
                        {emp.extraHours !== "00:00" && <Zap size={12} className="text-blue-500 fill-blue-500" />}
                        <span className={`text-xs font-black ${emp.extraHours !== "00:00" ? 'text-blue-600' : 'text-slate-400'}`}>
                          {emp.extraHours}
                        </span>
                      </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${getStatusBadge(emp.status)}`}>
                      {emp.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
