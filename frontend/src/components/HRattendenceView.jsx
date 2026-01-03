import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  Search, Download, CheckCircle, 
  Clock, AlertCircle, Coffee, Users, Zap 
} from 'lucide-react';

export const HRAttendanceDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [employees, setEmployees] = useState([]);

  const today = new Date();
  const dateString = today.toLocaleDateString('en-US', { 
    month: 'long', 
    day: 'numeric', 
    year: 'numeric' 
  });

  // 🔥 FETCH REAL DATA (ONLY LOGIC ADDED)
  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get('/api/attendance/all', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        setEmployees(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAttendance();
  }, []);

  // 🔍 FILTER LOGIC (UNCHANGED)
  // const filteredEmployees = employees.filter(emp => {
  //   const matchesSearch =
  //     emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //     emp.id.toLowerCase().includes(searchTerm.toLowerCase());

  //   const matchesStatus =
  //     filterStatus === 'All' || emp.status === filterStatus;

  //   return matchesSearch && matchesStatus;
  // });

  // 🎨 STATUS BADGE (UNCHANGED)
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
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">
            Workforce Attendance
          </h1>
          <p className="text-slate-500 text-sm font-medium">
            Monitoring logs for {dateString}
          </p>
        </div>
        <button className="group flex items-center gap-2 bg-white border border-slate-200 px-6 py-3 rounded-2xl text-slate-700 font-bold text-sm hover:border-blue-500 hover:text-blue-600 transition-all shadow-sm">
          <Download size={18} className="group-hover:translate-y-0.5 transition-transform" /> 
          Export Data
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Present', icon: CheckCircle, type: 'Present' },
          { label: 'Half-Day', icon: Clock, type: 'Half-day' },
          { label: 'On Leave', icon: Coffee, type: 'Leave' },
          { label: 'Absent', icon: AlertCircle, type: 'Absent' },
        ].map((stat) => (
          <button 
            key={stat.label} 
            onClick={() => setFilterStatus(stat.type)}
            className={`p-5 md:p-6 rounded-[2rem] border transition-all flex items-center gap-4 ${
              filterStatus === stat.type
                ? 'bg-white border-blue-500 ring-4 ring-blue-50'
                : 'bg-white border-slate-100'
            }`}
          >
            <stat.icon size={24} />
            <div>
              <p className="text-xl font-black text-slate-900">
                {employees.filter(e => e.status === stat.type).length}
              </p>
              <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-200 shadow-xl overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex gap-4">
          <div className="relative flex-1 max-w-lg">
            <Search className="absolute left-4 top-3.5 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by Employee Name or ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl"
            />
          </div>
          <button
            onClick={() => { setFilterStatus('All'); setSearchTerm(''); }}
            className="px-6 py-3 text-slate-500 font-bold text-sm"
          >
            Clear Filters
          </button>
        </div>

        <table className="w-full">
          <tbody>
            {filteredEmployees.map((emp) => (
              <tr key={emp.id}>
                <td className="px-8 py-6">
                  <p className="font-black">{emp.name}</p>
                  <p className="text-xs text-slate-400">{emp.id}</p>
                </td>
                <td className="text-center">{emp.checkIn}</td>
                <td className="text-center">{emp.checkOut}</td>
                <td className="text-center">{emp.workHours}</td>
                <td className="text-center">
                  {emp.extraHours !== "00:00" && <Zap size={12} />}
                  {emp.extraHours}
                </td>
                <td className="text-right">
                  <span className={`px-4 py-1 rounded-full border ${getStatusBadge(emp.status)}`}>
                    {emp.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

