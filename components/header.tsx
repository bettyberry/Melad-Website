"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "./language-provider"
import {
  ShoppingCart,
  User,
  LogOut,
  Package,
  Settings,
  Globe,
  ChevronDown,
  Check,
  LayoutDashboard,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname, useRouter } from "next/navigation"
import { signIn, signOut, useSession } from "next-auth/react"

type CartItem = {
  productId: string
  name?: string
  quantity: number
  price?: number
}

export default function Header() {
  const { language, setLanguage, t } = useLanguage()
  const [scrolled, setScrolled] = useState(false)
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [openAuth, setOpenAuth] = useState(false)
  const [isSignup, setIsSignup] = useState(false)
  const [cartCount, setCartCount] = useState(0)
  const [adminMode, setAdminMode] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const { data: session, status } = useSession()
  const pathname = usePathname()
  const router = useRouter()

  const mainMenuItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "products", href: "/products" },
  ]
  const moreMenuItems = [
    { key: "gallery", href: "/gallery" },
    { key: "contact", href: "/contact" },
  ]

  // Check if user is admin
  const isAdmin = session?.user?.role === "admin" || session?.user?.email === "admin@example.com"

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const updateCartCount = async () => {
      if (session?.user?.id) {
        try {
          const res = await fetch(`/api/cart/get?userId=${session.user.id}`)
          if (res.ok) {
            const data = await res.json()
            setCartCount(data.items?.length || 0)
          }
        } catch (error) {
          console.error("Failed to fetch cart:", error)
          // Fallback to localStorage if API fails
          const storedCart = localStorage.getItem("cartItems")
          setCartCount(storedCart ? JSON.parse(storedCart).length : 0)
        }
      } else {
        const storedCart = localStorage.getItem("cartItems")
        setCartCount(storedCart ? JSON.parse(storedCart).length : 0)
      }
    }

    window.addEventListener("cartUpdated", updateCartCount)
    updateCartCount()

    return () => window.removeEventListener("cartUpdated", updateCartCount)
  }, [session])

  // Merge cart after login
  useEffect(() => {
    if (!session?.user?.id) return
    
    const mergeAndLoadCart = async () => {
      const localCart: CartItem[] = JSON.parse(localStorage.getItem("cartItems") || "[]")
      
      if (localCart.length > 0) {
        try {
          await fetch("/api/cart/merge", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: session.user.id, items: localCart }),
          })
          localStorage.removeItem("cartItems")
        } catch (error) {
          console.error("Failed to merge cart:", error)
        }
      }
      
      // Update cart count after merge
      window.dispatchEvent(new Event("cartUpdated"))
    }

    mergeAndLoadCart()
  }, [session])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    setUserMenuOpen(false)
    
    try {
      // Clear local storage first
      localStorage.removeItem("cartItems")
      
      // Sign out
      await signOut({ 
        redirect: false,
        callbackUrl: "/"
      })
      
      // Reset cart count
      setCartCount(0)
      
      // Force a refresh to update the session state
      router.refresh()
      
      // Navigate to home page
      router.push("/")
      
    } catch (error) {
      console.error("Logout failed:", error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement & { 
      email: { value: string }; 
      password: { value: string } 
    }
    const email = form.email.value
    const password = form.password.value
    
    try {
      const res = await signIn("credentials", { 
        redirect: false, 
        email, 
        password 
      })
      
      if (res?.error) {
        alert(res.error)
        return
      }
      
      setOpenAuth(false)
      router.refresh()
      if (adminMode) router.push("/admin/dashboard")
    } catch (error) {
      alert("Login failed")
    }
  }

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget as HTMLFormElement & {
      name: { value: string }
      email: { value: string }
      password: { value: string }
    }
    const name = form.name.value
    const email = form.email.value
    const password = form.password.value

    try {
      // Simulate signup - replace with actual API call
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      })

      if (res.ok) {
        alert(`Account created for ${name}`)
        setIsSignup(false)
        // Auto login after signup
        await signIn("credentials", { redirect: false, email, password })
        setOpenAuth(false)
        router.refresh()
      } else {
        alert("Signup failed")
      }
    } catch (error) {
      alert("Signup failed")
    }
  }

  // Add to cart helper
  const addToCart = async (product: CartItem) => {
    if (session?.user?.id) {
      await fetch("/api/cart/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: session.user.id, product }),
      })
    } else {
      const storedCart = localStorage.getItem("cartItems")
      const cart: CartItem[] = storedCart ? JSON.parse(storedCart) : []

      const existing = cart.find((i: CartItem) => i.productId === product.productId)
      if (existing) {
        existing.quantity += product.quantity
      } else {
        cart.push(product)
      }

      localStorage.setItem("cartItems", JSON.stringify(cart))
    }
    window.dispatchEvent(new Event("cartUpdated"))
  }

  if (!isMounted) return null

  // Show loading state during logout
  if (isLoggingOut) {
    return (
      <header className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-md shadow-sm py-1">
        <div className="container flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-12 h-12 bg-gray-200 animate-pulse rounded-full"></div>
            <div className="hidden sm:block">
              <div className="w-32 h-4 bg-gray-200 animate-pulse rounded"></div>
              <div className="w-24 h-3 bg-gray-200 animate-pulse rounded mt-1"></div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-20 h-8 bg-gray-200 animate-pulse rounded"></div>
            <div className="w-8 h-8 bg-gray-200 animate-pulse rounded-full"></div>
          </div>
        </div>
      </header>
    )
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm py-1"
          : "bg-white/95 backdrop-blur-sm pt-2 pb-1"
      }`}
    >
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center space-x-2 z-10">
          <div className="relative w-12 h-12 rounded-full overflow-hidden">
            <Image
              src="/images/brana-logo.png"
              alt="Logo"
              fill
              className="object-cover"
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

        {/* Nav */}
        <nav className="hidden md:flex items-center space-x-5 mx-auto">
          {mainMenuItems.map((item) => {
            const isActive =
              pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href))
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
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMoreMenuOpen(!moreMenuOpen)}
              className="flex items-center text-xs text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md px-2 py-1"
            >
              {t("More")}
              <ChevronDown
                className={`h-3.5 w-3.5 ml-1 transition-transform ${
                  moreMenuOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
            <AnimatePresence>
              {moreMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute mt-1 w-36 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                >
                  {moreMenuItems.map((item) => (
                    <Link
                      key={item.key}
                      href={item.href}
                      onClick={() => setMoreMenuOpen(false)}
                      className="block px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 hover:text-primary"
                    >
                      {t(item.key)}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Admin Dashboard Link - Only visible to admins */}
          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-200 flex items-center ${
                pathname?.startsWith("/admin")
                  ? "bg-blue-100 text-blue-700"
                  : "text-blue-600 hover:bg-blue-50 hover:text-blue-700"
              }`}
            >
              <LayoutDashboard className="h-3.5 w-3.5 mr-1" />
              Dashboard
            </Link>
          )}
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-3">
          {/* Language Switcher */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguageMenuOpen(!languageMenuOpen)}
              className="text-xs font-medium text-gray-700 hover:bg-gray-100 hover:text-primary rounded-md px-2.5 py-1.5"
            >
              <Globe className="h-3.5 w-3.5 mr-1" /> {language === "en" ? "EN" : "አማ"}
              <ChevronDown
                className={`h-3.5 w-3.5 ml-0.5 transition-transform ${
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
                  transition={{ duration: 0.2 }}
                  className="absolute right-0 mt-2 w-36 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                >
                  <button
                    onClick={() => {
                      setLanguage("en")
                      setLanguageMenuOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center ${
                      language === "en" ? "bg-gray-100 text-primary" : "hover:bg-gray-50"
                    }`}
                  >
                    {language === "en" && <Check className="h-3 w-3 mr-2" />} English
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("am")
                      setLanguageMenuOpen(false)
                    }}
                    className={`w-full text-left px-3 py-2 text-sm flex items-center ${
                      language === "am" ? "bg-gray-100 text-primary" : "hover:bg-gray-50"
                    }`}
                  >
                    {language === "am" && <Check className="h-3 w-3 mr-2" />} አማርኛ
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Cart */}
          <div className="relative">
            <Link
              href="/cart"
              className="relative p-2 text-gray-700 hover:text-primary hover:bg-transparent rounded-md transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <motion.span
                  key={cartCount}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 20 }}
                  className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white text-[10px] font-medium"
                >
                  {cartCount}
                </motion.span>
              )}
            </Link>
          </div>

          {/* User Section */}
          {session?.user ? (
            <div className="relative flex items-center space-x-2">
              {/* User Avatar */}
              <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-200">
                <Image
                  src={session.user.image || "/images/default-avatar.png"}
                  alt="User"
                  fill
                  className="object-cover"
                />
              </div>

              {/* User Name - Displayed when logged in */}
              <span className="hidden sm:block text-sm font-medium text-gray-800">
                {session.user.name?.split(" ")[0] || "User"}
              </span>

              {/* Dropdown Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center text-gray-700 hover:text-primary p-1"
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${userMenuOpen ? "rotate-180" : ""}`}
                />
              </Button>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 top-full mt-2 w-44 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 z-50"
                  >
                    {/* Admin Dashboard in dropdown for mobile */}
                    {isAdmin && (
                      <Link 
                        href="/admin/dashboard" 
                        className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 text-blue-600"
                        onClick={() => setUserMenuOpen(false)}
                      >
                        <LayoutDashboard className="h-4 w-4 mr-2" /> Dashboard
                      </Link>
                    )}
                    <Link 
                      href="/profile" 
                      className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 text-gray-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-2" /> Profile
                    </Link>
                    <Link 
                      href="/orders" 
                      className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 text-gray-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Package className="h-4 w-4 mr-2" /> Orders
                    </Link>
                    <Link 
                      href="/settings" 
                      className="flex items-center px-3 py-2 text-sm hover:bg-gray-50 text-gray-700"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4 mr-2" /> Settings
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-3 py-2 text-sm hover:bg-gray-50 text-gray-700"
                      disabled={isLoggingOut}
                    >
                      <LogOut className="h-4 w-4 mr-2" /> 
                      {isLoggingOut ? "Logging out..." : "Logout"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <Button
              onClick={() => {
                setAdminMode(false)
                setOpenAuth(true)
                setIsSignup(false)
              }}
              size="sm"
              className="text-xs"
            >
              {t("login") || "Login"}
            </Button>
          )}
        </div>
      </div>

      {/* Auth Dialog */}
      <Dialog open={openAuth} onOpenChange={setOpenAuth}>
        <DialogContent className="sm:max-w-md rounded-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-lg font-semibold text-gray-800">
              {isSignup ? "Create Your Account" : adminMode ? "Admin Login" : "Welcome Back"}
            </DialogTitle>
          </DialogHeader>

          {!isSignup ? (
            <form onSubmit={handleLogin} className="space-y-4 mt-4">
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
                className="w-full border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-3 py-2 text-sm outline-none transition"
              />
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                className="w-full border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-3 py-2 text-sm outline-none transition"
              />
              <Button type="submit" className="w-full text-sm font-medium">
                {adminMode ? "Login as Admin" : "Login"}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleSignup} className="space-y-4 mt-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                required
                className="w-full border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-3 py-2 text-sm outline-none transition"
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                className="w-full border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-3 py-2 text-sm outline-none transition"
              />
              <input
                type="password"
                name="password"
                placeholder="Create Password"
                required
                className="w-full border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary rounded-md px-3 py-2 text-sm outline-none transition"
              />
              <Button type="submit" className="w-full text-sm font-medium">
                Sign Up
              </Button>
            </form>
          )}

          <div className="mt-6 flex flex-col items-center gap-2 text-xs text-gray-600">
            {!isSignup && (
              <button
                type="button"
                onClick={() => setAdminMode(true)}
                className="text-blue-600 font-medium hover:underline hover:text-blue-700 transition"
              >
                Login as Admin
              </button>
            )}
            <button
              type="button"
              onClick={() => setIsSignup(!isSignup)}
              className="text-gray-700 hover:text-primary font-medium transition"
            >
              {isSignup
                ? "Already have an account? Login"
                : "Don't have an account? Sign up"}
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </header>
  )
}