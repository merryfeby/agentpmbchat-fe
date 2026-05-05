// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { FiSearch, FiPlus, FiHome, FiClock, FiSettings, FiLogOut, FiMessageSquare } from "react-icons/fi";

// export default function ChatSidebar() {
//   const path = usePathname();

//   const todayChats = [
//     { id: "1", title: "Biaya Kuliah SIB" },
//     { id: "2", title: "Syarat Jalur Prestasi" },
//   ];

//   const yesterdayChats = [
//     { id: "3", title: "Batas waktu pendaftaran" },
//     { id: "4", title: "Akreditasi jurusan Informatika" },
//   ];

//   return (
//     <div className="w-72 bg-[#0e0e10] flex flex-col h-screen border-r border-gray-800 text-gray-300">
      
//       {/* 1. Header & Logo */}
//       <div className="p-5 flex items-center gap-3">
//         <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white">AI</div>
//         <span className="font-bold text-xl tracking-wide text-white">AI-PMB</span>
//       </div>

//       {/* 2. Search & New Chat */}
//       <div className="px-4 space-y-3">
//         <Link href="/" className="flex items-center justify-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2.5 text-sm font-semibold transition">
//           <FiPlus /> New Chat
//         </Link>
//       </div>

//       {/* 3. Features & History List */}
//       <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 scrollbar-hide">
//         {/* Features */}
//         {/* <div>
//           <p className="text-xs font-semibold text-gray-500 mb-3 px-2 uppercase tracking-wider">Features</p>
//           <div className="space-y-1">
//             <Link href="/" className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition ${path === '/' ? 'bg-[#1c1c1e] text-white' : 'hover:bg-[#1c1c1e]'}`}>
//               <FiHome className="text-gray-400" /> Home
//             </Link>
//             <Link href="/history" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-[#1c1c1e] transition">
//               <FiClock className="text-gray-400" /> History
//             </Link>
//           </div>
//         </div> */}

//         {/* Today */}
//         <div>
//           <p className="text-xs font-semibold text-gray-500 mb-3 px-2 uppercase tracking-wider">Today</p>
//           <div className="space-y-1">
//             {todayChats.map(chat => (
//               <Link key={chat.id} href={`/c/${chat.id}`} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-[#1c1c1e] transition text-gray-400 truncate">
//                 <FiMessageSquare className="shrink-0" /> <span className="truncate">{chat.title}</span>
//               </Link>
//             ))}
//           </div>
//         </div>

//         {/* Yesterday */}
//         <div>
//           <p className="text-xs font-semibold text-gray-500 mb-3 px-2 uppercase tracking-wider">Yesterday</p>
//           <div className="space-y-1">
//             {yesterdayChats.map(chat => (
//               <Link key={chat.id} href={`/c/${chat.id}`} className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm hover:bg-[#1c1c1e] transition text-gray-400 truncate">
//                 <FiMessageSquare className="shrink-0" /> <span className="truncate">{chat.title}</span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* 4. Profile & Logout */}
//       <div className="p-4 border-t border-gray-800">
//         <div className="flex items-center justify-between p-2 rounded-xl hover:bg-[#1c1c1e] transition cursor-pointer group">
//           <div className="flex items-center gap-3 overflow-hidden">
//             <div className="w-9 h-9 bg-gradient-to-tr from-purple-500 to-indigo-500 rounded-full shrink-0"></div>
//             <div className="truncate">
//               <p className="text-sm font-semibold text-white truncate">Merry</p>
//               <p className="text-xs text-gray-500 truncate">Student</p>
//             </div>
//           </div>
//           <button className="text-gray-500 hover:text-red-400 transition" title="Logout">
//             <FiLogOut />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import React, { useState } from "react";
// import { PlusCircle, MessageSquareText, Search, UserCircle, LogOut, BotMessageSquare } from "lucide-react";

// export default function ChatSidebar() {
//   // --- Mock State (Nantinya ganti pakai global state / context) ---
//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true); // Ganti ke false untuk test Guest Mode
  
//   const mockUser = {
//     name: "Alumni ISTTS",
//     avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=alumni", 
//   };

//   const mockChatHistory = [
//     { id: 1, title: "Cara daftar jalur SNBT di ISTTS" },
//     { id: 2, title: "Biaya kuliah prodi DKV semester 1" },
//     { id: 3, title: "Beasiswa prestasi tahun 2025" },
//     { id: 4, title: "Lokasi kampus dan fasilitas utama" },
//     { id: 5, title: "Dokumen persyaratan untuk S2" },
//   ];

