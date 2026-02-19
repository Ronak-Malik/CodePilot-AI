"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  
  useEffect(() => {
    if (status === "loading") return;

    if (session?.user) {
      if (session.user.isProfileCompleted) {
        router.push("/dashboard");
      } else {
        router.push("/profile-complete");
      }
    }
  }, [session, status, router]);

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 flex flex-col">

      
      <section className="flex flex-col items-center justify-center flex-1 px-6 text-center">

        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight mb-6">
          <span className="bg-gradient-to-r from-indigo-600 to-blue-500 bg-clip-text text-transparent">
            LeetOtracker
          </span>
        </h1>

        <p className="text-xl text-gray-600 max-w-2xl leading-relaxed mb-8">
          Track your LeetCode performance, receive weekly progress reports,
          get personalized revision plans, and boost your problem-solving
          consistency 🚀
        </p>

        <button
          onClick={() => signIn("google")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-xl 
                     text-lg font-semibold shadow-lg hover:shadow-xl 
                     transition duration-300 flex items-center gap-3"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5 bg-white rounded-full"
          />
          Continue with Google
        </button>

        <p className="text-sm text-gray-500 mt-4">
          Free to use • No spam • Productivity focused
        </p>

      </section>

     
      <section className="bg-white py-20 px-6">

        <div className="max-w-6xl mx-auto text-center mb-14">
          <h2 className="text-4xl font-bold mb-4">
            What We Do For You
          </h2>
          <p className="text-gray-600 text-lg">
            Designed for serious coders who want structured improvement.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="bg-[#f1f5f9] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">
              📊 Performance Tracking
            </h3>
            <p className="text-gray-600">
              Track Easy, Medium, Hard breakdown, ranking, streaks, and
              total solved problems in one beautiful dashboard.
            </p>
          </div>

          <div className="bg-[#f1f5f9] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">
              📬 Weekly Email Reports
            </h3>
            <p className="text-gray-600">
              Get automated weekly performance summaries directly to your
              inbox with insights and improvement suggestions.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-[#f1f5f9] p-8 rounded-2xl shadow-sm hover:shadow-md transition">
            <h3 className="text-xl font-semibold mb-3">
              🧠 Smart Revision Plans
            </h3>
            <p className="text-gray-600">
              Receive structured revision plans based on your weak areas
              to improve faster and stay consistent.
            </p>
          </div>

        </div>

      </section>

     
      <footer className="text-center py-6 text-gray-500 text-sm">
        © {new Date().getFullYear()} LeetOtracker • Built for ambitious developers 🚀
      </footer>

    </div>
  );
}
