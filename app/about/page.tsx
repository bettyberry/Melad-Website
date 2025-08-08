"use client"

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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            <Image src="/images/manuscript-5.png" alt="About Melad" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40"></div>
          </div>
        </div>

        <div className="container relative z-10 flex h-full flex-col items-center justify-center space-y-8 text-center px-4">
          

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl max-w-5xl"
          >
            {language === "en" ? "Preserving Ethiopia's Sacred Manuscript Heritage" : "የኢትዮጵያን ቅዱስ የብራና ቅርስ መጠበቅ"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[800px] text-white/90 md:text-xl"
          >
            {language === "en"
              ? "Melad Ancient Parchment Books Preparation Center combines traditional craftsmanship with modern innovation to preserve our cultural and spiritual heritage"
              : "ሜላድ ጥንታዊ የብራና ጽሑፍ ማእከል ባህላዊ ጥበብን ከዘመናዊ ፈጠራ ጋር በማዋሃድ የባህልና መንፈሳዊ ቅርሳችንን ይጠብቃል"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-4 justify-center mt-8"
          >
            <Button className="rounded-full bg-gradient-primary hover:opacity-90 shadow-lg text-base py-6 px-8 h-auto">
              {language === "en" ? "Our Story" : "ታሪካችን"}
            </Button>
                        <Button className="rounded-full bg-gradient-primary hover:opacity-90 shadow-lg text-base py-6 px-8 h-auto">

              {language === "en" ? "Meet Our Team" : "ቡድናችንን ያግኙ"}
            </Button>
          </motion.div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full h-auto text-white">
            <path
              fill="currentColor"
              fillOpacity="1"
              d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,122.7C672,117,768,139,864,149.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Name Origin Section */}
      <section className="py-2  ml-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-secondary/5 rounded-full translate-x-1/2 translate-y-1/2"></div>

        <div className="container px-4 md:px-6 relative">
          <div className="grid gap-16 lg:grid-cols-2 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary">
                <History className="h-4 w-4 mr-2" />
                <span>{language === "en" ? "The Origin of Our Name" : "የስማችን ምንጭ"}</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
                {language === "en" ? "The Meaning of 'Melad'" : "የ'ሜላድ' ትርጉም"}
              </h2>

              <div className="prose prose-lg max-w-none text-slate-600">
                {language === "en" ? (
                  <>
                    <p>
                      The name 'Melad' derives from the Ge'ez verb meaning "to collect, to gather, to accumulate" -
                      reflecting our mission to collect, preserve, and promote Ethiopia's ancient manuscript tradition.
                    </p>
                    <p>
                      This name also honors the historical "Melad" manuscript written during the reign of Emperor Zera
                      Yaqob, which explains the mysteries of the Holy Trinity and the Incarnation of Christ, born
                      eternally from God the Father without a mother, and later in time from the Virgin Mary without a
                      father.
                    </p>
                    <p>
                      The manuscript addresses contemporary questions about the Incarnation and provides biblical
                      evidence regarding the Holy Trinity, the Incarnation, the intercession of the Virgin Mary, and the
                      saints.
                    </p>
                  </>
                ) : (
                  <>
                    <p>(ሜላድ) የሚለው ቃል የስሙ ትርጉዋሜ አለደ ፡አከማቸ ፡ ሰበሰበ ፡ከሚለው የግእዝ ግስ የተገኘ ነው።</p>
                    <p>
                      ጌታችንና መድሐኒታችን እግዚአብሔር ወልድ ኢየሱስ ክርስቶስ ፡ ቅድመአለም ከባህሪ አባቱ ፡እግዚአብሔር አብ ያለእናት ድህረ ዓለም ከእመቤታችን ከቅድስት
                      ድንግል ማርያም ያለአባትከስጋዋ ስጋ ከነፍሱዋ ነፍስ የነሳበትን ፡ነገረ ልደቱን ምስጢረ ስጋዌውን አምልቶ አስፍቶ የሚያስረዳ ሌላው ምስጢረስላሴን አጉልቶ
                      የሚያስረዳ እና በዘመናችን በሚስጢረ ስጋዌ ላይ ለሚነሱ ጥያቄዎች ተገቢውን መልስ የሚሰጥ በመሆኑ በዚሁ መሰረት መጻፉ (ሜላድ) የተሰኘበት ምስጢረ ስላሴንና
                      ምስጢረ ስጋዌን እያስረዳ ስለእመቤታችን ቅድስት ድንግል ማርያም እና ስለቅዱሳን አማላጅነት ሁሉ መጻፍቅዱሳዊ ማስረጃ ከነትርጉዋሜያቸው በሊቃውተኢትዮጵያ
                      ፡ከብሉያትና ከሐዲሳት ተወጣጥቶ በታላቁ ጻድቅ አጼ ዘርአ ያእቆብ ዘመነ መንግስት የተጻፈ ሜላድ የተሰኘ መጻፍ መታሰቢያም ጭምር ነው።
                    </p>
                  </>
                )}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl image-shine">
                <Image
                  src="/images/manuscript-book1.png"
                  alt="Ancient Ethiopian Manuscript"
                  fill
                  className="object-cover"
                />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-8 -left-8 h-32 w-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl animate-float"
              >
                <Image src="/images/manuscript-text.png" alt="Manuscript Text Detail" fill className="object-cover" />
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-8 -right-8 h-28 w-28 rounded-2xl overflow-hidden border-4 border-white shadow-xl animate-float"
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
                className="absolute top-1/2 -right-16 transform -translate-y-1/2 glass-card rounded-xl p-4 shadow-lg hidden lg:block"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                    <BookOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{language === "en" ? "Historical Reference" : "ታሪካዊ ማጣቀሻ"}</p>
                    <p className="text-lg font-bold text-slate-900">
                      {language === "en" ? "Emperor Zera Yaqob Era" : "የአጼ ዘርአ ያዕቆብ ዘመን"}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our History Section with Timeline */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
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
              <span>{language === "en" ? "Our Journey" : "ጉዞአችን"}</span>
            </motion.div>

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

            <Button className="mt-8 rounded-full bg-gradient-primary hover:opacity-90 shadow-md">
              {language === "en" ? "Meet Our Team" : "ቡድናችንን ያግኙ"}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-20 bg-slate-50 relative overflow-hidden">
        <div className="container px-4 md:px-6 relative">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4"
            >
              <Target className="h-4 w-4 mr-2" />
              <span>{language === "en" ? "Our Purpose" : "ዓላማችን"}</span>
            </motion.div>

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
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden rounded-3xl shadow-2xl">
                  <Image src="/images/manuscript-open3.png" alt="Our Vision" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-3xl font-bold text-white mb-2">{language === "en" ? "Our Vision" : "ራዕያችን"}</h3>
                    <p className="text-white/90 text-lg">
                      {language === "en"
                        ? "To make authentic Ethiopian manuscripts globally accessible and respected."
                        : "ተአማኒ እና ውበታቸውን የጠበቁ ብራናዎችን በአለም አቀፍ ደረጃ ተደራሽ ማድረግ።"}
                    </p>
                  </div>
                </div>

                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeTab === "vision" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Globe className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">
                          {language === "en" ? "Global Recognition" : "አለም አቀፍ እውቅና"}
                        </h4>
                        <p className="text-slate-600">
                          {language === "en"
                            ? "Elevate Ethiopian manuscript tradition to receive the global recognition it deserves."
                            : "የኢትዮጵያ የብራና ባህልን ወደ ሚገባው የአለም አቀፍ እውቅና ማሳደግ።"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeTab === "vision" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Heart className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">
                          {language === "en" ? "Cultural Preservation" : "ባህላዊ ጥበቃ"}
                        </h4>
                        <p className="text-slate-600">
                          {language === "en"
                            ? "Preserve the authentic beauty and integrity of Ethiopian manuscript tradition."
                            : "የኢትዮጵያ የብራና ባህልን እውነተኛ ውበት እና ሙሉነት መጠበቅ።"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeTab === "vision" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <Lightbulb className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">
                          {language === "en" ? "Innovation & Tradition" : "ፈጠራ እና ባህል"}
                        </h4>
                        <p className="text-slate-600">
                          {language === "en"
                            ? "Blend traditional craftsmanship with modern innovation to ensure sustainability."
                            : "ዘላቂነትን ለማረጋገጥ ባህላዊ ጥበብን ከዘመናዊ ፈጠራ ጋር ማዋሃድ።"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="mission" className="mt-0">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-8 order-2 md:order-1">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeTab === "mission" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <Users className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">
                          {language === "en" ? "Artisan Support" : "የባለሙያዎች ድጋፍ"}
                        </h4>
                        <p className="text-slate-600">
                          {language === "en"
                            ? "Provide fair compensation, healthcare, and professional development for manuscript artisans."
                            : "ለብራና ባለሙያዎች ፍትሃዊ ክፍያ፣ የጤና እንክብካቤ እና የሙያ ልማት መስጠት።"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeTab === "mission" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                        <Clock className="h-6 w-6 text-secondary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">
                          {language === "en" ? "Timely Delivery" : "በጊዜው ማድረስ"}
                        </h4>
                        <p className="text-slate-600">
                          {language === "en"
                            ? "Address the challenge of timely manuscript delivery through improved processes and management."
                            : "የተሻሻሉ ሂደቶችን እና አስተዳደርን በመጠቀም የብራና መጻህፍትን በጊዜው የማድረስ ችግርን መፍታት።"}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={activeTab === "mission" ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-900 mb-2">
                          {language === "en" ? "Quality Assurance" : "የጥራት ዋስትና"}
                        </h4>
                        <p className="text-slate-600">
                          {language === "en"
                            ? "Develop improved methods to correct errors without damaging the parchment or compromising beauty."
                            : "ብራናውን ሳይጎዳ ወይም ውበቱን ሳያስተጓጉል ስህተቶችን ለማረም የተሻሻሉ ዘዴዎችን ማዳበር።"}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden rounded-3xl shadow-2xl order-1 md:order-2">
                  <Image src="/images/manuscript-1.png" alt="Our Mission" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
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
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden rounded-3xl shadow-2xl">
                  <Image src="/images/manuscript-2.png" alt="Our Goals" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-8">
                    <h3 className="text-3xl font-bold text-white mb-2">{language === "en" ? "Our Goals" : "ግቦቻችን"}</h3>
                    <p className="text-white/90 text-lg">
                      {language === "en"
                        ? "Specific objectives that guide our work and measure our success."
                        : "ስራችንን የሚመሩ እና ስኬታችንን የሚለኩ ልዩ ዓላማዎች።"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={activeTab === "goals" ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">1</span>
                    </div>
                    <p className="text-slate-700">
                      {language === "en"
                        ? "Make Ethiopian manuscripts accessible to churches and believers."
                        : "የኢትዮጵያ ብራና መጻህፍትን ለአብያተ ክርስቲያናት እና ለምእመናን ተደራሽ ማድረግ።"}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={activeTab === "goals" ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.1 }}
                    className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">2</span>
                    </div>
                    <p className="text-slate-700">
                      {language === "en"
                        ? "Combat exploitation by middlemen who purchase manuscripts at low prices from artisans and sell at inflated prices."
                        : "ከባለሙያዎች በዝቅተኛ ዋጋ ብራናዎችን ገዝተው በከፍተኛ ዋጋ የሚሸጡ አቅራቢዎችን መዋጋት።"}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={activeTab === "goals" ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">3</span>
                    </div>
                    <p className="text-slate-700">
                      {language === "en"
                        ? "Develop technology-assisted methods to correct errors without damaging the parchment."
                        : "ብራናውን ሳይጎዳ ስህተቶችን ለማረም በቴክኖሎጂ የሚደገፉ ዘዴዎችን ማዳበር።"}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={activeTab === "goals" ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">4</span>
                    </div>
                    <p className="text-slate-700">
                      {language === "en"
                        ? "Improve writing techniques to enhance the quality and beauty of manuscripts."
                        : "የብራና መጻህፍትን ጥራት እና ውበት ለማሻሻል የአጻጻፍ ቴክኒኮችን ማሻሻል።"}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={activeTab === "goals" ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="bg-white rounded-xl p-5 shadow-md hover:shadow-lg transition-all duration-300 flex items-center gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-bold">5</span>
                    </div>
                    <p className="text-slate-700">
                      {language === "en"
                        ? "Ensure timely delivery of commissioned manuscripts through improved processes."
                        : "የተሻሻሉ ሂደቶችን በመጠቀም የታዘዙ ብራናዎችን በጊዜው ማድረስ።"}
                    </p>
                  </motion.div>
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
              <Button
                size="lg"
                className="rounded-full bg-white text-primary hover:bg-white/90 shadow-lg text-base py-6 px-8 h-auto"
              >
                {language === "en" ? "Contact Us" : "ያግኙን"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-full border-white text-white hover:bg-white/10 text-base py-6 px-8 h-auto"
              >
                {language === "en" ? "Learn More" : "ተጨማሪ ይወቁ"}
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
