"use client"

import { useEffect, useState } from "react"
import Header from "./header"
import Footer from "./footer"

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex flex-col min-h-screen">
          {/* Header skeleton */}
          <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm py-1">
            <div className="container flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full"></div>
                <div className="hidden sm:block">
                  <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
                  <div className="w-24 h-3 bg-gray-200 animate-pulse rounded mt-1"></div>
                </div>
              </div>
            </div>
          </header>
          
          {/* Main content skeleton */}
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
        <Header />
        <main className="flex-1 pt-16">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  )
}