"use client"

import { useEffect, useState } from "react"
import { BotMessageSquare, ArrowUp } from "lucide-react"
import { useRouter } from "next/navigation"
import { v4 as uuidv4 } from "uuid"
import Cookies from "js-cookie"

export default function WelcomePage() {
  const [input, setInput] = useState<string>("")
  const router = useRouter()

  useEffect(() => {
    if (!Cookies.get("user_token")) {
      sessionStorage.removeItem("guest_id")
    }
  }, [])

  const handleSendMessage = (promptText?: string) => {
    const textToSend = typeof promptText === "string" ? promptText : input
    if (!textToSend.trim()) return

    const uuid = uuidv4()
    
    sessionStorage.setItem("pending_msg", textToSend)
    router.push(`/c/${uuid}`)
  }

  return (
    <div className="flex-1 flex flex-col relative h-full bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-yellow-950/40 to-amber-950/60 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 via-transparent to-transparent z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-500/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="flex-1 flex flex-col z-10 overflow-hidden">
        
        <div className="flex-1 flex flex-col items-center justify-center p-4 space-y-6 text-center overflow-y-auto hide-scrollbar">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-block p-3 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 mb-1 shadow-lg shadow-yellow-500/5">
              <BotMessageSquare className="w-12 h-12 text-yellow-500" strokeWidth={1.5} />
            </div>
            
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Selamat Datang di <span className="text-transparent bg-clip-text bg-gradient-to-r text-yellow-400">PMB Assistant</span>
            </h1>
            
            <p className="text-base text-gray-400 leading-relaxed max-w-2xl mx-auto pt-2">
              Halo! Kenalin, aku agent virtual yang siap bantu kamu buat cari info soal pendaftaran di ISTTS <br />
              Tanyakan seputar pendaftaran, program studi, biaya kuliah, dan beasiswa yang tersedia <br />
              <span className="text-yellow-500/80 font-medium text-xs mt-1 block">
                *Agent ini hanya menjawab informasi seputar Penerimaan Mahasiswa Baru di ISTTS
              </span>
            </p>
          </div>
        </div>

        <div className="p-4 shrink-0 z-20">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/90 backdrop-blur-2xl border border-gray-700 focus-within:border-yellow-400 rounded-3xl p-1.5 shadow-2xl transition-colors">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault()
                      handleSendMessage()
                    }
                  }}
                  placeholder="Ketik pesan ke PMB Assistant..."
                  className="flex-1 bg-transparent text-gray-100 py-4 px-4 outline-none text-sm placeholder:text-gray-500 resize-none max-h-24 hide-scrollbar"
                  rows={1}
                />
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim()}
                  className="p-3 bg-transparent border border-gray-600 hover:border-yellow-400 text-white disabled:text-gray-600 disabled:border-gray-800 rounded-2xl transition-all hover:bg-white/5 active:scale-95 cursor-pointer shrink-0 mb-0.5 mr-0.5 relative z-30"
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