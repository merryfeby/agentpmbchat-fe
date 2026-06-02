"use client"

import React, { useState, useRef, useEffect } from "react"
import { BotMessageSquare, X, ArrowUp, Copy, Check, Loader2, ExternalLink } from "lucide-react"
import { chatService } from "@/lib/api"
import { v4 as uuidv4 } from "uuid"
import ReactMarkdown from "react-markdown"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"
import "katex/dist/katex.min.css"

interface Message {
  id: number
  role: "user" | "bot"
  content: string
  timestamp: string
}

export default function Widget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [sessionId, setSessionId] = useState<string>("")

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const MAIN_WEBSITE_URL = process.env.NEXT_PUBLIC_MAIN_WEBSITE_URL

  useEffect(() => {
    if (isOpen && !sessionId) {
      let savedSessionId = sessionStorage.getItem("widget_session_id")
      
      if (!savedSessionId) {
        savedSessionId = uuidv4()
        localStorage.setItem("widget_session_id", savedSessionId)

      }
      setSessionId(savedSessionId)
    }
  }, [isOpen, sessionId])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!input.trim() || isLoading || !sessionId) return

    const textToSend = input.trim()
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    }

    setMessages(prev => [...prev, userMessage])
    setInput("")
    setIsLoading(true)

    try {
      const data = await chatService.sendMessage(sessionId, textToSend)

      const botMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: data.reply || "Maaf, saya tidak bisa memproses pesan saat ini",
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      }

      setMessages(prev => [...prev, botMessage])
    } catch (error: any) {
      console.error("Widget Chat Error:", error)
      const errorMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: "Maaf, terjadi kendala koneksi. Silakan coba lagi.",
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const openMainWebsite = () => {
    window.open(MAIN_WEBSITE_URL, "_blank")
  }

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all z-50"
        >
          <BotMessageSquare className="w-7 h-7 text-gray-950" strokeWidth={2} />
        </button>
      )}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[580px] bg-gray-950 border border-gray-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50">
          <div className="bg-gray-900 border-b border-gray-700 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-xl flex items-center justify-center">
                <BotMessageSquare className="w-5 h-5 text-gray-950" />
              </div>
              <div>
                <p className="font-semibold text-white">PMB Assistant</p>
                <p className="text-xs text-gray-400">Guest Mode</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={openMainWebsite}
                className="flex items-center gap-1 text-xs px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-xl transition"
                title="Open Full Version"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Full Version
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6 hide-scrollbar">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center px-6">
                <BotMessageSquare className="w-12 h-12 text-yellow-500/70 mb-4" />
                <p className="text-white text-lg font-medium">Halo!</p>
                <p className="text-gray-400 mt-2">Ada yang bisa saya bantu seputar PMB ISTTS?</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "justify-end" : ""}`}>
                  {msg.role === "bot" && (
                    <div className="shrink-0 mt-1">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                        <BotMessageSquare className="w-4.5 h-4.5 text-gray-950" />
                      </div>
                    </div>
                  )}
                  <div className={`max-w-[80%] group`}>
                    <div className={`px-5 py-3.5 text-[15px] leading-relaxed rounded-3xl shadow-sm
                      ${msg.role === "bot"
                        ? "bg-gray-900 border border-gray-700 rounded-tl-none text-gray-100"
                        : "bg-slate-700 text-white rounded-tr-none"}`}
                    >
                      <ReactMarkdown 
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
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
                    </div>
                    <div className="flex items-center gap-3 mt-2 px-2">
                      <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
                      {msg.role === "bot" && (
                        <button
                          onClick={() => copyToClipboard(msg.content, msg.id)}
                          className="text-gray-500 hover:text-yellow-400 transition-colors"
                        >
                          {copiedId === msg.id ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex gap-3">
                <div className="shrink-0 mt-1">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center">
                    <BotMessageSquare className="w-4.5 h-4.5 text-gray-950" />
                  </div>
                </div>
                <div className="bg-gray-900 border border-gray-700 rounded-3xl rounded-tl-none px-5 py-3.5 flex items-center">
                  <Loader2 className="w-4 h-4 animate-spin text-yellow-500 mr-2" />
                  <span className="text-sm text-gray-400">Sedang memproses...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          <div className="p-4 pt-2 border-t border-gray-700 bg-gray-900">
            <div className="bg-gray-900/90 backdrop-blur-2xl border border-gray-700 focus-within:border-yellow-400 rounded-3xl p-1.5 shadow-xl">
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
                  placeholder="Ketik pertanyaan tentang PMB..."
                  className="hide-scrollbar flex-1 bg-transparent text-white py-3 px-4 outline-none text-[15px] placeholder:text-gray-500 resize-none max-h-28"
                  rows={1}
                  disabled={isLoading}
                />
                
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim() || isLoading}
                  className="p-3 bg-transparent border border-gray-600 hover:border-yellow-400 text-white disabled:text-gray-500 disabled:border-gray-700 rounded-2xl transition-all hover:bg-white/10 active:scale-95"
                >
                  <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
            <p className="text-center text-[10px] text-gray-500 mt-3">
              Guest Mode • Informasi seputar PMB ISTTS
            </p>
          </div>
        </div>
      )}
    </>
  )
}