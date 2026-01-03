import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import { 
  Users, Calendar, Coffee, ShieldCheck, Bell, Plus 
} from 'lucide-react';

// Import your Attendance Component
// Ensure the filename matches exactly: HRAttendanceDashboard.jsx
import { HRAttendanceDashboard } from './components/HRattendenceView';
import { LeaveManagement } from './components/leave';

// --- SUB-COMPONENT: Navigation Logic ---
const Navigation = () => {
  const location = useLocation();
  
  const navLinks = [
    { name: 'Employees', path: '/', icon: Users },
    { name: 'Attendance', path: '/attendance', icon: Calendar },
    { name: 'Time Off', path: '/time-off', icon: Coffee },
  ];

  return (
    <nav className="hidden md:flex items-center gap-8">
      {navLinks.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`flex items-center gap-2 text-sm font-bold transition-all px-1 py-2 border-b-2 ${
            location.pathname === link.path 
            ? 'text-blue-600 border-blue-600' 
            : 'text-slate-400 border-transparent hover:text-slate-600'
          }`}
        >
          <link.icon size={18} />
          {link.name}
        </Link>
      ))}
    </nav>
  );
};

// --- SUB-COMPONENT: Employee Card View ---
const EmployeeList = () => (
  <div className="space-y-8 animate-in fade-in duration-500">
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Employee Directory</h1>
        <p className="text-slate-500 text-sm font-medium mt-1">Manage your team members and roles</p>
      </div>
      <button className="bg-blue-600 text-white px-6 py-3 rounded-2xl font-bold text-sm shadow-lg shadow-blue-200 hover:bg-blue-700 transition-all flex items-center gap-2">
        <Plus size={18}/> Add Employee
      </button>
    </div>
    
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {['Arjun Mehta', 'Sana Khan', 'Rahul Verma', 'Priya Das'].map((name, i) => (
        <div key={name} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 hover:shadow-xl transition-all group">
          <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-blue-100 group-hover:scale-110 transition-transform">
            {name[0]}
          </div>
          <h3 className="font-black text-slate-800 text-lg">{name}</h3>
          <p className="text-xs text-slate-400 font-bold mb-4 uppercase tracking-wider">EMP-10{i + 1}</p>
          <div className="pt-4 border-t border-slate-50 flex justify-between items-center">
            <span className="text-[10px] font-black uppercase text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">Active</span>
            <button className="text-slate-300 hover:text-blue-600 text-xs font-bold transition-colors">View Profile</button>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// --- MAIN APP COMPONENT ---
const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#F1F5F9] font-sans">
        
        {/* SHARED HEADER */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-slate-200 px-6 lg:px-10">
          <div className="max-w-7xl mx-auto flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
                <ShieldCheck className="text-white" size={20} />
              </div>
              <span className="text-xl font-black text-slate-900 tracking-tighter">GCET<span className="text-blue-600">Portal</span></span>
            </Link>

            {/* Nav Links Sub-Component */}
            <Navigation />

            {/* Profile/Actions */}
            <div className="flex items-center gap-4">
              <button className="p-2 text-slate-400 hover:text-blue-600 transition-all">
                <Bell size={20} />
              </button>
              <div className="w-10 h-10 bg-blue-100 rounded-full border-2 border-white flex items-center justify-center text-blue-600 font-black text-xs">
                AD
              </div>
            </div>
          </div>
        </header>

        {/* PAGE CONTENT */}
        <main className="max-w-7xl mx-auto p-6 lg:p-10">
          <Routes>
            <Route path="/" element={<EmployeeList />} />
            <Route path="/attendance" element={<HRAttendanceDashboard />} />
            <Route path="/time-off" element={<LeaveManagement/>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;