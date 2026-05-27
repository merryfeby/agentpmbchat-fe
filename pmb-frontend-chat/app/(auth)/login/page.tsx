"use client"
import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { FcGoogle } from "react-icons/fc"
import { BotMessageSquare } from "lucide-react"
import { FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi"
import Cookies from "js-cookie" 
import { authService } from "@/lib/api" 
import { useGoogleLogin } from "@react-oauth/google" 

export default function UserLoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false) 
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("") 
  const [loading, setLoading] = useState(false)

  const handleGoogleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true)
        setError("")
        setSuccess("")
        
        const data = await authService.googleLogin(tokenResponse.access_token)

        Cookies.set("user_token", data.access_token, { expires: 1, path: "/" })
        if (data.name) Cookies.set("user_name", data.name, { expires: 1, path: "/" })
        if (data.email) Cookies.set("user_email", data.email, { expires: 1, path: "/" })
        if (data.avatar_url) Cookies.set("user_avatar", data.avatar_url, { expires: 1, path: "/" })
        setSuccess("Login successful!")
        
        setTimeout(() => {
          router.push("/")
        }, 1500)

      } catch (err: any) {
        setError(err.message || "Failed to authenticate with backend")
      } finally {
        setLoading(false)
      }
    },
    onError: () => {
      setError("Google authentication failed")
    }
  })

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    setLoading(true)

    try {
      const data = await authService.login({ username: email, password })

      Cookies.set("user_token", data.access_token, { expires: 1, path: "/" })
      
      if (data.name) Cookies.set("user_name", data.name, { expires: 1, path: "/" })
      if (data.email) Cookies.set("user_email", data.email, { expires: 1, path: "/" })
      if (data.avatar_url) Cookies.set("user_avatar", data.avatar_url, { expires: 1, path: "/" })

      setSuccess("Login successful!")
      setTimeout(() => {
        router.push("/")
      }, 1000)

    } catch (err: any) {
      setError(err.message || "Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen flex items-center justify-center bg-[#0a0a0a] p-4 relative overflow-hidden hide-scrollbar">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-yellow-950/40 to-amber-950/60 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 via-transparent to-transparent z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-500/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="w-full max-w-[400px] bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl relative z-10 flex flex-col">
        <div className="bg-gray-900 border-b border-gray-800 px-6 py-6 text-center rounded-t-3xl">
          <div className="flex justify-center mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-2xl flex items-center justify-center">
              <BotMessageSquare className="w-7 h-7 text-gray-950" strokeWidth={2.5} />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-white">PMB Assistant</h1>
          <p className="text-gray-400 mt-1 text-xs">ISTTS Assistant for Penerimaan Mahasiswa Baru</p>
        </div>

        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-white text-base font-medium">Welcome back!</p>
            <p className="text-gray-400 text-xs mt-1">Sign in to continue to your account</p>
          </div>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-2xl p-3 mb-4 text-xs text-center">
              {error}
            </div>
          )}
          {success && (
            <div className="bg-green-500/10 border border-green-500 text-green-400 rounded-2xl p-3 mb-4 text-xs text-center">
              {success}
            </div>
          )}

          <form className="space-y-4" onSubmit={handleLogin}>
            <div>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-yellow-400 transition placeholder:text-gray-500 text-white"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="w-full bg-gray-900 border border-gray-700 rounded-2xl py-3 pl-11 pr-12 text-sm focus:outline-none focus:border-yellow-400 transition placeholder:text-gray-500 text-white"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <FiEyeOff className="text-base" /> : <FiEye className="text-base" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-950 py-3 rounded-2xl font-semibold transition-all mt-1 text-sm disabled:opacity-70"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <div className="flex items-center gap-4 my-5">
            <div className="h-px bg-gray-800 flex-1"></div>
            <span className="text-gray-500 text-xs">or</span>
            <div className="h-px bg-gray-800 flex-1"></div>
          </div>

          <button 
            type="button"
            onClick={() => handleGoogleLogin()}
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-white text-black py-3 rounded-2xl font-semibold hover:bg-gray-100 transition-all text-sm disabled:opacity-70"
          >
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          <p className="text-center text-xs text-gray-500 mt-5">
            Don't have an account?{" "}
            <Link href="/register" className="text-yellow-400 hover:text-yellow-300 font-medium transition">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}