import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "PMB Assistant Widget",
  description: "Widget Chat PMB ISTTS",
  robots: "noindex, nofollow",
}

export default function WidgetLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen w-full ">
      <div className="h-full w-full max-w-[420px] mx-auto flex flex-col overflow-hidden ">
        {children}
      </div>
    </div>
  )
}