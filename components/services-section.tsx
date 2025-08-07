"use client"

import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Paintbrush, Wrench, GraduationCap, ArrowRight } from "lucide-react"
import Image from "next/image"

export default function ServicesSection() {
  const { t, language } = useLanguage()

  const services = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: language === "en" ? "Manuscript Creation" : "የብራና መጽሐፍት ዝግጅት",
      description:
        language === "en"
          ? "Complete manuscripts including Gedlat, Dersanat and other religious texts created to order."
          : "ገድላትን፣ ድርሳናትን፣ ትናንሽ መልካም ልኮችን በብራና አዘጋጅተን ለተፈለገበት ገዳም ደብር በተባለው ቀን እናቀርባለን።",
    },
    {
      icon: <Paintbrush className="h-8 w-8" />,
      title: language === "en" ? "Sacred Illumination" : "ቅዱስ ሐረግ",
      description:
        language === "en"
          ? "Traditional Ethiopian decorative patterns and sacred illustrations created on parchment."
          : "ቅዱሳት ስእላትን በብራና እንሳላለን፤ ሐረግንም በብራና እንሰራለን።",
    },
    {
      icon: <Wrench className="h-8 w-8" />,
      title: language === "en" ? "Restoration Services" : "የእድሳት አገልግሎት",
      description:
        language === "en"
          ? "Expert restoration and rebinding of existing manuscripts with appropriate illustrations."
          : "የተጻፉ መጻሕፍትን ገድላትን ድርሳናትን አርመን በየታሪክ ቦታው ስእላቶችን ሐረጎችን ስለን ደጉሰን እናቀርባለን።",
    },
    {
      icon: <GraduationCap className="h-8 w-8" />,
      title: language === "en" ? "Training & Education" : "ስልጠና እና ትምህርት",
      description:
        language === "en"
          ? "Comprehensive training programs to preserve traditional manuscript creation techniques."
          : "ባህላዊ የብራና ጽሑፍ ዘዴዎችን ለመጠበቅ ሰፊ የስልጠና ፕሮግራሞች።",
    },
  ]

  return (
    <section className="w-full py-24 relative overflow-hidden">
      {/* Background - Much brighter and more visible */}
      <div className="absolute inset-0">
        <Image
          src="/images/manuscript-with-icon.jpg"
          alt="Manuscript Background"
          fill
          className="object-cover object-center brightness-[0.7] contrast-[1.2] saturate-[1.1]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/60"></div>
      </div>

      <div className="w-full px-4 md:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6"
          >
            <span>{language === "en" ? "OUR SERVICES" : "አገልግሎቶቻችን"}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg"
          >
            <span className="block">{language === "en" ? "What We Offer &" : "ምን እንሰጣለን እና"}</span>
            <span className="block">{language === "en" ? "What We Do." : "ምን እንሰራለን።"}</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-white drop-shadow-md max-w-3xl mx-auto"
          >
            {language === "en"
              ? "Preserving Ethiopia's manuscript heritage through authentic craftsmanship and traditional techniques passed down through generations."
              : "የኢትዮጵያን የብራና ቅርስ በእውነተኛ ጥበብና ከትውልድ ወደ ትውልድ በተላለፉ ባህላዊ ቴክኒኮች እየጠበቅን።"}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="bg-white/15 backdrop-blur-md border-white/30 hover:bg-white/25 transition-all duration-300 h-full group">
                  <CardContent className="p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/20 rounded-full text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {service.icon}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4 drop-shadow-md">{service.title}</h3>

                    <p className="text-white/90 leading-relaxed drop-shadow-sm">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16"
        >
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-4 text-lg rounded-full shadow-lg">
            {language === "en" ? "View All Services" : "ሁሉንም አገልግሎቶች ይመልከቱ"}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
