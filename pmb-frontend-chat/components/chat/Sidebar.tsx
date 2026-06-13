"use client"
import { useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { UserCircle, Bot, LogOut, SquarePen, Menu, X } from "lucide-react"
import Cookies from "js-cookie"
import { authService, chatService } from "@/lib/api"

export default function Sidebar() {
  const router = useRouter()
  const pathname = usePathname()

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
  const [userName, setUserName] = useState<string>("")
  const [userEmail, setUserEmail] = useState<string>("")
  const [userAvatar, setUserAvatar] = useState<string>("")
  const [history, setHistory] = useState<{ id: string, title: string }[]>([])
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const token = Cookies.get("user_token")
    if (token) {
      setIsLoggedIn(true)

      const savedName = Cookies.get("user_name")
      const savedEmail = Cookies.get("user_email")
      const savedAvatar = Cookies.get("user_avatar")

      if (savedName) setUserName(savedName)
      if (savedEmail) setUserEmail(savedEmail)

      if (savedAvatar && savedAvatar !== "null" && savedAvatar !== "undefined") {
        setUserAvatar(savedAvatar)
      } else {
        setUserAvatar(`https://api.dicebear.com/7.x/initials/svg?seed=${savedName || ""}`)
      }
    }
  }, [pathname])

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const data = await chatService.getSessions()
        if (Array.isArray(data)) {
          setHistory(data)
        } else {
          setHistory([])
        }
      } catch (error) {
        console.error("Failed to fetch chat history:", error)
      }
    }

    fetchChatHistory()
  }, [isLoggedIn, pathname])

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const startNewChat = () => {
    if (typeof window !== "undefined") {
      sessionStorage.removeItem("pending_msg")
    }
    router.push("/")
  }

  const handleLogout = () => {
    authService.logout()
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-3 left-3 z-30 p-2 rounded-lg bg-[#0a0a0a] border border-gray-800/60 text-gray-300"
        aria-label="Open sidebar"
      >
        <Menu className="w-5 h-5" />
      </button>

      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/60 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={`
          w-[260px] h-full flex flex-col bg-[#0a0a0a] border-r border-gray-800/60 p-3 shrink-0 select-none
          fixed md:static top-0 left-0 z-40
          transform transition-transform duration-200
          ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        `}
      >
        <div className="flex items-center justify-between px-2 mt-2 mb-6">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push("/")}>
            <div className="p-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
              <Bot className="w-5 h-5 text-yellow-500" strokeWidth={2.5} />
            </div>
            <span className="text-[15px] font-semibold text-gray-100 tracking-wide">PMB Assistant</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="md:hidden p-1 text-gray-500 hover:text-gray-200"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {isLoggedIn && (
          <div className="space-y-2 mb-6">
            <button
              onClick={startNewChat}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 hover:border-yellow-500/30 text-yellow-500 font-bold rounded-xl text-sm transition-all group"
            >
              <SquarePen className="w-4 h-4" strokeWidth={2.5} />
              <span>New Chat</span>
            </button>
          </div>
        )}

        {isLoggedIn ? (
          <div className="flex-1 flex flex-col overflow-hidden">
            <div className="flex items-center justify-between px-3 mb-2">
              <p className="text-sm font-semibold text-gray-500 tracking-wide mb-1">Chat History</p>
            </div>

            <div className="flex-1 overflow-y-auto space-y-0.5 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent pr-1">
              {history.map((chat) => {
                const chatUrl = `/c/${chat.id}`
                const isActive = pathname === chatUrl
                return (
                  <button
                    key={chat.id}
                    onClick={() => router.push(chatUrl)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-[13px] transition-colors truncate ${
                      isActive
                        ? "bg-gray-800/80 text-gray-200 font-medium"
                        : "text-gray-500 hover:text-gray-200 hover:bg-gray-900"
                    }`}
                  >
                    {chat.title}
                  </button>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-center p-4">
            <p className="text-sm text-gray-500 border border-gray-800/50 bg-gray-900/30 p-4 rounded-2xl">
              Sign In to view chat history
            </p>
          </div>
        )}

        <div className="pt-2 mt-2">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-between p-2 bg-transparent hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-xl transition-all group"
              title="Click to Logout"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <img src={userAvatar} alt="Avatar" className="w-8 h-8 rounded-full bg-gray-800 shrink-0 object-cover" />
                <div className="flex flex-col items-start truncate">
                  <span className="text-[13px] font-medium text-gray-200 truncate w-full text-left">{userName}</span>
                  <span className="text-[11px] text-gray-500 truncate w-full text-left">{userEmail}</span>
                </div>
              </div>
              <LogOut className="w-4 h-4 text-gray-600 group-hover:text-red-500 shrink-0 transition-colors" strokeWidth={2} />
            </button>
          ) : (
            <button
              onClick={() => router.push("/login")}
              className="w-full flex items-center justify-center gap-2 py-2.5 bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 hover:border-yellow-500/30 text-yellow-500 font-bold rounded-xl transition-all duration-300 text-sm group"
            >
              <UserCircle className="w-5 h-5" />
              <span>Sign In</span>
            </button>
          )}
        </div>
      </aside>
    </>
  )
}