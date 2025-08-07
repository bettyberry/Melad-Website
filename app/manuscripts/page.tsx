"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Info,
  Compass,
  BookOpen,
  Paintbrush,
  History,
  Calendar,
  Users,
  Sparkles,
  X,
  ZoomIn,
} from "lucide-react"

export default function ManuscriptsPage() {
  const { t, language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [filter, setFilter] = useState("all")

  // Manuscript showcase images with descriptions
  const manuscripts = [
    {
      id: 1,
      src: "/images/manuscript-open1.png",
      alt: "Illuminated Ethiopian Manuscript",
      title: language === "en" ? "Dormition of Mary Manuscript" : "የቅድስት ማርያም ዕረፍት ብራና",
      description:
        language === "en"
          ? "A beautifully illuminated Ethiopian manuscript showing the Dormition of Mary with disciples, featuring traditional Ge'ez text with red and black ink."
          : "የቅድስት ማርያምን ዕረፍት ከደቀ መዛሙርት ጋር የሚያሳይ በሚያምር ሁኔታ የተሰራ የኢትዮጵያ ብራና፣ በቀይና ጥቁር ቀለም የተጻፈ ባህላዊ የግዕዝ ጽሑፍን ያካተተ።",
      category: "illumination",
    },
    {
      id: 2,
      src: "/images/manuscript-crucifixion.png",
      alt: "Crucifixion Illumination",
      title: language === "en" ? "Crucifixion Illumination" : "የመስቀል ላይ ስቃይ ሐረግ",
      description:
        language === "en"
          ? "A vibrant illumination depicting the Crucifixion with Mary and John, surrounded by decorative borders and Ge'ez text below. The artwork features traditional Ethiopian Orthodox iconography."
          : "ቅድስት ማርያምንና ዮሐንስን ከመስቀሉ አጠገብ በሚያሳይ ደማቅ ስዕል፣ በጌጣጌጥ ድንበሮች የተከበበ እና ከታች የግዕዝ ጽሑፍ ያለው። ስዕሉ ባህላዊ የኢትዮጵያ ኦርቶዶክስ አዕምሯዊ ምስሎችን ያካትታል።",
      category: "religious",
    },
    {
      id: 3,
      src: "/images/manuscript-open2.png",
      alt: "Ethiopian Manuscript with Hand",
      title: language === "en" ? "Manuscript in Traditional Reading" : "በባህላዊ ንባብ ላይ ያለ ብራና",
      description:
        language === "en"
          ? "A reader holding an Ethiopian manuscript showing the traditional way these sacred texts are handled and read. The illumination depicts religious figures with halos in the Ethiopian style."
          : "እነዚህ ቅዱሳት ጽሑፎች በባህላዊ መንገድ እንዴት እንደሚያዙና እንደሚነበቡ የሚያሳይ የኢትዮጵያ ብራናን የያዘ አንባቢ። ሐረጉ በኢትዮጵያዊ ዘይቤ ከራሳቸው ዙሪያ ብርሃን ያላቸውን ሃይማኖታዊ ምስሎችን ያሳያል።",
      category: "illumination",
    },
    {
      id: 4,
      src: "/images/manuscript-text.png",
      alt: "Ge'ez Text Page",
      title: language === "en" ? "Ge'ez Scripture Page" : "የግዕዝ መጽሐፍ ቅዱስ ገጽ",
      description:
        language === "en"
          ? "A beautifully preserved page of Ge'ez text with colorful decorative headers, written in the traditional black and red ink. The manuscript shows the meticulous craftsmanship of Melad's scribes."
          : "በባህላዊ ጥቁርና ቀይ ቀለም የተጻፈ፣ ቀለማማ ጌጣጌጥ ራስጌዎችን ያለው በጥሩ ሁኔታ የተጠበቀ የግዕዝ ጽሑፍ ገጽ። ብራናው የሜላድ ጸሐፊዎችን ጥልቅ ጥበብ ያሳያል።",
      category: "text",
    },
    {
      id: 5,
      src: "/images/manuscript-closed.png",
      alt: "Bound Ethiopian Manuscript",
      title: language === "en" ? "Traditional Leather Binding" : "ባህላዊ የቆዳ ማሰሪያ",
      description:
        language === "en"
          ? "A traditionally bound Ethiopian manuscript with red leather cover, displayed on ceremonial cloth. The binding technique has been preserved for centuries and is faithfully reproduced by Melad's artisans."
          : "በቀይ ቆዳ ሽፋን የታሰረ ባህላዊ የኢትዮጵያ ብራና፣ በሥነ-ሥርዓት ጨርቅ ላይ የቀረበ። የማሰሪያ ቴክኒኩ ለብዙ ምዕተ ዓመታት የተጠበቀ ሲሆን በሜላድ ባለሙያዎች በታማኝነት እንደገና ይመረታል።",
      category: "binding",
    },
    {
      id: 6,
      src: "/images/manuscript-open3.png",
      alt: "Illuminated Ethiopian Manuscript",
      title: language === "en" ? "Dormition Scene with Text" : "የዕረፍት ትዕይንት ከጽሑፍ ጋር",
      description:
        language === "en"
          ? "An Ethiopian manuscript displaying vibrant illumination alongside traditional Ge'ez text, showcasing the artistic heritage preserved by Melad. The scene depicts the Dormition of Mary surrounded by disciples."
          : "ደማቅ ሐረግን ከባህላዊ የግዕዝ ጽሑፍ ጎን ለጎን የሚያሳይ የኢትዮጵያ ብራና፣ በሜላድ የሚጠበቀውን የጥበብ ቅርስ የሚያሳይ። ትዕይንቱ በደቀ መዛሙርት የተከበበችውን የቅድስት ማርያምን ዕረፍት ያሳያል።",
      category: "illumination",
    },
    {
      id: 7,
      src: "/images/manuscript-book1.png",
      alt: "Traditional Ethiopian Manuscript",
      title: language === "en" ? "Traditional Parchment Bound Manuscript" : "ባህላዊ በብራና የተሰራ መጽሐፍ",
      description:
        language === "en"
          ? "An authentic Ethiopian manuscript with traditional leather binding displayed on ceremonial cloth. Meticulously crafted by Melad's skilled artisans using centuries-old techniques."
          : "በሜላድ ጥራት ባለው ባለሙያዎች በዘመናት የዳበረ ቴክኒክ የተሰራ ትክክለኛ የኢትዮጵያ የብራና መጽሐፍ በባህላዊ ቆዳ ታስሮ በሥነ-ሥርዓት ጨርቅ ላይ የቀረበ።",
      category: "binding",
    },
    {
      id: 8,
      src: "/images/manuscript-page.png",
      alt: "Illuminated Ethiopian Manuscript Page",
      title: language === "en" ? "Illuminated Ge'ez Manuscript Page" : "በሐረግ የተሰራ የግእዝ ብራና ገጽ",
      description:
        language === "en"
          ? "Beautifully decorated manuscript page featuring vibrant colors and intricate Ethiopian knotwork patterns (harag). The text is written in Ge'ez script with traditional red and black ink."
          : "በሚያምር ሁኔታ የተሰራ የብራና ገጽ ደማቅ ቀለሞችን እና ውስብስብ የኢትዮጵያ ሐረግ ንድፎችን ያካተተ። ጽሑፉ በግእዝ ፊደላት በባህላዊ ቀይ እና ጥቁር ቀለም የተጻፈ ነው።",
      category: "illumination",
    },
    {
      id: 9,
      src: "/images/manuscript-madonna.png",
      alt: "Manuscript with Mary and Jesus Icon",
      title: language === "en" ? "Manuscript with Madonna and Child" : "የቅድስት ማርያም እና የኢየሱስ ምስል ያለው መጽሐፍ",
      description:
        language === "en"
          ? "An illuminated Ethiopian manuscript displayed with a traditional icon of Mary and Jesus. This composition demonstrates the deep connection between manuscript creation and Orthodox faith."
          : "ከባህላዊ የቅድስት ማርያም እና የኢየሱስ ምስል ጋር የቀረበ በሐረግ የተሰራ የኢትዮጵያ መጽሐፍ። ይህ አቀራረብ በብራና ጽሑፍ ስራ እና በኦርቶዶክስ እምነት መካከል ያለውን ጥልቅ ግንኙነት ያሳያል።",
      category: "religious",
    },
  ]

  // Filter manuscripts based on selected category
  const filteredManuscripts = filter === "all" ? manuscripts : manuscripts.filter((item) => item.category === filter)

  // Categories for filtering
  const categories = [
    { id: "all", label: language === "en" ? "All Manuscripts" : "ሁሉም ብራናዎች" },
    { id: "illumination", label: language === "en" ? "Illuminated Pages" : "በሐረግ የተሰሩ ገጾች" },
    { id: "religious", label: language === "en" ? "Religious Scenes" : "ሃይማኖታዊ ትዕይንቶች" },
    { id: "text", label: language === "en" ? "Scripture Pages" : "የመጽሐፍ ቅዱስ ገጾች" },
    { id: "binding", label: language === "en" ? "Traditional Binding" : "ባህላዊ አሰራር" },
  ]

  // Process information
  const processSteps = [
    {
      icon: <Compass />,
      title: language === "en" ? "Material Selection" : "የቁሳቁስ ምርጫ",
      description:
        language === "en"
          ? "Carefully selecting the finest goat leather for parchment preparation, ensuring authentic materials for each manuscript."
          : "ለብራና ዝግጅት ምርጥ የፍየል ቆዳን በጥንቃቄ መምረጥ፣ ለእያንዳንዱ መጽሐፍ ትክክለኛ ቁሳቁሶችን ማረጋገጥ።",
    },
    {
      icon: <BookOpen />,
      title: language === "en" ? "Script Preparation" : "የጽሑፍ ዝግጅት",
      description:
        language === "en"
          ? "Master scribes carefully write ancient Ge'ez texts using traditional techniques and natural inks."
          : "ብቁ ጸሐፊዎች ባህላዊ ቴክኒኮችን እና ተፈጥሯዊ ቀለሞችን በመጠቀም ጥንታዊ የግእዝ ጽሑፎችን በጥንቃቄ ይጽፋሉ።",
    },
    {
      icon: <Paintbrush />,
      title: language === "en" ? "Illumination & Decoration" : "ሐረግና ጌጣጌጥ",
      description:
        language === "en"
          ? "Skilled artists add intricate decorative elements, colorful borders, and traditional Ethiopian patterns."
          : "ብቁ ሰዓሊዎች ውስብስብ ጌጣጌጦችን፣ ቀለማማ ድንበሮችን እና ባህላዊ የኢትዮጵያ ንድፎችን ይጨምራሉ።",
    },
    {
      icon: <History />,
      title: language === "en" ? "Binding & Finishing" : "ማሰርና ማጠናቀቅ",
      description:
        language === "en"
          ? "Final assembly using ancient binding techniques to create durable, authentic manuscripts that will endure for generations."
          : "ለብዙ ትውልዶች የሚቆዩ ጠንካራ እና ትክክለኛ መጻህፍትን ለመፍጠር ጥንታዊ የአሰራር ዘዴዎችን በመጠቀም የመጨረሻ ድምር።",
    },
  ]

  // Handle navigation in lightbox
  const handlePrevious = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === 0 ? filteredManuscripts.length - 1 : selectedImage - 1)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === filteredManuscripts.length - 1 ? 0 : selectedImage + 1)
  }

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
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0">
          <div className="relative h-full w-full">
            <Image
              src="/images/manuscript-open1.png"
              alt="Ethiopian Manuscripts"
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30"></div>
          </div>
        </div>

        <div className="container relative z-10 flex h-full flex-col items-center justify-center space-y-6 text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white text-sm font-medium"
          >
            <Calendar className="h-4 w-4 mr-2" />
            <span>{language === "en" ? "Established June 24, 2015" : "የተመሰረተው 2015 ሰኔ 24 ቀን ነው"}</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl max-w-4xl"
          >
            {language === "en" ? "Ancient Ethiopian Manuscript Tradition" : "ጥንታዊ የኢትዮጵያ የብራና ጽሑፍ ባህል"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[800px] text-white/90 md:text-xl"
          >
            {language === "en"
              ? "Melad Ancient Parchment Books Preparation Center preserves Ethiopia's rich manuscript heritage through authentic craftsmanship and traditional techniques."
              : "ሜላድ ጥንታዊ የብራና ጽሑፍ ማዕከል ኢትዮጵያ ሀብታም የብራና ቅርስ በእውነተኛ ጥበብና ባህላዊ ቴክኒኮች ይጠብቃል።"}
          </motion.p>
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

      {/* Introduction Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary mb-6">
                <Info className="h-4 w-4 mr-2" />
                <span>{language === "en" ? "About Melad Manuscripts" : "ስለ ሜላድ ብራናዎች"}</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                {language === "en" ? "The Meaning of Melad" : "የሜላድ ትርጉም"}
              </h2>

              <p className="text-slate-600 mb-4">
                {language === "en"
                  ? "The name 'Melad' comes from the Ge'ez verb meaning 'to collect, to gather, to accumulate' - reflecting our mission to collect, preserve, and promote Ethiopia's ancient manuscript tradition."
                  : "(ሜላድ) የስሙ ትርጉሙ አለደ ፡አከማቸ ፡ ሰበሰበ ፡ከሚለው የግእዝ ግስ የተገኘ ነው። ይህም የኢትዮጵያን ጥንታዊ የብራና ባህል መሰብሰብ፣ መጠበቅና ማስፋፋት የሚለውን ተልእኮአችንን ያንጸባርቃል።"}
              </p>

              <p className="text-slate-600 mb-4">
                {language === "en"
                  ? "Founded by Megabe Tibebat Qomos Aba Kidane Mariam Abebe and Bekure Me'emenan Ato Fiqadu Anbesu, Melad is dedicated to preserving Ethiopia's rich manuscript heritage and passing it to future generations."
                  : "መስራች መጋቤ ጥበባት ቆሞስ አባ ኪዳነ ማርያም አበበ እና በኩረ ምእመናን አቶ ፍቃዱ አንበሱ የመሰረቱት ሜላድ የኢትዮጵያን ሀብታም የብራና ቅርስ ለመጠበቅ እና ለወደፊት ትውልድ ለማስተላለፍ የተሰጠ ነው።"}
              </p>

              <p className="text-slate-600 mb-6">
                {language === "en"
                  ? "Melad was established on June 24, 2015, after two years of intensive research on the challenges facing traditional manuscript creation. Today, the center is a legally licensed organization employing skilled artisans dedicated to this ancient craft."
                  : "ሜላድ ጥንታዊ የብራና ጽሑፍ ማእከል 2015 ሰኔ 24 ቀን ከሁለት አመት የጥናት በኋላ በባህላዊ የብራና ስራ ላይ ያሉትን ችግሮች በመረዳት ተመሰረተ። ዛሬ ማዕከሉ በዚህ ጥንታዊ ጥበብ የሚሰሩ ብቁ ባለሙያዎችን የሚያሰራ ህጋዊ ፈቃድ ያለው ድርጅት ነው።"}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button className="rounded-full bg-gradient-primary hover:opacity-90 shadow-md">
                  {language === "en" ? "Our Mission" : "ተልእኮአችን"}
                </Button>
                <Button variant="outline" className="rounded-full">
                  {language === "en" ? "Our Team" : "ቡድናችን"}
                </Button>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
                <Image src="/images/manuscript-open2.png" alt="Ethiopian Manuscript" fill className="object-cover" />
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="absolute -bottom-6 -left-6 h-32 w-32 rounded-2xl overflow-hidden border-4 border-white shadow-xl animate-float"
              >
                <Image src="/images/manuscript-text.png" alt="Manuscript Detail" fill className="object-cover" />
              </motion.div>

              {/* Stats card */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -top-6 -right-6 glass-card rounded-xl p-4 shadow-lg hidden md:block"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-500">{language === "en" ? "Skilled Artisans" : "ብቁ ባለሙያዎች"}</p>
                    <p className="text-lg font-bold text-slate-900">38</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Manuscript Gallery */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-12">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4">
              <BookOpen className="h-4 w-4 mr-2" />
              <span>{language === "en" ? "Our Manuscripts" : "የኛ ብራናዎች"}</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
              {language === "en" ? "Explore Our Collection" : "ስብስባችንን ይመልከቱ"}
            </h2>

            <p className="text-slate-600 max-w-3xl mx-auto mb-8">
              {language === "en"
                ? "Each manuscript created at Melad is a unique work of art that preserves Ethiopia's rich literary and religious heritage."
                : "በሜላድ የሚፈጠር እያንዳንዱ ብራና የኢትዮጵያን ሀብታም የጽሑፍና የሃይማኖት ቅርስ የሚጠብቅ ልዩ የጥበብ ሥራ ነው።"}
            </p>

            <Tabs defaultValue="all" className="w-full">
              <TabsList className="bg-white p-1 rounded-full shadow-md inline-flex mb-8">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category.id}
                    value={category.id}
                    onClick={() => setFilter(category.id)}
                    className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white px-6 py-2"
                  >
                    {category.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredManuscripts.map((item, index) => (
              <motion.div key={index} variants={itemVariants} className="group" onClick={() => setSelectedImage(index)}>
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden cursor-pointer hover-card">
                  <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <Image
                      src={item.src || "/placeholder.svg"}
                      alt={item.alt}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-xl font-bold text-white">{item.title}</h3>
                      <p className="text-white/80 mt-2 line-clamp-2">{item.description}</p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-4 text-white border-white/30 bg-white/10 hover:bg-white/20"
                      >
                        <ZoomIn className="mr-2 h-4 w-4" />
                        {language === "en" ? "View Details" : "ዝርዝር ይመልከቱ"}
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4">
              <History className="h-4 w-4 mr-2" />
              <span>{language === "en" ? "Our Process" : "የሥራ ሂደታችን"}</span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-4">
              {language === "en" ? "The Art of Manuscript Creation" : "የብራና ጽሑፍ የሥራ ጥበብ"}
            </h2>

            <p className="text-slate-600 max-w-3xl mx-auto">
              {language === "en"
                ? "Creating a traditional Ethiopian manuscript is a meticulous process that combines artistry, craftsmanship, and spiritual devotion."
                : "ባህላዊ የኢትዮጵያ ብራና መፍጠር ጥበብን፣ እደ-ጥበብን እና መንፈሳዊ ቁርጠኝነትን የሚያጣምር ጥልቅ ሂደት ነው።"}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {processSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative"
              >
                <div className="bg-white rounded-2xl shadow-lg p-6 border border-slate-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  {/* Step number */}
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                    {step.icon}
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600">{step.description}</p>

                  {/* Connection line - only for non-last items on larger screens */}
                  {index < processSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 w-8 h-2 bg-primary/20 z-10">
                      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-primary"></div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary mb-6">
                <Sparkles className="h-4 w-4 mr-2" />
                <span>{language === "en" ? "Our Services" : "አገልግሎቶቻችን"}</span>
              </div>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 mb-6">
                {language === "en" ? "Preserving Tradition Through Craftsmanship" : "ባህልን በጥበብ መጠበቅ"}
              </h2>

              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {language === "en" ? "Parchment Preparation" : "የብራና ቆዳ ዝግጅት"}
                    </h3>
                    <p className="text-slate-600 mt-2">
                      {language === "en"
                        ? "We process goat leather to create authentic parchment for manuscripts, religious art, begena and krar instruments."
                        : "የፍየል ቆዳን ፕሮሰስ አድርገን ለብራና ጽሑፍ፣ ለቅዱሳን ስእላት መሳያ፣ ለበገነ መስሪያ፣ ለክራር መስሪያ እንዲሆን እናዘጋጃለን።"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {language === "en" ? "Manuscript Creation" : "የብራና መጽሐፍት ዝግጅት"}
                    </h3>
                    <p className="text-slate-600 mt-2">
                      {language === "en"
                        ? "We create complete manuscripts including Gedlat (hagiographies), Dersanat (homilies) and other religious texts to order."
                        : "ገድላትን፣ ድርሳናትን፣ ትናንሽ መልካም ልኮችን በብራና አዘጋጅተን ለተፈለገበት ገዳም ደብር በተባለው ቀን እናቀርባለን።"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {language === "en" ? "Religious Art & Decoration" : "ቅዱስ ስዕል እና ጌጥ"}
                    </h3>
                    <p className="text-slate-600 mt-2">
                      {language === "en"
                        ? "We create sacred illustrations and traditional Ethiopian decorative patterns (harag) on parchment."
                        : "ቅዱሳት ስእላትን በብራና እንሳላለን፤ ሐረግንም በብራና እንሰራለን።"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1 w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <span className="font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">
                      {language === "en" ? "Manuscript Restoration" : "የብራና መጽሐፍት እድሳት"}
                    </h3>
                    <p className="text-slate-600 mt-2">
                      {language === "en"
                        ? "We correct, illustrate, and rebind existing manuscripts, adding appropriate illustrations and decorative elements."
                        : "የተጻፉ መጻሕፍትን ገድላትን ድርሳናትን አርመን በየታሪክ ቦታው ስእላቶችን ሐረጎችን ስለን ደጉሰን እናቀርባለን።"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-2xl">
                  <Image
                    src="/images/manuscript-crucifixion.png"
                    alt="Manuscript Illumination"
                    fill
                    className="object-cover"
                  />
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="absolute -top-6 -right-6 w-32 h-32 rounded-xl overflow-hidden border-4 border-white shadow-xl animate-float"
                  style={{ animationDelay: "1s" }}
                >
                  <Image
                    src="/images/manuscript-closed.png"
                    alt="Religious Illumination"
                    fill
                    className="object-cover"
                  />
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/manuscript-pattern.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

        <div className="container px-4 md:px-6 relative">
          <div className="max-w-3xl mx-auto text-center text-white">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter mb-6">
              {language === "en" ? "Support Ethiopia's Manuscript Heritage" : "የኢትዮጵያን የብራና ቅርስ ይደግፉ"}
            </h2>
            <p className="text-white/90 text-lg mb-8">
              {language === "en"
                ? "Join us in preserving these invaluable cultural treasures. Contact us to commission a manuscript, visit our center, or support our mission."
                : "እነዚህን የማይተኩ የባህል ሀብቶች ለመጠበቅ ይቀላቀሉን። ብራና ለማዘዝ፣ ማዕከላችንን ለመጎብኘት፣ ወይም ተልእኮአችንን ለመደገፍ ያግኙን።"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="h-12 px-8 bg-white text-primary hover:bg-white/90 rounded-full text-base">
                {language === "en" ? "Contact Us" : "ያግኙን"}
              </Button>
              <Button
                variant="outline"
                className="h-12 px-8 border-white/30 text-white hover:bg-white/10 rounded-full text-base"
              >
                {language === "en" ? "Support Our Mission" : "ተልእኮአችንን ይደግፉ"}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Image Modal/Lightbox */}
      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-0 shadow-none">
          <div className="relative bg-black/95 rounded-lg overflow-hidden">
            {/* Close button */}
            <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
              <X className="h-5 w-5" />
            </DialogClose>

            {/* Navigation buttons */}
            <button
              onClick={handlePrevious}
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-black/50 p-3 text-white hover:bg-black/70"
            >
              <ChevronRight className="h-6 w-6" />
            </button>

            {/* Image */}
            {selectedImage !== null && (
              <div className="flex flex-col">
                <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full">
                  <Image
                    src={filteredManuscripts[selectedImage].src || "/placeholder.svg"}
                    alt={filteredManuscripts[selectedImage].alt}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Image info */}
                <div className="bg-black p-4 sm:p-6 text-white">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{filteredManuscripts[selectedImage].title}</h3>
                      <p className="mt-2 text-white/90">{filteredManuscripts[selectedImage].description}</p>
                    </div>
                    <Button className="rounded-full bg-primary hover:bg-primary/90 text-white">
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {language === "en" ? "Learn More" : "ተጨማሪ ይወቁ"}
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
