"use client"

import { useState, useEffect } from "react"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ChevronLeft,
  ChevronRight,
  X,
  ZoomIn,
  Heart,
  Share2,
  Download,
  Info,
  Filter,
  Search,
  Grid3X3,
  Grid2X2,
  LayoutGrid,
  Calendar,
  Eye,
  Bookmark,
  ArrowRight,
  Sparkles,
  Camera,
  Play,
  Pause,
  SkipBack,
  SkipForward,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Define gallery item type
type GalleryItem = {
  id: number
  src: string
  alt: string
  category: string
  title: string
  description: string
  featured?: boolean
  year?: string
  artist?: string
  technique?: string
  dimensions?: string
  tags: string[]
  likes: number
  views: number
}

export default function GalleryPage() {
  const { t, language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"masonry" | "grid" | "large">("masonry")
  const [isLoaded, setIsLoaded] = useState(false)
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false)
  const [favorites, setFavorites] = useState<number[]>([])
  const [isSlideshow, setIsSlideshow] = useState(false)
  const [slideshowInterval, setSlideshowInterval] = useState<NodeJS.Timeout | null>(null)

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      src: "/images/manuscript-open1.png",
      alt: "Illuminated Ethiopian Manuscript",
      category: "manuscripts",
      title: language === "en" ? "Dormition of Mary Manuscript" : "የቅድስት ማርያም ዕረፍት ብራና",
      description:
        language === "en"
          ? "A beautifully illuminated Ethiopian manuscript showing the Dormition of Mary with disciples, featuring traditional Ge'ez text with red and black ink."
          : "የቅድስት ማርያምን ዕረፍት ከደቀ መዛሙርት ጋር የሚያሳይ በሚያምር ሁኔታ የተሰራ የኢትዮጵያ ብራና፣ በቀይና ጥቁር ቀለም የተጻፈ ባህላዊ የግዕዝ ጽሑፍን ያካተተ።",
      featured: true,
      year: "16th Century",
      artist: language === "en" ? "Master Scribe Tekle" : "ዋና ጸሐፊ ተክለ",
      technique: language === "en" ? "Illuminated Manuscript" : "በሐረግ የተሰራ ብራና",
      dimensions: "30 x 40 cm",
      tags: ["illuminated", "religious", "geez", "traditional"],
      likes: 156,
      views: 2340,
    },
    {
      id: 2,
      src: "/images/manuscript-crucifixion.png",
      alt: "Crucifixion Illumination",
      category: "illuminated",
      title: language === "en" ? "Crucifixion Scene" : "የመስቀል ላይ ስቃይ ትዕይንት",
      description:
        language === "en"
          ? "A vibrant illumination depicting the Crucifixion with Mary and John, surrounded by decorative borders and Ge'ez text below."
          : "ቅድስት ማርያምንና ዮሐንስን ከመስቀሉ አጠገብ በሚያሳይ ደማቅ ስዕል፣ በጌጣጌጥ ድንበሮች የተከበበ እና ከታች የግዕዝ ጽሑፍ ያለው።",
      featured: true,
      year: "17th Century",
      artist: language === "en" ? "Master Artist Gebre" : "ዋና ሰዓሊ ገብረ",
      technique: language === "en" ? "Natural Pigments" : "ተፈጥሯዊ ቀለሞች",
      dimensions: "25 x 35 cm",
      tags: ["crucifixion", "religious", "illuminated", "orthodox"],
      likes: 203,
      views: 3120,
    },
    {
      id: 3,
      src: "/images/manuscript-open2.png",
      alt: "Ethiopian Manuscript with Hand",
      category: "manuscripts",
      title: language === "en" ? "Traditional Reading Posture" : "ባህላዊ የንባብ አቀማመጥ",
      description:
        language === "en"
          ? "A reader holding an Ethiopian manuscript showing the traditional way these sacred texts are handled and read."
          : "እነዚህ ቅዱሳት ጽሑፎች በባህላዊ መንገድ እንዴት እንደሚያዙና እንደሚነበቡ የሚያሳይ የኢትዮጵያ ብራናን የያዘ አንባቢ።",
      year: "18th Century",
      artist: language === "en" ? "Unknown Scribe" : "ያልታወቀ ጸሐፊ",
      technique: language === "en" ? "Traditional Binding" : "ባህላዊ አሰራር",
      dimensions: "20 x 30 cm",
      tags: ["traditional", "reading", "cultural", "heritage"],
      likes: 89,
      views: 1560,
    },
    {
      id: 4,
      src: "/images/manuscript-text.png",
      alt: "Ge'ez Text Page",
      category: "text",
      title: language === "en" ? "Ancient Ge'ez Script" : "ጥንታዊ የግዕዝ ጽሑፍ",
      description:
        language === "en"
          ? "A beautifully preserved page of Ge'ez text with colorful decorative headers, written in the traditional black and red ink."
          : "በባህላዊ ጥቁርና ቀይ ቀለም የተጻፈ፣ ቀለማማ ጌጣጌጥ ራስጌዎችን ያለው በጥሩ ሁኔታ የተጠበቀ የግዕዝ ጽሑፍ ገጽ።",
      featured: true,
      year: "15th Century",
      artist: language === "en" ? "Monastery Scriptorium" : "የገዳም ጽሑፍ ቤት",
      technique: language === "en" ? "Calligraphy" : "የእጅ ጽሑፍ",
      dimensions: "28 x 38 cm",
      tags: ["geez", "calligraphy", "ancient", "scripture"],
      likes: 134,
      views: 2890,
    },
    {
      id: 5,
      src: "/images/manuscript-closed.png",
      alt: "Bound Ethiopian Manuscript",
      category: "binding",
      title: language === "en" ? "Traditional Binding" : "ባህላዊ አሰራር",
      description:
        language === "en"
          ? "A traditionally bound Ethiopian manuscript with red leather cover, displayed on ceremonial cloth."
          : "በቀይ ቆዳ ሽፋን የታሰረ ባህላዊ የኢትዮጵያ ብራና፣ በሥነ-ሥርዓት ጨርቅ ላይ የቀረበ።",
      year: "16th Century",
      artist: language === "en" ? "Master Bookbinder" : "ዋና መጽሐፍ አሳሪ",
      technique: language === "en" ? "Leather Binding" : "የቆዳ አሰራር",
      dimensions: "22 x 32 cm",
      tags: ["binding", "leather", "traditional", "craftsmanship"],
      likes: 76,
      views: 1230,
    },
    {
      id: 6,
      src: "/images/manuscript-open3.png",
      alt: "Illuminated Ethiopian Manuscript",
      category: "illuminated",
      title: language === "en" ? "Sacred Illumination" : "ቅዱስ ሐረግ",
      description:
        language === "en"
          ? "An Ethiopian manuscript displaying vibrant illumination alongside traditional Ge'ez text, showcasing the artistic heritage preserved by Melad."
          : "ደማቅ ሐረግን ከባህላዊ የግዕዝ ጽሑፍ ጎን ለጎን የሚያሳይ የኢትዮጵያ ብራና፣ በሜላድ የሚጠበቀውን የጥበብ ቅርስ የሚያሳይ።",
      featured: true,
      year: "17th Century",
      artist: language === "en" ? "Master Illuminator" : "ዋና ሐረግ ሰዓሊ",
      technique: language === "en" ? "Gold Leaf & Pigments" : "የወርቅ ቅጠል እና ቀለሞች",
      dimensions: "35 x 45 cm",
      tags: ["illuminated", "gold", "sacred", "artistic"],
      likes: 298,
      views: 4560,
    },
    {
      id: 7,
      src: "/images/manuscript-book1.png",
      alt: "Traditional Ethiopian Manuscript",
      category: "manuscripts",
      title: language === "en" ? "Traditional Parchment Bound Manuscript" : "ባህላዊ በብራና የተሰራ መጽሐፍ",
      description:
        language === "en"
          ? "An authentic Ethiopian manuscript with traditional leather binding displayed on ceremonial cloth."
          : "በሜላድ ጥራት ባለው ባለሙያዎች በዘመናት የዳበረ ቴክኒክ የተሰራ ትክክለኛ የኢትዮጵያ የብራና መጽሐፍ።",
      year: "18th Century",
      artist: language === "en" ? "Melad Artisans" : "የሜላድ ባለሙያዎች",
      technique: language === "en" ? "Traditional Parchment" : "ባህላዊ ብራና",
      dimensions: "24 x 34 cm",
      tags: ["parchment", "traditional", "authentic", "melad"],
      likes: 112,
      views: 1980,},
    {
      id: 8,
      src: "/images/manuscript-page.png",
      alt: "Illuminated Ethiopian Manuscript Page",
      category: "illuminated",
      title: language === "en" ? "Illuminated Ge'ez Manuscript Page" : "በሐረግ የተሰራ የግእዝ ብራና ገጽ",
      description:
        language === "en"
          ? "Beautifully decorated manuscript page featuring vibrant colors and intricate Ethiopian knotwork patterns."
          : "በሚያምር ሁኔታ የተሰራ የብራና ገጽ ደማቅ ቀለሞችን እና ውስብስብ የኢትዮጵያ ሐረግ ንድፎችን ያካተተ።",
      year: "16th Century",
      artist: language === "en" ? "Royal Scriptorium" : "የንጉሣዊ ጽሑፍ ቤት",
      technique: language === "en" ? "Knotwork Patterns" : "የሐረግ ንድፎች",
      dimensions: "30 x 40 cm",
      tags: ["knotwork", "patterns", "royal", "decorative"],
      likes: 167,
      views: 2670,
    },
    {
      id: 9,
      src: "/images/manuscript-madonna.png",
      alt: "Manuscript with Mary and Jesus Icon",
      category: "religious",
      title: language === "en" ? "Manuscript with Madonna and Child" : "የቅድስት ማርያም እና የኢየሱስ ምስል ያለው መጽሐፍ",
      description:
        language === "en"
          ? "An illuminated Ethiopian manuscript displayed with a traditional icon of Mary and Jesus."
          : "ከባህላዊ የቅድስት ማርያም እና የኢየሱስ ምስል ጋር የቀረበ በሐረግ የተሰራ የኢትዮጵያ መጽሐፍ።",
      featured: true,
      year: "17th Century",
      artist: language === "en" ? "Icon Master" : "የምስል ዋና ሰዓሊ",
      technique: language === "en" ? "Icon Painting" : "የምስል ሥዕል",
      dimensions: "32 x 42 cm",
      tags: ["madonna", "icon", "religious", "orthodox"],
      likes: 245,
      views: 3890,
    },
  ]

  const filteredItems = galleryItems.filter((item) => {
    const matchesCategory = filter === "all" || item.category === filter
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesCategory && matchesSearch
  })

  const featuredItems = galleryItems.filter((item) => item.featured)

  const categories = [
    { id: "all", label: language === "en" ? "All" : "ሁሉም", count: galleryItems.length },
    {
      id: "manuscripts",
      label: language === "en" ? "Manuscripts" : "ብራናዎች",
      count: galleryItems.filter((item) => item.category === "manuscripts").length,
    },
    {
      id: "illuminated",
      label: language === "en" ? "Illuminated" : "በሐረግ የተሰሩ",
      count: galleryItems.filter((item) => item.category === "illuminated").length,
    },
    {
      id: "religious",
      label: language === "en" ? "Religious" : "ሃይማኖታዊ",
      count: galleryItems.filter((item) => item.category === "religious").length,
    },
    {
      id: "text",
      label: language === "en" ? "Scripture" : "መጽሐፍ ቅዱስ",
      count: galleryItems.filter((item) => item.category === "text").length,
    },
    {
      id: "binding",
      label: language === "en" ? "Binding" : "አሰራር",
      count: galleryItems.filter((item) => item.category === "binding").length,
    },
  ]

  const handleImageClick = (item: GalleryItem) => {
    setSelectedImage(item)
    const index = galleryItems.findIndex((i) => i.id === item.id)
    setCurrentIndex(index)
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % galleryItems.length
    setCurrentIndex(nextIndex)
    setSelectedImage(galleryItems[nextIndex])
  }

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
    setCurrentIndex(prevIndex)
    setSelectedImage(galleryItems[prevIndex])
  }

  const toggleFavorite = (itemId: number) => {
    setFavorites((prev) => (prev.includes(itemId) ? prev.filter((id) => id !== itemId) : [...prev, itemId]))
  }

  const startSlideshow = () => {
    setIsSlideshow(true)
    const interval = setInterval(() => {
      handleNext()
    }, 3000)
    setSlideshowInterval(interval)
  }

  const stopSlideshow = () => {
    setIsSlideshow(false)
    if (slideshowInterval) {
      clearInterval(slideshowInterval)
      setSlideshowInterval(null)
    }
  }

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage) {
        if (e.key === "ArrowRight") {
          handleNext()
        } else if (e.key === "ArrowLeft") {
          handlePrevious()
        } else if (e.key === "Escape") {
          setSelectedImage(null)
          stopSlideshow()
        } else if (e.key === " ") {
          e.preventDefault()
          if (isSlideshow) {
            stopSlideshow()
          } else {
            startSlideshow()
          }
        }
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [selectedImage, currentIndex, isSlideshow])

  useEffect(() => {
    return () => {
      if (slideshowInterval) {
        clearInterval(slideshowInterval)
      }
    }
  }, [slideshowInterval])

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white ">
      <section className="relative h-screen min-h-[500px] w-full overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="absolute inset-0 bg-[url('/images/manuscript-pattern.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

        <div className="container relative z-10 flex h-full flex-col items-center justify-center space-y-6 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium"
          >
            <Camera className="h-4 w-4 mr-2" />
            <span>{language === "en" ? "Visual Gallery" : "የእይታ ማዕከለ-ስዕላት"}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl max-w-4xl"
          >
            {language === "en" ? "Explore Our Manuscript Gallery" : "የብራና ማዕከለ-ስዕላታችንን ይመልከቱ"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[800px] text-white/90 md:text-xl"
          >
            {language === "en"
              ? "Discover the beauty and craftsmanship of Ethiopian manuscripts through our comprehensive visual collection."
              : "በሰፊ የእይታ ስብስባችን በኩል የኢትዮጵያ ብራናዎችን ውበት እና ጥበብ ይመልከቱ።"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
           <Button
              variant="outline"
              className="h-12 px-8  bg-white text-primary hover:bg-white/10 rounded-full text-base mt-10"
            >              {language === "en" ? "Explore Gallery" : "ማዕከለ-ስዕላት ይመልከቱ"}
            </Button>
            <Button
             variant="ghost"
        className="h-12 px-8 text-white hover:bg-white/10 rounded-full text-base border border-white mt-10"
            >
              {language === "en" ? "Virtual Tour" : "ምናባዊ ጉብኝት"}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Featured Carousel */}
      <section className="py-16 md:py-24 bg-white">
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
              {language === "en" ? "Masterpiece Manuscripts" : "ድንቅ ብራናዎች"}
            </motion.h2>
          </div>

          <div className="relative overflow-hidden rounded-xl">
            <div className="flex space-x-6 overflow-x-auto pb-4 snap-x scrollbar-hide">
              {featuredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative flex-shrink-0 w-[320px] md:w-[290px] snap-start group"
                >
                  <Card className="overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:-translate-y-2">
                    <div
                      className="relative aspect-[3/4] w-full overflow-hidden cursor-pointer"
                      onClick={() => handleImageClick(item)}
                    >
                      <Image
                        src={item.src || "/placeholder.svg"}
                        alt={item.alt}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Overlay Info */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className="bg-primary/80 text-white text-xs">{item.year}</Badge>
                          <Badge variant="outline" className="border-white/30 text-white text-xs">
                            {language === "en" ? "Featured" : "የተመረጠ"}
                          </Badge>
                        </div>
                        <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                        <p className="text-sm text-white/80 line-clamp-2 mb-3">{item.description}</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4 text-xs text-white/70">
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{item.views}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Heart className="h-3 w-3" />
                            </div>
                          </div>
                          <Button size="sm" variant="outline" className="border-white/30 text-white hover:bg-white/20">
                            <ZoomIn className="h-3 w-3 mr-1" />
                            {language === "en" ? "View" : "ይመልከቱ"}
                          </Button>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900"
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleFavorite(item.id)
                          }}
                        >
                          <Heart
                            className={`h-4 w-4 ${favorites.includes(item.id) ? "fill-red-500 text-red-500" : ""}`}
                          />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900"
                        >
                          <Share2 className="h-4 w-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="outline"
                          className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900"
                        >
                          <Bookmark className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Gallery */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          {/* Gallery Controls */}
          <div className="flex flex-col lg:flex-row gap-6 mb-12">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  placeholder={language === "en" ? "Search gallery..." : "ማዕከለ-ስዕላት ይፈልጉ..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 h-12 rounded-full border-slate-200 focus:border-primary"
                />
              </div>
            </div>

            {/* View Mode Controls */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-white rounded-full p-1 shadow-md">
                <Button
                  variant={viewMode === "masonry" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => setViewMode("masonry")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => setViewMode("grid")}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "large" ? "default" : "ghost"}
                  size="icon"
                  className="rounded-full"
                  onClick={() => setViewMode("large")}
                >
                  <Grid2X2 className="h-4 w-4" />
                </Button>
              </div>

              <Button
                variant="outline"
                className="lg:hidden rounded-full"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {language === "en" ? "Filters" : "ማጣሪያዎች"}
              </Button>
            </div>
          </div>

          {/* Category Filters */}
          <div className={`mb-8 ${isMobileFilterOpen ? "block" : "hidden lg:block"}`}>
            <Tabs value={filter} onValueChange={setFilter} className="w-full">
              <TabsList className="bg-white p-1.5 rounded-full shadow-md inline-flex">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2 text-sm font-medium"
                  >
                    <span className="hidden sm:inline">{category.label}</span>
                    <span className="sm:hidden">{category.label.slice(0, 3)}</span>
                    <Badge variant="secondary" className="ml-2 text-xs">
                      {category.count}
                    </Badge>
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          {/* Gallery Grid */}
          {isLoaded && (
            <AnimatePresence mode="wait">
              <motion.div
                key={`${viewMode}-${filter}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className={
                  viewMode === "masonry"
                    ? "columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                    : viewMode === "grid"
                      ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                      : "grid grid-cols-1 md:grid-cols-2 gap-8"
                }
              >
                {filteredItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className={viewMode === "masonry" ? "break-inside-avoid mb-6" : ""}
                  >
                    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
                      <div
                        className={`relative overflow-hidden ${
                          viewMode === "large" ? "aspect-[4/3]" : "aspect-square"
                        }`}
                        onClick={() => handleImageClick(item)}
                      >
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={item.alt}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Overlay Info */}
                        <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                          <div className="flex items-center space-x-2 mb-2">
                            <Badge className="bg-primary/80 text-white text-xs">{item.year}</Badge>
                            {item.featured && (
                              <Badge variant="outline" className="border-white/30 text-white text-xs">
                                {language === "en" ? "Featured" : "የተመረጠ"}
                              </Badge>
                            )}
                          </div>
                          <h3 className="font-bold mb-1 line-clamp-1">{item.title}</h3>
                          <p className="text-sm text-white/80 line-clamp-2 mb-2">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3 text-xs text-white/70">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{item.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                                <span>{item.likes}</span>
                              </div>
                            </div>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/30 text-white hover:bg-white/20 text-xs"
                            >
                              <ZoomIn className="h-3 w-3 mr-1" />
                              {language === "en" ? "View" : "ይመልከቱ"}
                            </Button>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button
                            size="icon"
                            variant="outline"
                            className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900 w-8 h-8"
                            onClick={(e) => {
                              e.stopPropagation()
                              toggleFavorite(item.id)
                            }}
                          >
                            <Heart
                              className={`h-3 w-3 ${favorites.includes(item.id) ? "fill-red-500 text-red-500" : ""}`}
                            />
                          </Button>
                        </div>
                      </div>

                      {viewMode === "large" && (
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-2">
                            <Badge className="bg-primary/10 text-primary text-xs">{item.year}</Badge>
                            <div className="flex items-center space-x-3 text-xs text-slate-500">
                              <div className="flex items-center space-x-1">
                                <Eye className="h-3 w-3" />
                                <span>{item.views}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Heart className="h-3 w-3" />
                              </div>
                            </div>
                          </div>
                          <h3 className="font-bold text-slate-900 mb-2">{item.title}</h3>
                          <p className="text-slate-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-slate-500">{item.artist}</span>
                            <Button size="sm" variant="outline" className="rounded-full text-xs">
                              {language === "en" ? "View Details" : "ዝርዝር ይመልከቱ"}
                              <ArrowRight className="ml-1 h-3 w-3" />
                            </Button>
                          </div>
                        </CardContent>
                      )}
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          )}

          {filteredItems.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-slate-100 flex items-center justify-center">
                <Search className="h-8 w-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                {language === "en" ? "No items found" : "ምንም ነገር አልተገኘም"}
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
                  setFilter("all")
                }}
              >
                {language === "en" ? "Clear Filters" : "ማጣሪያዎችን አጽዳ"}
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Image Modal/Lightbox */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-7xl p-0 bg-transparent border-0 shadow-none">
          <div className="relative bg-black/95 rounded-lg overflow-hidden">
            {/* Header Controls */}
            <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/50 to-transparent p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900"
                    onClick={() => {
                      setSelectedImage(null)
                      stopSlideshow()
                    }}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                  {selectedImage && (
                    <div className="text-white">
                      <h3 className="font-bold">{selectedImage.title}</h3>
                      <p className="text-sm text-white/70">
                        {selectedImage.artist} • {selectedImage.year}
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex items-center space-x-2">
                  {/* Slideshow Controls */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900"
                    onClick={() => handlePrevious()}
                  >
                    <SkipBack className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900"
                    onClick={() => {
                      if (isSlideshow) {
                        stopSlideshow()
                      } else {
                        startSlideshow()
                      }
                    }}
                  >
                    {isSlideshow ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900"
                    onClick={() => handleNext()}
                  >
                    <SkipForward className="h-4 w-4" />
                  </Button>

                  {/* Action Buttons */}
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900"
                    onClick={() => selectedImage && toggleFavorite(selectedImage.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${selectedImage && favorites.includes(selectedImage.id) ? "fill-red-500 text-red-500" : ""}`}
                    />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="rounded-full bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Navigation buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70 transition-colors"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
            {selectedImage && (
              <div className="flex flex-col">
                <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] w-full">
                  <Image
                    src={selectedImage.src || "/placeholder.svg"}
                    alt={selectedImage.alt}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Image info */}
                <div className="bg-black p-6 text-white">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center space-x-2 mb-3">
                        <Badge className="bg-primary/80 text-white">{selectedImage.year}</Badge>
                        {selectedImage.featured && (
                          <Badge variant="outline" className="border-white/30 text-white">
                            {language === "en" ? "Featured" : "የተመረጠ"}
                          </Badge>
                        )}
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{selectedImage.title}</h3>
                      <p className="text-white/70 mb-4">{selectedImage.artist}</p>
                      <p className="text-white/90 leading-relaxed">{selectedImage.description}</p>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-semibold mb-2">{language === "en" ? "Details" : "ዝርዝሮች"}</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-white/70">{language === "en" ? "Technique:" : "ቴክኒክ:"}</span>
                            <span>{selectedImage.technique}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">{language === "en" ? "Dimensions:" : "መጠን:"}</span>
                            <span>{selectedImage.dimensions}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-white/70">{language === "en" ? "Views:" : "እይታዎች:"}</span>
                            <span>{selectedImage.views}</span>
                          </div>
                          <div className="flex justify-between">
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">{language === "en" ? "Tags" : "መለያዎች"}</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedImage.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="border-white/30 text-white text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Information Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="ml-7">
              

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                {language === "en" ? "Preserving Ethiopia's Manuscript Heritage" : "የኢትዮጵያን የብራና ቅርስ መጠበቅ"}
              </h2>

              <p className="text-slate-600 mb-6">
                {language === "en"
                  ? "Our gallery showcases the finest examples of Ethiopian manuscript artistry, from ancient religious texts to contemporary creations. Each piece represents centuries of tradition and craftsmanship."
                  : "የእኛ ማዕከለ-ስዕላት ከጥንታዊ ሃይማኖታዊ ጽሑፎች እስከ ዘመናዊ ፍጥረቶች ድረስ የኢትዮጵያ የብራና ጥበብ ምርጥ ምሳሌዎችን ያሳያል። እያንዳንዱ ቁራጭ የዘመናት ባህልና ጥበብ ይወክላል።"}
              </p>

              <p className="text-slate-600 mb-6">
                {language === "en"
                  ? "Through careful documentation and digital preservation, we ensure these cultural treasures remain accessible to future generations while maintaining their historical integrity."
                  : "በጥንቃቄ ሰነድ አያያዝ እና ዲጂታል ጥበቃ በኩል፣ እነዚህ የባህል ሀብቶች ታሪካዊ ትክክለኛነታቸውን በመጠበቅ ለወደፊት ትውልዶች ተደራሽ እንዲሆኑ እናረጋግጣለን።"}
              </p>

              
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-2xl"
              >
                <Image src="/images/manuscript-open1.png" alt="Manuscript Preservation" fill className="object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-6 -left-6 h-24 w-24 rounded-xl overflow-hidden border-4 border-white shadow-xl animate-float hidden sm:block"
              >
                <Image src="/images/manuscript-text.png" alt="Manuscript Detail" fill className="object-cover" />
              </motion.div>

              {/* Stats overlay */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-6 -right-6 bg-white rounded-xl p-2  shadow-lg hidden md:block"
              >
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{galleryItems.length}+</div>
                  <div className="text-sm text-slate-600">{language === "en" ? "Manuscripts" : "ብራናዎች"}</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/manuscript-pattern.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

        <div className="container px-4 md:px-6 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              {language === "en" ? "Explore More of Our Collection" : "ተጨማሪ ስብስባችንን ይመልከቱ"}
            </h2>
            <p className="text-white/90 text-lg mb-8">
              {language === "en"
                ? "Visit our center to see these magnificent manuscripts in person and learn about our preservation techniques."
                : "እነዚህን ድንቅ ብራናዎች በአካል ለማየት እና ስለ ጥበቃ ቴክኒኮቻችን ለመማር ማዕከላችንን ይጎብኙ።"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
              variant="outline"

              className="h-12 px-8 border-white/30 text-primary hover:bg-white/10  rounded-full text-base">
                {language === "en" ? "Visit Our Center" : "ማዕከላችንን ይጎብኙ"}
              </Button>
              
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
