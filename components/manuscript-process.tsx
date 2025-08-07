"use client"

import { useLanguage } from "./language-provider"
import { motion } from "framer-motion"
import { BookOpen, Compass, Paintbrush, History } from "lucide-react"
import Image from "next/image"

export default function ManuscriptProcess() {
  const { language } = useLanguage()

  const processSteps = [
    {
      icon: <Compass className="h-6 w-6" />,
      title: language === "en" ? "Material Selection" : "የቁሳቁስ ምርጫ",
      description:
        language === "en"
          ? "Carefully selecting the finest goat leather for parchment preparation, ensuring authentic materials for each manuscript."
          : "ለብራና ዝግጅት ምርጥ የፍየል ቆዳን በጥንቃቄ መምረጥ፣ ለእያንዳንዱ መጽሐፍ ትክክለኛ ቁሳቁሶችን ማረጋገጥ።",
    },
    {
      icon: <BookOpen className="h-6 w-6" />,
      title: language === "en" ? "Script Preparation" : "የጽሑፍ ዝግጅት",
      description:
        language === "en"
          ? "Master scribes carefully write ancient Ge'ez texts using traditional techniques and natural inks."
          : "ብቁ ጸሐፊዎች ባህላዊ ቴክኒኮችን እና ተፈጥሯዊ ቀለሞችን በመጠቀም ጥንታዊ የግእዝ ጽሑፎችን በጥንቃቄ ይጽፋሉ።",
    },
    {
      icon: <Paintbrush className="h-6 w-6" />,
      title: language === "en" ? "Illumination" : "ሐረግና ጌጣጌጥ",
      description:
        language === "en"
          ? "Skilled artists add intricate decorative elements, colorful borders, and traditional Ethiopian patterns (harag) with vibrant colors and sacred symbolism."
          : "ብቁ ሰዓሊዎች ውስብስብ ጌጣጌጦችን፣ ቀለማማ ድንበሮችን እና ደማቅ ቀለሞችና ቅዱስ ምልክቶችን ያካተቱ ባህላዊ የኢትዮጵያ ንድፎችን (ሐረግ) ይጨምራሉ።",
    },
    {
      icon: <History className="h-6 w-6" />,
      title: language === "en" ? "Binding & Finishing" : "ማሰርና ማጠናቀቅ",
      description:
        language === "en"
          ? "Final assembly using ancient binding techniques to create durable, authentic manuscripts that will endure for generations."
          : "ለብዙ ትውልዶች የሚቆዩ ጠንካራ እና ትክክለኛ መጻህፍትን ለመፍጠር ጥንታዊ የአሰራር ዘዴዎችን በመጠቀም የመጨረሻ ድምር።",
    },
  ]

  return (
    <section className="w-full py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-full h-20 bg-gradient-to-b from-white to-transparent"></div>
      <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/5"></div>
      <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-secondary/5"></div>

      <div className="container px-4 md:px-6 relative">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4"
          >
            <History className="h-4 w-4 mr-2" />
            <span>{language === "en" ? "Traditional Process" : "ባህላዊ ሂደት"}</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4"
          >
            {language === "en" ? "The Art of Manuscript Creation" : "የብራና ጽሑፍ የሥራ ጥበብ"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-slate-600 md:text-lg max-w-3xl mx-auto"
          >
            {language === "en"
              ? "Creating a traditional Ethiopian manuscript involves meticulous craftsmanship passed down through generations of artisans."
              : "ባህላዊ የኢትዮጵያ ብራና መፍጠር ከትውልድ ወደ ትውልድ የተላለፈ ጥልቅ ጥበብ ይጠይቃል።"}
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1">
            <div className="grid grid-cols-1 gap-6">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start space-x-4 bg-white p-6 rounded-xl shadow-md"
                >
                  <div className="flex items-center justify-center h-12 w-12 rounded-full bg-primary/10 text-primary">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">{step.title}</h3>
                    <p className="text-slate-600">{step.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative order-1 md:order-2"
          >
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/images/manuscript-page.png"
                alt="Manuscript Creation Process"
                fill
                className="object-cover"
              />
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-6 -right-6 h-32 w-32 rounded-xl overflow-hidden border-4 border-white shadow-xl animate-float"
            >
              <Image src="/images/manuscript-book2.png" alt="Finished Manuscript" fill className="object-cover" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
