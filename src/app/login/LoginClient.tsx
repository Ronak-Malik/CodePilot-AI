"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

export default function LoginClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    if (searchParams.get("registered") === "true") {
      setSuccessMessage("Workspace created successfully. Awaiting authentication.");
    }
  }, [searchParams]);

  // FIX: Added React.FormEvent to event parameter
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("/api/auth/login", {
        email: formData.email,
        password: formData.password,
      });

      if (response.data.success) {
        const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";
        router.push(callbackUrl);
        router.refresh();
      }
    } catch (error: any) { // FIX: Typed error as 'any'
      setError(error.response?.data?.message || "Authentication failed. Invalid credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f4f1e1] text-[#1a2e25] flex flex-col pt-20 px-6 sm:px-12 font-sans selection:bg-[#d9531e] selection:text-white bg-[linear-gradient(to_right,#1a2e2511_1px,transparent_1px),linear-gradient(to_bottom,#1a2e2511_1px,transparent_1px)] bg-[size:4rem_4rem]">
      
      <div className="max-w-2xl w-full mx-auto z-10">
        
        {/* Header */}
        <div className="mb-16 cursor-default">
          <p className="text-[#d9531e] text-xs font-bold uppercase tracking-[0.3em] font-mono mb-4">
            Track your journey
          </p>
          <h1 className="text-5xl sm:text-7xl font-serif font-black tracking-tighter  text-[#1a2e25] leading-[0.85]">
            Login to <br/>your Account
          </h1>
        </div>

        {/* Form without Card */}
        <form className="space-y-10" onSubmit={handleSubmit}>
          
          {successMessage && (
            <div className="bg-[#1a2e25] text-[#f4f1e1] border-l-8 border-[#1a2e25] p-4 text-xs font-black uppercase font-mono">
              [Success] {successMessage}
            </div>
          )}

          {error && (
            <div className="bg-[#1a2e25] text-[#d9531e] border-l-8 border-[#d9531e] p-4 text-xs font-black uppercase font-mono">
              [Error] {error}
            </div>
          )}

          {/* Email Address */}
          <div className="relative group">
            <label className="text-xs font-bold uppercase tracking-widest text-[#1a2e25]/50 block font-mono transition-colors group-focus-within:text-[#d9531e]">
              Email Address
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="w-full bg-transparent border-b-4 border-[#1a2e25] py-3 text-2xl sm:text-3xl font-black text-[#1a2e25] placeholder:text-[#1a2e25]/10 focus:border-[#d9531e] outline-none transition-colors"
              placeholder="developer@gmail.com"
              required
            />
          </div>

          {/* Password */}
          <div className="relative group">
            <label className="text-xs font-bold uppercase tracking-widest text-[#1a2e25]/50 block font-mono transition-colors group-focus-within:text-[#d9531e]">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-transparent border-b-4 border-[#1a2e25] py-3 text-2xl sm:text-3xl font-black text-[#1a2e25] placeholder:text-[#1a2e25]/10 focus:border-[#d9531e] outline-none transition-colors"
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-[#1a2e25] hover:text-[#d9531e] transition-colors p-2"
              >
                {showPassword ? <EyeSlashIcon className="h-6 w-6" /> : <EyeIcon className="h-6 w-6" />}
              </button>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-[#1a2e25] text-[#f4f1e1] px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] font-mono shadow-[6px_6px_0px_0px_#d9531e] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[3px_3px_0px_0px_#d9531e] transition-all disabled:opacity-50 disabled:pointer-events-none"
            >
              {loading ? "Authorizing..." : "Login →"}
            </button>

            <Link href="/signup" className="text-xs text-[#1a2e25] font-bold tracking-widest font-mono hover:text-[#d9531e] transition-colors underline decoration-2 underline-offset-4">
              Create a new account?
            </Link>
          </div>
        </form>

      </div>
    </div>
  );
}