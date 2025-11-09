"use client"

import Link from "next/link"
import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, Play, BookOpen, Users, Award } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"
import ManuscriptProcess from "./manuscript-process"
import ProductsSection from "./products-section"

export default function HeroSection() {
  const { t, language } = useLanguage()
  const [isMounted, setIsMounted] = useState(false)
  const [search, setSearch] = useState("")

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <div className="w-full">
      <section className="relative w-full h-screen flex items-center justify-center overflow-hidden mt-[44px]">
        <div className="absolute inset-0 z-0 w-full h-full bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70" />

        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-6xl font-bold tracking-tight mb-6 pt-8"
            >
              <span className="block text-white">
                {language === "en" ? "PRESERVING" : "ጥንታዊ ቅርስ "}
              </span>
              <span className="block text-white/90">
                {language === "en" ? "ANCIENT HERITAGE" : "እየጠበቅን"}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-xl md:text-1xl text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              {language === "en"
                ? "Melad Ancient Parchment Books Preparation Center combines traditional Ethiopian craftsmanship with modern innovation to preserve our cultural heritage."
                : "ሜላድ ጥንታዊ የብራና ጽሑፍ ማእከል ፤ የኢትዮጵያ ጥበብን ከዘመናዊ ፈጠራ ጋር በማዋሃድ የባህል ቅርሳችንን ይጠብቃል።"}
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.2 }}
              className="max-w-xl mx-auto mb-8"
            >
              <div className="relative flex items-center bg-white/10 backdrop-blur-sm rounded-full border border-white/20 hover:border-white/30 transition-all duration-200 h-12">
                <div className="absolute left-4 text-white/60">
                  <Search className="h-4 w-4" />
                </div>

                <Input
                  type="text"
                  placeholder={language === "en" ? "Search manuscripts..." : "ብራናዎችን ይፈልጉ..."}
                  value={search}
                  className="flex-1 bg-transparent border-none text-white placeholder:text-white/60 text-sm pl-10 pr-4 py-2 focus-visible:ring-0 focus-visible:ring-offset-0 focus:outline-none"
                  onChange={(e) => setSearch(e.target.value)}
                />

                <div className="flex items-center space-x-1 pr-2">
                  <div className="h-4 w-px bg-white/30" />
                  <button className="px-3 py-1 text-xs text-white/80 hover:text-white transition-colors rounded-full hover:bg-white/10">
                    {language === "en" ? "Categories" : "ምድቦች"}
                  </button>
                </div>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col items-center gap-8 pt-9"
            >
              <div className="flex flex-col sm:flex-row gap-8">
                <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-full shadow-xl">
                  {language === "en" ? "Explore Our Work" : "ሥራችንን ይመልከቱ"}
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Link href="/about">
                  <Button
                    variant="outline"
                    className="border-white/60 bg-black/20 text-white hover:bg-white/20 text-lg rounded-full backdrop-blur-sm shadow-lg"
                  >
                    <Play className="mr-2 h-5 w-5" />
                    {language === "en" ? "Watch Our Story" : "ታሪካችንን ይመልከቱ"}
                  </Button>
                </Link>
              </div>

              {/* Scroll Indicator */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
                className="text-white/90"
              >
                <div className="flex flex-col items-center">
                  <span className="text-sm mb-2">
                    {language === "en" ? "Scroll to explore" : "ለመመልከት ይሸብልሉ"}
                  </span>
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="w-6 h-10 border-2 border-white/60 rounded-full flex justify-center"
                  >
                    <motion.div
                      animate={{ y: [0, 12, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      className="w-1 h-3 bg-white/80 rounded-full mt-2"
                    />
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent" />
        <div className="container px-4 md:px-6 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center"
          >
            <div className="text-white">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">55+</div>
              <div className="text-gray-300">{language === "en" ? "Manuscripts Created" : "የተፈጠሩ ብራናዎች"}</div>
            </div>

            <div className="text-white">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">38</div>
              <div className="text-gray-300">{language === "en" ? "Skilled Artisans" : "ብቁ ባለሙያዎች"}</div>
            </div>

            <div className="text-white">
              <div className="flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full mx-auto mb-4">
                <Award className="h-8 w-8 text-primary" />
              </div>
              <div className="text-4xl font-bold text-primary mb-2">5+</div>
              <div className="text-gray-300">{language === "en" ? "Years of Excellence" : "ዓመታት ልምድ"}</div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
