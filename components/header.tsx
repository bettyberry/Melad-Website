"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-provider"
import { ShoppingCart, User, LogOut, Package, Settings, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Menu, X, Globe, ChevronDown, Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react"

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [openAuth, setOpenAuth] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setIsMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // Check if click is outside language menu
      if (languageMenuOpen && !(e.target as Element).closest('.language-menu-container')) {
        setLanguageMenuOpen(false)
      }
      
      // Check if click is outside user menu
      if (userMenuOpen && !(e.target as Element).closest('.user-menu-container')) {
        setUserMenuOpen(false)
      }
    }
    
    if (languageMenuOpen || userMenuOpen) {
      document.addEventListener("click", handleClickOutside)
    }
    
    return () => document.removeEventListener("click", handleClickOutside)
  }, [languageMenuOpen, userMenuOpen])

  useEffect(() => setIsOpen(false), [pathname])
// ✅ Sync cart when user logs in or logs out
useEffect(() => {
  // When user is logged in
  if (status === "authenticated" && session?.user) {
    const syncCart = async () => {
      try {
        // 1️⃣ Get guest cart (from localStorage)
        const guestItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

        // 2️⃣ Get user's saved cart from DB
        const res = await fetch("/api/cart/get");
        let dbItems = [];
        if (res.ok) dbItems = await res.json();

        // 3️⃣ If both are empty, no need to do anything
        if (guestItems.length === 0 && dbItems.length === 0) return;

        // 4️⃣ Merge carts (keep higher quantity if same item)
        const merged = [...dbItems];
        for (const g of guestItems) {
          const existing = merged.find((i) => i.id === g.id);
          if (existing) {
            existing.quantity = Math.max(existing.quantity, g.quantity);
          } else {
            merged.push(g);
          }
        }

        // 5️⃣ Save merged cart to database
        await fetch("/api/cart/save", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ items: merged }),
        });

        // 6️⃣ Update localStorage + UI
        localStorage.setItem("cartItems", JSON.stringify(merged));
        window.dispatchEvent(new Event("cartUpdated"));
      } catch (err) {
        console.error("Failed to sync cart:", err);
      }
    };

    syncCart();
  } 
  
  else if (status === "unauthenticated") {
    localStorage.removeItem("cartItems");
    window.dispatchEvent(new Event("cartUpdated"));
  }
}, [status, session]);


useEffect(() => {
  const handleCartUpdate = () => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems') || '[]')
    setCart(savedCart)
  }

  // Listen for cart updates (including logout)
  window.addEventListener('cartUpdated', handleCartUpdate)
  
  return () => {
    window.removeEventListener('cartUpdated', handleCartUpdate)
  }
}, [])

