"use client"

import Header from "@/components/header"
import Providers from "@/components/providers"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        {/* no footer */}
      </div>
    </Providers>
  )
}
