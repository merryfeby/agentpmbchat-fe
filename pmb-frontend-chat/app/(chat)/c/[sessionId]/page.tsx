"use client"

import { useState, useRef, useEffect } from "react"
import { BotMessageSquare, UserCircle, Copy, Check, ArrowUp, Loader2 } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { chatService } from "@/lib/api"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"
import Cookies from "js-cookie"

interface Message {
  id: number
  role: "user" | "bot"
  content: string
  timestamp: string
}

export default function ChatPage() {
  const params = useParams()
  const router = useRouter()
  const sessionId = params.sessionId as string

  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState<string>("")
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const hasInitialized = useRef(false)
  

  useEffect(() => {
    if (typeof window === "undefined" || hasInitialized.current) return
    hasInitialized.current = true 

    const storedMessage = sessionStorage.getItem("pending_msg");
    const token = Cookies.get("user_token")

    if (storedMessage) {
      handleSendMessage(storedMessage)
      sessionStorage.removeItem("pending_msg")
    } else {
      if (!token) {
        router.replace("/")
        return
      }
      const loadHistory = async () => {
        try {
          setIsLoading(true)
          const pastMessages = await chatService.getHistory(sessionId)
          
          if (pastMessages && pastMessages.length > 0) {
            setMessages(pastMessages)
          }
        } catch (error) {
          console.error("Gagal menarik riwayat obrolan:", error)
          router.replace("/")
        } finally {
          setIsLoading(false)
        }
      }

      loadHistory()
    }
  }, [sessionId, router])
  
  
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, isLoading])

  const handleSendMessage = async (promptText?: string) => {
    const textToSend = typeof promptText === "string" ? promptText : input
    if (!textToSend.trim() || isLoading) return

    const newUserMsg: Message = {
      id: Date.now(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages((prev) => [...prev, newUserMsg])
    setInput("")
    setIsLoading(true)

    try {
      const data = await chatService.sendMessage(sessionId, textToSend)
      
      const botResponse: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: data.reply,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, botResponse])

    } catch (error: any) {
      console.error("Chat Error:", error)
      const errorResponse: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: `Maaf, terjadi kendala saat memproses pesan: ${error.message}`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages((prev) => [...prev, errorResponse])
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="flex-1 flex flex-col relative h-full bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-yellow-950/40 to-amber-950/60 z-0 pointer-events-none"></div>

      <div className="flex-1 flex flex-col z-10 overflow-hidden">
        
        <div className="flex-1 overflow-y-auto p-6 hide-scrollbar">
          <div className="max-w-4xl mx-auto space-y-8">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex gap-4 ${msg.role === "user" ? "justify-end" : ""}`}>
                
                {msg.role === "bot" && (
                  <div className="shrink-0 mt-1">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-xl shadow-yellow-500/30">
                      <BotMessageSquare className="w-5 h-5 text-gray-950" strokeWidth={2.5} />
                    </div>
                  </div>
                )}

                <div className={`max-w-[75%] group`}>
                  <div className={`relative px-6 py-4 text-[15.2px] leading-relaxed shadow-xl break-words
                    ${msg.role === "bot"
                      ? "bg-gray-900 border border-gray-700 text-gray-100 rounded-3xl rounded-tl-none"
                      : "bg-slate-700 text-white rounded-3xl rounded-tr-none whitespace-pre-wrap"
                    }`}
                  >
                    {msg.role === "bot" ? (
                      <ReactMarkdown 
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeRaw, rehypeKatex]}
                        components={{
                          strong: ({node, ...props}) => <strong className="font-bold text-yellow-400" {...props} />,
                          p: ({node, ...props}) => <p className="mb-3 last:mb-0 [&:not(:first-child)]:mt-3" {...props} />,
                          h1: ({node, ...props}) => <h1 className="text-xl font-bold mt-5 mb-2 text-yellow-500" {...props} />,
                          h2: ({node, ...props}) => <h2 className="text-lg font-bold mt-4 mb-2 text-yellow-500" {...props} />,
                          h3: ({node, ...props}) => <h3 className="text-base font-bold mt-4 mb-2 text-yellow-500" {...props} />,
                          ul: ({node, ...props}) => <ul className="list-disc ml-5 mb-4 mt-2 space-y-1" {...props} />,
                          ol: ({node, ...props}) => <ol className="list-decimal ml-5 mb-4 mt-2 space-y-1" {...props} />,
                          li: ({node, ...props}) => <li className="pl-1 [&>p]:mb-0 [&>p]:mt-0" {...props} />,
                          hr: ({node, ...props}) => <hr className="my-4 border-gray-700" {...props} />
                        }}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    ) : (
                      <>{msg.content}</>
                    )}
                  </div>

                  <div className={`flex items-center gap-3 mt-2 px-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                    <p className="text-[11px] text-gray-500">{msg.timestamp}</p>
                    {msg.role === "bot" && (
                      <button
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="text-gray-500 hover:text-yellow-400 transition-colors cursor-pointer"
                      >
                        {copiedId === msg.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    )}
                  </div>
                </div>

                {msg.role === "user" && (
                  <div className="shrink-0 mt-1">
                    <div className="w-9 h-9 bg-slate-600 rounded-xl flex items-center justify-center border border-slate-500">
                      <UserCircle className="w-5 h-5 text-white" strokeWidth={2} />
                    </div>
                  </div>
                )}
              </div>
            ))}
            
            {isLoading && (
               <div className="flex gap-4">
                 <div className="shrink-0 mt-1">
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-xl shadow-yellow-500/30">
                      <BotMessageSquare className="w-5 h-5 text-gray-950" strokeWidth={2.5} />
                    </div>
                  </div>
                  <div className="bg-gray-900 border border-gray-700 text-gray-100 rounded-3xl rounded-tl-none px-6 py-4 flex items-center shadow-xl">
                    <Loader2 className="w-5 h-5 animate-spin text-yellow-500" />
                    <span className="ml-3 text-sm text-gray-400">Sedang memproses respons...</span>
                  </div>
               </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="p-4 shrink-0 z-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/90 backdrop-blur-2xl border border-gray-700 focus-within:border-yellow-400 rounded-3xl p-1.5 shadow-2xl transition-colors">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  maxLength={500}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Ketik pesan lanjutan..."
                  disabled={isLoading}
                  className="flex-1 bg-transparent text-gray-100 py-4 px-4 outline-none text-sm placeholder:text-gray-500 resize-none max-h-24 hide-scrollbar disabled:opacity-50"
                  rows={1}
                />
                
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isLoading}
                  className="p-3 bg-transparent border border-gray-600 hover:border-yellow-400 text-white disabled:text-gray-600 disabled:border-gray-800 rounded-2xl transition-all hover:bg-white/10 active:scale-95 cursor-pointer z-30 relative mb-0.5 mr-0.5"
                >
                  <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
            <p className="text-center text-[10px] text-gray-500 mt-3 tracking-wide">
              PMB Assistant • Informasi penting harap diverifikasi di website resmi ISTTS
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}