const handleLogout = async () => {
  setUserMenuOpen(false);
  localStorage.removeItem("cartItems");
  window.dispatchEvent(new Event("cartUpdated"));
  await signOut({ redirect: false });
  router.refresh();
};


  const menuItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "products", href: "/products" },
    { key: "gallery", href: "/gallery" },
    { key: "contact", href: "/contact" },
  ]

  if (!isMounted) return null

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-1"
          : "bg-white/95 backdrop-blur-sm py-2"
      }`}
    >
      <div className="container flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 z-10">
          <div className="relative h-10 w-10">
            <Image src="/images/brana-logo.png" alt="ሜላድ ብራና Logo" fill className="object-contain" />
          </div>
          <div className="hidden sm:block leading-tight">
            <span className="block text-sm font-medium text-primary">
              ሜላድ ጥንታዊ የብራና ጽሑፍ ማእከል
            </span>
            <span className="block text-xs text-gray-600">Melad Ancient Parchment Books</span>
          </div>
        </Link>

        <div className="flex items-center space-x-1">
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-5">
            {menuItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
              return (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 ${
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-gray-700 hover:bg-gray-100 hover:text-primary"
                  }`}
                >
                  {t(item.key)}
                </Link>
              )
            })}

            {status === "authenticated" && session?.user ? (
              <>
                {/* User Menu */}
                <div className="relative ml-1 user-menu-container">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation()
                      setUserMenuOpen(!userMenuOpen)
                    }}
                    className="text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md px-2.5 py-1.5"
                  >
                    <User className="h-3.5 w-3.5 mr-1" />
                    <span>{session.user.name?.split(' ')[0]}</span>
                    <ChevronDown className={`h-3.5 w-3.5 ml-0.5 transition-transform duration-200 ${userMenuOpen ? "rotate-180" : ""}`} />
                  </Button>

                  <AnimatePresence>
                    {userMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-1 w-48 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="py-1">
                          <div className="px-3 py-2 text-xs text-gray-500 border-b">
                            {session.user.email}
                          </div>
                          
                          <Link
                            href="/orders"
                            className="flex items-center justify-between w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <div className="flex items-center">
                              <Package className="h-3.5 w-3.5 mr-2" />
                              My Orders
                            </div>
                            <ChevronRight className="h-3 w-3" />
                          </Link>
                          
                          <Link
                            href="/account"
                            className="flex items-center justify-between w-full px-3 py-2 text-xs text-gray-700 hover:bg-gray-50 transition-colors"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <div className="flex items-center">
                              <Settings className="h-3.5 w-3.5 mr-2" />
                              Account Settings
                            </div>
                            <ChevronRight className="h-3 w-3" />
                          </Link>
                          
                          <button
                            onClick={handleLogout}
                            className="flex items-center justify-between w-full px-3 py-2 text-xs text-red-600 hover:bg-gray-50 transition-colors"
                          >
                            <div className="flex items-center">
                              <LogOut className="h-3.5 w-3.5 mr-2" />
                              Logout
                            </div>
                            <ChevronRight className="h-3 w-3" />
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              /* Auth Modal for non-authenticated users */
              <Dialog open={openAuth} onOpenChange={setOpenAuth}>
                <DialogTrigger asChild>
                  <Button className="px-3 py-1.5 text-xs font-medium rounded-md bg-primary text-white hover:bg-primary/90">
                    {t("login")}
                  </Button>
                </DialogTrigger>
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

                          const result = await signIn("credentials", { 
  redirect: false, 
  email, 
  password 
})
                          
if (result?.error) {
  alert(result.error)
} else {
  setOpenAuth(false)
  router.refresh()
}

                        }}
                        className="space-y-3"
                      >
                        <input 
                          name="email" 
                          type="email" 
                          placeholder="Email" 
                          className="w-full rounded-md border px-3 py-2 text-sm" 
                          required
                        />
                        <input 
                          name="password" 
                          type="password" 
                          placeholder="Password" 
                          className="w-full rounded-md border px-3 py-2 text-sm" 
                          required
                        />
                        <Button type="submit" className="w-full bg-primary text-white">
                          {t("login")}
                        </Button>
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

let data: any = {}
try {
  data = await res.json()
} catch {
  data = {}
}

