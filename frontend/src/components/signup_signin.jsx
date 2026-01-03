import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ShieldCheck, Mail, Lock, User, Building2, CheckCircle2, LogIn } from 'lucide-react';

const AuthSystem = () => {
  const navigate = useNavigate();

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
    const processedValue = name.includes('password') ? value : value.toLowerCase();
    setFormData({ ...formData, [name]: processedValue });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setShowPass(false);
    setShowConfirmPass(false);
  };

  /* ================= API HANDLERS ================= */

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isLogin) {
        // LOGIN
        const res = await axios.post(
          "http://localhost:5000/api/auth/login",
          {
            email: formData.email,
            password: formData.password
          }
        );

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));

        navigate("/dashboard"); // HR Dashboard

      } else {
        // REGISTER HR
        if (formData.password !== formData.confirmPassword) {
          alert("Passwords do not match");
          return;
        }

        await axios.post(
          "http://localhost:5000/api/auth/register",
          {
            companyName: formData.companyName,
            fullName: formData.fullName,
            email: formData.email,
            password: formData.password
          }
        );

        alert("HR Registered Successfully");
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  /* ================= UI (UNCHANGED) ================= */

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 font-sans transition-all duration-500">
      {/* UI REMAINS SAME */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* your original JSX exactly as-is */}
      </form>
    </div>
  );
};

export default AuthSystem;
