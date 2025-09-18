"use client"

import Link from "next/link"
import { useState } from "react"

import CartNotification from "@/components/Added-to-Cart"
import { useRouter } from "next/navigation"


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
} from "lucide-react"

export default function ProductsPage() {
  const { language } = useLanguage()
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("popular")
  const [filterCategory, setFilterCategory] = useState("all")
  const [priceRange, setPriceRange] = useState([0, 2000])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [favorites, setFavorites] = useState<number[]>([])
  const [cart, setCart] = useState<number[]>([])
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [showNotification, setShowNotification] = useState(false)
const [notificationProduct, setNotificationProduct] = useState("")
const router = useRouter()

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
      title: language === "en" ? "Ge'ez Prayer Book" : "ተአምረ ማርያም ",
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
      specifications: {
        pages: 120,
        size: "A4",
        material: "Goat Parchment",
        binding: "Traditional Leather",
      },
    },
    {
      id: 2,
      title: language === "en" ? "Illuminated Gospel" : "በሐረግ የተሰራ ወንጌል",
      description:
        language === "en"
          ? "Richly decorated gospel manuscript featuring vibrant colors and intricate Ethiopian patterns."
          : "ደማቅ ቀለሞችን እና ውስብስብ የኢትዮጵያ ንድፎችን ያካተተ በሀብት የተሰራ የወንጌል ብራና።",
      price: 850,
      originalPrice: 950,
      category: "manuscripts",
      image: "/images/manuscript-open1.png",
      rating: 5.0,
      reviews: 18,
      badge: language === "en" ? "Premium" : "ከፍተኛ ጥራት",
      inStock: true,
      featured: true,
      tags: ["illuminated", "gospel", "premium"],
      specifications: {
        pages: 200,
        size: "A3",
        material: "Premium Parchment",
        binding: "Gold-tooled Leather",
      },
    },
    {
      id: 3,
      title: language === "en" ? "Sacred Icon Collection" : "የቅዱሳን ምስሎች ስብስብ",
      description:
        language === "en"
          ? "Hand-painted Ethiopian Orthodox icons on parchment using traditional techniques and natural pigments."
          : "በባህላዊ ቴክኒኮች እና ተፈጥሯዊ ቀለሞች በብራና ላይ በእጅ የተሳሉ የኢትዮጵያ ኦርቶዶክስ ምስሎች።",
      price: 320,
      category: "artwork",
      image: "/images/manuscript-madonna.png",
      rating: 4.8,
      reviews: 31,
      badge: language === "en" ? "Handcrafted" : "በእጅ የተሰራ",
      inStock: true,
      featured: false,
      tags: ["icons", "orthodox", "handpainted"],
      specifications: {
        pieces: 5,
        size: "Various",
        material: "Parchment",
        technique: "Natural Pigments",
      },
    },
    {
      id: 4,
      title: language === "en" ? "Decorative Harag Patterns" : "ጌጣጌጥ ሐረግ ንድፎች",
      description:
        language === "en"
          ? "Intricate Ethiopian knotwork patterns and decorative borders for manuscript enhancement."
          : "ለብራና ማሻሻያ ውስብስብ የኢትዮጵያ ሐረግ ንድፎች እና ጌጣጌጥ ድንበሮች።",
      price: 180,
      category: "artwork",
      image: "/images/manuscript-page.png",
      rating: 4.7,
      reviews: 15,
      badge: language === "en" ? "Traditional" : "ባህላዊ",
      inStock: true,
      featured: false,
      tags: ["patterns", "decorative", "borders"],
      specifications: {
        patterns: 12,
        size: "A4",
        material: "Parchment",
        style: "Traditional Knotwork",
      },
    },
    {
      id: 5,
      title: language === "en" ? "Custom Manuscript Commission" : "ልዩ የብራና ትዕዛዝ",
      description:
        language === "en"
          ? "Personalized manuscript created according to your specifications with custom text and illustrations."
          : "እንደ ፍላጎትዎ ልዩ ጽሑፍ እና ስዕሎች ያሉት የተዘጋጀ ልዩ ብራና።",
      price: 1200,
      category: "custom",
      image: "/images/manuscript-text.png",
      rating: 5.0,
      reviews: 8,
      badge: language === "en" ? "Custom Made" : "በትዕዛዝ የሚሰራ",
      inStock: true,
      featured: true,
      tags: ["custom", "personalized", "commission"],
      specifications: {
        pages: "Variable",
        size: "Custom",
        material: "Premium Parchment",
        delivery: "4-6 weeks",
      },
    },
    {
      id: 6,
      title: language === "en" ? "Manuscript Restoration Service" : "የብራና እድሳት አገልግሎት",
      description:
        language === "en"
          ? "Professional restoration of ancient manuscripts preserving historical value and ensuring longevity."
          : "ታሪካዊ ዋጋን በመጠበቅ እና ረጅም ዕድሜን በማረጋገጥ የጥንታዊ ብራናዎች ሙያዊ እድሳት።",
      price: 300,
      category: "restoration",
      image: "/images/manuscript-closed.png",
      rating: 4.9,
      reviews: 12,
      badge: language === "en" ? "Expert Care" : "ባለሙያ እንክብካቤ",
      inStock: true,
      featured: false,
      tags: ["restoration", "conservation", "repair"],
      specifications: {
        assessment: "Free",
        timeline: "2-3 weeks",
        warranty: "5 years",
        expertise: "Master Craftsmen",
      },
    },
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
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "newest":
        return b.id - a.id
      default:
        return b.featured ? 1 : -1
    }
  })

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

