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
      icon: <BookOpen className="h-6 w-6" />,
      title: language === "en" ? "Manuscript Creation" : "የብራና መጽሐፍት ዝግጅት",
      description:
        language === "en"
          ? "Complete manuscripts including Gedlat, Dersanat and other religious texts created to order."
          : "ገድላትን፣ ድርሳናትን፣ ትናንሽ መልካም ልኮችን በብራና �ፃፍ አዘጋጅተን ለተፈለገበት ገዳም ደብር በተባለው ቀን እናቀርባለን።",
    },
    {
      icon: <Paintbrush className="h-6 w-6" />,
      title: language === "en" ? "Sacred Illumination" : "ቅዱስ ሐረግ",
      description:
        language === "en"
          ? "Traditional Ethiopian decorative patterns and sacred illustrations created on parchment."
          : "ቅዱሳት ስእላትን በብራና እንሳላለን፤ ሐረግንም በብራና እንሰራለን።",
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: language === "en" ? "Restoration Services" : "የእድሳት አገልግሎት",
      description:
        language === "en"
          ? "Expert restoration and rebinding of existing manuscripts with appropriate illustrations."
          : "የተጻፉ መጻሕፍትን ገድላትን ድርሳናትን አርመን በየታሪክ ቦታው ስእላቶችን ሐረጎችን ስለን ደጉሰን እናቀርባለን።",
    },
    {
      icon: <GraduationCap className="h-6 w-6" />,
      title: language === "en" ? "Training & Education" : "ስልጠና እና ትምህርት",
      description:
        language === "en"
          ? "Comprehensive training programs to preserve traditional manuscript creation techniques."
          : "ባህላዊ የብራና ጽሑፍ ዘዴዎችን ለመጠበቅ ሰፊ የስልጠና ፕሮግራሞች።",
    },
  ]

  return (
    <section className="w-full py-24 md:py-32 relative overflow-hidden">
      {/* Background with subtle texture */}
      <div className="absolute inset-0">
        <Image
          src="/images/manuscript-with-icon.jpg"
          alt="Manuscript Background"
          fill
          className="object-cover object-center brightness-[0.6] contrast-[1.1] saturate-[1.1]"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70"></div>
      </div>

      <div className="container px-4 mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-medium mb-6 tracking-wider"
          >
            <span>{language === "en" ? "OUR SERVICES" : "አገልግሎቶቻችን"}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
          >
            <span className="block bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/80">
              {language === "en" ? "What We Offer" : "ምን እንሰጣለን"}
            </span>
            <span className="block text-white">
              {language === "en" ? "& What We Do" : "እና ምን እንሰራለን"}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
          >
            {language === "en"
              ? "Preserving Ethiopia's manuscript heritage through authentic craftsmanship and traditional techniques passed down through generations."
              : "የኢትዮጵያን የብራና ቅርስ በእውነተኛ ጥበብና ከትውልድ ወደ ትውልድ በተላለፉ ባህላዊ ቴክኒኮች እየጠበቅን።"}
          </motion.p>
        </div>

        {/* Services Grid */}
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="h-full"
              >
                <Card className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 h-full group hover:border-primary/30 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <CardContent className="p-6 flex flex-col items-center text-center h-full">
                    <div className="inline-flex items-center justify-center w-14 h-14 bg-primary/10 rounded-full text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                      {service.icon}
                    </div>

                    <h3 className="text-xl font-bold text-white mb-4 group-hover:text-primary transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-white/80 mb-6 flex-grow">{service.description}</p>
                    
                    <div className="mt-auto opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <ArrowRight className="h-5 w-5 text-primary" />
                    </div>
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
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-16 md:mt-20"
        >
          <Button className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group">
            <span className="mr-2">{language === "en" ? "View All Services" : "ሁሉንም አገልግሎቶች ይመልከቱ"}</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </section>
  )
}