import React, { useState } from 'react';
import { 
  Calendar, Clock, Zap, CheckCircle, 
  Coffee, CalendarDays, Download, User 
} from 'lucide-react';

const EmployeeAttendanceView = () => {
  // Mock Data for the specific Employee
  const attendanceLogs = [
    { date: 'Jan 03, 2026', checkIn: '09:00 AM', checkOut: '06:00 PM', workHours: '09:00', extraHours: '00:00', status: 'Present' },
    { date: 'Jan 02, 2026', checkIn: '08:45 AM', checkOut: '07:15 PM', workHours: '10:30', extraHours: '01:30', status: 'Present' },
    { date: 'Jan 01, 2026', checkIn: '-', checkOut: '-', workHours: '00:00', extraHours: '00:00', status: 'Holiday' },
    { date: 'Dec 31, 2025', checkIn: '09:15 AM', checkOut: '05:45 PM', workHours: '08:30', extraHours: '00:00', status: 'Present' },
    { date: 'Dec 30, 2025', checkIn: '-', checkOut: '-', workHours: '00:00', extraHours: '00:00', status: 'Leave' },
  ];

  const stats = [
    { label: 'Total Working Days', val: '22', icon: CalendarDays, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Present Days', val: '19', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Leave Days', val: '03', icon: Coffee, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans">
      {/* 1. TOP LOGO BAR */}
      <nav className="bg-white border-b border-slate-100 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <Zap className="text-white fill-white" size={20} />
          </div>
          <span className="text-xl font-black text-slate-900 tracking-tighter">GCET<span className="text-blue-600">Portal</span></span>
        </div>
        <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-800">Arjun Mehta</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">EMP-001</p>
            </div>
            <div className="w-10 h-10 bg-slate-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center">
                <User size={18} className="text-slate-500" />
            </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-8 space-y-8">
        
        {/* 2. HEADER SECTION */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">My Attendance</h1>
            <p className="text-slate-500 text-sm font-medium">Review your work logs and performance metrics</p>
          </div>
          <button className="flex items-center gap-2 bg-white border border-slate-200 px-5 py-2.5 rounded-2xl text-slate-600 font-bold text-sm hover:bg-slate-50 transition-all shadow-sm">
            <Download size={18} /> Download Report
          </button>
        </div>

        {/* 3. PERSONAL SUMMARY RIBBON */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-5">
              <div className={`${stat.bg} w-14 h-14 rounded-2xl flex items-center justify-center`}>
                <stat.icon size={26} className={stat.color} />
              </div>
              <div>
                <p className="text-2xl font-black text-slate-900 leading-tight">{stat.val}</p>
                <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 4. ATTENDANCE LOG TABLE */}
        <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">
          <div className="p-8 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-black text-slate-800 flex items-center gap-2">
                <Clock size={18} className="text-blue-600" />
                Recent Activity
            </h3>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest bg-slate-50 px-4 py-2 rounded-xl">
                <Calendar size={14} /> January 2026
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-50/80 text-slate-400 text-[10px] uppercase font-bold tracking-[0.15em]">
                <tr>
                  <th className="px-8 py-5 text-left">Date</th>
                  <th className="px-6 py-5 text-center">Check-In</th>
                  <th className="px-6 py-5 text-center">Check-Out</th>
                  <th className="px-6 py-5 text-center">Work Hours</th>
                  <th className="px-6 py-5 text-center">Extra Hours</th>
                  <th className="px-8 py-5 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {attendanceLogs.map((log, index) => (
                  <tr key={index} className="group hover:bg-blue-50/30 transition-all duration-200">
                    <td className="px-8 py-6">
                      <p className="text-sm font-black text-slate-800">{log.date}</p>
                    </td>
                    <td className="px-6 py-6 text-center text-xs font-mono font-bold text-slate-500 italic">
                        {log.checkIn}
                    </td>
                    <td className="px-6 py-6 text-center text-xs font-mono font-bold text-slate-500 italic">
                        {log.checkOut}
                    </td>
                    <td className="px-6 py-6 text-center">
                       <span className={`text-xs font-black px-3 py-1 rounded-lg ${log.workHours === '00:00' ? 'text-slate-300 bg-slate-50' : 'text-slate-700 bg-slate-100'}`}>
                         {log.workHours}
                       </span>
                    </td>
                    <td className="px-6 py-6 text-center">
                       <div className="flex items-center justify-center gap-1.5">
                         {log.extraHours !== "00:00" && <Zap size={12} className="text-blue-500 fill-blue-500" />}
                         <span className={`text-xs font-black ${log.extraHours !== "00:00" ? 'text-blue-600' : 'text-slate-300'}`}>
                           {log.extraHours}
                         </span>
                       </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${
                        log.status === 'Present' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 
                        log.status === 'Leave' ? 'bg-rose-50 text-rose-700 border-rose-100' : 
                        'bg-slate-50 text-slate-500 border-slate-100'
                      }`}>
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export { EmployeeAttendanceView };