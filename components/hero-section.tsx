"use client"

import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ArrowRight, Search, Play, BookOpen, Users, Award } from "lucide-react"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function HeroSection() {
  const { t, language } = useLanguage()
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <div className="w-full">
      <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white pt-20">
        {/* Background Image - Full visibility like mobile version */}
        <div className="absolute inset-0 z-0 w-full h-full bg-gradient-to-br from-primary/90 via-primary/80 to-primary/70"></div>

        {/* Content */}
        <div className="container relative z-10 px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center text-white">
            {/* Badge */}
        
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl md:text-7xl lg:text-6xl font-bold tracking-tight mb-6"
            >
              <span className="block text-white">{language === "en" ? "PRESERVING" : "ጥንታዊ ቅርስ "}</span>
              <span className="block text-white/90">{language === "en" ? "ANCIENT HERITAGE" : "እየጠበቅን"}</span>
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
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="max-w-2xl mx-auto mb-12"
            >
              <div className="relative flex items-center bg-white/20 backdrop-blur-md rounded-full  border border-white/30">
                <div className="flex-1 flex items-center">
                  <div className="px-6 py-1 flex-1">
                    <Input
                      type="text"
                      placeholder={language === "en" ? "Search manuscripts, services..." : "ብራናዎችን፣ አገልግሎቶችን ይፈልጉ..."}
                      className="bg-transparent border-none text-white placeholder:text-white/80 text-sm focus:ring-0 focus:outline-none"
                    />
                  </div>
                  <div className="h-12 w-px bg-white/30 mx-2"></div>
                  <div className="px-3 py-4">
                    <span className="text-white/90">{language === "en" ? "All Categories" : "ሁሉም ምድቦች"}</span>
                  </div>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full h-14 w-14 p-0 shadow-lg">
                  <Search className="h-6 w-4" />
                </Button>
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-8  pt-16 justify-center items-center"
            >
              <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-full shadow-xl">
                {language === "en" ? "Explore Our Work" : "ሥራችንን ይመልከቱ"}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                className="border-white/60 bg-black/20 text-white hover:bg-white/20 text-lg rounded-full backdrop-blur-sm shadow-lg"
              >
                <Play className="mr-2 h-5 w-5" />
                {language === "en" ? "Watch Our Story" : "ታሪካችንን ይመልከቱ"}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/90"
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2">{language === "en" ? "Scroll to explore" : "ለመመልከት ይሸብልሉ"}</span>
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
      </section>

      {/* Stats Section - Keep Dark Theme */}
      <section className="py-20 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent"></div>

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
