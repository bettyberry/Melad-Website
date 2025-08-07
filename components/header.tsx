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
      if (window.scrollY > 20) {
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
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg py-2 sm:py-3" : "bg-white/90 backdrop-blur-sm py-3 sm:py-4"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-3 z-10">
          <div className="relative h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14">
            <Image src="/images/brana-logo.png" alt="ሜላድ ብራና Logo" fill className="object-contain" />
          </div>
          <div className="hidden sm:block">
            <span className="block text-lg sm:text-xl font-bold text-primary">ሜላድ ጥንታዊ የብራና ጽሑፍ ማእከል  </span>
            <span className="block text-xs sm:text-sm text-gray-600">Melad Ancient Parchment Books</span>
          </div>
        </Link>

        <div className="flex items-center space-x-2">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-4 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                    isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                  }`}
                >
                  {t(item.key)}
                </Link>
              )
            })}

            <div className="relative ml-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation()
                  setLanguageMenuOpen(!languageMenuOpen)
                }}
                className="text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-full flex items-center space-x-1"
              >
                <Globe className="h-4 w-4 mr-1" />
                <span>{language === "en" ? "EN" : "አማ"}</span>
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-300 ${languageMenuOpen ? "rotate-180" : ""}`}
                />
              </Button>

              <AnimatePresence>
                {languageMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-40 rounded-xl bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="py-1">
                      <button
                        onClick={() => {
                          setLanguage("en")
                          setLanguageMenuOpen(false)
                        }}
                        className={`flex items-center w-full px-4 py-2 text-sm ${
                          language === "en" ? "bg-gray-100 text-primary" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                          {language === "en" && <Check className="h-3 w-3 text-primary" />}
                        </span>
                        English
                      </button>
                      <button
                        onClick={() => {
                          setLanguage("am")
                          setLanguageMenuOpen(false)
                        }}
                        className={`flex items-center w-full px-4 py-2 text-sm ${
                          language === "am" ? "bg-gray-100 text-primary" : "text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        <span className="w-5 h-5 rounded-full bg-gray-200 flex items-center justify-center mr-2">
                          {language === "am" && <Check className="h-3 w-3 text-primary" />}
                        </span>
                        አማርኛ
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Button className="ml-2 bg-primary hover:bg-primary/90 text-white rounded-full shadow-md">
              {t("contactUs")}
            </Button>
          </nav>

          <Button variant="ghost" size="icon" className="hidden md:flex rounded-full hover:bg-gray-100">
            <Search className="h-5 w-5 text-gray-700" />
          </Button>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-2 md:hidden">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
              <Search className="h-5 w-5 text-gray-700" />
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-gray-100">
                  <Menu className="h-5 w-5 text-gray-700" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 border-none">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                      <div className="relative h-10 w-10">
                        <Image src="/images/brana-logo.png" alt="ሜላድ ብራና Logo" fill className="object-contain" />
                      </div>
                      <span className="text-lg font-bold text-primary">ሜላድ ጥንታዊ የብራና ጽሑፍ ማእከል  </span>
                    </Link>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="rounded-full hover:bg-gray-100"
                    >
                      <X className="h-5 w-5 text-gray-700" />
                    </Button>
                  </div>

                  <div className="flex flex-col space-y-1 mt-4">
                    {menuItems.map((item) => {
                      const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                      return (
                        <Link
                          key={item.key}
                          href={item.href}
                          className={`px-4 py-3 text-base font-medium rounded-xl transition-colors duration-300 ${
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

                  <div className="mt-8 flex flex-col space-y-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setLanguage(language === "en" ? "am" : "en")
                      }}
                      className="w-full justify-center rounded-xl border-gray-200 text-gray-700"
                    >
                      <Globe className="h-4 w-4 mr-2" />
                      {language === "en" ? "አማርኛ" : "English"}
                    </Button>

                    <Button className="w-full justify-center rounded-xl bg-primary hover:bg-primary/90 text-white">
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

function Check(props) {
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
