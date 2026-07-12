"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function SignupPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    leetcodeUsername: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});
  const [debouncedUsername, setDebouncedUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState("idle");

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUsername(formData.leetcodeUsername.trim().toLowerCase());
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.leetcodeUsername]);

  useEffect(() => {
    if (!debouncedUsername) {
      setUsernameStatus("idle");
      return;
    }
    const checkUsername = async () => {
      try {
        setUsernameStatus("checking");
        const res = await axios.get("/api/check-username-unique", {
          params: { leetcodeUsername: debouncedUsername },
        });
        setUsernameStatus(res.data.success ? "available" : "taken");
      } catch {
        setUsernameStatus("idle");
      }
    };
    checkUsername();
  }, [debouncedUsername]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (fieldErrors[name]) setFieldErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.email) errors.email = "Required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Invalid";
    if (formData.password.length < 6) errors.password = "Min 6 chars";
    if (formData.password !== formData.confirmPassword) errors.confirmPassword = "No match";
    if (!formData.leetcodeUsername) errors.leetcodeUsername = "Required";
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const response = await axios.post("/api/auth/signup", formData);
      if (response.data.success) router.push("/login?registered=true");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f1e1] text-[#1a2e25] flex flex-col justify-center py-10 px-6 sm:px-12 font-sans selection:bg-[#d9531e] selection:text-white bg-[linear-gradient(to_right,#1a2e2511_1px,transparent_1px),linear-gradient(to_bottom,#1a2e2511_1px,transparent_1px)] bg-[size:4rem_4rem]">
      
      <div className="max-w-2xl w-full mx-auto z-10">
        
        {/* Header - Scaled down for better fit */}
        <div className="mb-10 sm:mb-12 cursor-default">
          <p className="text-[#d9531e] text-[10px] sm:text-xs font-bold uppercase tracking-[0.3em] font-mono mb-3">
            System Initialization
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tighter text-[#1a2e25] leading-[0.85]">
            Create your <br/> Account
          </h1>
        </div>

        {/* Form without Card - Tighter spacing (space-y-6 sm:space-y-8) */}
        <form className="space-y-6 sm:space-y-8" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-[#1a2e25] text-[#d9531e] border-l-8 border-[#d9531e] p-3 text-[10px] sm:text-xs font-black uppercase font-mono">
              [Error] {error}
            </div>
          )}

          {/* Full Name */}
          <div className="relative group">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1a2e25]/60 block font-mono transition-colors group-focus-within:text-[#d9531e]">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-transparent border-b-4 border-[#1a2e25] py-2 text-xl sm:text-2xl font-black text-[#1a2e25] placeholder:text-[#1a2e25]/20 focus:border-[#d9531e] outline-none transition-colors"
              placeholder=""
            />
          </div>

          {/* Email */}
          <div className="relative group">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1a2e25]/60 block font-mono transition-colors group-focus-within:text-[#d9531e]">
              Email Address {fieldErrors.email && <span className="text-[#d9531e]">- {fieldErrors.email}</span>}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-transparent border-b-4 ${fieldErrors.email ? 'border-[#d9531e]' : 'border-[#1a2e25]'} py-2 text-xl sm:text-2xl font-black text-[#1a2e25] placeholder:text-[#1a2e25]/20 focus:border-[#d9531e] outline-none transition-colors`}
              placeholder="Automated insights sent here"
            />
          </div>

          {/* LeetCode ID */}
          <div className="relative group">
            <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1a2e25]/60 block font-mono transition-colors group-focus-within:text-[#d9531e]">
              LeetCode Handle
            </label>
            <div className="relative w-full">
              <input
                type="text"
                name="leetcodeUsername"
                value={formData.leetcodeUsername}
                onChange={handleChange}
                className={`w-full bg-transparent border-b-4 ${
                  usernameStatus === "available" ? 'border-green-600 text-green-700' : 
                  usernameStatus === "taken" ? 'border-[#d9531e] text-[#d9531e]' : 'border-[#1a2e25]'
                } py-2 text-xl sm:text-2xl font-black placeholder:text-[#1a2e25]/20 focus:border-[#d9531e] outline-none transition-colors pr-24`}
                placeholder="leetcode_username"
              />
              <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                {usernameStatus === "checking" && <span className="text-[10px] sm:text-xs font-bold uppercase font-mono tracking-widest animate-pulse text-[#1a2e25]">Wait...</span>}
                {usernameStatus === "available" && <span className="text-[10px] sm:text-xs font-bold uppercase font-mono tracking-widest text-green-700">Valid</span>}
                {usernameStatus === "taken" && <span className="text-[10px] sm:text-xs font-bold uppercase font-mono tracking-widest text-[#d9531e]">Taken</span>}
              </div>
            </div>
          </div>

          {/* Passwords */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="relative group">
              <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1a2e25]/60 block font-mono transition-colors group-focus-within:text-[#d9531e]">
                Password {fieldErrors.password && <span className="text-[#d9531e]">- {fieldErrors.password}</span>}
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-transparent border-b-4 border-[#1a2e25] py-2 text-xl sm:text-2xl font-black text-[#1a2e25] placeholder:text-[#1a2e25]/20 focus:border-[#d9531e] outline-none transition-colors"
                placeholder="••••••"
              />
            </div>
            
            <div className="relative group">
              <label className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-[#1a2e25]/60 block font-mono transition-colors group-focus-within:text-[#d9531e]">
                Confirm {fieldErrors.confirmPassword && <span className="text-[#d9531e]">- No match</span>}
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b-4 border-[#1a2e25] py-2 text-xl sm:text-2xl font-black text-[#1a2e25] placeholder:text-[#1a2e25]/20 focus:border-[#d9531e] outline-none transition-colors pr-10"
                  placeholder="••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 text-[#1a2e25] hover:text-[#d9531e] transition-colors p-2"
                >
                  {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-[#1a2e25] text-[#f4f1e1] px-10 py-4 text-xs font-bold uppercase tracking-[0.2em] font-mono shadow-[4px_4px_0px_0px_#d9531e] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_#d9531e] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? "Compiling..." : "Create →"}
            </button>

            <Link href="/login" className="text-[11px] text-[#1a2e25] font-bold tracking-widest font-mono hover:text-[#d9531e] transition-colors underline decoration-2 underline-offset-4 text-center sm:text-right">
              If already a member, login please?
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}