// Update the addToCart function in your page.tsx
const addToCart = async (productId: number, productName: string) => {
  try {
    // Get the product details
    const product = products.find(p => p.id === productId)
    if (!product) return
    
    // Create cart item object
    const cartItem = {
      id: product.id.toString(),
      productId: product.id.toString(),
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1
    }

    // Update local storage first for instant UI response
    const currentCart = JSON.parse(localStorage.getItem('cartItems') || '[]')
    
    // Check if product already exists in cart
    const existingItemIndex = currentCart.findIndex((item: any) => item.productId === product.id.toString())
    
    if (existingItemIndex >= 0) {
      // Increase quantity if already in cart
      currentCart[existingItemIndex].quantity += 1
    } else {
      // Add new item to cart
      currentCart.push(cartItem)
    }
    
    localStorage.setItem('cartItems', JSON.stringify(currentCart))
    
    // Update local state for UI
    setCart(currentCart.map((item: any) => item.id))
    
    // Show notification
    setNotificationProduct(productName)
    setShowNotification(true)
    
    // Dispatch event to update header badge
    window.dispatchEvent(new Event('cartUpdated'))
    
    // Sync with server if user is authenticated
    if (status === "authenticated") {
      try {
        const res = await fetch("/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ 
            productId: product.id.toString(),
            quantity: 1
          }),
        })
        
        if (!res.ok) {
          console.error("Failed to sync cart with server")
          // Revert local changes if server sync fails
          const revertedCart = currentCart.filter((item: any) => 
            item.productId !== product.id.toString() || 
            (item.productId === product.id.toString() && item.quantity > 1) ?
            {...item, quantity: item.quantity - 1} : null
          )
          localStorage.setItem('cartItems', JSON.stringify(revertedCart))
          setCart(revertedCart.map((item: any) => item.id))
        }
      } catch (error) {
        console.error("Error syncing cart with server:", error)
        // Revert local changes on error
        const revertedCart = currentCart.filter((item: any) => 
          item.productId !== product.id.toString()
        )
        localStorage.setItem('cartItems', JSON.stringify(revertedCart))
        setCart(revertedCart.map((item: any) => item.id))
      }
    }
  } catch (error) {
    console.error(error)
    alert(language === "en" ? "Something went wrong" : "ስህተት ተፈጥሯል")
  }
}


  const featuredProducts = products.filter((product) => product.featured)

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white ml-9 mr-9">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="absolute inset-0 bg-[url('/images/manuscript-pattern.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

        <div className="container relative z-10 flex h-full flex-col items-center justify-center space-y-6 text-center px-4">
        

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl max-w-4xl"
          >
            {language === "en" ? "Authentic Ethiopian Manuscripts & Art" : "እውነተኛ የኢትዮጵያ ብራናዎች እና ጥበብ"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[800px] text-white/90 md:text-xl"
          >
            {language === "en"
              ? "Discover our collection of handcrafted manuscripts, sacred artwork, and restoration services that preserve Ethiopia's rich cultural heritage."
              : "የኢትዮጵያን ሀብታም የባህል ቅርስ የሚጠብቁ በእጅ የተሰሩ ብራናዎች፣ ቅዱስ ጥበብ እና የእድሳት አገልግሎቶች ስብስባችንን ይመልከቱ።"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
           <Button
  variant="outline"
  className="h-12 px-8 bg-white text-primary hover:bg-white/10 rounded-full text-base shadow-lg"
  onClick={() => {
    const element = document.getElementById("featured-products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }}
>
  {language === "en" ? "Shop Now" : "አሁን ይግዙ"}
</Button>
            <Button
              variant="outline"
              className="h-12 px-8 border-white/30  text-primary  hover:bg-white/10 rounded-full text-base"
            >
              {language === "en" ? "View Catalog" : "ካታሎግ ይመልከቱ"}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Products */}
<section id="featured-products" className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              <span>{language === "en" ? "Featured Collection" : "የተመረጡ ስብስቦች"}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4"
            >
              {language === "en" ? "Our Finest Creations" : "ምርጥ ስራዎቻችን "}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Badges */}
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-primary/90 text-white">{product.badge}</Badge>
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900"
                        onClick={() => toggleFavorite(product.id)}
                      >
                        <Heart
                          className={`h-4 w-4 {favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""}`}
                        />
                      </Button>
                      <Button
                        size="icon"
                        variant="outline"
                        className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900"
                      >
                        <Share2 className="h-4 w-4" />
                      </Button>
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900"
                            onClick={() => setSelectedProduct(product)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </DialogTrigger>
                      </Dialog>
                    </div>

                    {/* Quick Add to Cart */}
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <Button
                        className="w-full bg-primary hover:bg-primary/90 text-white rounded-full"
                        onClick={() => addToCart(product.id, product.title)}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {language === "en" ? "Add to Cart" : "ወደ ጋሪ ጨምር"}
                      </Button>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 {
                              i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm text-slate-500 ml-2">({product.reviews})</span>
                      </div>
                      {product.inStock ? (
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {language === "en" ? "In Stock" : "በመጋዘን አለ"}
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-red-600 border-red-600">
                          {language === "en" ? "Out of Stock" : "ከመጋዘን ወጥቷል"}
                        </Badge>
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-primary transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-slate-600 text-sm mb-4 line-clamp-2">{product.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-2xl font-bold text-primary">{product.price}</span>
                        {product.originalPrice && (
                          <span className="text-lg text-slate-400 line-through">{product.originalPrice}</span>
                        )}
                      </div>
                      <Button variant="outline" size="sm" className="rounded-full">
                        {language === "en" ? "View Details" : "ዝርዝር ይመልከቱ"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Catalog */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          {/* Header with Search and Filters */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder={language === "en" ? "Search products..." : "ምርቶችን ይፈልጉ..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-full border-slate-200 focus:border-primary"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 h-12 rounded-full">
                  <SelectValue placeholder={language === "en" ? "Sort by" : "ደርድር"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">{language === "en" ? "Most Popular" : "በጣም ተወዳጅ"}</SelectItem>
                  <SelectItem value="price-low">
                    {language === "en" ? "Price: Low to High" : "ዋጋ: ዝቅተኛ ወደ ከፍተኛ"}
                  </SelectItem>
                  <SelectItem value="price-high">
                    {language === "en" ? "Price: High to Low" : "ዋጋ: ከፍተኛ ወደ ዝቅተኛ"}
                  </SelectItem>
                  <SelectItem value="rating">{language === "en" ? "Highest Rated" : "ከፍተኛ ደረጃ"}</SelectItem>
                  <SelectItem value="newest">{language === "en" ? "Newest First" : "አዲስ መጀመሪያ"}</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center space-x-2">
                <Button
                  variant={viewMode === "grid" ? "default" : "outline"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "outline"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => setViewMode("list")}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="lg:hidden rounded-full"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {language === "en" ? "Filters" : "ማጣሪያዎች"}
              </Button>
            </div>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar Filters */}
            <div className={`lg:block {isFilterOpen ? "block" : "hidden"} space-y-6`}>
              <Card className="p-6 border-0 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-4">{language === "en" ? "Categories" : "ምድቦች"}</h3>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setFilterCategory(category.id)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors {
                        filterCategory === category.id
                          ? "bg-primary/10 text-primary"
                          : "text-slate-600 hover:bg-slate-100"
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span>{category.label}</span>
                        <span className="text-sm text-slate-400">{category.count}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  {language === "en" ? "Price Range" : "የዋጋ ክልል"}
                </h3>
                <div className="space-y-4">
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={2000}
                    min={0}
                    step={50}
                    className="w-full"
                  />
                  <div className="flex items-center justify-between text-sm text-slate-600">
                    <span>{priceRange[0]}</span>
                    <span>{priceRange[1]}</span>
                  </div>
                </div>
              </Card>

              <Card className="p-6 border-0 shadow-lg">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  {language === "en" ? "Quick Filters" : "ፈጣን ማጣሪያዎች"}
                </h3>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-slate-300" />
                    <span className="text-slate-600">{language === "en" ? "In Stock" : "በመጋዘን አለ"}</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-slate-300" />
                    <span className="text-slate-600">{language === "en" ? "On Sale" : "በቅናሽ"}</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-slate-300" />
                    <span className="text-slate-600">{language === "en" ? "Featured" : "የተመረጡ"}</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded border-slate-300" />
                    <span className="text-slate-600">{language === "en" ? "Custom Made" : "በትዕዛዝ የሚሰራ"}</span>
                  </label>
                </div>
              </Card>
            </div>

            {/* Products Grid */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <p className="text-slate-600">
                  {language === "en" ? "Showing" : "እያሳየ"} {sortedProducts.length} {language === "en" ? "of" : "ከ"}{" "}
                  {products.length} {language === "en" ? "products" : "ምርቶች"}
                </p>
                {cart.length > 0 && (
                  <Badge variant="outline" className="text-primary border-primary">
                    {cart.length} {language === "en" ? "items in cart" : "እቃዎች በጋሪ ውስጥ"}
                  </Badge>
                )}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={viewMode}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className={viewMode === "grid" ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" : "space-y-6"}
                >
                  {sortedProducts.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                    >
                      {viewMode === "grid" ? (
                        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={product.image || "/placeholder.svg"}
                              alt={product.title}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute top-4 left-4">
                              <Badge className="bg-primary/90 text-white">{product.badge}</Badge>
                            </div>
                            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <Button
                                size="icon"
                                variant="outline"
                                className="rounded-full bg-white/20 backdrop-blur-sm"
                                onClick={() => toggleFavorite(product.id)}
                              >
                                <Heart
                                  className={`h-4 w-4 {
                                    favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-white"
                                  }`}
                                />
                              </Button>
                            </div>
                          </div>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center space-x-1">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 {
                                      i < Math.floor(product.rating)
                                        ? "fill-yellow-400 text-yellow-400"
                                        : "text-gray-300"
                                    }`}
                                  />
                                ))}
                                <span className="text-xs text-slate-500">({product.reviews})</span>
                              </div>
                            </div>
                            <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">{product.title}</h3>
                            <p className="text-slate-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg font-bold text-primary">{product.price}</span>
                                {product.originalPrice && (
                                  <span className="text-sm text-slate-400 line-through">{product.originalPrice}</span>
                                )}
                              </div>
                              <Button size="sm" className="rounded-full" onClick={() => addToCart(product.id, product.title)}>
                                <ShoppingCart className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                          <div className="flex">
                            <div className="relative w-48 h-32 flex-shrink-0">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                              <div className="absolute top-2 left-2">
                                <Badge className="bg-primary/90 text-white text-xs">{product.badge}</Badge>
                              </div>
                            </div>
                            <div className="flex-1 p-4">
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center space-x-1 mb-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`h-3 w-3 {
                                          i < Math.floor(product.rating)
                                            ? "fill-yellow-400 text-yellow-400"
                                            : "text-gray-300"
                                        }`}
                                      />
                                    ))}
                                    <span className="text-xs text-slate-500">({product.reviews})</span>
                                  </div>
                                  <h3 className="font-bold text-slate-900 mb-2">{product.title}</h3>
                                  <p className="text-slate-600 text-sm mb-3 line-clamp-2">{product.description}</p>
                                  <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                      <span className="text-xl font-bold text-primary">{product.price}</span>
                                      {product.originalPrice && (
                                        <span className="text-sm text-slate-400 line-through">
                                        {product.originalPrice}
                                        </span>
                                      )}
                                    </div>
                                    {product.inStock ? (
                                      <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                                        {language === "en" ? "In Stock" : "በመጋዘን አለ"}
                                      </Badge>
                                    ) : (
                                      <Badge variant="outline" className="text-red-600 border-red-600 text-xs">
                                        {language === "en" ? "Out of Stock" : "ከመጋዘን ወጥቷል"}
                                      </Badge>
                                    )}
                                  </div>
                                </div>
                                <div className="flex flex-col space-y-2 ml-4">
                                  <Button
                                    size="icon"
                                    variant="outline"
                                    className="rounded-full"
                                    onClick={() => toggleFavorite(product.id)}
                                  >
                                    <Heart
                                      className={`h-4 w-4 {
                                        favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""
                                      }`}
                                    />
                                  </Button>
                                  <Button size="icon" className="rounded-full" onClick={() => addToCart(product.id, product.title)}>
                                    <ShoppingCart className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Card>
                      )}
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>

              {sortedProducts.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 mb-2">
                    {language === "en" ? "No products found" : "ምንም ምርቶች አልተገኙም"}
                  </h3>
                  <p className="text-slate-600 mb-4">
                    {language === "en"
                      ? "Try adjusting your search or filter criteria"
                      : "የፍለጋ ወይም የማጣሪያ መስፈርቶችዎን ማስተካከል ይሞክሩ"}
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("")
                      setFilterCategory("all")
                      setPriceRange([0, 2000])
                    }}
                  >
                    {language === "en" ? "Clear Filters" : "ማጣሪያዎችን አጽዳ"}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
          <DialogContent className="max-w-4xl p-0">
            <div className="grid md:grid-cols-2 gap-0">
              <div className="relative aspect-square">
                <Image
                  src={selectedProduct.image || "/placeholder.svg"}
                  alt={selectedProduct.title}
                  fill
                  className="object-cover"
                />
                <Button
                  size="icon"
                  variant="outline"
                  className="absolute top-4 right-4 rounded-full bg-white/20 backdrop-blur-sm"
                  onClick={() => setSelectedProduct(null)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-4">
                  <Badge className="bg-primary/90 text-white">{selectedProduct.badge}</Badge>
                  {selectedProduct.inStock ? (
                    <Badge variant="outline" className="text-green-600 border-green-600">
                      {language === "en" ? "In Stock" : "በመጋዘን አለ"}
                    </Badge>
                  ) : (
                    <Badge variant="outline" className="text-red-600 border-red-600">
                      {language === "en" ? "Out of Stock" : "ከመጋዘን ወጥቷል"}
                    </Badge>
                  )}
                </div>

                <h2 className="text-2xl font-bold text-slate-900 mb-4">{selectedProduct.title}</h2>

                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 {
                        i < Math.floor(selectedProduct.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-slate-500 ml-2">({selectedProduct.reviews} reviews)</span>
                </div>

                <p className="text-slate-600 mb-6">{selectedProduct.description}</p>

                <div className="space-y-4 mb-6">
                  <h3 className="font-semibold text-slate-900">{language === "en" ? "Specifications" : "ዝርዝሮች"}</h3>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    {Object.entries(selectedProduct.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-slate-500 capitalize">{key}:</span>
                        <span className="text-slate-900">{String(value)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center space-x-4 mb-6">
                  <div className="flex items-center space-x-2">
                    <span className="text-3xl font-bold text-primary">{selectedProduct.price}</span>
                    {selectedProduct.originalPrice && (
                      <span className="text-xl text-slate-400 line-through">{selectedProduct.originalPrice}</span>
                    )}
                  </div>
                </div>

                <div className="flex space-x-4">
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90 text-white"
                    onClick={() => addToCart(selectedProduct.id, selectedProduct.title)}
                  >
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    {language === "en" ? "Add to Cart" : "ወደ ጋሪ ጨምር"}
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => toggleFavorite(selectedProduct.id)}>
                    <Heart
                      className={`h-4 w-4 {favorites.includes(selectedProduct.id) ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </Button>
                  <Button variant="outline" size="icon">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/manuscript-pattern.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

        <div className="container px-4 md:px-6 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              {language === "en" ? "Need Something Custom?" : "ልዩ ነገር ይፈልጋሉ?"}
            </h2>
            <p className="text-white/90 text-lg mb-8">
              {language === "en"
                ? "Our master craftsmen can create bespoke manuscripts and artwork tailored to your specific requirements."
                : "ዋና ባለሙያዎቻችን እንደ ልዩ ፍላጎትዎ የተዘጋጁ ልዩ ብራናዎችን እና ጥበብ ሥራዎችን መፍጠር ይችላሉ።"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products">
    <Button
      variant="outline"
      className="h-12 px-8 border-white/30 text-primary hover:bg-white/10 rounded-full text-base"
    >
      {language === "en" ? "Request Custom Order" : "ልዩ ትዕዛዝ ይጠይቁ"}
    </Button>
  </Link>
              <Button
                variant="outline"
                className="h-12 px-8 border-white/30 text-primary hover:bg-white/10 rounded-full text-base"
              >
                {language === "en" ? "View Portfolio" : "ፖርትፎሊዮ ይመልከቱ"}
              </Button>
            </div>
            
          </div>
        </div>
      </section>
    </div>
  )
}
