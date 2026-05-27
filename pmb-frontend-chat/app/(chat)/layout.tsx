import ChatSidebar from "@/components/chat/Sidebar"

export default function ChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#0a0a0a]">
      <ChatSidebar />
      
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {children}
      </main>
    </div>
  )
}