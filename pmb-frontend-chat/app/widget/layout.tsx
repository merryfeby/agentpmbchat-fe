import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "PMB Assistant Widget",
  description: "Widget Chat PMB ISTTS",
  robots: "noindex, nofollow", // Karena ini untuk embed
};

export default function WidgetLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen w-full bg-black">
      {/* Container Widget */}
      <div className="h-full w-full max-w-[420px] mx-auto flex flex-col shadow-2xl border border-gray-800 rounded-3xl overflow-hidden bg-gray-950">
        {children}
      </div>
    </div>
  );
}