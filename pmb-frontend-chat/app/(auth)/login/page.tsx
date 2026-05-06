"use client";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { BotMessageSquare } from "lucide-react";
import { FiMail, FiLock } from "react-icons/fi";

export default function UserLoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 relative overflow-hidden">
      
      {/* Background Gradient Kuning */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-yellow-950/40 to-amber-950/60 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 via-transparent to-transparent z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-500/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="w-full max-w-md bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl overflow-hidden relative z-10">
        
        {/* Header */}
        <div className="bg-gray-900 border-b border-gray-800 px-8 py-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center">
              <BotMessageSquare className="w-8 h-8 text-gray-950" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-white">PMB Assistant</h1>
          <p className="text-gray-400 mt-1">ISTTS AI Chat for Penerimaan Mahasiswa Baru</p>
        </div>

        <div className="p-8">
          <div className="text-center mb-8">
            <p className="text-white text-lg font-medium">Welcome back!</p>
            <p className="text-gray-400 text-sm mt-1">Sign in to continue to your account</p>
          </div>

          {/* Form Email & Password dengan Icon */}
          <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
            
            {/* Email Input */}
            <div>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-yellow-400 transition placeholder:text-gray-500 text-white"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
                <input 
                  type="password" 
                  placeholder="Password" 
                  className="w-full bg-gray-900 border border-gray-700 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:border-yellow-400 transition placeholder:text-gray-500 text-white"
                />
              </div>
            </div>

            <button 
              onClick={() => window.location.href = '/'}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-950 py-3.5 rounded-2xl font-semibold transition-all mt-2"
            >
              Sign In
            </button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-gray-800 flex-1"></div>
            <span className="text-gray-500 text-sm">or</span>
            <div className="h-px bg-gray-800 flex-1"></div>
          </div>

          {/* Google Button */}
          <button className="w-full flex items-center justify-center gap-3 bg-white text-black py-3.5 rounded-2xl font-semibold hover:bg-gray-100 transition-all">
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          {/* Register Link */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Don't have an account?{" "}
            <Link href="/register" className="text-yellow-400 hover:text-yellow-300 font-medium transition">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}