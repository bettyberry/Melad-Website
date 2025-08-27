"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ChevronRight, Star, Award, Clock } from "lucide-react"
import Link from "next/link"

export default function ProductsSection() {
  const { t, language } = useLanguage()

  // Expanded products data with more items
  const products = [
    {
      title: language === "en" ? "Parchment Manuscripts" : "የብራና መጻህፍት",
      description:
        language === "en"
          ? "Authentic Ethiopian manuscripts crafted with traditional techniques, featuring religious texts, prayers, and historical works."
          : "በባህላዊ ቴክኒኮች የተሰሩ እውነተኛ የኢትዮጵያ ብራናዎች፣ ሃይማኖታዊ ጽሑፎችን፣ ጸሎቶችን እና ታሪካዊ ሥራዎችን ያካትታሉ።",
      image: "/images/manuscript-book1.png",
      badge: language === "en" ? "Most Popular" : "በጣም ተወዳጅ",
      icon: <Star className="h-4 w-4" />, 
    },
    
    
    {
      title: language === "en" ? "Sacred Artwork" : "ቅዱስ ስዕል",
      description:
        language === "en"
          ? "Traditional Ethiopian Orthodox icons and religious illustrations hand-painted on parchment using natural pigments."
          : "ባህላዊ የኢትዮጵያ ኦርቶዶክስ ምስሎች እና ሃይማኖታዊ ስዕሎች በተፈጥሯዊ ቀለሞች በብራና ላይ በእጅ ተሳሉ።",
      image: "/images/manuscript-madonna.png",
      icon: <Award className="h-4 w-4" />,
    },
    {
      title: language === "en" ? "Decorative Harag" : "ጌጣጌጥ ሐረግ",
      description:
        language === "en"
          ? "Intricate Ethiopian knotwork patterns and decorative borders created with traditional techniques for manuscripts and art pieces."
          : "በብራናዎች እና በጥበብ ሥራዎች ላይ በባህላዊ ቴክኒኮች የተሰሩ ውስብስብ የኢትዮጵያ ሐረግ ንድፎች እና ጌጣጌጥ ድንበሮች።",
      image: "/images/manuscript-page.png",
      badge: language === "en" ? "" : "በእጅ የተሰራ",
      icon: <Clock className="h-4 w-4" />,
    },
    {
      title: language === "en" ? "Custom Commissions" : "ልዩ ትዕዛዞች",
      description:
        language === "en"
          ? "Personalized manuscripts created according to your specific requirements, including custom texts, illustrations, and binding styles."
          : "እንደ ፍላጎትዎ የተዘጋጁ ልዩ ብራናዎች፣ ልዩ ጽሑፎችን፣ ስዕሎችን እና የማሰሪያ ዘይቤዎችን ጨምሮ።",
      image: "/images/manuscript-open1.png",
      badge: language === "en" ? "Custom Made" : "በትዕዛዝ የሚሰራ",
      icon: <Star className="h-4 w-4" />,
    },
    {
      title: language === "en" ? "Restoration Services" : "የእድሳት አገልግሎት",
      description:
        language === "en"
          ? "Professional restoration of ancient manuscripts, preserving their historical value while ensuring their longevity for future generations."
          : "የጥንታዊ ብራናዎች ሙያዊ እድሳት፣ ታሪካዊ ዋጋቸውን በመጠበቅ ለወደፊት ትውልዶች እንዲቆዩ በማድረግ።",
      image: "/images/manuscript-closed.png",
      badge: language === "en" ? "Expert Care" : "ባለሙያ እንክብካቤ",
      icon: <Award className="h-4 w-4" />,
    },
    {
      title: language === "en" ? "Educational Materials" : "የትምህርት ቁሳቁሶች",
      description:
        language === "en"
          ? "Educational manuscripts and materials designed for learning traditional Ethiopian script, calligraphy, and manuscript creation techniques."
          : "ባህላዊ የኢትዮጵያ ፊደል፣ የእጅ ጽሑፍ እና የብራና ጽሑፍ ዘዴዎችን ለመማር የተዘጋጁ የትምህርት ብራናዎች እና ቁሳቁሶች።",
      image: "/images/manuscript-text.png",
      badge: language === "en" ? "Learning Tools" : "የመማሪያ መሳሪያዎች",
      icon: <Clock className="h-4 w-4" />,
    },
  ]

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="products" className="w-full py-16 md:py-24 lg:py-32 bg-gray-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <span>{language === "en" ? "OUR PRODUCTS" : "ምርቶቻችን"}</span>
            </div>
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">
              {t("products")}
            </h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              {language === "en"
                ? "Discover our comprehensive range of authentic Ethiopian manuscripts and services, each crafted with traditional techniques handed down through generations."
                : "ከትውልድ ወደ ትውልድ በተላለፉ ባህላዊ ቴክኒኮች የተሰሩ ሰፊ የኢትዮጵያ ብራናዎች እና አገልግሎቶች ስብስባችንን ይመልከቱ።"}
            </p>
          </motion.div>

          {/* Expanded Grid Layout */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="w-full max-w-7xl mt-12"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product, index) => (
                <motion.div key={index} variants={itemVariants} className="w-full">
                  <Card className="flex flex-col h-full overflow-hidden group hover-card border border-gray-200 shadow-lg hover:shadow-xl transition-all duration-300">
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {/* Badge */}
                      
                    </div>
                    <CardHeader className="flex-grow">
                      <CardTitle className="text-gray-900 text-lg">{product.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-gray-600 text-sm leading-relaxed">{product.description}</p>
                    </CardContent>
                    
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mt-12 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link href="/manuscripts">
              <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 shadow-md">
                {language === "en" ? "View All Manuscripts" : "ሁሉንም ብራናዎች ይመልከቱ"}
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/products">
              <Button
                variant="outline"
                className="border-primary text-primary hover:bg-primary hover:text-white rounded-full px-8"
              >
                {language === "en" ? "Request Custom Order" : "ልዩ ትዕዛዝ ይጠይቁ"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
