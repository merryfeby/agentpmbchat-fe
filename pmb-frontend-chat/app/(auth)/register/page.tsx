"use client";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock, FiEye, FiEyeOff, FiUser, FiAtSign } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { authService } from "@/lib/api"; // Pastikan path ini benar sesuai struktur foldermu
import { useGoogleLogin } from "@react-oauth/google";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleGoogleRegister = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        setLoading(true);
        setError("");
        setSuccess("");
        
        const data = await authService.googleLogin(tokenResponse.access_token);

        Cookies.set("user_token", data.access_token, { expires: 1, path: "/" });
        if (data.name) Cookies.set("user_name", data.name, { expires: 1, path: "/" });
        if (data.email) Cookies.set("user_email", data.email, { expires: 1, path: "/" });
        if (data.avatar_url) Cookies.set("user_avatar", data.avatar_url, { expires: 1, path: "/" });
        setSuccess("Success register using your Google Account!");
        
        setTimeout(() => {
          router.push("/");
        }, 1500);

      } catch (err: any) {
        setError(err.message || "Failed to authenticate with backend");
      } finally {
        setLoading(false);
      }
    },
    onError: () => {
      setError("Google authentication failed");
    }
  });

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

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
      await authService.register({
        full_name: name,
        email: email,
        username: username,
        password: password,
        confirm_password: confirmPassword,
      });

      setSuccess("Registration successful!");
      setTimeout(() => {
        router.push("/login");
      }, 2000);

    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-[#0a0a0a] p-4 relative overflow-hidden hide-scrollbar">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-yellow-950/40 to-amber-950/60 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 via-transparent to-transparent z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-500/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="w-full max-w-[400px] relative z-10 flex flex-col">
        <div className="bg-gray-950 border border-gray-800 rounded-3xl shadow-2xl p-6">
          <div className="text-center mb-5">
            <h2 className="text-xl font-semibold text-white">Create Account</h2>
            <p className="text-gray-400 mt-1 text-xs">Join us and start your personal PMB Assistant!</p>
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

          <button onClick={() => handleGoogleRegister()} disabled={loading}
            className="w-full bg-white hover:bg-gray-100 text-black font-semibold py-3 rounded-2xl transition flex items-center justify-center gap-2 mb-4 text-sm disabled:opacity-70">
            <FcGoogle className="text-xl" />
            Continue with Google
          </button>

          <div className="flex items-center gap-4 mb-4">
            <div className="flex-1 h-px bg-gray-800"></div>
            <span className="text-xs text-gray-500 font-medium">or</span>
            <div className="flex-1 h-px bg-gray-800"></div>
          </div>

          <form onSubmit={handleEmailRegister} className="space-y-3">
            <div>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                <input type="text" value={name} placeholder="Full Name" required
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-yellow-400 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <FiAtSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                <input type="text" value={username} placeholder="Username" required
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-yellow-400 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                <input type="email"value={email} placeholder="Email address" required
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-yellow-400 placeholder:text-gray-500"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                <input type={showPassword ? "text" : "password"} value={password}
                  onChange={(e) => setPassword(e.target.value)} placeholder="Password" required minLength={8}
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-2xl py-3 pl-11 pr-12 text-sm focus:outline-none focus:border-yellow-400 placeholder:text-gray-500"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300">
                  {showPassword ? <FiEyeOff className="text-base" /> : <FiEye className="text-base" />}
                </button>
              </div>
            </div>

            <div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-base" />
                <input type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                  required
                  className="w-full bg-gray-900 border border-gray-700 text-white rounded-2xl py-3 pl-11 pr-4 text-sm focus:outline-none focus:border-yellow-400 placeholder:text-gray-500"
                />
              </div>
            </div>

            <button type="submit"disabled={loading}
              className="w-full bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-gray-950 font-semibold py-3 rounded-2xl text-sm transition-all disabled:opacity-70 mt-1">
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-5">
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