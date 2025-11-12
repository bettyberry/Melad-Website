"use client"

import { useEffect, useState } from "react"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col min-h-screen">
          {/* Content skeleton while client mounts */}
          <main className="flex-1 pt-20">
            <div className="container mx-auto px-4">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 pt-16">
          {children}
        </main>
        {/* Footer is rendered by the root layout to avoid duplication */}
      </div>
    </div>
  )
}