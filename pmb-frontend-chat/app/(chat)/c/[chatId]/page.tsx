// "use client";
// import { useState, useRef, useEffect } from "react";
// import { 
//   FiSearch, FiPlus, FiHome, FiClock, FiSettings, 
//   FiLogOut, FiSend, FiCopy, FiCheck, FiMenu, FiX,
//   FiMessageSquare, FiMoreVertical, FiTrash2, FiEdit3
// } from "react-icons/fi";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// interface Message {
//   id: number;
//   role: "user" | "assistant";
//   content: string;
//   timestamp: Date;
// }

// interface Chat {
//   id: number;
//   title: string;
//   timestamp: Date;
//   preview: string;
// }

// export default function ChatPage() {
//   const router = useRouter();
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: 1,
//       role: "assistant",
//       content: "Halo! Saya AI-PMB, asisten virtual untuk informasi Penerimaan Mahasiswa Baru ISTTS. Ada yang bisa saya bantu?\n\nBeberapa hal yang bisa saya bantu:\n• Informasi jadwal pendaftaran\n• Persyaratan dokumen\n• Biaya kuliah\n• Program studi\n• Beasiswa",
//       timestamp: new Date(),
//     }
//   ]);
//   const [input, setInput] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [copiedId, setCopiedId] = useState<number | null>(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [searchQuery, setSearchQuery] = useState("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   const [user, setUser] = useState({
//     name: "John Doe",
//     email: "john@example.com",
//     avatar: "https://ui-avatars.com/api/?name=John+Doe&background=6366f1&color=fff"
//   });

//   const todayChats: Chat[] = [
//     { id: 1, title: "Jadwal Pendaftaran SNBT", timestamp: new Date(), preview: "Kapan jadwal pendaftaran..." },
//     { id: 2, title: "Biaya Kuliah 2026", timestamp: new Date(), preview: "Berapa biaya kuliah..." },
//     { id: 3, title: "Program Beasiswa", timestamp: new Date(), preview: "Apakah ada beasiswa..." },
//   ];

//   const yesterdayChats: Chat[] = [
//     { id: 4, title: "Syarat Dokumen Mandiri", timestamp: new Date(), preview: "Apa saja persyaratan..." },
//     { id: 5, title: "Passing Grade Teknik", timestamp: new Date(), preview: "Berapa passing grade..." },
//   ];

//   const scrollToBottom = () => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       id: messages.length + 1,
//       role: "user",
//       content: input,
//       timestamp: new Date(),
//     };

//     setMessages([...messages, userMessage]);
//     setInput("");
//     setLoading(true);

//     try {
//       // TODO: Replace with actual API call
//       const res = await fetch("/api/chat", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ message: input }),
//       });

//       // Simulate AI response
//       setTimeout(() => {
//         const aiMessage: Message = {
//           id: messages.length + 2,
//           role: "assistant",
//           content: "Terima kasih atas pertanyaan Anda tentang PMB ISTTS. Berdasarkan informasi terbaru:\n\n📅 Jadwal Pendaftaran SNBT 2026:\n• Pendaftaran: 15 Januari - 15 Februari 2026\n• Ujian: 1 Maret 2026\n• Pengumuman: 15 Maret 2026\n\nApakah ada yang ingin ditanyakan lebih lanjut?",
//           timestamp: new Date(),
//         };
//         setMessages((prev) => [...prev, aiMessage]);
//         setLoading(false);
//       }, 1500);
//     } catch (error) {
//       setLoading(false);
//       console.error("Failed to send message:", error);
//     }
//   };

//   const handleCopy = (content: string, id: number) => {
//     navigator.clipboard.writeText(content);
//     setCopiedId(id);
//     setTimeout(() => setCopiedId(null), 2000);
//   };

//   const handleNewChat = () => {
//     setMessages([
//       {
//         id: 1,
//         role: "assistant",
//         content: "Halo! Saya AI-PMB, asisten virtual untuk informasi Penerimaan Mahasiswa Baru ISTTS. Ada yang bisa saya bantu?",
//         timestamp: new Date(),
//       }
//     ]);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     router.push("/login");
//   };

