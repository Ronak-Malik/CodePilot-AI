"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

// 1. Tell TypeScript exactly what data to expect
interface LeetCodeStats {
  easy?: number;
  medium?: number;
  hard?: number;
  totalSolved?: number;
  streak?: number;
  ranking?: string | number;
  recentProblems?: Array<{
    title: string;
    solvedAt: string | number | Date;
    difficulty: string;
  }>;
}

interface User {
  name?: string;
  leetcodeUsername?: string;
}

export default function Dashboard() {
  const router = useRouter();
  
  // 2. Apply the types to your state
  const [stats, setStats] = useState<LeetCodeStats | null>(null);
  const [user, setUser] = useState<User | null>(null);
  
  const [loading, setLoading] = useState(true);
  const [syncing, setSyncing] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/auth/me");
      if (response.data.success) {
        setUser(response.data.user);
        fetchStats();
      } else {
        router.push("/login");
      }
    } catch (error) {
      router.push("/login");
    }
  };

  const fetchStats = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/leetcode/stats");
      if (response.data.success) setStats(response.data.data);
    } catch (error) {
      console.error("Fetch error");
    } finally {
      setLoading(false);
    }
  };

  const handleSync = async () => {
    setSyncing(true);
    try {
      const response = await axios.post("/api/leetcode/sync");
      if (response.data.success) await fetchStats();
    } catch (error) {
      alert("Sync failed");
    } finally {
      setSyncing(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f1e1]">
      <div className="h-8 w-8 border-4 border-[#1a2e25]/20 border-t-[#d9531e] rounded-full animate-spin" />
    </div>
  );

  const safeStats = {
    easy: stats?.easy ?? 0,
    medium: stats?.medium ?? 0,
    hard: stats?.hard ?? 0,
    total: stats?.totalSolved ?? 0,
    streak: stats?.streak ?? 0,
    rank: stats?.ranking ?? "0"
  };

  // SVG calculations
  const radius = 50;
  const circumference = 2 * Math.PI * radius;
  const progress = Math.min((Math.max(safeStats.total, 1) / 500) * 100, 100); 
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#f4f1e1] text-[#1a2e25] font-sans selection:bg-[#d9531e] selection:text-white pb-16 bg-[linear-gradient(to_right,#1a2e2508_1px,transparent_1px),linear-gradient(to_bottom,#1a2e2508_1px,transparent_1px)] bg-[size:3rem_3rem]">
      
      {/* Minimal Navbar */}
      <nav className="sticky top-0 z-[100] border-b border-[#1a2e25]/10 bg-[#f4f1e1]/80 backdrop-blur-md">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#d9531e] rounded-full animate-pulse" />
            <span className="font-black text-[10px] sm:text-xs tracking-widest uppercase font-mono text-[#1a2e25]">LeetOtracker</span>
          </div>
          <div className="flex items-center gap-6">
             <span className="text-[10px] font-bold text-[#1a2e25]/60 uppercase tracking-widest font-mono hidden sm:block">
               {user?.name}
             </span>
             <button 
                onClick={() => { setLoggingOut(true); axios.post("/api/auth/logout").then(() => window.location.href = "/"); }}
                className="text-[10px] font-bold text-[#1a2e25] hover:text-[#d9531e] transition-colors uppercase tracking-widest font-mono"
             >
                {loggingOut ? "Logging out..." : "Logout"}
             </button>
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-6 pt-10 sm:pt-16">
        
        {/* Header & Notification (Cardless) */}
        <div className="mb-10 sm:mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div>
              <p className="text-[#1a2e25]/50 text-[10px] font-bold uppercase tracking-[0.3em] font-mono mb-2">
                Performance Dashboard
              </p>
              <h1 className="text-4xl sm:text-6xl font-serif font-black tracking-tighter uppercase leading-[0.85]">
                Workspace.
              </h1>
            </div>
            
            <button 
                onClick={handleSync}
                disabled={syncing}
                className="group flex items-center justify-center gap-2 bg-[#1a2e25] text-[#f4f1e1] px-6 py-3.5 font-bold text-[10px] uppercase tracking-widest hover:bg-[#d9531e] transition-colors disabled:opacity-50 font-mono w-full md:w-auto"
            >
                <svg className={`w-3.5 h-3.5 ${syncing ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {syncing ? "Syncing..." : "Sync Leetcode"}
            </button>
          </div>

          {/* Clean Inline Notification */}
          <div className="flex items-start gap-4 border-l-2 border-[#d9531e] pl-4 max-w-2xl py-1">
            <svg className="w-5 h-5 text-[#d9531e] shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-sm text-[#1a2e25]/80 leading-relaxed font-medium">
              Your diagnostic insights are sent to your inbox weekly. You can evaluate your performance and conduct mock interviews anytime using our context-aware <strong>LeetX Agent</strong>.
            </p>
          </div>
        </div>

        {/* Clean KPI Numbers */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 sm:gap-12 py-10 border-y border-[#1a2e25]/10">
            <div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#1a2e25]/50 mb-2 font-mono">
                    Current Streak
                </p>
                <p className="text-4xl sm:text-5xl font-black font-serif text-[#d9531e]">{safeStats.streak}</p>
            </div>

            <div>
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#1a2e25]/50 mb-2 font-mono">
                    Global Rank
                </p>
                <p className="text-3xl sm:text-4xl font-black font-serif text-[#1a2e25] mt-1">#{safeStats.rank}</p>
            </div>

            <div className="col-span-2 sm:col-span-1">
                <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] text-[#1a2e25]/50 mb-2 font-mono">
                    Total Solved
                </p>
                <p className="text-4xl sm:text-5xl font-black font-serif text-[#1a2e25]">{safeStats.total}</p>
            </div>
        </div>

        {/* 2-Column Minimal Data Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20 pt-12">
          
          {/* Logic Breakdown Section */}
          <div className="flex flex-col">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1a2e25] mb-8 font-mono border-b border-[#1a2e25]/10 pb-3">
              Logic Breakdown
            </h2>
            
            <div className="flex flex-col sm:flex-row items-center gap-10">
                <div className="relative flex items-center justify-center shrink-0">
                    <svg className="w-32 h-32 transform -rotate-90">
                        <circle cx="64" cy="64" r={radius} stroke="#1a2e25" strokeOpacity="0.05" strokeWidth="6" fill="transparent" />
                        <circle 
                          cx="64" cy="64" r={radius} 
                          stroke="#d9531e" 
                          strokeWidth="6" 
                          fill="transparent" 
                          strokeDasharray={circumference} 
                          style={{ strokeDashoffset: offset, transition: 'stroke-dashoffset 1.5s ease-out' }} 
                          strokeLinecap="round"
                        />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center pt-1">
                        <span className="text-3xl font-serif font-black text-[#1a2e25]">{safeStats.total}</span>
                        <span className="text-[9px] font-bold text-[#1a2e25]/50 uppercase tracking-widest font-mono">Solved</span>
                    </div>
                </div>

                <div className="flex-1 w-full space-y-5 font-mono">
                    {[
                        { label: "EASY", val: safeStats.easy, color: "bg-emerald-500", pct: (safeStats.easy/Math.max(safeStats.total, 1))*100 },
                        { label: "MEDIUM", val: safeStats.medium, color: "bg-amber-500", pct: (safeStats.medium/Math.max(safeStats.total, 1))*100 },
                        { label: "HARD", val: safeStats.hard, color: "bg-red-500", pct: (safeStats.hard/Math.max(safeStats.total, 1))*100 },
                    ].map((item, i) => (
                        <div key={i}>
                            <div className="flex justify-between text-[10px] font-bold mb-2 uppercase tracking-widest text-[#1a2e25]/70">
                                <span>{item.label}</span>
                                <span>{item.val}</span>
                            </div>
                            <div className="h-1.5 w-full bg-[#1a2e25]/5 rounded-full overflow-hidden">
                                <div className={`h-full ${item.color} rounded-full transition-all duration-700`} style={{ width: `${item.pct || 0}%` }} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </div>

          {/* Activity Log Section */}
          <div className="flex flex-col">
            <h2 className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#1a2e25] mb-6 font-mono border-b border-[#1a2e25]/10 pb-3">
              Activity Log
            </h2>
            
            <div className="flex-1 flex flex-col">
              {stats?.recentProblems && stats.recentProblems.length > 0 ? (
                <div className="space-y-1">
                  {stats.recentProblems.slice(0, 5).map((p, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-[#1a2e25]/5 hover:bg-[#1a2e25]/5 transition-colors px-2 rounded-md">
                      <div className="flex flex-col gap-1 truncate pr-4">
                        <span className="text-sm font-semibold tracking-tight text-[#1a2e25] truncate">{p.title}</span>
                        <span className="text-[9px] text-[#1a2e25]/50 font-bold uppercase tracking-widest font-mono">
                          {new Date(p.solvedAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                      </div>
                      <div className={`text-[9px] font-bold uppercase tracking-widest font-mono shrink-0 ${
                        p.difficulty === 'Easy' ? 'text-emerald-600' :
                        p.difficulty === 'Medium' ? 'text-amber-600' : 'text-red-600'
                      }`}>
                        {p.difficulty}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center py-10">
                  <p className="text-[10px] text-[#1a2e25]/40 uppercase tracking-widest font-bold font-mono text-center">
                    No recent submissions<br/>detected.
                  </p>
                </div>
              )}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}