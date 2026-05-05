// "use client";
// import { FiArrowUp, FiSearch } from "react-icons/fi";

// export default function HomeChatPage() {
//   const kickstarts = [
//     { title: "Info Pendaftaran", desc: "Ketahui jadwal dan cara daftar gelombang terbaru." },
//     { title: "Biaya & UKT", desc: "Cek rincian biaya kuliah untuk setiap program studi." },
//     { title: "Beasiswa", desc: "Informasi beasiswa prestasi dan bantuan pemerintah." },
//     { title: "Jalur Tes", desc: "Pelajari materi ujian masuk dan kisi-kisi soal." },
//   ];

//   return (
//     // Efek gradient glow ala Gambar 3 di sudut kanan atas
//     <div className="flex-1 overflow-y-auto relative bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-orange-900/10 via-[#0a0a0a] to-[#0a0a0a]">
      
//       <div className="max-w-4xl mx-auto px-6 py-20 flex flex-col items-center justify-center min-h-full">
        
//         {/* Welcome Section */}
//         <div className="text-center mb-10">
//           <div className="w-12 h-12 bg-indigo-600/20 text-indigo-500 rounded-2xl mx-auto flex items-center justify-center mb-6 border border-indigo-500/20">
//              <span className="font-bold text-xl">AI</span>
//           </div>
//           <h2 className="text-2xl text-gray-400 font-medium mb-2">Welcome Back ✨</h2>
//           <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
//             What Can I Help You Ask Today?
//           </h1>
//         </div>

//         {/* Center Input Bar */}
//         <div className="w-full max-w-3xl relative mb-16">
//           <div className="bg-[#141415] border border-gray-700/50 rounded-2xl p-2 flex items-center shadow-2xl">
//             <button className="p-3 text-gray-400 hover:text-white transition rounded-xl hover:bg-gray-800">
//               <FiSearch />
//             </button>
//             <input 
//               type="text" 
//               placeholder="Ask anything about admissions..." 
//               className="flex-1 bg-transparent border-none text-white px-2 py-3 focus:outline-none placeholder-gray-500 text-lg"
//             />
//             <button className="p-3 bg-white text-black rounded-xl hover:bg-gray-200 transition font-bold">
//               <FiArrowUp />
//             </button>
//           </div>
//         </div>

//         {/* Kickstart Tools */}
//         <div className="w-full max-w-4xl">
//           <h3 className="text-lg font-semibold text-white mb-6 text-center md:text-left">
//             Kickstart Your Journey with These Topics
//           </h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {kickstarts.map((item, idx) => (
//               <div key={idx} className="bg-[#141415] border border-gray-800 p-6 rounded-2xl hover:border-gray-600 transition cursor-pointer group">
//                 <h4 className="text-white font-semibold text-lg mb-2 group-hover:text-indigo-400 transition">{item.title}</h4>
//                 <p className="text-sm text-gray-500 leading-relaxed mb-4">{item.desc}</p>
//                 <span className="text-xs font-semibold text-gray-400 group-hover:text-white transition">Ask now →</span>
//               </div>
//             ))}
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// }