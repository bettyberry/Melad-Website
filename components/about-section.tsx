"use client"

import { useLanguage } from "./language-provider"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowRight, History, Users, Target } from "lucide-react"

export default function AboutSection() {
  const { t, language } = useLanguage()

  return (
    <section className="py-20 bg-white relative overflow-hidden ml-9 mr-8">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[url('/images/manuscript-pattern.png')] bg-repeat"></div>
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-gray-900"
          >
            {/* Badge */}
            <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              <History className="h-4 w-4 mr-2" />
              <span>{language === "en" ? "Our History" : "ታሪካችን"}</span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
              <span className="block text-gray-900">{language === "en" ? "Founding of" : "የመሰረተ"}</span>
              <span className="block text-primary">{language === "en" ? "Melad Center" : "ሜላድ ማዕከል"}</span>
            </h2>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-600 mb-6 leading-relaxed">
              {language === "en"
                ? "The name 'Melad' comes from the Ge'ez verb meaning 'to collect, to gather, to accumulate' — reflecting our mission to collect, preserve, and promote Ethiopia's ancient manuscript tradition through authentic craftsmanship and innovation."
                : "(ሜላድ) የስሙ ትርጉሙ አለደ ፡አከማቸ ፡ ሰበሰበ ፡ከሚለው የግእዝ ግስ የተገኘ ነው። ይህም የኢትዮጵያን ጥንታዊ የብራና ባህል መሰብሰብ፣ መጠበቅና ማስፋፋት የሚለውን ተልእኮአችንን ያንጸባርቃል።"}
            </p>

            {/* Features */}
            <div className="space-y-5 mb-6">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <Target className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                    {language === "en" ? "Authentic Craftsmanship" : "እውነተኛ ጥበብ"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === "en"
                      ? "Traditional techniques passed down through generations of Ethiopian artisans."
                      : "ከትውልድ ወደ ትውልድ የተላለፉ ባህላዊ የኢትዮጵያ ጥበብ ዘዴዎች።"}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center mt-1">
                  <Users className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-1">
                    {language === "en" ? "Expert Team" : "ብቁ ቡድን"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {language === "en"
                      ? "38 skilled artisans including master scribes, artists, and parchment specialists."
                      : "38 ብቁ ባለሙያዎች ጸሐፊዎችን፣ ሰዓሊዎችን እና የብራና ቆዳ ዝግጅት ባለሙያዎችን ጨምሮ።"}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <Button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 text-base rounded-full">
              {language === "en" ? "Learn More" : "ተጨማሪ ይወቁ"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden shadow-xl max-w-sm mx-auto">
              <Image
                src="/images/manuscript-hero.jpg"
                alt="Traditional Ethiopian Manuscript"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

              {/* Overlay Badge */}
             
            </div>

            {/* Floating Element */}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
