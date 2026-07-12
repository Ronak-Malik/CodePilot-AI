"use client";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Markdown from "react-markdown";

// FIX: Added interface for expected message state
interface ChatMessage {
  role: string;
  content: string;
}

// FIX: Added basic type for the passed 'user' prop
export default function LeetXChat({ user }: { user: any }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  
  // FIX: Type the messages array so it's not assumed to be 'never[]'
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  
  // FIX: Added HTML element types to refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading, isOpen]);

  // Auto-resize textarea like Gemini - FIX: Added ChangeEvent type
  const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || loading || !user) return;

    const currentInput = input.trim();
    const userMessage = { role: "user", content: currentInput };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
    
    setLoading(true);

    try {
      const history = messages.map((msg) => ({
        role: msg.role === "bot" ? "assistant" : "user",
        content: msg.content,
      }));

      const response = await axios.post(
        "http://127.0.0.1:8000/chat",
        { query: currentInput, history: history },
        {
          headers: {
            "x-user-id": user.leetcodeUsername,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data?.response) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", content: response.data.response },
        ]);
      }
    } catch (error: any) { // FIX: typed catch error
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "⚠️ **System Offline.** Cannot connect to the logic core." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Close modal AND route to login
  const handleAuthenticationRedirect = () => {
    setIsOpen(false);
    router.push("/login");
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] bg-[#f4f1e1] flex flex-col h-[100dvh] animate-in fade-in duration-200">

          {/* Top Header (Fixed Height) */}
          <div className="shrink-0 w-full h-14 border-b border-[#1a2e25]/10 flex items-center justify-between px-4 sm:px-6 bg-[#f4f1e1]/80 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="text-xl">🤖</span>
              <span className="font-bold text-sm text-[#1a2e25] font-mono tracking-wide">LeetX</span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-[#1a2e25]/10 text-[#1a2e25] transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Chat Area */}
          <div className="flex-1 overflow-y-auto min-h-0 w-full px-4 sm:px-6 scroll-smooth">
            <div className="max-w-3xl mx-auto py-8 sm:py-10 flex flex-col gap-8">
              
              {/* Empty State / Greeting */}
              {!user ? (
                <div className="flex flex-col items-center justify-center pt-10 text-center">
                  <h2 className="text-3xl font-serif text-[#1a2e25] mb-4">Authentication Required</h2>
                  <p className="text-[#1a2e25]/60 mb-8 max-w-md">Please initialize your workspace to access the LeetX conversational agent.</p>
                  <button 
                    onClick={handleAuthenticationRedirect} 
                    className="px-6 py-3 bg-[#1a2e25] text-white rounded-full font-mono text-xs uppercase tracking-widest hover:bg-[#d9531e] transition-colors"
                  >
                    Authenticate
                  </button>
                </div>
              ) : messages.length === 0 ? (
                <div className="flex flex-col pt-4 sm:pt-10 px-2">
                  <h1 className="text-4xl sm:text-5xl font-serif font-medium text-[#1a2e25] mb-2">
                    Hello, {user.name?.split(' ')[0] || user.leetcodeUsername}
                  </h1>
                  <p className="text-2xl sm:text-3xl font-serif text-[#1a2e25]/40">
                    How can I help you optimize today?
                  </p>
                </div>
              ) : (
                /* Message Feed */
                messages.map((m, i) => (
                  <div key={i} className="flex gap-4 w-full animate-in fade-in slide-in-from-bottom-2 duration-300">
                    
                    {/* Avatar */}
                    <div className="shrink-0 mt-1">
                      {m.role === "user" ? (
                        <div className="w-8 h-8 rounded-full bg-[#1a2e25] text-[#f4f1e1] flex items-center justify-center text-xs font-bold font-mono uppercase">
                          {user.leetcodeUsername?.charAt(0) || "U"}
                        </div>
                      ) : (
                        <div className="w-8 h-8 rounded-full border border-[#1a2e25]/20 bg-white flex items-center justify-center text-lg">
                          🤖
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-xs text-[#1a2e25] mb-1 font-mono">
                        {m.role === "user" ? "You" : "LeetX"}
                      </div>
                      <div className={`prose prose-sm sm:prose-base max-w-none text-[#1a2e25] leading-relaxed 
                        ${m.role === "bot" ? "prose-p:leading-7 prose-pre:bg-[#1a2e25] prose-pre:text-[#f4f1e1] prose-pre:rounded-xl prose-code:text-[#d9531e] prose-strong:font-bold" : "prose-p:leading-6"}`}>
                        <Markdown>{m.content}</Markdown>
                      </div>
                    </div>
                  </div>
                ))
              )}

              {/* Loading State */}
              {loading && (
                <div className="flex gap-4 w-full animate-in fade-in">
                  <div className="shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full border border-[#1a2e25]/20 bg-white flex items-center justify-center text-lg">
                      🤖
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="font-bold text-xs text-[#1a2e25] mb-2 font-mono">LeetX</div>
                    <div className="flex gap-1.5 items-center h-6">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1a2e25]/40 animate-bounce" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1a2e25]/40 animate-bounce [animation-delay:-0.2s]" />
                      <div className="w-1.5 h-1.5 rounded-full bg-[#1a2e25]/40 animate-bounce [animation-delay:-0.4s]" />
                    </div>
                  </div>
                </div>
              )}
              
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} className="h-1" />
            </div>
          </div>

          {/* Input Container (Fixed at Bottom) */}
          <div className="shrink-0 w-full bg-gradient-to-t from-[#f4f1e1] via-[#f4f1e1] to-transparent pt-4 pb-4 sm:pb-8 px-4 sm:px-6">
            <div className="max-w-3xl mx-auto relative">
              
              <div className="relative flex items-end w-full bg-white rounded-3xl border border-[#1a2e25]/20 shadow-[0_4px_20px_-10px_rgba(26,46,37,0.1)] focus-within:shadow-[0_4px_25px_-5px_rgba(26,46,37,0.15)] focus-within:border-[#1a2e25]/40 transition-all duration-300">
                
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={handleInput}
                  // FIX: Typed the KeyDown event
                  onKeyDown={(e: React.KeyboardEvent<HTMLTextAreaElement>) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ask LeetX..."
                  className="flex-1 max-h-[200px] w-full bg-transparent resize-none outline-none py-4 pl-6 pr-14 text-sm sm:text-base text-[#1a2e25] placeholder:text-[#1a2e25]/40"
                  rows={1}
                />

                {/* Send Button */}
                <button
                  onClick={handleSendMessage}
                  disabled={loading || !input.trim()}
                  className="absolute right-2 bottom-2 w-10 h-10 flex items-center justify-center rounded-full bg-[#1a2e25] text-white hover:bg-[#d9531e] disabled:bg-[#1a2e25]/10 disabled:text-[#1a2e25]/40 transition-colors"
                >
                  <svg className="w-4 h-4 ml-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 19V5m0 0l-6 6m6-6l6 6" />
                  </svg>
                </button>
              </div>
              
              <p className="text-center text-[10px] text-[#1a2e25]/50 mt-3 font-mono">
                LeetX can make mistakes. Consider verifying important logic.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* Floating Circular Toggle Button */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 md:bottom-8 md:right-8 z-[1000]">
          <button
            onClick={() => setIsOpen(true)}
            className="group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-white border border-[#1a2e25]/20 shadow-[0_8px_30px_rgba(26,46,37,0.12)] hover:shadow-[0_8px_35px_rgba(217,83,30,0.2)] hover:border-[#d9531e]/30 hover:-translate-y-1 transition-all duration-300 relative"
          >
            <span className="text-2xl sm:text-3xl transition-transform duration-300 group-hover:scale-110">🤖</span>
          </button>
        </div>
      )}
    </>
  );
}