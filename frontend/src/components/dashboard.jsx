import React,{ useEffect } from 'react';
import axios from 'axios';

import { 
  Search, Plus, Mail, Phone, MoreVertical, 
  Filter, Grid, List, UserCheck, ShieldCheck, 
  Briefcase, Users, Calendar, Coffee, Bell, User
} from 'lucide-react';

const EmployeeDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('Employees');
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
  const fetchEmployees = async () => {
    try {
      const token = localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/hr/employees",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      setEmployees(res.data);
    } catch (err) {
      console.error("Failed to fetch employees", err);
    }
  };

  fetchEmployees();
}, []);


  const navLinks = [
    { name: 'Employees', icon: Users },
    { name: 'Attendance', icon: Calendar },
    { name: 'Time Off', icon: Coffee },
  ];

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    emp.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F1F5F9] font-sans">
      
      {/* 1. GLOBAL HEADER NAV */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-6 lg:px-10">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
              <ShieldCheck className="text-white" size={20} />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter">GCET<span className="text-blue-600">Portal</span></span>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => setActiveTab(link.name)}
                className={`flex items-center gap-2 text-sm font-bold transition-all px-1 py-2 border-b-2 ${
                  activeTab === link.name 
                  ? 'text-blue-600 border-blue-600' 
                  : 'text-slate-400 border-transparent hover:text-slate-600'
                }`}
              >
                <link.icon size={18} />
                {link.name}
              </button>
            ))}
          </nav>

          {/* Profile & Notifications */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
            <div className="flex items-center gap-3 pl-2">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-black text-slate-900">Admin User</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase">HR Dept</p>
              </div>
              <div className="w-10 h-10 bg-blue-100 rounded-full border-2 border-white shadow-sm flex items-center justify-center text-blue-600 font-black text-xs">
                AD
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* 2. MAIN CONTENT AREA */}
      <main className="max-w-7xl mx-auto p-6 lg:p-10 space-y-8">
        
        {/* Page Title & Add Button */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">{activeTab} Directory</h1>
            <p className="text-slate-500 font-medium text-sm mt-1">Quick management of your {activeTab.toLowerCase()} data</p>
          </div>
          <button className="flex items-center gap-2 bg-blue-600 px-6 py-3 rounded-2xl text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
            <Plus size={18} /> Add New {activeTab === 'Employees' ? 'Employee' : 'Request'}
          </button>
        </div>

        {/* Toolbar */}
        <div className="bg-white p-4 rounded-[2rem] border border-slate-200 flex flex-col md:flex-row gap-4 items-center shadow-sm">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text" 
              placeholder={`Search in ${activeTab.toLowerCase()}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-14 pr-6 py-3.5 bg-slate-50 border-none rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/10 outline-none transition-all text-sm font-medium"
            />
          </div>
          <div className="flex bg-slate-50 p-1.5 rounded-xl border border-slate-100">
            <button className="p-2.5 bg-white text-blue-600 rounded-lg shadow-sm"><Grid size={18}/></button>
            <button className="p-2.5 text-slate-400 hover:text-slate-600 rounded-lg"><List size={18}/></button>
          </div>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEmployees.map((emp) => (
            <div key={emp.id} className="group bg-white rounded-[2.5rem] border border-slate-200 p-6 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-900/5 hover:-translate-y-1 relative">
              
              <div className="absolute top-6 right-6">
                <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full border ${
                  emp.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-amber-50 text-amber-600 border-amber-100'
                }`}>
                  {emp.status}
                </span>
              </div>

              <div className="flex items-center gap-5 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white text-lg font-black shadow-lg shadow-blue-100">
                  {emp.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h3 className="text-base font-black text-slate-900 leading-tight">{emp.name}</h3>
                  <p className="text-blue-600 text-[10px] font-bold uppercase tracking-wider mt-1">{emp.id}</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-slate-500">
                  <Briefcase size={14} className="text-slate-300"/>
                  <span className="text-xs font-semibold">{emp.role}</span>
                </div>
                <div className="flex items-center gap-3 text-slate-500">
                  <Mail size={14} className="text-slate-300"/>
                  <span className="text-xs font-semibold truncate">{emp.email}</span>
                </div>
              </div>

              <div className="pt-5 border-t border-slate-50 flex items-center justify-between">
                <div className="flex -space-x-2">
                   <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-400">#</div>
                   <div className="w-7 h-7 rounded-full border-2 border-white bg-blue-50 flex items-center justify-center text-[10px] font-bold text-blue-500">✔</div>
                </div>
                <button className="text-slate-300 hover:text-blue-600 transition-all">
                  <MoreVertical size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};


export  {EmployeeDashboard};