//   return (
//     <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
//       {/* ========== SIDEBAR ========== */}
//       <div className={`${sidebarOpen ? 'w-80' : 'w-0'} bg-gray-800 border-r border-gray-700 flex flex-col transition-all duration-300 overflow-hidden`}>
//         {/* Logo */}
//         <div className="p-6 border-b border-gray-700">
//           <div className="flex items-center gap-3">
//             <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
//               <span className="text-xl font-bold">AI</span>
//             </div>
//             <div>
//               <h1 className="text-xl font-bold">AI-PMB</h1>
//               <p className="text-xs text-gray-400">Intelligent Assistant</p>
//             </div>
//           </div>
//         </div>

//         {/* Search */}
//         <div className="p-4">
//           <div className="relative">
//             <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
//             <input
//               type="text"
//               placeholder="Search chats..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full bg-gray-700/50 border border-gray-600 rounded-xl py-3 pl-12 pr-4 text-sm focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/30 transition placeholder-gray-400"
//             />
//           </div>
//         </div>

//         {/* Features */}
//         <div className="px-4 py-2">
//           <p className="text-xs text-gray-500 uppercase font-bold mb-3 tracking-wider">Features</p>
//           <div className="space-y-2">
//             <button 
//               onClick={handleNewChat}
//               className="w-full flex items-center gap-3 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-md group"
//             >
//               <FiPlus className="text-lg group-hover:rotate-90 transition-transform" />
//               <span className="text-sm font-semibold">New Chat</span>
//             </button>
//             <Link href="/chat">
//               <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-xl transition">
//                 <FiHome className="text-lg" />
//                 <span className="text-sm font-medium">Home</span>
//               </button>
//             </Link>
//             <Link href="/chat/history">
//               <button className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-700 rounded-xl transition">
//                 <FiClock className="text-lg" />
//                 <span className="text-sm font-medium">History</span>
//               </button>
//             </Link>
//           </div>
//         </div>

//         {/* Chats */}
//         <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
//           {/* Today */}
//           <div>
//             <p className="text-xs text-gray-500 uppercase font-bold mb-3 tracking-wider">Today</p>
//             <div className="space-y-1">
//               {todayChats.map((chat) => (
//                 <button
//                   key={chat.id}
//                   className="w-full text-left px-3 py-3 hover:bg-gray-700 rounded-xl transition group relative"
//                 >
//                   <div className="flex items-start gap-3">
//                     <FiMessageSquare className="text-gray-400 text-lg flex-shrink-0 mt-0.5" />
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium truncate">{chat.title}</p>
//                       <p className="text-xs text-gray-400 truncate mt-0.5">{chat.preview}</p>
//                     </div>
//                   </div>
//                   <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
//                     <button className="p-1 hover:bg-gray-600 rounded">
//                       <FiMoreVertical className="text-sm text-gray-400" />
//                     </button>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Yesterday */}
//           <div>
//             <p className="text-xs text-gray-500 uppercase font-bold mb-3 tracking-wider">Yesterday</p>
//             <div className="space-y-1">
//               {yesterdayChats.map((chat) => (
//                 <button
//                   key={chat.id}
//                   className="w-full text-left px-3 py-3 hover:bg-gray-700 rounded-xl transition group relative"
//                 >
//                   <div className="flex items-start gap-3">
//                     <FiMessageSquare className="text-gray-400 text-lg flex-shrink-0 mt-0.5" />
//                     <div className="flex-1 min-w-0">
//                       <p className="text-sm font-medium truncate">{chat.title}</p>
//                       <p className="text-xs text-gray-400 truncate mt-0.5">{chat.preview}</p>
//                     </div>
//                   </div>
//                   <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition">
//                     <button className="p-1 hover:bg-gray-600 rounded">
//                       <FiMoreVertical className="text-sm text-gray-400" />
//                     </button>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Profile */}
//         <div className="p-4 border-t border-gray-700">
//           <div className="bg-gray-700/50 rounded-xl p-4">
//             <div className="flex items-center gap-3 mb-3">
//               <img
//                 src={user.avatar}
//                 alt="Profile"
//                 className="w-12 h-12 rounded-full border-2 border-indigo-500"
//               />
//               <div className="flex-1 min-w-0">
//                 <p className="text-sm font-semibold truncate">{user.name}</p>
//                 <p className="text-xs text-gray-400 truncate">{user.email}</p>
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <Link href="/chat/settings" className="flex-1">
//                 <button className="w-full flex items-center justify-center gap-2 px-3 py-2.5 bg-gray-600 hover:bg-gray-500 rounded-lg transition text-sm font-medium">
//                   <FiSettings className="text-base" />
//                   Settings
//                 </button>
//               </Link>
//               <button 
//                 onClick={handleLogout}
//                 className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 bg-red-600 hover:bg-red-700 rounded-lg transition text-sm font-medium"
//               >
//                 <FiLogOut className="text-base" />
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* ========== MAIN CHAT AREA ========== */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="bg-gray-800 border-b border-gray-700 px-6 py-4 flex items-center justify-between">
//           <div className="flex items-center gap-4">
//             <button
//               onClick={() => setSidebarOpen(!sidebarOpen)}
//               className="p-2 hover:bg-gray-700 rounded-xl transition"
//             >
//               {sidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
//             </button>
//             <div>
//               <h2 className="font-bold text-lg">New Chat</h2>
//               <p className="text-xs text-gray-400">Ask anything about PMB ISTTS</p>
//             </div>
//           </div>
//           <div className="flex items-center gap-2">
//             <button className="p-2 hover:bg-gray-700 rounded-xl transition">
//               <FiEdit3 className="text-lg text-gray-400" />
//             </button>
//             <button className="p-2 hover:bg-gray-700 rounded-xl transition">
//               <FiTrash2 className="text-lg text-gray-400" />
//             </button>
//           </div>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gradient-to-b from-gray-900 to-gray-800">
//           <div className="max-w-4xl mx-auto space-y-6">
//             {messages.map((message) => (
//               <div
//                 key={message.id}
//                 className={`flex gap-4 ${message.role === "user" ? "justify-end" : "justify-start"}`}
//               >
//                 {message.role === "assistant" && (
//                   <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0 shadow-lg">
//                     <span className="text-base font-bold">AI</span>
//                   </div>
//                 )}
                
