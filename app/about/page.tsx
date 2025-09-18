"use client"

import Link from "next/link"

import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  History,
  Users,
  Target,
  Calendar,
  BookOpen,
  Brush,
  Sparkles,
  Globe,
  Heart,
  Lightbulb,
  Clock,
  MapPin,
  CheckCircle2,
} from "lucide-react"
import { useState } from "react"

export default function AboutPage() {
  const { t, language } = useLanguage()
  const [activeTab, setActiveTab] = useState("history")

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white ml-9 mr-9">
      {/* Hero Section */}
      <section className="relative h-[55vh] min-h-[500px] w-full overflow-hidden">
  <div className="absolute inset-0">
    <div className="relative h-full w-full">
      <Image src="/images/manuscript-5.png" alt="About Melad" fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
    </div>
  </div>

  <div className="container relative z-10 flex h-full flex-col items-center justify-center space-y-6 text-center px-4">
    <motion.h1
      initial={{ opacity: 0, y: -15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl"
    >
      {language === "en" ? "Preserving Ethiopia's Sacred Manuscript Heritage" : "የኢትዮጵያን ቅዱስ የብራና ቅርስ መጠበቅ"}
    </motion.h1>

    <motion.p
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="max-w-[700px] text-white/90 md:text-lg"
    >
      {language === "en"
        ? "Melad Ancient Parchment Books Preparation Center combines traditional craftsmanship with modern innovation to preserve our cultural and spiritual heritage"
        : "ሜላድ ጥንታዊ የብራና ጽሑፍ ማእከል ባህላዊ ጥበብን ከዘመናዊ ፈጠራ ጋር በማዋሃድ የባህልና መንፈሳዊ ቅርሳችንን ይጠብቃል"}
    </motion.p>

    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="flex flex-wrap gap-3 justify-center mt-6"
    >
      <Button className="rounded-full bg-gradient-primary hover:opacity-90 shadow-md text-sm py-4 px-6 h-auto">
        {language === "en" ? "Our Story" : "ታሪካችን"}
      </Button>
      <Button className="rounded-full bg-gradient-primary hover:opacity-90 shadow-md text-sm py-4 px-6 h-auto">
        {language === "en" ? "Meet Our Team" : "ቡድናችንን ያግኙ"}
      </Button>
    </motion.div>
  </div>

  {/* Decorative wave - smaller */}
  <div className="absolute bottom-0 left-0 right-0">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 150" className="w-full h-auto text-white">
      <path
        fill="currentColor"
        fillOpacity="1"
        d="M0,64L48,74.7C96,85,192,107,288,112C384,117,480,107,576,96C672,85,768,75,864,74.7C960,75,1056,85,1152,90C1248,96,1344,96,1392,96L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
      ></path>
    </svg>
  </div>
</section>

      {/* Name Origin Section */}
<section className="pt-28 pb-11 relative overflow-hidden">
  {/* Decorative elements */}
  <div className="absolute top-0 right-0 w-1/2 md:w-72 aspect-square bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
  <div className="absolute bottom-0 left-0 w-1/2 md:w-72 aspect-square bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>

  <div className="container px-4 md:px-6 relative">
    <div className="grid gap-16 lg:grid-cols-2 items-center">
      {/* Text Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="space-y-8"
      >
        <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary">
          <History className="h-4 w-4 mr-2" />
          <span>
            {language === "en" ? "The Origin of Our Name" : "የስማችን ምንጭ"}
          </span>
        </div>

        <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
          {language === "en" ? "The Meaning of 'Melad'" : "የ'ሜላድ' ትርጉም"}
        </h2>

        <div className="prose prose-lg max-w-none text-slate-600">
          {language === "en" ? (
            <>
              <p>
                The name 'Melad' derives from the Ge'ez verb meaning "to
                collect, to gather, to accumulate" - reflecting our mission to
                collect, preserve, and promote Ethiopia's ancient manuscript
                tradition.
              </p>
              <p>
                This name also honors the historical "Melad" manuscript written
                during the reign of Emperor Zera Yaqob, which explains the
                mysteries of the Holy Trinity and the Incarnation of Christ,
                born eternally from God the Father without a mother, and later
                in time from the Virgin Mary without a father.
              </p>
              <p>
                The manuscript addresses contemporary questions about the
                Incarnation and provides biblical evidence regarding the Holy
                Trinity, the Incarnation, the intercession of the Virgin Mary,
                and the saints.
              </p>
            </>
          ) : (
            <>
              <p>
                (ሜላድ) የሚለው ቃል የስሙ ትርጉዋሜ አለደ ፡አከማቸ ፡ ሰበሰበ ፡ከሚለው የግእዝ ግስ የተገኘ ነው።
              </p>
              <p>
                ጌታችንና መድሐኒታችን እግዚአብሔር ወልድ ኢየሱስ ክርስቶስ...
              </p>
            </>
          )}
        </div>
      </motion.div>

      {/* Image Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative flex justify-center"
      >
        <div className="relative w-full max-w-md aspect-[9/8] overflow-hidden rounded-2xl shadow-xl image-shine">
          <Image
            src="/images/manuscript-book1.png"
            alt="Ancient Ethiopian Manuscript"
            fill
            className="object-cover"
          />

          {/* Floating bottom-left image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute bottom-4 left-4 h-16 w-16 rounded-xl overflow-hidden border-4 border-white shadow-lg animate-float"
          >
            <Image
              src="/images/manuscript-text.png"
              alt="Manuscript Text Detail"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Floating top-right image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="absolute top-4 right-4 h-16 w-16 rounded-xl overflow-hidden border-4 border-white shadow-lg animate-float"
            style={{ animationDelay: "2s" }}
          >
            <Image
              src="/images/manuscript-crucifixion.png"
              alt="Manuscript Illustration"
              fill
              className="object-cover"
            />
          </motion.div>

          {/* Floating stats card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute top-1/2 -right-14 transform -translate-y-1/2 glass-card rounded-lg p-3 shadow-md hidden lg:block"
          >
            <div className="flex items-center space-x-1">
              <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary">
                <BookOpen className="h-4 w-4" />
              </div>
              <div>
                <p className="text-[10px] text-slate-500">
                  {language === "en"
                    ? "Historical Reference"
                    : "ታሪካዊ ማጣቀሻ"}
                </p>
                <p className="text-sm font-semibold text-slate-900 ">
                  {language === "en"
                    ? "Emperor Zera Yaqob Era"
                    : "የአጼ ዘርአ ያዕቆብ ዘመን"}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  </div>
</section>

      {/* Our History Section with Timeline */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="text-center mb-16">
           

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl mb-4"
            >
              {language === "en" ? "The Founding Story" : "የመመስረቻ ታሪክ"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-slate-600 md:text-lg max-w-3xl mx-auto"
            >
              {language === "en"
                ? "Melad was established after two years of careful research to address the declining tradition of manuscript creation in Ethiopia."
                : "ሜላድ ለሁለት አመት ያህል ጥናት ከተደረገ በኋላ በኢትዮጵያ እየቀነሰ የመጣውን የብራና ጽሑፍ ባህል ለመቅረፍ ተመሰረተ።"}
            </motion.p>
          </div>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gradient-to-b from-primary via-secondary to-accent"></div>

            {/* Timeline items */}
            <div className="space-y-24">
              {/* Item 1 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="flex items-center justify-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center shadow-lg z-10">
                    <Calendar className="h-6 w-6" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:text-right md:pr-8">
                    <div className="text-2xl font-bold text-primary mb-2">2013-2015</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {language === "en" ? "Research & Planning" : "ጥናት እና ዕቅድ"}
                    </h3>
                    <p className="text-slate-600">
                      {language === "en"
                        ? "Two years of extensive research to understand the challenges facing traditional manuscript creation in Ethiopia."
                        : "ሜላድ ጥንታዊ የብራና ጽሑፍ ማእከል ከመመስረቱ በፊት ለሁለት አመት ያክል ጥናት በማድረግ እየጠፉ ያሉትን ጥንታዊ የብራና መጻህፍቶችን ከዚህ ችግር ለማላቀቅ በሚል ተነሳሽነት ተመሠረተ።"}
                    </p>
                  </div>
                  <div className="md:pl-8">
                    <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                      <Image
                        src="/images/manuscript-open1.png"
                        alt="Research Phase"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Item 2 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="flex items-center justify-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-secondary text-white flex items-center justify-center shadow-lg z-10">
                    <Users className="h-6 w-6" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:text-right md:pr-8 md:order-1 order-2">
                    <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                      <Image
                        src="/images/manuscript-3.png"
                        alt="Founding Team"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:pl-8 md:order-2 order-1">
                    <div className="text-2xl font-bold text-secondary mb-2">
                      {language === "en" ? "June 24, 2015" : "ሰኔ 24, 2015"}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {language === "en" ? "Official Establishment" : "ይፋዊ መመስረት"}
                    </h3>
                    <p className="text-slate-600">
                      {language === "en"
                        ? "Founded by Megabe Tibebat Qomos Aba Kidane Mariam Abebe and Bekure Me'emenan Ato Fiqadu Anbesu to preserve Ethiopia's manuscript heritage."
                        : "በመጋቤ ጥበባት ቆሞስ አባ ኪዳነ ማርያም አበበ እና በኩረ ምእመናን አቶ ፍቃዱ አንበሱ መስራችነት የተመሠረተ ሲሆን የኢትዮጵያን የብራና ቅርስ ለመጠበቅ ተልዕኮ አለው።"}
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Item 3 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="flex items-center justify-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center shadow-lg z-10">
                    <MapPin className="h-6 w-6" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:text-right md:pr-8">
                    <div className="text-2xl font-bold text-accent mb-2">2015</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {language === "en" ? "First Workshop Established" : "የመጀመሪያ ወርክሾፕ መመስረት"}
                    </h3>
                    <p className="text-slate-600">
                      {language === "en"
                        ? "Operations began at the entrance of the great monastery of Debre Libanos in Grarar Jarso district, Chagel."
                        : "ስራው በግራር ጃርሶ ወረዳ በጫጋል በታላቁ ገዳም ደብረሊባኖስ መግቢያ ላይ ተጀመረ።"}
                    </p>
                  </div>
                  <div className="md:pl-8">
                    <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                      <Image
                        src="/images/manuscript-with-icon.jpg"
                        alt="First Workshop"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Item 4 */}
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative"
              >
                <div className="flex items-center justify-center">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gold text-white flex items-center justify-center shadow-lg z-10">
                    <Globe className="h-6 w-6" />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-8 md:gap-16">
                  <div className="md:text-right md:pr-8 md:order-1 order-2">
                    <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
                      <Image
                        src="/images/manuscript-open2.png"
                        alt="Current Status"
                        width={600}
                        height={400}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="md:pl-8 md:order-2 order-1">
                    <div className="text-2xl font-bold text-gold mb-2">{language === "en" ? "Present Day" : "አሁን"}</div>
                    <h3 className="text-xl font-bold text-slate-900 mb-3">
                      {language === "en" ? "Growing Impact" : "እያደገ የመጣ ተጽዕኖ"}
                    </h3>
                    <p className="text-slate-600">
                      {language === "en"
                        ? "Today, Melad employs 38 skilled artisans and is working with government support to expand its facilities and global reach."
                        : "ማእከሉ አሁን 38 ሰራተኞችን እያስተዳደረ ይገኛል። ለወደፊት ማእከሉ ወደ ከፍተኛ ተቁዋምነት እንዲደርስ ከመንግስት ጋር በመስራት ላይ ይገኛል።"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 subtle-pattern opacity-50"></div>

        <div className="container px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4"
            >
              <Users className="h-4 w-4 mr-2" />
              <span>{language === "en" ? "Our Expert Team" : "ብቁ የሆነ ቡድናችን"}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4"
            >
              {language === "en" ? "Meet Our Skilled Artisans" : "ብቁ የሆኑ ባለሙያዎቻችንን ያግኙ"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-slate-600 md:text-lg max-w-3xl mx-auto"
            >
              {language === "en"
                ? "Melad brings together Ethiopia's most talented manuscript artisans, combining traditional knowledge with modern techniques."
                : "ሜላድ የኢትዮጵያን ብቁ የሆኑ የብራና ባለሙያዎች በማሰባሰብ ባህላዊ እውቀትን ከዘመናዊ ቴክኒኮች ጋር ያዋህዳል።"}
            </motion.p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            <motion.div variants={itemVariants} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute top-0 left-0 h-2 w-full bg-gradient-primary"></div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <Users className="h-10 w-10" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {language === "en" ? "10 Master Scribes" : "10 የብራና ጸሐፊያን"}
                </h3>
                <p className="mt-2 text-slate-600">
                  {language === "en" ? "Highly skilled permanent parchment scribes" : "በሞያው ብቁ የሆኑ ቁዋሚ ጸሐፊያን"}
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute top-0 left-0 h-2 w-full bg-gradient-secondary"></div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-secondary/10 text-secondary group-hover:bg-secondary group-hover:text-white transition-all duration-300">
                  <BookOpen className="h-10 w-10" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {language === "en" ? "2 Master Teachers" : "2 መምህራኖች"}
                </h3>
                <p className="mt-2 text-slate-600">
                  {language === "en"
                    ? "Experts in ancient and modern texts and poetry"
                    : "በብሉያትና በሐዲሳት በቅኔ ትምህርት ብቁ የሆኑ"}
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute top-0 left-0 h-2 w-full bg-gradient-accent"></div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  <Brush className="h-10 w-10" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">{language === "en" ? "2 Artists" : "2 ሰአሊያን"}</h3>
                <p className="mt-2 text-slate-600">
                  {language === "en" ? "Skilled in traditional manuscript illumination" : "በባህላዊ የብራና ስዕል ብቁ የሆኑ"}
                </p>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-8 text-center shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
                <div className="absolute top-0 left-0 h-2 w-full bg-gradient-gold"></div>
                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gold/10 text-gold/90 group-hover:bg-gold group-hover:text-white transition-all duration-300">
                  <Sparkles className="h-10 w-10" />
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {language === "en" ? "6 Parchment Specialists" : "6 የብራና ቆዳ ዝግጅት"}
                </h3>
                <p className="mt-2 text-slate-600">
                  {language === "en" ? "Experts in traditional parchment preparation" : "በባህላዊ የብራና ቆዳ ዝግጅት ላይ ብቁ የሆኑ"}
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-slate-600 italic max-w-3xl mx-auto">
              {language === "en"
                ? "Our center also includes specialists in decorative work (hareg), book binding, equipment management, and support staff to ensure the highest quality in all our work."
                : "ማእከላችን በተጨማሪም በሐረግ ስራ፣ በመጻህፍት ድጉሰት፣ በእቃ ግዢ እና ሌሎች ድጋፍ ሰጪ ሰራተኞችን በሁሉም ስራዎቻችን ከፍተኛ ጥራት እንዲኖር ለማረጋገጥ ይይዛል።"}
            </p>

            <Link href="/contact">
      <Button className="mt-8 rounded-full bg-gradient-primary hover:opacity-90 shadow-md">
        {language === "en" ? "Meet Our Team" : "ቡድናችንን ያግኙ"}
      </Button>
    </Link>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="text-center mb-16">
            

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4"
            >
              {language === "en" ? "Vision & Mission" : "ራዕይ እና ተልዕኮ"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-slate-600 md:text-lg max-w-3xl mx-auto"
            >
              {language === "en"
                ? "Melad was established with clear goals to preserve, protect, and promote Ethiopia's ancient manuscript tradition."
                : "ሜላድ የኢትዮጵያን ጥንታዊ የብራና ባህል ለመጠበቅ፣ ለመከላከል እና ለማስፋፋት በግልጽ ዓላማዎች ተመስርቷል።"}
            </motion.p>
          </div>

          <Tabs defaultValue="vision" className="w-full">
            <div className="flex justify-center mb-12">
              <TabsList className="bg-white p-1.5 rounded-full shadow-md">
                <TabsTrigger
                  value="vision"
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2.5"
                  onClick={() => setActiveTab("vision")}
                >
                  {language === "en" ? "Vision" : "ራዕይ"}
                </TabsTrigger>
                <TabsTrigger
                  value="mission"
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2.5"
                  onClick={() => setActiveTab("mission")}
                >
                  {language === "en" ? "Mission" : "ተልዕኮ"}
                </TabsTrigger>
                <TabsTrigger
                  value="goals"
                  className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2.5"
                  onClick={() => setActiveTab("goals")}
                >
                  {language === "en" ? "Goals" : "ግቦች"}
                </TabsTrigger>
              </TabsList>
            </div>

           <TabsContent value="vision" className="mt-0">
<div className="grid md:grid-cols-2 gap-x-1  items-center">
    {/* Image & Overlay */}
    <div className="relative w-full max-w-[400px] aspect-square overflow-hidden rounded-2xl shadow-xl ml-11 ">
  <Image
    src="/images/manuscript-open3.png"
    alt="Our Vision"
    fill
    className="object-cover"
  />
  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
  <div className="absolute bottom-0 left-0 right-0 p-6">
    <h3 className="text-2xl font-bold text-white mb-1">
      {language === "en" ? "Our Vision" : "ራዕያችን"}
    </h3>
    <p className="text-white/90 text-base leading-snug">
      {language === "en"
        ? "To make authentic Ethiopian manuscripts globally accessible and respected."
        : "ተአማኒ እና ውበታቸውን የጠበቁ ብራናዎችን በአለም አቀፍ ደረጃ ተደራሽ ማድረግ።"}
    </p>
  </div>
</div>



    {/* Vision Points */}
    <div className="space-y-6">
      {[
        {
          icon: Globe,
          color: "primary",
          titleEn: "Global Recognition",
          titleAm: "አለም አቀፍ እውቅና",
          textEn:
            "Elevate Ethiopian manuscript tradition to receive the global recognition it deserves.",
          textAm:
            "የኢትዮጵያ የብራና ባህልን ወደ ሚገባው የአለም አቀፍ እውቅና ማሳደግ።",
        },
        {
          icon: Heart,
          color: "secondary",
          titleEn: "Cultural Preservation",
          titleAm: "ባህላዊ ጥበቃ",
          textEn:
            "Preserve the authentic beauty and integrity of Ethiopian manuscript tradition.",
          textAm:
            "የኢትዮጵያ የብራና ባህልን እውነተኛ ውበት እና ሙሉነት መጠበቅ።",
        },
        {
          icon: Lightbulb,
          color: "accent",
          titleEn: "Innovation & Tradition",
          titleAm: "ፈጠራ እና ባህል",
          textEn:
            "Blend traditional craftsmanship with modern innovation to ensure sustainability.",
          textAm:
            "ዘላቂነትን ለማረጋገጥ ባህላዊ ጥበብን ከዘመናዊ ፈጠራ ጋር ማዋሃድ።",
        },
      ].map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 15 }}
          animate={activeTab === "vision" ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
          transition={{ duration: 0.4, delay: 0.1 * (index + 1) }}
          className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            <div
              className={`flex-shrink-0 w-10 h-10 bg-${item.color}/10 rounded-full flex items-center justify-center`}
            >
              <item.icon className={`h-5 w-5 text-${item.color}`} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">
                {language === "en" ? item.titleEn : item.titleAm}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {language === "en" ? item.textEn : item.textAm}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
</TabsContent>


          <TabsContent value="mission" className="mt-0">
  <div className="grid md:grid-cols-2 gap-4 items-center ml-8">
    <div className="space-y-6 order-2 md:order-1">
      {[{
        icon: Users,
        bgColor: "primary",
        titleEn: "Artisan Support",
        titleAm: "የባለሙያዎች ድጋፍ",
        textEn:
          "Provide fair compensation, healthcare, and professional development for manuscript artisans.",
        textAm:
          "ለብራና ባለሙያዎች ፍትሃዊ ክፍያ፣ የጤና እንክብካቤ እና የሙያ ልማት መስጠት።",
      },{
        icon: Clock,
        bgColor: "secondary",
        titleEn: "Timely Delivery",
        titleAm: "በጊዜው ማድረስ",
        textEn:
          "Address the challenge of timely manuscript delivery through improved processes and management.",
        textAm:
          "የተሻሻሉ ሂደቶችን እና አስተዳደርን በመጠቀም የብራና መጻህፍትን በጊዜው የማድረስ ችግርን መፍታት።",
      },{
        icon: CheckCircle2,
        bgColor: "accent",
        titleEn: "Quality Assurance",
        titleAm: "የጥራት ዋስትና",
        textEn:
          "Develop improved methods to correct errors without damaging the parchment or compromising beauty.",
        textAm:
          "ብራናውን ሳይጎዳ ወይም ውበቱን ሳያስተጓጉል ስህተቶችን ለማረም የተሻሻሉ ዘዴዎችን ማዳበር።",
      }].map(({icon: Icon, bgColor, titleEn, titleAm, textEn, textAm}, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={activeTab === "mission" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 * (idx + 1) }}
          className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start gap-3">
            <div className={`flex-shrink-0 w-10 h-10 bg-${bgColor}/10 rounded-full flex items-center justify-center`}>
              <Icon className={`h-5 w-5 text-${bgColor}`} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 mb-1">
                {language === "en" ? titleEn : titleAm}
              </h4>
              <p className="text-slate-600 text-sm leading-relaxed">
                {language === "en" ? textEn : textAm}
              </p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>

    <div className="relative w-full max-w-[400px] aspect-square overflow-hidden rounded-3xl shadow-2xl order-1 md:order-2 mx-auto">
      <Image
        src="/images/manuscript-1.png"
        alt="Our Mission"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-3xl font-bold text-white mb-2">
          {language === "en" ? "Our Mission" : "ተልዕኮአችን"}
        </h3>
        <p className="text-white/90 text-lg">
          {language === "en"
            ? "To address the challenges facing traditional manuscript creation through innovation and support."
            : "በፈጠራ እና በድጋፍ ባህላዊ የብራና ጽሑፍ ፈጠራን የሚያጋጥሙ ችግሮችን መፍታት።"}
        </p>
      </div>
    </div>
  </div>
</TabsContent>

            <TabsContent value="goals" className="mt-0">
  <div className="grid md:grid-cols-2 gap-2 items-center ml-11">
    <div className="relative w-full max-w-[400px] aspect-square overflow-hidden rounded-3xl shadow-2xl">
      <Image
        src="/images/manuscript-2.png"
        alt="Our Goals"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      <div className="absolute bottom-0 left-0 right-0 p-6">
        <h3 className="text-3xl font-bold text-white mb-2">
          {language === "en" ? "Our Goals" : "ግቦቻችን"}
        </h3>
        <p className="text-white/90 text-lg">
          {language === "en"
            ? "Specific objectives that guide our work and measure our success."
            : "ስራችንን የሚመሩ እና ስኬታችንን የሚለኩ ልዩ ዓላማዎች።"}
        </p>
      </div>
    </div>

    <div className="space-y-4">
      {[ 
        "Make Ethiopian manuscripts accessible to churches and believers.",
        "Combat exploitation by middlemen who purchase manuscripts at low prices from artisans and sell at inflated prices.",
        "Develop technology-assisted methods to correct errors without damaging the parchment.",
        "Improve writing techniques to enhance the quality and beauty of manuscripts.",
        "Ensure timely delivery of commissioned manuscripts through improved processes."
      ].map((textEn, idx) => {
        const textsAm = [
          "የኢትዮጵያ ብራና መጻህፍትን ለአብያተ ክርስቲያናት እና ለምእመናን ተደራሽ ማድረግ።",
          "ከባለሙያዎች በዝቅተኛ ዋጋ ብራናዎችን ገዝተው በከፍተኛ ዋጋ የሚሸጡ አቅራቢዎችን መዋጋት።",
          "ብራናውን ሳይጎዳ ስህተቶችን ለማረም በቴክኖሎጂ የሚደገፉ ዘዴዎችን ማዳበር።",
          "የብራና መጻህፍትን ጥራት እና ውበት ለማሻሻል የአጻጻፍ ቴክኒኮችን ማሻሻል።",
          "የተሻሻሉ ሂደቶችን በመጠቀም የታዘዙ ብራናዎችን በጊዜው ማድረስ።"
        ];
        return (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={activeTab === "goals" ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.4, delay: 0.1 * idx }}
            className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4"
          >
            <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <span className="text-primary font-bold">{idx + 1}</span>
            </div>
            <p className="text-slate-700 text-sm leading-relaxed">
              {language === "en" ? textEn : textsAm[idx]}
            </p>
          </motion.div>
        );
      })}
    </div>
  </div>
</TabsContent>

          </Tabs>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/90 to-primary/70 text-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/images/manuscript-pattern.png')] bg-repeat"></div>
      </div>

      <div className="container px-4 md:px-6 relative">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            {language === "en"
              ? "Join Us in Preserving Ethiopia's Sacred Heritage"
              : "የኢትዮጵያን ቅዱስ ቅርሳችንን በመጠበቅ ተባበሩን"}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-white/90 mb-8"
          >
            {language === "en"
              ? "Partner with us to preserve and promote Ethiopia's ancient manuscript tradition for future generations."
              : "የኢትዮጵያን ጥንታዊ የብራና ባህል ለወደፊት ትውልድ ለመጠበቅ እና ለማስፋፋት ከእኛ ጋር ተባበሩ።"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <Link href="/contact" className="w-full md:w-auto">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full bg-white text-primary hover:bg-white/10 shadow-lg text-base py-3 px-8 h-auto"
              >
                {language === "en" ? "Contact Us" : "ያግኙን"}
              </Button>
            </Link>

            <Link href="/learn-more" className="w-full md:w-auto">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white text-primary hover:bg-white/10 text-base py-3 px-8 h-auto"
              >
                {language === "en" ? "Learn More" : "ተጨማሪ ይወቁ"}
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
    </div>
  )
}
