"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useSession } from "next-auth/react"

import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Filter,
  Search,
  Grid3X3,
  List,
  Eye,
  ArrowRight,
  Sparkles,
  X,
  CheckCircle,
} from "lucide-react"

export default function ProductsPage() {
  const { language } = useLanguage()
  const { data: session } = useSession()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")
  const [filterCategory, setFilterCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<any[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
  const [notificationProduct, setNotificationProduct] = useState("")

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem('cartItems') || '[]')
    setCart(savedCart)
  }, [])

  const categories = [
    { id: "all", label: language === "en" ? "All Products" : "ሁሉም ምርቶች", count: 24 },
    { id: "manuscripts", label: language === "en" ? "Manuscripts" : "ብራናዎች", count: 12 },
    { id: "artwork", label: language === "en" ? "Sacred Artwork" : "ቅዱስ ስዕል", count: 8 },
    { id: "restoration", label: language === "en" ? "Restoration" : "እድሳት", count: 4 },
    { id: "custom", label: language === "en" ? "Custom Orders" : "ልዩ ትዕዛዞች", count: 6 },
    { id: "educational", label: language === "en" ? "Educational" : "ትምህርታዊ", count: 3 },
  ]

  const products = [
    {
      id: 1,
      title: language === "en" ? "Ge'ez Prayer Book" : "ተአምረ ማርያም",
      description:
        language === "en"
          ? "A beautifully crafted prayer book written in traditional Ge'ez script on authentic parchment."
          : "በባህላዊ የግዕዝ ፊደል በእውነተኛ ብራና ላይ በሚያምር ሁኔታ የተሰራ የጸሎት መጽሐፍ።",
      price: 450,
      originalPrice: 500,
      category: "manuscripts",
      image: "/images/manuscript-book1.png",
      rating: 4.9,
      reviews: 23,
      badge: language === "en" ? "Best Seller" : "በጣም ተሽጦ",
      inStock: true,
      featured: true,
      tags: ["traditional", "prayer", "geez"],
      specifications: { pages: 120, size: "A4", material: "Goat Parchment", binding: "Traditional Leather" },
    },
    // ... add other products as in your code
  ]

  const filteredProducts = products.filter((product) => {
    const matchesCategory = filterCategory === "all" || product.category === filterCategory
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1]
    const matchesSearch =
      searchQuery === "" ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesPrice && matchesSearch
  })

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low": return a.price - b.price
      case "price-high": return b.price - a.price
      case "rating": return b.rating - a.rating
      case "newest": return b.id - a.id
      default: return b.featured ? 1 : -1
    }
  })

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId])
  }

  const addToCart = (product: any) => {
    const cartItem = { productId: product.id, name: product.title, price: product.price, quantity: 1, image: product.image }
    let currentCart = JSON.parse(localStorage.getItem("cartItems") || "[]")
    const index = currentCart.findIndex((item: any) => item.productId === product.id)
    if (index >= 0) currentCart[index].quantity += 1
    else currentCart.push(cartItem)
    localStorage.setItem("cartItems", JSON.stringify(currentCart))
    setCart(currentCart)
    setNotificationProduct(product.title)
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  const featuredProducts = products.filter(p => p.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white ml-9 mr-9">
      {/* Cart Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: -100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed top-4 right-4 z-50 bg-green-500 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3"
          >
            <CheckCircle className="h-6 w-6" />
            <div>
              <p className="font-semibold">{language === "en" ? "Added to cart!" : "ወደ ጋሪ ታክሏል!"}</p>
              <p className="text-sm opacity-90">{notificationProduct}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Featured Products Section */}
      <section id="featured-products" className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold mb-8">{language === "en" ? "Featured Products" : "የተመረጡ ምርቶች"}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden shadow-lg group">
                <div className="relative aspect-[4/3]">
                  <Image src={product.image} alt={product.title} fill className="object-cover" />
                </div>
                <CardContent>
                  <h3 className="font-bold">{product.title}</h3>
                  <p>{product.description}</p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-primary font-bold">{product.price}</span>
                    <Button size="sm" onClick={() => addToCart(product)}>
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid/List */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            <Input
              placeholder={language === "en" ? "Search products..." : "ምርቶችን ይፈልጉ..."}
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="mb-4 lg:mb-0"
            />
            <div className="flex items-center space-x-2">
              <Button onClick={() => setViewMode("grid")}><Grid3X3 /></Button>
              <Button onClick={() => setViewMode("list")}><List /></Button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={viewMode}
              className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}
            >
              {sortedProducts.map(product => (
                <Card key={product.id} className="shadow-lg group">
                  <div className="relative aspect-[4/3]">
                    <Image src={product.image} alt={product.title} fill className="object-cover" />
                  </div>
                  <CardContent>
                    <h3 className="font-bold">{product.title}</h3>
                    <p className="line-clamp-2">{product.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-primary font-bold">{product.price}</span>
                      <Button size="sm" onClick={() => addToCart(product)}>
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