//   const startNewChat = () => {
//     // Logika untuk redirect ke rute chat baru (misal: router.push('/c/new'))
//     console.log("Membuat sesi chat baru...");
//   };

//   return (
//     <aside className="w-80 h-full flex flex-col bg-gray-950 border-r border-gray-800 p-5 space-y-6 z-20 shrink-0">
//       {/* Top: Branding */}
//       <div className="flex items-center gap-3">
//         <div className="p-2.5 bg-yellow-500 rounded-xl shadow-[0_0_15px_rgba(234,179,8,0.3)]">
//           <BotMessageSquare className="w-7 h-7 text-gray-950" strokeWidth={1.5} />
//         </div>
//         <div className="flex flex-col">
//           <h1 className="text-xl font-bold text-white tracking-tight">PMB Assistant</h1>
//           <p className="text-xs text-gray-500">ISTTS AI Chatbot</p>
//         </div>
//       </div>

//       {/* Action: New Chat (Hanya muncul jika login) */}
//       {isLoggedIn && (
//         <button 
//           onClick={startNewChat} 
//           className="w-full flex items-center justify-center gap-3 p-4 bg-yellow-500/10 text-yellow-500 border border-yellow-500/20 font-semibold rounded-2xl hover:bg-yellow-500 hover:text-gray-950 transition-all shadow-md group"
//         >
//           <PlusCircle className="w-6 h-6" />
//           <span className="text-lg">New Chat</span>
//         </button>
//       )}

//       {/* Center: Chats History */}
//       {isLoggedIn ? (
//         <div className="flex-1 flex flex-col space-y-3 overflow-hidden">
//           <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider px-1">Riwayat Chat</p>
//           <div className="flex-1 overflow-y-auto pr-2 space-y-1.5 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent">
//             {mockChatHistory.map((chat) => (
//               <button
//                 key={chat.id}
//                 className="w-full flex items-start gap-4 p-4 rounded-xl text-left bg-gray-900/50 hover:bg-gray-800 transition border border-gray-800/50 group"
//               >
//                 <MessageSquareText className="w-6 h-6 text-gray-500 group-hover:text-yellow-500 flex-shrink-0 mt-0.5 transition-colors" strokeWidth={1} />
//                 <span className="text-base text-gray-300 font-medium group-hover:text-white line-clamp-2 transition-colors">{chat.title}</span>
//               </button>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4 text-gray-600 p-4 border border-gray-800 bg-gray-900/50 rounded-2xl shadow-inner">
//           <Search className="w-16 h-16 opacity-50" strokeWidth={1} />
//           <p className="text-sm font-medium">Log in untuk melihat riwayat obrolan dan menyimpan percakapan PMB.</p>
//         </div>
//       )}

//       {/* Bottom: Profile / Sign In */}
//       <div className="border-t border-gray-800 pt-5 space-y-4">
//         {isLoggedIn ? (
//           <>
//             <div className="flex items-center gap-4 bg-gray-900/80 p-4 rounded-xl border border-gray-800 shadow-sm">
//               <img src={mockUser.avatar} alt="Avatar" className="w-12 h-12 rounded-full border-2 border-yellow-500 shadow-inner bg-gray-800" />
//               <div className="flex-1 min-w-0">
//                 <p className="text-base font-semibold text-white tracking-tight truncate">{mockUser.name}</p>
//                 <p className="text-xs text-gray-500 truncate">Calon Mahasiswa</p>
//               </div>
//             </div>
//             <button 
//               onClick={() => setIsLoggedIn(false)} 
//               className="w-full flex items-center justify-center gap-2 p-3 text-red-500 bg-red-500/10 hover:bg-red-500 hover:text-white rounded-xl transition border border-red-500/20"
//             >
//               <LogOut className="w-5 h-5" />
//               <span className="text-base font-medium">Logout</span>
//             </button>
//           </>
//         ) : (
//           <button 
//             onClick={() => setIsLoggedIn(true)} 
//             className="w-full flex items-center justify-center gap-3 p-4 bg-blue-600 text-white font-semibold rounded-2xl hover:bg-blue-700 transition shadow-md group"
//           >
//             <UserCircle className="w-6 h-6" />
//             <span className="text-lg">Sign In</span>
//           </button>
//         )}
//       </div>
//     </aside>
//   );
// }

"use client";
import React, { useState } from "react";
import { UserCircle, Bot, LogOut, SquarePen, LayoutGrid, Folder } from "lucide-react";

