"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function HomePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await axios.get("/api/auth/me");
      if (response.data?.success) router.push("/dashboard");
    } catch (e) {
      /* Stay */
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      title: "Automated Data Pipeline",
      subtitle: "Powered by n8n & GraphQL",
      desc: "No manual entry. Submit your LeetCode username once, and our n8n workflows automatically fetch your latest statistics, submission history, and acceptance rates directly via LeetCode's GraphQL APIs.",
      icon: "⚡"
    },
    {
      title: "Multi-Agent Architecture",
      subtitle: "Built on LangGraph",
      desc: "Generic LLMs give generic advice. LeetX utilizes a LangGraph-powered Multi-Agent system (Supervisor, Interview, and Revision agents) to orchestrate personalized responses based on your actual coding context.",
      icon: "🤖"
    },
    {
      title: "Weekly AI Diagnostics",
      subtitle: "Inbox-Delivered Insights",
      desc: "Every week, receive a highly structured breakdown of your performance. We identify weak topics, track your easy/medium/hard distribution, and generate a surgical revision plan to fix your specific skill gaps.",
      icon: "📊"
    }
  ];

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f4f1e1]">
        <div className="h-6 w-6 border-4 border-[#1a2e25] border-t-transparent rounded-full animate-spin" />
      </div>
    );

  return (
    <div className="min-h-screen bg-[#f4f1e1] text-[#1a2e25] font-sans selection:bg-[#d9531e] selection:text-white overflow-x-hidden flex flex-col">
      
      {/* Navigation */}
      <nav className="w-full border-b-2 border-[#1a2e25] px-6 py-4 flex items-center justify-between bg-[#f4f1e1] sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <div className="text-3xl font-black">{'</>'}</div>
          <div className="flex flex-col">
            <span className="font-serif font-black text-xl leading-none text-[#1a2e25] uppercase">LeetOtracker</span>
            <span className="text-[9px] font-bold tracking-widest text-zinc-500 uppercase font-mono">Dev Tool / Est. 2024</span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-[11px] font-bold tracking-[0.15em] uppercase text-[#1a2e25] font-mono">
          <a href="#features" className="hover:text-[#d9531e] cursor-pointer transition-colors">Features</a>
          <a href="#architecture" className="hover:text-[#d9531e] cursor-pointer transition-colors">Architecture</a>
          <a href="#agents" className="hover:text-[#d9531e] cursor-pointer transition-colors">LeetX Agents</a>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.push("/login")} 
            className="hidden sm:block text-[#1a2e25] text-[10px] font-bold uppercase tracking-widest font-mono hover:text-[#d9531e] transition-colors"
          >
            SignIn
          </button>
          <button 
            onClick={() => router.push("/signup")} 
            className="bg-[#1a2e25] text-[#f4f1e1] text-[10px] font-bold uppercase tracking-widest font-mono px-6 py-3 shadow-[4px_4px_0px_0px_#d9531e] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_#d9531e] transition-all"
          >
            SingUp →
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between max-w-7xl mx-auto px-6 py-16 lg:py-24 w-full gap-16">
        
        {/* Left Side Content */}
        <div className="w-full lg:w-1/2 flex flex-col items-start z-10">
          <div className="inline-block px-3 py-1 mb-6 border-2 border-[#1a2e25] text-[#1a2e25] text-[10px] font-bold tracking-[0.2em] uppercase font-mono bg-white">
            v1.0 • Multi-Agent Release
          </div>
          
          <h1 className="text-[3.5rem] sm:text-[4.5rem] lg:text-[5.5rem] font-serif font-black leading-[0.85] tracking-tight text-[#1a2e25] mb-8 uppercase">
            Outsmart <br />
            <span className="text-[#d9531e] font-normal italic lowercase text-[3.5rem] sm:text-[4.5rem]">the</span> <br />
            Algorithm.
          </h1>
          
          <p className="text-[#1a2e25]/80 text-base sm:text-lg max-w-md font-medium leading-relaxed mb-10 border-l-4 border-[#d9531e] pl-4">
            A full-stack developer growth platform. We automatically track your LeetCode activity and provide personalized interview prep through <strong>LeetX</strong>—a context-aware, multi-agent AI mentor that actually knows how you code.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 w-full sm:w-auto font-mono">
            <button 
              onClick={() => router.push("/signup")} 
              className="bg-[#d9531e] text-white px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] shadow-[4px_4px_0px_0px_#1a2e25] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[2px_2px_0px_0px_#1a2e25] transition-all"
            >
              Start Tracking Now
            </button>
            <a 
              href="#architecture"
              className="px-8 py-4 text-[11px] font-bold uppercase tracking-[0.2em] border-2 border-[#1a2e25] hover:bg-[#1a2e25] hover:text-[#f4f1e1] transition-all text-center"
            >
              Read the Docs ↓
            </a>
          </div>
        </div>

        {/* Right Side Cover Art (Updated to show app functionality) */}
        <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative perspective-1000">
          <div className="relative w-full max-w-[440px] aspect-[3/4] bg-[#f4f1e1] border-[12px] border-[#1a2e25] shadow-[20px_20px_0px_rgba(217,83,30,1)] p-8 flex flex-col justify-between overflow-hidden">
            
            {/* Textbook Header */}
            <div className="relative z-10 text-left border-b-4 border-[#1a2e25] pb-4">
              <p className="font-mono text-xs font-bold uppercase tracking-widest text-[#d9531e] mb-2">Volume 01 / Features</p>
              <h2 className="text-[#1a2e25] font-serif font-black text-4xl sm:text-5xl uppercase leading-[0.9]">
                System<br/>Specs.
              </h2>
            </div>

            {/* Functionality List */}
            <div className="relative z-10 flex-grow flex flex-col justify-center my-6 gap-5">
              <div className="border-l-4 border-[#d9531e] pl-4">
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#1a2e25] mb-1">01. Automated Ingestion</h3>
                <p className="text-xs text-[#1a2e25]/80 font-medium">Syncs LeetCode submissions & stats via GraphQL & n8n without manual entry.</p>
              </div>
              <div className="border-l-4 border-[#1a2e25] pl-4">
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#1a2e25] mb-1">02. Multi-Agent AI</h3>
                <p className="text-xs text-[#1a2e25]/80 font-medium">LangGraph routes queries to specialized Interview & Revision agents tailored to you.</p>
              </div>
              <div className="border-l-4 border-[#d9531e] pl-4">
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#1a2e25] mb-1">03. Weekly Diagnostics</h3>
                <p className="text-xs text-[#1a2e25]/80 font-medium">Delivers precise breakdowns of weak topics and algorithm patterns to your inbox.</p>
              </div>
              <div className="border-l-4 border-[#1a2e25] pl-4">
                <h3 className="font-mono text-[11px] font-bold uppercase tracking-widest text-[#1a2e25] mb-1">04. Surgical Revision</h3>
                <p className="text-xs text-[#1a2e25]/80 font-medium">Generates custom study plans based on actual drop-off rates and historical data.</p>
              </div>
            </div>

            {/* Textbook Footer */}
            <div className="relative z-10 pt-4 flex justify-between items-end border-t-2 border-[#1a2e25]/20">
              <div className="font-mono text-[9px] uppercase tracking-widest text-[#1a2e25]">
                <strong>Dependencies:</strong><br/>
                Next.js, FastAPI, Groq
              </div>
              <div className="text-4xl font-serif font-black text-[#d9531e]">
                '24
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: The Problem vs Solution */}
      <section className="w-full border-y-2 border-[#1a2e25] bg-[#1a2e25] text-[#f4f1e1] py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <h2 className="font-serif text-4xl lg:text-5xl font-black uppercase leading-tight mb-6 text-[#d9531e]">
              Generic LLMs <br/><span className="text-[#f4f1e1]">Don't Know You.</span>
            </h2>
            <p className="text-lg font-medium text-[#f4f1e1]/80 leading-relaxed">
              Standard AI chatbots provide broad, generic advice. They don't know your acceptance rate, your weak topics, or how many hard problems you've actually solved. <strong className="text-white">LeetX changes the game.</strong>
            </p>
          </div>
          <div className="md:w-1/2 bg-[#f4f1e1] text-[#1a2e25] p-8 border-4 border-[#d9531e] font-mono text-sm relative">
            <div className="absolute top-0 right-0 bg-[#d9531e] text-white text-[10px] px-3 py-1 font-bold uppercase tracking-widest">Context Engine Active</div>
            <p className="mb-4"><strong>{"{>}"} User:</strong> "How do I get better at dynamic programming?"</p>
            <p className="text-zinc-500 mb-4"><strong>{"{>}"} ChatGPT:</strong> "Practice solving subproblems..." (Generic)</p>
            <hr className="border-[#1a2e25]/20 my-4" />
            <p className="text-[#d9531e] font-bold"><strong>{"{>}"} LeetX Agent:</strong></p>
            <p className="mt-2 text-sm leading-relaxed">"I see you've solved 45 DP problems, but your acceptance rate on 'Knapsack' patterns is only 22%. Your weakness isn't DP as a whole; it's state transition logic. Let's do a mock interview focusing on 1D state optimization..."</p>
          </div>
        </div>
      </section>

      {/* Section: Features Cards */}
      <section id="features" className="py-24 px-6 max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-black uppercase text-[#1a2e25] mb-4">Core Infrastructure</h2>
          <p className="font-mono text-sm uppercase tracking-widest text-[#d9531e]">Built for serious engineers</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <div key={i} className="group border-4 border-[#1a2e25] bg-white p-8 hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_#1a2e25] transition-all duration-300 flex flex-col">
              <div className="text-4xl mb-6">{f.icon}</div>
              <h3 className="font-serif font-black text-2xl uppercase leading-none mb-2">{f.title}</h3>
              <p className="font-mono text-[10px] text-[#d9531e] font-bold uppercase tracking-widest mb-4 pb-4 border-b-2 border-[#1a2e25]/10">{f.subtitle}</p>
              <p className="text-[#1a2e25]/80 text-sm font-medium leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Section: How It Works (Architecture Pipeline) */}
      <section id="architecture" className="py-24 px-6 w-full border-t-2 border-[#1a2e25] bg-[linear-gradient(to_right,#1a2e25_1px,transparent_1px),linear-gradient(to_bottom,#1a2e25_1px,transparent_1px)] bg-[size:4rem_4rem] [background-position:center]">
        <div className="max-w-4xl mx-auto bg-[#f4f1e1] border-4 border-[#1a2e25] p-8 md:p-12 shadow-[16px_16px_0px_0px_#d9531e]">
          <h2 className="text-3xl md:text-4xl font-serif font-black uppercase mb-8 border-b-4 border-[#1a2e25] pb-4 inline-block">System Flow</h2>
          
          <div className="space-y-8 font-mono">
            {/* Step 1 */}
            <div className="flex gap-6">
              <div className="w-12 h-12 shrink-0 bg-[#1a2e25] text-white flex items-center justify-center font-bold text-xl border-2 border-[#d9531e]">01</div>
              <div>
                <h4 className="font-bold text-lg uppercase mb-2">Ingestion</h4>
                <p className="text-sm text-zinc-700">User submits LeetCode handle. FastAPI backend connects via GraphQL to pull lifetime statistics, topics, and submission logs into MongoDB.</p>
              </div>
            </div>
            {/* Step 2 */}
            <div className="flex gap-6">
              <div className="w-12 h-12 shrink-0 bg-[#1a2e25] text-white flex items-center justify-center font-bold text-xl border-2 border-[#d9531e]">02</div>
              <div>
                <h4 className="font-bold text-lg uppercase mb-2">n8n Automation</h4>
                <p className="text-sm text-zinc-700">Scheduled chron jobs trigger n8n workflows weekly. The system compares current vs historical data to compute momentum and skill drop-offs.</p>
              </div>
            </div>
            {/* Step 3 */}
            <div className="flex gap-6">
              <div className="w-12 h-12 shrink-0 bg-[#d9531e] text-white flex items-center justify-center font-bold text-xl border-2 border-[#1a2e25]">03</div>
              <div>
                <h4 className="font-bold text-lg uppercase mb-2">LangGraph Routing</h4>
                <p className="text-sm text-zinc-700">User queries are intercepted by the Supervisor Agent, which reads the database context and routes the query to either the Interview Agent or Revision Agent.</p>
              </div>
            </div>
            {/* Step 4 */}
            <div className="flex gap-6">
              <div className="w-12 h-12 shrink-0 bg-[#d9531e] text-white flex items-center justify-center font-bold text-xl border-2 border-[#1a2e25]">04</div>
              <div>
                <h4 className="font-bold text-lg uppercase mb-2">Personalized Output</h4>
                <p className="text-sm text-zinc-700">Groq (LLaMA 3) synthesizes the agent's instructions with the user's explicit coding history to generate a highly specific, actionable study plan or mock interview.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 text-center border-t-2 border-[#1a2e25] bg-white">
        <h2 className="text-4xl md:text-6xl font-serif font-black uppercase text-[#1a2e25] mb-6">
          Ready to Compile?
        </h2>
        <p className="font-mono text-sm uppercase tracking-widest text-zinc-500 mb-10 max-w-xl mx-auto">
          Join the platform built by developers, for developers. Get your weekly reports and meet your new AI mentor today.
        </p>
        <button 
          onClick={() => router.push("/signup")} 
          className="bg-[#1a2e25] text-[#f4f1e1] px-12 py-5 text-sm font-bold uppercase tracking-[0.2em] font-mono shadow-[6px_6px_0px_0px_#d9531e] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-[3px_3px_0px_0px_#d9531e] transition-all"
        >
          Create Workspace
        </button>
      </section>

      {/* Minimal Footer */}
      <footer className="w-full py-8 flex flex-col sm:flex-row justify-between items-center px-6 text-[10px] font-bold text-[#1a2e25] tracking-[0.2em] uppercase font-mono border-t-2 border-[#1a2e25] bg-[#f4f1e1]">
        <span>© 2024 LeetOtracker</span>
        <span className="hidden sm:inline">Made for the 1%</span>
        <span>System Status: Online</span>
      </footer>
    </div>
  );
}