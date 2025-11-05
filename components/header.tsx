"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-provider"
import { ShoppingCart, User, LogOut, Package, Settings, Globe, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [openAuth, setOpenAuth] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!(e.target as Element).closest(".language-menu-container")) setLanguageMenuOpen(false)
      if (!(e.target as Element).closest(".user-menu-container")) setUserMenuOpen(false)
      if (!(e.target as Element).closest(".more-menu-container")) setMoreMenuOpen(false)
    }
    document.addEventListener("click", handleClickOutside)
    return () => document.removeEventListener("click", handleClickOutside)
  }, [])

  const handleLogout = async () => {
    setUserMenuOpen(false)
    localStorage.removeItem("cartItems")
    window.dispatchEvent(new Event("cartUpdated"))
    await signOut({ redirect: false })
    router.refresh()
  }

  // Main nav items (now includes Services)
  const mainMenuItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "products", href: "/products" },
  ]

  // Less important items go under "More"
  const moreMenuItems = [
    { key: "gallery", href: "/gallery" },
    { key: "contact", href: "/contact" },
  ]

  if (!isMounted) return null

  return (
<header className={`fixed top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-1" : "bg-white/95 backdrop-blur-sm pt-2 pb-1"}`}>
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 z-10">
          <div className="relative h-10 w-10">
            <Image src="/images/brana-logo.png" alt="Logo" fill className="object-contain" />
          </div>
          <div className="hidden sm:block leading-tight">
            <span className="block text-sm font-medium text-primary">ሜላድ ጥንታዊ የብራና ጽሑፍ ማእከል</span>
            <span className="block text-xs text-gray-600">Melad Ancient Parchment Books</span>
          </div>
        </Link>

        {/* Centered Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-5 mx-auto">
          {mainMenuItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
            return (
              <Link
                key={item.key}
                href={item.href}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100 hover:text-primary"}`}
              >
                {t(item.key)}
              </Link>
            )
          })}

          {/* More Dropdown */}
          <div className="relative more-menu-container">
            <Button
              variant="ghost"
              size="sm"
              onClick={(e) => { e.stopPropagation(); setMoreMenuOpen(!moreMenuOpen) }}
              className="flex items-center text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md px-2.5 py-1.5"
            >
              More
              <ChevronDown className={`h-3.5 w-3.5 ml-1 transition-transform ${moreMenuOpen ? "rotate-180" : ""}`} />
            </Button>

            <AnimatePresence>
              {moreMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute mt-1 w-36 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
                >
                  {moreMenuItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setMoreMenuOpen(false)}
                      className={`block px-3 py-2 text-xs font-medium rounded-md text-gray-700 hover:bg-gray-50 hover:text-primary`}
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </nav>

        {/* Right Side */}
        <div className="flex items-center space-x-2">
          {/* Auth / User */}
          <div className="relative user-menu-container">
            {session ? (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => { e.stopPropagation(); setUserMenuOpen(!userMenuOpen) }}
                  className="flex items-center text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md px-2.5 py-1.5"
                >
                  <User className="h-4 w-4 mr-1" />
                  {session.user?.name?.split(" ")[0] || "Account"}
                  <ChevronDown className={`h-4 w-4 ml-0.5 transition-transform ${userMenuOpen ? "rotate-180" : ""}`} />
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setOpenAuth(true)} className="text-sm font-medium rounded-md border border-primary text-primary hover:bg-primary hover:text-white">
                Login
              </Button>
            )}
          </div>

          {/* Language */}
          <div className="relative language-menu-container">
            <Button variant="ghost" size="sm" onClick={(e) => { e.stopPropagation(); setLanguageMenuOpen(!languageMenuOpen) }} className="text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md px-2.5 py-1.5">
              <Globe className="h-3.5 w-3.5 mr-1" /> {language === "en" ? "EN" : "አማ"}
              <ChevronDown className={`h-3.5 w-3.5 ml-0.5 transition-transform ${languageMenuOpen ? "rotate-180" : ""}`} />
            </Button>
          </div>

          {/* Cart */}
          <Link href="/cart" className="relative p-2 text-gray-700 hover:text-primary">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">{cartCount}</span>}
          </Link>
        </div>
      </div>

      {/* Auth Dialog */}
      <Dialog open={openAuth} onOpenChange={setOpenAuth}>
        <DialogTrigger />
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t("welcomeBack") || "Welcome"}</DialogTitle>
          </DialogHeader>
          <Tabs defaultValue="login" className="w-full mt-4">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">{t("login")}</TabsTrigger>
              <TabsTrigger value="signup">{t("createAccount")}</TabsTrigger>
            </TabsList>

            {/* Login Form */}
            <TabsContent value="login" className="mt-4">
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.currentTarget as any
                  const email = form.email.value
                  const password = form.password.value
                  const res = await signIn("credentials", { redirect: false, email, password })
                  if (res?.error) alert(res.error)
                  else { setOpenAuth(false); router.refresh() }
                }}
                className="space-y-3"
              >
                <input name="email" type="email" placeholder="Email" className="w-full rounded-md border px-3 py-2 text-sm" required />
                <input name="password" type="password" placeholder="Password" className="w-full rounded-md border px-3 py-2 text-sm" required />
                <Button type="submit" className="w-full bg-primary text-white">{t("login")}</Button>
              </form>
            </TabsContent>

            {/* Signup Form */}
            <TabsContent value="signup" className="mt-4">
              <form
                onSubmit={async (e) => {
                  e.preventDefault()
                  const form = e.currentTarget as any
                  const name = form.name.value
                  const email = form.email.value
                  const password = form.password.value
                  const res = await fetch("/api/auth/signup", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name, email, password }),
                  })
                  const data = await res.json()
                  if (res.ok) alert("Signup successful! Please login.")
                  else alert(data?.error || "Signup failed")
                }}
                className="space-y-3"
              >
                <input name="name" type="text" placeholder="Full Name" className="w-full rounded-md border px-3 py-2 text-sm" required />
                <input name="email" type="email" placeholder="Email" className="w-full rounded-md border px-3 py-2 text-sm" required />
                <input name="password" type="password" placeholder="Password" className="w-full rounded-md border px-3 py-2 text-sm" required minLength={6} />
                <Button type="submit" className="w-full bg-primary text-white">{t("signup")}</Button>
              </form>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </header>
  )
}
