"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { IoSend } from "react-icons/io5";
import { FaRobot, FaUser } from "react-icons/fa";

interface Message {
  role: "user" | "ai";
  text: string;
}

export default function ChatInterface() {
  const router = useRouter();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [userName, setUserName] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const uuid = localStorage.getItem("user_uuid");
    const name = localStorage.getItem("user_name");

    if (!uuid) {
      router.replace("/");
    } else {
      setUserName(name || "Sobat");
      setMessages([
        { role: "ai", text: `Halo ${name}! Ada yang bisa saya bantu terkait informasi kampus hari ini?` }
      ]);
    }
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userText = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userText }]);
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      
      setMessages((prev) => [...prev, { 
        role: "ai", 
        text: "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." 
      }]);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-2xl overflow-hidden sm:rounded-xl sm:h-[95vh] sm:my-[2.5vh] border border-gray-100">
      <header className="bg-indigo-600 p-4 flex items-center justify-between shadow-md z-10">
        <div className="flex items-center gap-3 text-white">
          <div className="bg-white/20 p-2 rounded-full">
            <FaRobot className="text-xl" />
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Agent PMB</h1>
            <span className="text-xs text-indigo-200 flex items-center gap-1">
              <span className="w-2 h-2 bg-green-400 rounded-full inline-block"></span> Online
            </span>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-gray-50 space-y-6">
        {messages.map((msg, index) => (
          <div key={index} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
            
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
              msg.role === "user" ? "bg-indigo-600 text-white" : "bg-white border border-gray-200 text-indigo-600"
            }`}>
              {msg.role === "user" ? <FaUser className="text-sm" /> : <FaRobot className="text-sm" />}
            </div>

            <div className={`max-w-[75%] px-4 py-3 rounded-2xl shadow-sm text-sm leading-relaxed ${
              msg.role === "user" 
                ? "bg-indigo-600 text-white rounded-tr-none" 
                : "bg-white text-gray-800 border border-gray-100 rounded-tl-none"
            }`}>
              {msg.text}
            </div>
          </div>
        ))}

        {isLoading && (
          <div className="flex gap-3 flex-row">
            <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-indigo-600 flex items-center justify-center">
              <FaRobot className="text-sm" />
            </div>
            <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm flex gap-1 items-center">
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </main>

      <footer className="p-4 bg-white border-t border-gray-100">
        <div className="flex items-center gap-3 bg-gray-50 p-1 rounded-full border border-gray-200 focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            placeholder={`Tanya Agent PMB, ${userName}...`}
            className="flex-1 bg-transparent px-4 py-2 outline-none text-sm text-gray-700"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim() || isLoading}
            className="bg-indigo-600 text-white p-3 rounded-full hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <IoSend />
          </button>
        </div>
      </footer>
    </div>
  );
}