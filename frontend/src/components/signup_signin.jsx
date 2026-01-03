import React, { useState } from 'react';
import { Eye, EyeOff, ShieldCheck, Mail, Lock, User, Building2, CheckCircle2, LogIn } from 'lucide-react';

const AuthSystem = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPass, setShowPass] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    // Keep password case-sensitive, lowercase everything else
    const processedValue = name.includes('password') ? value : value.toLowerCase();
    setFormData({ ...formData, [name]: processedValue });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setShowPass(false);
    setShowConfirmPass(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans transition-all duration-500">
      
      {/* 1. Universal Logo Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl shadow-lg shadow-blue-200 mb-4 transition-transform hover:rotate-3 cursor-pointer">
          <ShieldCheck size={32} className="text-white" />
        </div>
        <h1 className="text-2xl font-black text-slate-800 tracking-tight uppercase">
          Nexus<span className="text-blue-600">HRM</span>
        </h1>
        <p className="text-slate-500 text-sm font-medium mt-1 uppercase tracking-widest text-[10px]">
          {isLogin ? 'Welcome Back' : 'Join the Platform'}
        </p>
      </div>

      {/* 2. Unified Auth Card */}
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/60 border border-slate-100 p-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-slate-800">
            {isLogin ? 'Sign In' : 'Create Account'}
          </h2>
          <p className="text-slate-400 text-sm mt-1">
            {isLogin 
              ? 'Access your dashboard and manage your team.' 
              : 'Start your 14-day free trial today.'}
          </p>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          
          {/* Sign Up Fields Only */}
          {!isLogin && (
            <>
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 ml-1 uppercase tracking-wider">Company Name</label>
                <div className="relative">
                  <Building2 className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Acme Corp"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-slate-500 ml-1 uppercase tracking-wider">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-3.5 text-slate-400" size={18} />
                  <input 
                    type="text" 
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700"
                  />
                </div>
              </div>
            </>
          )}

          {/* Email (Always Visible) */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-500 ml-1 uppercase tracking-wider">Work Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type="email" 
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@company.com"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700"
              />
            </div>
          </div>

          {/* Password (Always Visible) */}
          <div className="space-y-1.5">
            <div className="flex justify-between items-center ml-1">
              <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Password</label>
              {isLogin && <button className="text-[10px] text-blue-600 font-bold hover:underline">Forgot?</button>}
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
              <input 
                type={showPass ? "text" : "password"} 
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700"
              />
              <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-3.5 text-slate-400 hover:text-blue-600">
                {showPass ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Confirm Password (Sign Up Only) */}
          {!isLogin && (
            <div className="space-y-1.5 animate-in fade-in slide-in-from-top-2">
              <label className="text-[10px] font-bold text-slate-500 ml-1 uppercase tracking-wider">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-3.5 text-slate-400" size={18} />
                <input 
                  type={showConfirmPass ? "text" : "password"} 
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-slate-700"
                />
                <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute right-4 top-3.5 text-slate-400 hover:text-blue-600">
                  {showConfirmPass ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                <p className="text-[11px] text-rose-500 font-bold mt-1 ml-1 italic">Passwords do not match</p>
              )}
            </div>
          )}

          {/* Action Button */}
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-2xl shadow-xl shadow-blue-100 transition-all transform active:scale-[0.98] mt-6 flex items-center justify-center gap-2 group">
            {isLogin ? 'Sign In Now' : 'Create Free Account'}
            {isLogin ? <LogIn size={18} /> : <CheckCircle2 size={18} />}
          </button>
        </form>

        {/* Footer Toggle */}
        <div className="mt-8 text-center">
          <p className="text-sm text-slate-500 font-medium">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{' '}
            <button 
              onClick={toggleMode}
              className="text-blue-600 font-bold hover:underline transition-all"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>

      {/* 3. Global Security Footer */}
      <div className="mt-8 flex items-center gap-2 text-slate-400 text-[10px] font-medium uppercase tracking-widest">
        <ShieldCheck size={14} />
        Enterprise-grade 256-bit encryption
      </div>
    </div>
  );
};

export default AuthSystem;