if (res.ok) {
  alert("Signup successful! Please login.")
  // Switch to login tab
  const loginTab = document.querySelector('[value="login"]') as HTMLElement
  if (loginTab) loginTab.click()
} else {
  alert(data?.error || `Signup failed (status ${res.status})`)
}
                        }}
                        className="space-y-3"
                      >
                        <input 
                          name="name" 
                          type="text" 
                          placeholder="Full Name" 
                          className="w-full rounded-md border px-3 py-2 text-sm" 
                          required
                        />
                        <input 
                          name="email" 
                          type="email" 
                          placeholder="Email" 
                          className="w-full rounded-md border px-3 py-2 text-sm" 
                          required
                        />
                        <input 
                          name="password" 
                          type="password" 
                          placeholder="Password" 
                          className="w-full rounded-md border px-3 py-2 text-sm" 
                          required
                          minLength={6}
                        />
                        <Button type="submit" className="w-full bg-primary text-white">
                          {t("signup")}
                        </Button>
                      </form>
                    </TabsContent>
                  </Tabs>
                </DialogContent>
              </Dialog>
            )}

            {/* Language Dropdown */}
            <div className="relative ml-1 language-menu-container">
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
                <ChevronDown className={`h-3.5 w-3.5 ml-0.5 transition-transform duration-200 ${languageMenuOpen ? "rotate-180" : ""}`} />
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
                        className={`flex items-center w-full px-3 py-1.5 text-xs ${language === "en" ? "bg-gray-100 text-primary" : "text-gray-700 hover:bg-gray-50"}`}
                      >
                        English
                      </button>
                      <button
                        onClick={() => {
                          setLanguage("am")
                          setLanguageMenuOpen(false)
                        }}
                        className={`flex items-center w-full px-3 py-1.5 text-xs ${language === "am" ? "bg-gray-100 text-primary" : "text-gray-700 hover:bg-gray-50"}`}
                      >
                        አማርኛ
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            
            <Link href="/cart" className="relative p-2 text-gray-700 hover:text-primary">
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cartCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center space-x-1 md:hidden">
            <Button variant="ghost" size="sm" className="rounded-md hover:bg-gray-100 px-2 py-1.5">
              <Search className="h-4 w-4 text-gray-700" />
            </Button>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="sm" className="rounded-md hover:bg-gray-100 px-2 py-1.5">
                  <Menu className="h-4 w-4 text-gray-700" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-72 border-none">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-6">
                    <Link href="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                      <div className="relative h-10 w-10">
                        <Image src="/images/brana-logo.png" alt="ሜላድ ብራና Logo" fill className="object-contain" />
                      </div>
                      <span className="text-sm font-semibold text-primary">ሜላድ ጥንታዊ የብራና ጽሑፍ ማእከል</span>
                    </Link>
                    <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)} className="rounded-md hover:bg-gray-100 px-2 py-1.5">
                      <X className="h-4 w-4 text-gray-700" />
                    </Button>
                  </div>

                  <div className="flex flex-col space-y-0.5 mt-2">
                    {menuItems.map((item) => {
                      const isActive = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
                      return (
                        <Link key={item.key} href={item.href} onClick={() => setIsOpen(false)} className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${isActive ? "bg-primary/10 text-primary" : "text-gray-700 hover:bg-gray-100 hover:text-primary"}`}>
                          {t(item.key)}
                        </Link>
                      )
                    })}

                    {status === "authenticated" && session?.user ? (
                      <>
                        <div className="px-3 py-2 text-xs text-gray-500 border-t mt-2">
                          Logged in as {session.user.name}
                        </div>
                        <Link href="/orders" onClick={() => setIsOpen(false)} className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Package className="h-4 w-4 mr-2" />
                          My Orders
                        </Link>
                        <Link href="/account" onClick={() => setIsOpen(false)} className="flex items-center px-3 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          <Settings className="h-4 w-4 mr-2" />
                          Account Settings
                        </Link>
                        <button onClick={handleLogout} className="flex items-center px-3 py-2 text-sm text-red-600 hover:bg-gray-100">
                          <LogOut className="h-4 w-4 mr-2" />
                          Logout
                        </button>
                      </>
                    ) : (
                      /* Mobile Auth */
                      <Dialog open={openAuth} onOpenChange={setOpenAuth}>
                        <DialogTrigger asChild>
                          <Button className="w-full justify-center rounded-lg bg-primary hover:bg-primary/90 text-white text-sm py-1.5 mt-2">
                            {t("login")}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>{t("welcomeBack") || "Welcome"}</DialogTitle>
                          </DialogHeader>
                          <Tabs defaultValue="login" className="w-full mt-4">
                            <TabsList className="grid w-full grid-cols-2">
                              <TabsTrigger value="login">{t("login")}</TabsTrigger>
                              <TabsTrigger value="signup">{t("createAccount")}</TabsTrigger>
                            </TabsList>
                            {/* Forms same as desktop */}
                            <TabsContent value="login" className="mt-4">
                              <form
                                onSubmit={async (e) => {
                                  e.preventDefault()
                                  const form = e.currentTarget as any
                                  const email = form.email.value
                                  const password = form.password.value
                                  const res = await signIn("credentials", { redirect: false, email, password })
                                  if (res?.error) alert(res.error)
                                  else {
                                    setOpenAuth(false)
                                    router.refresh() // Refresh to update auth state
                                  }
                                }}
                                className="space-y-3"
                              >
                                <input name="email" type="email" placeholder="Email" className="w-full rounded-md border px-3 py-2 text-sm" />
                                <input name="password" type="password" placeholder="Password" className="w-full rounded-md border px-3 py-2 text-sm" />
                                <Button type="submit" className="w-full bg-primary text-white">{t("login")}</Button>
                              </form>
                            </TabsContent>
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
                                  else alert(data.error || "Signup failed")
                                }}
                                className="space-y-3"
                              >
                                <input name="name" type="text" placeholder="Full Name" className="w-full rounded-md border px-3 py-2 text-sm" />
                                <input name="email" type="email" placeholder="Email" className="w-full rounded-md border px-3 py-2 text-sm" />
                                <input name="password" type="password" placeholder="Password" className="w-full rounded-md border px-3 py-2 text-sm" />
                                <Button type="submit" className="w-full bg-primary text-white">{t("signup")}</Button>
                              </form>
                            </TabsContent>
                          </Tabs>
                        </DialogContent>
                      </Dialog>
                    )}

                    <Button
                      variant="outline"
                      onClick={() => setLanguage(language === "en" ? "am" : "en")}
                      className="w-full justify-center rounded-lg border-gray-200 text-gray-700 text-sm py-1.5 mt-2"
                    >
                      <Globe className="h-3.5 w-3.5 mr-2" />
                      {language === "en" ? "አማርኛ" : "English"}
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