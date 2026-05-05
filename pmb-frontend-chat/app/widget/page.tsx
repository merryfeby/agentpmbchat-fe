"use client";
import React, { useState, useRef, useEffect } from "react";
import { BotMessageSquare, X, ArrowUp, Copy, Check } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

export default function PMBChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: input,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const botMessage: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: `Terima kasih atas pertanyaannya mengenai "${input}". Saya sedang memproses informasi dari database PMB ISTTS. Ada lagi yang ingin ditanyakan?`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, botMessage]);
    }, 800);
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-xl flex items-center justify-center hover:scale-110 transition-all z-50"
        >
          <BotMessageSquare className="w-7 h-7 text-gray-950" strokeWidth={2} />
        </button>
      )}

      {/* Chat Widget Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[380px] h-[580px] bg-gray-950 border border-gray-700 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-50">
          
          {/* Header */}
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
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Area - Scrollbar Hidden */}
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
                      {msg.content}
                    </div>
                    <div className="flex items-center gap-3 mt-2 px-2">
                      <span className="text-[10px] text-gray-500">{msg.timestamp}</span>
                      <button
                        onClick={() => copyToClipboard(msg.content, msg.id)}
                        className="text-gray-500 hover:text-yellow-400 transition-colors"
                      >
                        {copiedId === msg.id ? (
                          <Check className="w-4 h-4 text-green-400" />
                        ) : (
                          <Copy className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area - Padding lebih kecil */}
          <div className="p-4 pt-2 border-t border-gray-700 bg-gray-900">
            <div className="bg-gray-900/90 backdrop-blur-2xl border border-gray-700 focus-within:border-yellow-400 rounded-3xl p-1.5 shadow-xl">
              <div className="flex items-end gap-2">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ketik pertanyaan tentang PMB..."
                  className="hide-scrollbar flex-1 bg-transparent text-white py-3 px-4 outline-none text-[15px] placeholder:text-gray-500 resize-none max-h-28"
                  rows={1}
                />
                
                <button
                  onClick={handleSendMessage}
                  disabled={!input.trim()}
                  className="p-3 bg-transparent border border-gray-600 hover:border-yellow-400 text-white disabled:text-gray-500 disabled:border-gray-700 rounded-2xl transition-all hover:bg-white/10 active:scale-95"
                >
                  <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
            <p className="text-center text-[10px] text-gray-500 mt-3">
              Guest Mode • Chat tidak disimpan
            </p>
          </div>
        </div>
      )}
    </>
  );
}