export default function ChatSidebar() {
  // --- State & Mock Data ---
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);

  const mockUser = {
    name: "Alumni ISTTS",
    email: "alumni@istts.ac.id",
    avatar: "https://api.dicebear.com/8.x/notionists/svg?seed=alumni", 
  };

  const mockChatHistory = [
    { id: 1, title: "Cara daftar jalur SNBT di ISTTS" },
    { id: 2, title: "Biaya kuliah prodi DKV semester 1" },
    { id: 3, title: "Beasiswa prestasi tahun 2025" },
    { id: 4, title: "Lokasi kampus dan fasilitas utama" },
    { id: 5, title: "Dokumen persyaratan untuk S2" },
    { id: 6, title: "Jadwal ujian saringan masuk" },
    { id: 7, title: "Perbedaan Teknik Informatika & SI" },
  ];

  const startNewChat = () => {
    console.log("Membuat sesi chat baru...");
  };

  return (
    <aside className="w-[260px] h-full flex flex-col bg-[#0a0a0a] border-r border-gray-800/60 p-3 z-20 shrink-0 select-none">
      
      {/* ===== HEADER / BRANDING ===== */}
      <div className="flex items-center gap-3 px-2 mt-2 mb-6">
        {/* LOGO: Tinted glass style (bg-10, border-20) */}
        <div className="p-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20">
          <Bot className="w-5 h-5 text-yellow-500" strokeWidth={2.5} />
        </div>
        <span className="text-[15px] font-semibold text-gray-100 tracking-wide">PMB Assistant</span>
      </div>

      {/* ===== ACTIONS ===== */}
      {isLoggedIn && (
        <div className="space-y-2 mb-6">
          {/* TOMBOL NEW CHAT: Tinted glass style */}
          <button 
            onClick={startNewChat} 
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 hover:border-yellow-500/30 text-yellow-500 font-bold rounded-xl text-sm transition-all group"
          >
            <SquarePen className="w-4 h-4" strokeWidth={2.5} />
            <span>New Chat</span>
          </button>
          
          {/* <div className="pt-2 space-y-1">
            <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-900/80 rounded-xl text-sm text-gray-500 hover:text-gray-300 transition-all group">
              <LayoutGrid className="w-4 h-4" />
              <span>Explore PMB Info</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-900/80 rounded-xl text-sm text-gray-500 hover:text-gray-300 transition-all group">
              <Folder className="w-4 h-4" />
              <span>My Stuff</span>
            </button>
          </div> */}
        </div>
      )}

      {/* ===== CHAT HISTORY ===== */}
      {isLoggedIn ? (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-3 mb-2">
            <p className="text-sm font-semibold text-gray-500 tracking-wide mb-1">CHATS</p>
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-0.5 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent pr-1">
            {mockChatHistory.map((chat) => (
              <button
                key={chat.id}
                className="w-full text-left px-3 py-2 rounded-lg text-[13px] text-gray-500 hover:text-gray-200 hover:bg-gray-900 transition-colors truncate"
              >
                {chat.title}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center text-center p-4">
          <p className="text-sm text-gray-500 border border-gray-800/50 bg-gray-900/30 p-4 rounded-2xl">
            Log in untuk melihat riwayat obrolan PMB Anda.
          </p>
        </div>
      )}

      {/* ===== BOTTOM PROFILE / LOGIN ===== */}
      <div className="pt-2 mt-2">
        {isLoggedIn ? (
          <button 
            onClick={() => setIsLoggedIn(false)}
            className="w-full flex items-center justify-between p-2 bg-transparent hover:bg-red-500/10 border border-transparent hover:border-red-500/20 rounded-xl transition-all group"
            title="Click to Logout"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <img src={mockUser.avatar} alt="Avatar" className="w-8 h-8 rounded-md bg-gray-800 shrink-0 object-cover" />
              <div className="flex flex-col items-start truncate">
                <span className="text-[13px] font-medium text-gray-200 truncate w-full text-left">{mockUser.name}</span>
                <span className="text-[11px] text-gray-500 truncate w-full text-left">{mockUser.email}</span>
              </div>
            </div>
            <LogOut className="w-4 h-4 text-gray-600 group-hover:text-red-500 shrink-0 transition-colors" strokeWidth={2} />
          </button>
        ) : (
          /* TOMBOL SIGN IN: Tinted glass style */
          <button 
            onClick={() => setIsLoggedIn(true)} 
            className="w-full flex items-center justify-center gap-2 py-2.5 bg-yellow-500/10 border border-yellow-500/20 hover:bg-yellow-500/20 hover:border-yellow-500/30 text-yellow-500 font-bold rounded-xl transition-all duration-300 text-sm"
          >
            <UserCircle className="w-5 h-5" />
            <span>Sign In</span>
          </button>
        )}
      </div>

    </aside>
  );
}