//                 <div className={`max-w-2xl ${message.role === "user" ? "order-1" : ""}`}>
//                   <div
//                     className={`rounded-2xl px-5 py-4 shadow-lg ${
//                       message.role === "user"
//                         ? "bg-gradient-to-br from-indigo-600 to-purple-600 text-white"
//                         : "bg-gray-800 border border-gray-700"
//                     }`}
//                   >
//                     <p className="text-sm leading-relaxed whitespace-pre-line">{message.content}</p>
//                   </div>
                  
//                   <div className="flex items-center gap-3 mt-2 px-2">
//                     <span className="text-xs text-gray-500">
//                       {message.timestamp.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
//                     </span>
//                     {message.role === "assistant" && (
//                       <button
//                         onClick={() => handleCopy(message.content, message.id)}
//                         className="flex items-center gap-1 px-2 py-1 hover:bg-gray-700 rounded-lg transition group"
//                         title="Copy message"
//                       >
//                         {copiedId === message.id ? (
//                           <>
//                             <FiCheck className="text-green-500 text-sm" />
//                             <span className="text-xs text-green-500">Copied!</span>
//                           </>
//                         ) : (
//                           <>
//                             <FiCopy className="text-gray-400 text-sm group-hover:text-gray-300" />
//                             <span className="text-xs text-gray-400 group-hover:text-gray-300">Copy</span>
//                           </>
//                         )}
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {message.role === "user" && (
//                   <img
//                     src={user.avatar}
//                     alt="User"
//                     className="w-10 h-10 rounded-2xl flex-shrink-0 border-2 border-indigo-500"
//                   />
//                 )}
//               </div>
//             ))}

//             {loading && (
//               <div className="flex gap-4">
//                 <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg">
//                   <span className="text-base font-bold">AI</span>
//                 </div>
//                 <div className="bg-gray-800 border border-gray-700 rounded-2xl px-5 py-4 shadow-lg">
//                   <div className="flex gap-2">
//                     <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"></div>
//                     <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
//                     <div className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
//                   </div>
//                 </div>
//               </div>
//             )}
            
//             <div ref={messagesEndRef} />
//           </div>
//         </div>

//         {/* Input */}
//         <div className="bg-gray-800 border-t border-gray-700 p-6">
//           <div className="max-w-4xl mx-auto">
//             <div className="relative">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 onKeyPress={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
//                 placeholder="Type your message here..."
//                 className="w-full bg-gray-700 border border-gray-600 rounded-2xl py-4 px-6 pr-14 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/50 transition placeholder-gray-400 text-sm"
//               />
//               <button
//                 onClick={handleSend}
//                 disabled={!input.trim() || loading}
//                 className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 disabled:from-gray-600 disabled:to-gray-600 disabled:cursor-not-allowed rounded-xl transition shadow-lg"
//               >
//                 <FiSend className="text-lg" />
//               </button>
//             </div>
//             <p className="text-xs text-gray-500 text-center mt-3">
//               AI-PMB can make mistakes. Please verify important information.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { ArrowLeftRight, BotMessageSquare, CornerDownLeft, UserCircle } from "lucide-react";

// interface Message {
//   id: number;
//   role: "user" | "bot";
//   content: string;
//   timestamp: string;
// }

// export default function MainChatPage() {
//   const [hasStartedChat, setHasStartedChat] = useState<boolean>(false);
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [input, setInput] = useState<string>("");
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   // Auto-scroll ke bawah saat ada pesan baru
//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSendMessage = (customPrompt?: string) => {
//     const textToSend = customPrompt || input;
//     if (!textToSend.trim()) return;

//     if (!hasStartedChat) setHasStartedChat(true);

//     const newMessage: Message = {
//       id: Date.now(),
//       role: "user",
//       content: textToSend,
//       timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
//     };

//     setMessages((prev) => [...prev, newMessage]);
//     setInput("");

//     // Simulasi balasan dari AI Bot
//     setTimeout(() => {
//       const botResponse: Message = {
//         id: Date.now() + 1,
//         role: "bot",
//         content: `Terima kasih atas pertanyaannya mengenai "${textToSend}". Saya sedang memproses informasi dari database PMB ISTTS. Ada lagi yang ingin ditanyakan?`,
//         timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
//       };
//       setMessages((prev) => [...prev, botResponse]);
//     }, 1000);
//   };

//   const suggestions = [
//     "Kapan pendaftaran PMB ISTTS gelombang 1 dibuka?",
//     "Berapa biaya kuliah prodi S1 Informatika per semester?",
//     "Apa saja syarat pendaftaran jalur prestasi?",
//     "Apakah ISTTS menyediakan program beasiswa penuh?",
//   ];

//   return (
//     <div className="flex-1 flex flex-col relative h-full bg-gray-950 overflow-hidden">
//       {/* Background Gradient Overlay */}
//       <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-950 to-blue-900/20 z-0 pointer-events-none"></div>

//       {/* Konten Utama */}
//       <div className="flex-1 flex flex-col z-10 overflow-hidden">
        
//         {!hasStartedChat ? (
//           /* ========== WELCOME PAGE ========== */
//           <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-10 text-center overflow-y-auto">
//             <div className="space-y-4 max-w-3xl">
//               <div className="inline-block p-4 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 mb-2">
//                 <BotMessageSquare className="w-16 h-16 text-yellow-500" strokeWidth={1.5} />
//               </div>
//               <h1 className="text-4xl md:text-5xl font-extrabold text-white">
//                 Selamat Datang di <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">PMB Assistant</span>
//               </h1>
//               <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto pt-4">
//                 Asisten cerdas khusus Penerimaan Mahasiswa Baru ISTTS. <br />
//                 Tanyakan seputar pendaftaran, program studi, biaya kuliah, dan fasilitas. <br />
//                 <span className="text-yellow-500/80 font-medium text-sm">💡 Saya hanya memberikan informasi terkait PMB ISTTS.</span>
//               </p>
//             </div>

//             <div className="w-full max-w-4xl space-y-6">
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
//                 {suggestions.map((topic, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleSendMessage(topic)}
//                     className="p-5 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl flex items-center gap-4 text-gray-300 hover:border-yellow-500/50 hover:bg-gray-800 hover:text-white transition-all group"
//                   >
//                     <div className="p-3 bg-gray-950 rounded-xl group-hover:bg-yellow-500/20 transition-colors">
//                       <CornerDownLeft className="w-5 h-5 text-yellow-600 group-hover:text-yellow-400" />
//                     </div>
//                     <p className="flex-1 text-sm leading-relaxed">{topic}</p>
//                   </button>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           /* ========== CHAT INTERFACE ========== */
//           <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-800">
//             <div className="max-w-4xl mx-auto space-y-8">
//               {messages.map((msg) => (
//                 <div key={msg.id} className={`flex gap-4 items-start ${msg.role === "user" ? "justify-end" : ""}`}>
//                   {msg.role === "bot" && (
//                     <div className="p-2 bg-yellow-500 rounded-xl shrink-0 mt-1 shadow-lg shadow-yellow-500/20">
//                       <BotMessageSquare className="w-6 h-6 text-gray-950" strokeWidth={2} />
//                     </div>
//                   )}
                  
//                   <div className={`max-w-[75%] space-y-1.5 ${msg.role === "user" ? "text-right" : ""}`}>
//                     <p className={`text-xs text-gray-500 font-medium uppercase tracking-wider px-1 ${msg.role === "user" ? "hidden" : ""}`}>PMB Assistant</p>
//                     <p className={`text-xs text-gray-500 font-medium uppercase tracking-wider px-1 ${msg.role === "bot" ? "hidden" : ""}`}>You</p>
                    
//                     <div className={`p-4 text-[15px] leading-relaxed shadow-sm ${
//                         msg.role === "bot"
//                           ? "bg-gray-900 border border-gray-800 text-gray-100 rounded-2xl rounded-tl-sm"
//                           : "bg-blue-600 text-white rounded-2xl rounded-br-sm"
//                       }`}
//                     >
//                       {msg.content}
//                     </div>
//                     <p className="text-[11px] text-gray-600 px-1">{msg.timestamp}</p>
//                   </div>

//                   {msg.role === "user" && (
//                     <div className="p-2 bg-blue-600 rounded-xl shrink-0 mt-1 shadow-lg shadow-blue-500/20">
//                       <UserCircle className="w-6 h-6 text-white" strokeWidth={2} />
//                     </div>
//                   )}
//                 </div>
//               ))}
//               <div ref={messagesEndRef} />
//             </div>
//           </div>
//         )}

//         {/* ========== INPUT AREA ========== */}
//         <div className="p-6 pt-2 shrink-0">
//           <div className="w-full max-w-4xl mx-auto flex items-end gap-3 bg-gray-900/80 backdrop-blur-md border border-gray-800 p-2 rounded-2xl shadow-2xl focus-within:border-yellow-500/50 focus-within:ring-1 focus-within:ring-yellow-500/50 transition-all">
//             <textarea
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   handleSendMessage();
//                 }
//               }}
//               placeholder="Ketik pesan ke PMB Assistant..."
//               className="flex-1 bg-transparent text-gray-100 py-3 px-4 outline-none text-sm placeholder:text-gray-500 resize-none max-h-32"
//               rows={1}
//             />
//             <button
//               onClick={() => handleSendMessage()}
//               disabled={!input.trim()}
//               className="p-3 mb-1 mr-1 bg-yellow-500 text-gray-950 rounded-xl hover:bg-yellow-400 disabled:bg-gray-800 disabled:text-gray-600 transition-colors shadow-md"
//             >
//               <ArrowLeftRight className="w-5 h-5 rotate-90" />
//             </button>
//           </div>
//           <p className="text-center text-[11px] text-gray-600 mt-3">
//             AI-PMB dirancang khusus untuk pertanyaan Penerimaan Mahasiswa Baru. Verifikasi info penting ke website resmi.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


"use client";
import React, { useState, useRef, useEffect } from "react";
import { BotMessageSquare, CornerDownLeft, UserCircle, Copy, Check, ArrowUp } from "lucide-react";

interface Message {
  id: number;
  role: "user" | "bot";
  content: string;
  timestamp: string;
}

export default function MainChatPage() {
  const [hasStartedChat, setHasStartedChat] = useState<boolean>(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>("");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (customPrompt?: string) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim()) return;

    if (!hasStartedChat) setHasStartedChat(true);

    const newMessage: Message = {
      id: Date.now(),
      role: "user",
      content: textToSend,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");

    setTimeout(() => {
      const botResponse: Message = {
        id: Date.now() + 1,
        role: "bot",
        content: `Terima kasih atas pertanyaannya mengenai "${textToSend}". Saya sedang memproses informasi dari database PMB ISTTS. Ada lagi yang ingin ditanyakan?`,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, botResponse]);
    }, 1000);
  };

  const copyToClipboard = (text: string, id: number) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const suggestions = [
    "Kapan pendaftaran PMB ISTTS gelombang 1 dibuka?",
    "Berapa biaya kuliah prodi S1 Informatika per semester?",
    "Apa saja syarat pendaftaran jalur prestasi?",
    "Apakah ISTTS menyediakan program beasiswa penuh?",
  ];

  return (
    <div className="flex-1 flex flex-col relative h-full bg-gray-950 overflow-hidden">
      {/* Background Gradient Kuning */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-yellow-950/40 to-amber-950/60 z-0 pointer-events-none"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-yellow-500/10 via-transparent to-transparent z-0 pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-yellow-500/10 blur-[120px] rounded-full z-0 pointer-events-none"></div>

      <div className="flex-1 flex flex-col z-10 overflow-hidden">
        
        {!hasStartedChat ? (
          /* ========== WELCOME PAGE ========== */
          <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-10 text-center overflow-y-auto">
            <div className="space-y-4 max-w-3xl">
              <div className="inline-block p-4 rounded-3xl bg-yellow-500/10 border border-yellow-500/20 mb-2">
                <BotMessageSquare className="w-16 h-16 text-yellow-500" strokeWidth={1.5} />
              </div>
              <h1 className="text-4xl md:text-5xl font-extrabold text-white">
                Selamat Datang di <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">PMB Assistant</span>
              </h1>
              <p className="text-lg text-gray-400 leading-relaxed max-w-2xl mx-auto pt-4">
                Asisten cerdas khusus Penerimaan Mahasiswa Baru ISTTS. <br />
                Tanyakan seputar pendaftaran, program studi, biaya kuliah, dan fasilitas. <br />
                <span className="text-yellow-500/80 font-medium text-sm">💡 Saya hanya memberikan informasi terkait PMB ISTTS.</span>
              </p>
            </div>

            <div className="w-full max-w-4xl space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                {suggestions.map((topic, index) => (
                  <button
                    key={index}
                    onClick={() => handleSendMessage(topic)}
                    className="p-5 bg-gray-900/60 backdrop-blur-sm border border-gray-800 rounded-2xl flex items-center gap-4 text-gray-300 hover:border-yellow-500/50 hover:bg-gray-800 hover:text-white transition-all group"
                  >
                    <div className="p-3 bg-gray-950 rounded-xl group-hover:bg-yellow-500/20 transition-colors">
                      <CornerDownLeft className="w-5 h-5 text-yellow-600 group-hover:text-yellow-400" />
                    </div>
                    <p className="flex-1 text-sm leading-relaxed">{topic}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* ========== CHAT INTERFACE ========== */
          <div className="flex-1 overflow-y-auto p-6 scrollbar-thin scrollbar-thumb-gray-700">
            <div className="max-w-4xl mx-auto space-y-8">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-4 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "bot" && (
                    <div className="shrink-0 mt-1">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-500 flex items-center justify-center shadow-xl shadow-yellow-500/30">
                        <BotMessageSquare className="w-5 h-5 text-gray-950" strokeWidth={2.5} />
                      </div>
                    </div>
                  )}

                  <div className={`max-w-[75%] group`}>
                    <div className={`relative px-6 py-4 text-[15.2px] leading-relaxed shadow-xl
                      ${msg.role === "bot"
                        ? "bg-gray-900 border border-gray-700 text-gray-100 rounded-3xl rounded-tl-none"
                        : "bg-slate-700 text-white rounded-3xl rounded-tr-none"
                      }`}
                    >
                      {msg.content}
                    </div>

                    {/* Copy Button - Selalu Tampil */}
                    <div className="flex items-center gap-3 mt-2 px-3">
                      <p className="text-[11px] text-gray-500">{msg.timestamp}</p>
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

                  {msg.role === "user" && (
                    <div className="shrink-0 mt-1">
                      <div className="w-9 h-9 bg-slate-600 rounded-xl flex items-center justify-center border border-slate-500">
                        <UserCircle className="w-5 h-5 text-white" strokeWidth={2} />
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
        )}

        {/* ========== INPUT AREA ========== */}
        <div className="p-6 pt-2 shrink-0">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-900/90 backdrop-blur-2xl border border-gray-700 focus-within:border-yellow-400 rounded-3xl p-2 shadow-2xl">
              <div className="flex items-end gap-3">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleSendMessage();
                    }
                  }}
                  placeholder="Ketik pesan ke PMB Assistant..."
                  className="flex-1 bg-transparent text-gray-100 py-4 px-5 outline-none text-[15px] placeholder:text-gray-500 resize-none max-h-32"
                  rows={1}
                />
                
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim()}
                  className="p-4 bg-transparent border border-gray-600 hover:border-yellow-400 text-white disabled:text-gray-500 disabled:border-gray-700 rounded-2xl transition-all hover:bg-white/10 active:scale-95"
                >
                  <ArrowUp className="w-5 h-5" strokeWidth={2.5} />
                </button>
                
              </div>
            </div>

            <p className="text-center text-[10px] text-gray-600 mt-4">
              PMB Assistant • Informasi penting harap diverifikasi di website resmi ISTTS
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}