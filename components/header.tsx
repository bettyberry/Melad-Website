"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, X, Globe, ChevronDown, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      if (window.scrollY > 10) { // Reduced scroll threshold
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setLanguageMenuOpen(false)
    }

    if (languageMenuOpen) {
      document.addEventListener("click", handleClickOutside)
    }

    return () => {
      document.removeEventListener("click", handleClickOutside)
    }
  }, [languageMenuOpen])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const menuItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "products", href: "/products" },
    { key: "gallery", href: "/gallery" },
    { key: "contact", href: "/contact" },
  ]

  if (!isMounted) {
    return null
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-1" : "bg-white/95 backdrop-blur-sm py-2"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo remains original size */}
        <Link href="/" className="flex items-center space-x-2 z-10">
          <div className="relative h-10 w-10"> {/* Keep original logo size */}
            <Image
              src="/images/brana-logo.png"
              alt="ሜላድ ብራና Logo"
              fill
              className="object-contain"
            />
          </div>
          <div className="hidden sm:block leading-tight">
            <span className="block text-sm font-medium text-primary">
              ሜላድ ጥንታዊ የብራና ጽሑፍ ማእከል
            </span>
            <span className="block text-xs text-gray-600">
              Melad Ancient Parchment Books
            </span>
          </div>
        </Link>

        <div className="flex items-center space-x-1">
          {/* Desktop Navigation - Made more compact */}
          <nav className="hidden md:flex items-center space-x-5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
                    isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                  }`}
                >
                  {t(item.key)}
                </Link>
              )
            })}

            <div className="relative ml-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setLanguageMenuOpen(!languageMenuOpen)
                }}
                className="text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md px-2.5 py-1.5"
              >
                <Globe className="h-3.5 w-3.5 mr-1" />
                <span>{language === "en" ? "EN" : "አማ"}</span>
                <ChevronDown
                  className={`h-3.5 w-3.5 ml-0.5 transition-transform duration-200 ${
                    languageMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </Button>

              <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-1 w-36 rounded-lg bg-white shadow-md ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setLanguage("en")
                          setLanguageMenuOpen(false)
                        }}
                        className={`flex items-center w-full px-3 py-1.5 text-xs ${
                          language === "en" ? "bg-gray-100 text-primary" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                          {language === "en" && <Check className="h-2.5 w-2.5 text-primary" />}
                        </span>
                        English
                      </button>
                      <button
                        onClick={() => {
                          setLanguage("am")
                          setLanguageMenuOpen(false)
                        }}
                        className={`flex items-center w-full px-3 py-1.5 text-xs ${
                          language === "am" ? "bg-gray-100 text-primary" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                          {language === "am" && <Check className="h-2.5 w-2.5 text-primary" />}
                        </span>
                        አማርኛ
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            
          </nav>



          {/* Mobile Navigation - Made more compact */}
          <div className="flex items-center space-x-1 md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              className="rounded-md hover:bg-gray-100 px-2 py-1.5"
            >
              <Search className="h-4 w-4 text-gray-700" />
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="rounded-md hover:bg-gray-100 px-2 py-1.5"
                >
                  <Menu className="h-4 w-4 text-gray-700" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-72 border-none">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                      <div className="relative h-10 w-10"> {/* Keep original logo size in mobile */}
                        <Image src="/images/brana-logo.png" alt="ሜላድ ብራና Logo" fill className="object-contain" />
                      </div>
                      <span className="text-sm font-semibold text-primary">ሜላድ ጥንታዊ የብራና ጽሑፍ ማእከል</span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsOpen(false)}
                      className="rounded-md hover:bg-gray-100 px-2 py-1.5"
                    >
                      <X className="h-4 w-4 text-gray-700" />
                    </Button>
                  </div>

                  <div className="flex flex-col space-y-0.5 mt-2">
                    {menuItems.map((item) => {
                      const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                      return (
                        <Link
                          key={item.key}
                          href={item.href}
                          className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                          }`}
                          onClick={() => setIsOpen(false)}
                        >
                          {t(item.key)}
                        </Link>
                      )
                    })}
                  </div>

                  <div className="mt-6 flex flex-col space-y-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setLanguage(language === "en" ? "am" : "en")
                      }}
                      className="w-full justify-center rounded-lg border-gray-200 text-gray-700 text-sm py-1.5"
                    >
                      <Globe className="h-3.5 w-3.5 mr-2" />
                      {language === "en" ? "አማርኛ" : "English"}
                    </Button>

                    <Button className="w-full justify-center rounded-lg bg-primary hover:bg-primary/90 text-white text-sm py-1.5">
                      {t("contactUs")}
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

function Check(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}