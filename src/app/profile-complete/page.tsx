"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function CompleteProfilePage() {
  const router = useRouter();

  const [leetcodeUsername, setLeetcodeUsername] = useState("");
  const [notifyMail, setNotifyMail] = useState("");

  const [debouncedUsername, setDebouncedUsername] = useState("");
  const [usernameStatus, setUsernameStatus] = useState<
    "idle" | "checking" | "available" | "taken"
  >("idle");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // 🔥 Debounce Username
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedUsername(leetcodeUsername.trim().toLowerCase());
    }, 500);

    return () => clearTimeout(timer);
  }, [leetcodeUsername]);

  // 🔥 Check Username Unique
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

        if (res.data.success) {
          setUsernameStatus("available");
        } else {
          setUsernameStatus("taken");
        }
      } catch {
        setUsernameStatus("idle");
      }
    };

    checkUsername();
  }, [debouncedUsername]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (usernameStatus !== "available") {
      setError("Please choose a unique username.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const res = await axios.post("/api/profile-complete", {
        leetcodeUsername: debouncedUsername,
        notifyMail,
      });

      if (res.data.success) {
        setSuccess("Profile completed successfully 🎉");

        setTimeout(() => {
          router.push("/dashboard");
        }, 1200);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f5f7fa] flex items-center justify-center px-6">

      <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-10 space-y-8">

        {/* 🔥 Heading */}
        <div className="text-center space-y-3">
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            Complete Your Profile
          </h1>
          <p className="text-gray-500 text-lg">
            Connect your LeetCode journey🚀
          </p>
        </div>

        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-xl text-center">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 text-sm p-3 rounded-xl text-center">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Username */}
          <div className="space-y-2">
            <input
              type="text"
              placeholder="LeetCode username"
              value={leetcodeUsername}
              onChange={(e) => setLeetcodeUsername(e.target.value)}
              className={`w-full px-5 py-4 rounded-2xl border 
                ${usernameStatus === "available" ? "border-green-400" : ""}
                ${usernameStatus === "taken" ? "border-red-400" : ""}
                border-gray-200 text-gray-900 placeholder-gray-400 
                focus:outline-none focus:ring-2 focus:ring-indigo-500 
                focus:border-indigo-500 transition text-lg`}
              required
            />

            {usernameStatus === "checking" && (
              <p className="text-blue-500 text-sm">
                Checking availability...
              </p>
            )}

            {usernameStatus === "available" && (
              <p className="text-green-500 text-sm">
                ✓ Username available
              </p>
            )}

            {usernameStatus === "taken" && (
              <p className="text-red-500 text-sm">
                ✗ Username already taken
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Notification email"
              value={notifyMail}
              onChange={(e) => setNotifyMail(e.target.value)}
              className="w-full px-5 py-4 rounded-2xl border border-gray-200 
                         text-gray-900 placeholder-gray-400 
                         focus:outline-none focus:ring-2 focus:ring-indigo-500 
                         focus:border-indigo-500 transition text-lg"
              required
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading || usernameStatus !== "available"}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-indigo-600 to-blue-500
                       hover:from-indigo-700 hover:to-blue-600
                       text-white font-semibold text-lg transition duration-300
                       shadow-md hover:shadow-lg
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Saving..." : "Save & Continue →"}
          </button>

        </form>

        {/* ✨ Premium Touch */}
        <p className="text-center text-sm text-gray-400 pt-4">
          Your data is securely connected with LeetCode.
        </p>

      </div>
    </div>
  );
}
