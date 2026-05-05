"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";

export default function UserLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] text-white p-4">
      <div className="w-full max-w-md bg-[#141415] border border-gray-800 p-8 rounded-3xl shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">AI-PMB</h1>
          <p className="text-gray-400 text-sm">Welcome back! Please login to your account.</p>
        </div>

        <button className="w-full flex items-center justify-center gap-3 bg-white text-black py-3 rounded-xl font-semibold hover:bg-gray-100 transition mb-6">
          <FcGoogle className="text-2xl" />
          Continue with Google
        </button>

        <div className="flex items-center gap-4 mb-6">
          <div className="h-px bg-gray-800 flex-1"></div>
          <span className="text-gray-500 text-sm">or email</span>
          <div className="h-px bg-gray-800 flex-1"></div>
        </div>

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="Email address" 
            className="w-full bg-[#1c1c1e] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition"
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full bg-[#1c1c1e] border border-gray-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-indigo-500 transition"
          />
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition mt-2">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 mt-6">
          Don't have an account? <Link href="/register" className="text-indigo-400 hover:underline">Register here</Link>
        </p>
      </div>
    </div>
  );
}