"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { signOut } from "next-auth/react";

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    axios.get("/api/leetcode-stats").then((res) => {
      if (res.data.success) {
        setStats(res.data.data);
      }
    });
  }, []);

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  if (!stats)
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-3xl font-bold text-gray-700">
          Loading Dashboard...
        </div>
      </div>
    );

  const total = stats.easy + stats.medium + stats.hard;

  const easyPercent = (stats.easy / total) * 100;
  const mediumPercent = (stats.medium / total) * 100;
  const hardPercent = (stats.hard / total) * 100;

  const radius = 90;
  const circumference = 2 * Math.PI * radius;

  const easyStroke = (easyPercent / 100) * circumference;
  const mediumStroke = (mediumPercent / 100) * circumference;
  const hardStroke = (hardPercent / 100) * circumference;

  return (
    <div className="min-h-screen bg-[#f5f7fa] px-6 sm:px-14 py-14 relative">

      <button
        onClick={handleLogout}
        className="absolute top-10 right-10 bg-red-500 hover:bg-red-600 
                   text-white px-6 py-3 rounded-xl font-semibold shadow-md transition"
      >
        Logout
      </button>

      
      <div className="text-center mb-16">
        <h1 className="text-5xl sm:text-6xl font-extrabold text-gray-900 tracking-tight">
          <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            LeetOtracker
          </span>{" "}
          Dashboard
        </h1>

        <p className="text-2xl font-semibold text-gray-700 mt-6">
          Welcome,{" "}
          <span className="text-gray-900 font-bold">
            {stats.username}
          </span>
        </p>

        
        <p className="text-xl mt-4 font-medium text-gray-500">
          Global Rank:{" "}
          <span className="text-indigo-600 font-bold">
            {stats.ranking}
          </span>
        </p>
      </div>

      
      <div className="bg-white rounded-3xl shadow-xl p-14 flex flex-col items-center justify-center">

        <div className="relative w-72 h-72 mb-12">

          <svg
            className="w-full h-full rotate-[-90deg]"
            viewBox="0 0 240 240"
          >
            <circle
              cx="120"
              cy="120"
              r={radius}
              stroke="#e5e7eb"
              strokeWidth="20"
              fill="none"
            />

            <circle
              cx="120"
              cy="120"
              r={radius}
              stroke="#22c55e"
              strokeWidth="20"
              fill="none"
              strokeDasharray={`${easyStroke} ${circumference}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />

            <circle
              cx="120"
              cy="120"
              r={radius}
              stroke="#facc15"
              strokeWidth="20"
              fill="none"
              strokeDasharray={`${mediumStroke} ${circumference}`}
              strokeDashoffset={-easyStroke}
              strokeLinecap="round"
              className="transition-all duration-1000 delay-200"
            />

            <circle
              cx="120"
              cy="120"
              r={radius}
              stroke="#ef4444"
              strokeWidth="20"
              fill="none"
              strokeDasharray={`${hardStroke} ${circumference}`}
              strokeDashoffset={-(easyStroke + mediumStroke)}
              strokeLinecap="round"
              className="transition-all duration-1000 delay-300"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-5xl font-extrabold text-gray-900">
              {stats.totalSolved}
            </span>
            <span className="text-gray-500 text-lg mt-2 font-medium">
              Total Solved
            </span>
          </div>
        </div>

        {/* Difficulty Labels */}
        <div className="flex gap-16 text-2xl font-bold mb-10">
          <span className="text-green-600">
            Easy: {stats.easy}
          </span>
          <span className="text-yellow-500">
            Medium: {stats.medium}
          </span>
          <span className="text-red-500">
            Hard: {stats.hard}
          </span>
        </div>

        {/* Streak */}
        <div className="text-3xl font-semibold text-gray-700">
          🔥{" "}
          <span className="text-indigo-600 font-bold">
            {stats.streak || 0}
          </span>{" "}
          day streak
        </div>

      </div>

    </div>
  );
}
