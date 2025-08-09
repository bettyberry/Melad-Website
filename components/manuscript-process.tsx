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
<div className="grid md:grid-cols-2 gap-6 items-center">
  <div className="order-2 md:order-1">
    <div className="grid grid-cols-1 gap-3.5">
      {processSteps.map((step, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="flex items-start space-x-3.5 bg-white p-4 rounded-md shadow-xs hover:shadow-sm transition-all border border-gray-100"
        >
          <div className="flex-shrink-0 flex items-center justify-center h-9 w-9 rounded-full bg-primary/10 text-primary text-[15px]">
            {step.icon}
          </div>
          <div>
            <h3 className="text-[16px] font-medium text-gray-800 mb-1.5 leading-tight">{step.title}</h3>
            <p className="text-[15px] text-gray-600 leading-snug">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </div>

  <motion.div
    initial={{ opacity: 0, scale: 0.98 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
    className="relative order-1 md:order-2 w-full max-w-[320px] mx-auto"
  >
    {/* Main Image - Ensure this path is correct */}
    <div className="relative aspect-[3/4] overflow-hidden rounded-lg shadow-sm border border-gray-200 bg-gray-100">
      <Image
        src="/images/manuscript-page.png" 
        alt="Manuscript Creation Process"
        width={390}
        height={426}
        className="object-cover object-center w-full h-full"
        priority
      />
    </div>

    {/* Floating Image */}
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="absolute -bottom-4 -right-4 h-20 w-20 rounded-md overflow-hidden border-2 border-white shadow-md animate-float"
    >
      <Image 
        src="/images/manuscript-book2.png" // Changed to .jpg extension
        alt="Finished Manuscript" 
        width={80}
        height={80}
        className="object-cover object-center"
        priority
      />
    </motion.div>
  </motion.div>
</div>
      </div>
    </section>
  )
}
