"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { BotMessageSquare } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleRegister = async () => {
    try {
      console.log("Google register");
      // TODO: Implement Google OAuth
    } catch (err) {
      setError("Failed to register with Google");
    }
  };

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Registration failed");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);
      router.push("/chat");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a0a0a] p-4 relative overflow-hidden">
      
      {/* Background Gradient Kuning (sama seperti login) */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-yellow-950/40 to-amber-950/60 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 via-transparent to-transparent z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-500/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="w-full max-w-md relative z-10">


        {/* Register Card */}
        <div className="bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl p-8">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-white">Create Account</h2>
            <p className="text-gray-400 mt-1">Join us to get personalized assistance</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 rounded-2xl p-4 mb-6 text-sm">
              {error}
            </div>
          )}

          {/* Google Register */}
          <button
            onClick={handleGoogleRegister}
            className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-4 rounded-2xl transition flex items-center justify-center gap-3 mb-6"
          >
            <FcGoogle className="text-2xl" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px bg-gray-800"></div>
            <span className="text-sm text-gray-500 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-800"></div>
          </div>

          {/* Email Register Form */}
          <form onSubmit={handleEmailRegister} className="space-y-5">
            
            <div>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  required
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-yellow-400 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-yellow-400 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  minLength={8}
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-2xl py-3.5 pl-12 pr-14 focus:outline-none focus:border-yellow-400 placeholder:text-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>

            <div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none focus:border-yellow-400 placeholder:text-gray-500"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-950 font-semibold py-4 rounded-2xl transition-all disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          {/* Login Link */}
          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{" "}
            <Link href="/login" className="text-yellow-400 hover:text-yellow-300 font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}