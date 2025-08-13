"use client"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  BookOpen,
  Paintbrush,
  Wrench,
  GraduationCap,
  ArrowRight,
  Clock,
  Users,
  Award,
  CheckCircle,
  Star,
  MessageCircle,
  Phone,
  Mail,
  Sparkles,
  Target,
  Zap,
  Heart,
} from "lucide-react"

export default function ServicesPage() {
  const { language } = useLanguage()
  const [activeService, setActiveService] = useState(0)
  const [hoveredFeature, setHoveredFeature] = useState<number | null>(null)

  const services = [
    {
      id: "manuscript-creation",
      icon: <BookOpen className="h-8 w-8" />,
      title: language === "en" ? "Manuscript Creation" : "የብራና መጽሐፍት ዝግጅት",
      subtitle: language === "en" ? "Complete Religious Texts" : "ሙሉ ሃይማኖታዊ ጽሑፎች",
      description:
        language === "en"
          ? "We create complete manuscripts including Gedlat (hagiographies), Dersanat (homilies) and other religious texts to order, delivered to monasteries and churches on specified dates."
          : "ገድላትን፣ ድርሳናትን፣ ትናንሽ መልካም ልኮችን በብራና አዘጋጅተን ለተፈለገበት ገዳም ደብር በተባለው ቀን እናቀርባለን።",
      features: [
        language === "en" ? "Custom religious texts" : "ልዩ ሃይማኖታዊ ጽሑፎች",
        language === "en" ? "Traditional Ge'ez script" : "ባህላዊ የግዕዝ ፊደል",
        language === "en" ? "Authentic parchment" : "እውነተኛ ብራና",
        language === "en" ? "Timely delivery" : "በወቅቱ አቅርቦት",
      ],
      image: "/images/manuscript-open1.png",
      price: language === "en" ? "From $500" : "ከ500 ዶላር ጀምሮ",
      duration: language === "en" ? "2-4 weeks" : "2-4 ሳምንት",
      badge: language === "en" ? "Most Popular" : "በጣም ተወዳጅ",
    },
    {
      id: "sacred-illumination",
      icon: <Paintbrush className="h-8 w-8" />,
      title: language === "en" ? "Sacred Illumination" : "ቅዱስ ሐረግ",
      subtitle: language === "en" ? "Traditional Ethiopian Art" : "ባህላዊ የኢትዮጵያ ጥበብ",
      description:
        language === "en"
          ? "We create sacred illustrations and traditional Ethiopian decorative patterns (harag) on parchment using natural pigments and time-honored techniques."
          : "ቅዱሳት ስእላትን በብራና እንሳላለን፤ ሐረግንም በብራና በተፈጥሯዊ ቀለሞች እና በጊዜ የተሞከሩ ቴክኒኮች እንሰራለን።",
      features: [
        language === "en" ? "Hand-painted icons" : "በእጅ የተሳሉ ምስሎች",
        language === "en" ? "Natural pigments" : "ተፈጥሯዊ ቀለሞች",
        language === "en" ? "Traditional patterns" : "ባህላዊ ንድፎች",
        language === "en" ? "Custom designs" : "ልዩ ዲዛይኖች",
      ],
      image: "/images/manuscript-crucifixion.png",
      price: language === "en" ? "From $300" : "ከ300 ዶላር ጀምሮ",
      duration: language === "en" ? "1-3 weeks" : "1-3 ሳምንት",
      badge: language === "en" ? "Premium" : "ከፍተኛ ጥራት",
    },
    {
      id: "restoration",
      icon: <Wrench className="h-8 w-8" />,
      title: language === "en" ? "Manuscript Restoration" : "የብራና መጽሐፍት እድሳት",
      subtitle: language === "en" ? "Expert Conservation" : "ባለሙያ ጥበቃ",
      description:
        language === "en"
          ? "We correct, illustrate, and rebind existing manuscripts, adding appropriate illustrations and decorative elements while preserving their historical integrity."
          : "የተጻፉ መጻሕፍትን ገድላትን ድርሳናትን አርመን በየታሪክ ቦታው ስእላቶችን ሐረጎችን ስለን ደጉሰን እናቀርባለን።",
      features: [
        language === "en" ? "Historical preservation" : "ታሪካዊ ጥበቃ",
        language === "en" ? "Expert rebinding" : "ባለሙያ እንደገና ማሰሪያ",
        language === "en" ? "Damage repair" : "ጉዳት ማስተካከያ",
        language === "en" ? "Documentation" : "ሰነድ አያያዝ",
      ],
      image: "/images/manuscript-closed.png",
      price: language === "en" ? "From $200" : "ከ200 ዶላር ጀምሮ",
      duration: language === "en" ? "1-2 weeks" : "1-2 ሳምንት",
      badge: language === "en" ? "Expert Care" : "ባለሙያ እንክብካቤ",
    },
    {
      id: "training",
      icon: <GraduationCap className="h-8 w-8" />,
      title: language === "en" ? "Training & Education" : "ስልጠና እና ትምህርት",
      subtitle: language === "en" ? "Preserve Traditional Skills" : "ባህላዊ ክህሎቶችን መጠበቅ",
      description:
        language === "en"
          ? "Comprehensive training programs to preserve traditional manuscript creation techniques, including workshops for scribes, artists, and parchment specialists."
          : "ባህላዊ የብራና ጽሑፍ ዘዴዎችን ለመጠበቅ ሰፊ የስልጠና ፕሮግራሞች፣ ለጸሐፊዎች፣ ሰዓሊዎች እና የብራና ቆዳ ባለሙያዎች ወርክሾፖችን ጨምሮ።",
      features: [
        language === "en" ? "Hands-on workshops" : "ተግባራዊ ወርክሾፖች",
        language === "en" ? "Master craftsmen" : "ዋና ባለሙያዎች",
        language === "en" ? "Certificate programs" : "የምስክር ወረቀት ፕሮግራሞች",
        language === "en" ? "Cultural preservation" : "የባህል ጥበቃ",
      ],
      image: "/images/manuscript-text.png",
      price: language === "en" ? "From $150" : "ከ150 ዶላር ጀምሮ",
      duration: language === "en" ? "1-4 days" : "1-4 ቀናት",
      badge: language === "en" ? "Educational" : "ትምህርታዊ",
    },
  ]

  const processSteps = [
    {
      step: "01",
      title: language === "en" ? "Consultation" : "ምክክር",
      description:
        language === "en"
          ? "We discuss your requirements, timeline, and specific needs for your manuscript project."
          : "ስለ ፍላጎትዎ፣ የጊዜ ሰሌዳ እና ለብራና ፕሮጀክትዎ ልዩ ፍላጎቶች እንወያያለን።",
      icon: <MessageCircle className="h-6 w-6" />,
    },
    {
      step: "02",
      title: language === "en" ? "Design & Planning" : "ዲዛይን እና እቅድ",
      description:
        language === "en"
          ? "Our experts create detailed plans and designs based on traditional Ethiopian manuscript styles."
          : "ባለሙያዎቻችን በባህላዊ የኢትዮጵያ ብራና ዘይቤዎች ላይ በመመስረት ዝርዝር እቅዶችና ዲዛይኖችን ይፈጥራሉ።",
      icon: <Target className="h-6 w-6" />,
    },
    {
      step: "03",
      title: language === "en" ? "Creation" : "ፍጠራ",
      description:
        language === "en"
          ? "Skilled artisans begin the meticulous process of creating your manuscript using traditional techniques."
          : "ብቁ ባለሙያዎች ባህላዊ ቴክኒኮችን በመጠቀም የብራናዎን ጥልቅ የፍጠራ ሂደት ይጀምራሉ።",
      icon: <Zap className="h-6 w-6" />,
    },
    {
      step: "04",
      title: language === "en" ? "Quality Check" : "የጥራት ምርመራ",
      description:
        language === "en"
          ? "Every manuscript undergoes rigorous quality control to ensure it meets our high standards."
          : "እያንዳንዱ ብራና ከፍተኛ ደረጃችንን እንዲያሟላ ጥብቅ የጥራት ቁጥጥር ያልፋል።",
      icon: <CheckCircle className="h-6 w-6" />,
    },
    {
      step: "05",
      title: language === "en" ? "Delivery" : "አቅርቦት",
      description:
        language === "en"
          ? "Your completed manuscript is carefully packaged and delivered to your specified location."
          : "የተጠናቀቀው ብራናዎ በጥንቃቄ ተጠቅልሎ ወደ ተወሰነው ቦታዎ ይደርሳል።",
      icon: <Heart className="h-6 w-6" />,
    },
  ]

  const testimonials = [
    {
      name: language === "en" ? "Abune Petros Monastery" : "አቡነ ጴጥሮስ ገዳም",
      role: language === "en" ? "Monastery" : "ገዳም",
      content:
        language === "en"
          ? "The manuscripts created by Melad are of exceptional quality. Their attention to detail and respect for tradition is remarkable."
          : "በሜላድ የተፈጠሩት ብራናዎች ልዩ ጥራት ያላቸው ናቸው። ለዝርዝር ጉዳዮች ትኩረታቸው እና ለባህል ያላቸው አክብሮት አስደናቂ ነው።",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: language === "en" ? "Dr. Alemayehu Teshome" : "ዶክተር አለማየሁ ተሾመ",
      role: language === "en" ? "Cultural Historian" : "የባህል ታሪክ ምሁር",
      content:
        language === "en"
          ? "Melad's work in preserving Ethiopian manuscript tradition is invaluable. They are true guardians of our heritage."
          : "ሜላድ የኢትዮጵያን የብራና ባህል በመጠበቅ ላይ የሚሰራው ሥራ በዋጋ የማይተመን ነው። እነሱ የቅርሳችን እውነተኛ ጠባቂዎች ናቸው።",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
    {
      name: language === "en" ? "St. Mary's Church" : "ቅድስት ማርያም ቤተክርስቲያን",
      role: language === "en" ? "Church" : "ቤተክርስቲያን",
      content:
        language === "en"
          ? "The restoration work done on our ancient manuscripts was beyond our expectations. Truly professional service."
          : "በጥንታዊ ብራናዎቻችን ላይ የተሰራው የእድሳት ሥራ ከጠበቅነው በላይ ነበር። በእውነት ሙያዊ አገልግሎት።",
      rating: 5,
      image: "/placeholder.svg?height=60&width=60",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white ml-9 mr-9">
      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[600px] w-full overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="absolute inset-0 bg-[url('/images/manuscript-pattern.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

        <div className="container relative z-10 flex h-full flex-col items-center justify-center space-y-6 text-center px-4">
      

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl max-w-4xl"
          >
            {language === "en" ? "Preserving Heritage Through Expert Craftsmanship" : "ቅርስን በባለሙያ ጥበብ መጠበቅ"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[800px] text-white/90 md:text-xl"
          >
            {language === "en"
              ? "From manuscript creation to restoration, our comprehensive services preserve Ethiopia's ancient literary traditions with modern excellence."
              : "ከብራና ፍጠራ እስከ እድሳት፣ ሰፊ አገልግሎቶቻችን የኢትዮጵያን ጥንታዊ የጽሑፍ ባህሎች በዘመናዊ ብቃት ይጠብቃሉ።"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
           <Button
              variant="outline"
              className="h-12 px-8  bg-white text-primary hover:bg-white/10 rounded-full text-base"
            >              {language === "en" ? "View Our Services" : "አገልግሎቶቻችንን ይመልከቱ"}
            </Button>

            <Button
              variant="outline"
              className="h-12 px-8  bg-white text-primary hover:bg-white/10 rounded-full text-base"
            >
              {language === "en" ? "Get Quote" : "ዋጋ ይጠይቁ"}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
     <section className="py-12 md:py-20 ml-10">
  <div className="container px-4 md:px-6 max-w-7xl mx-auto">
    <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-3"
      >
        {language === "en" ? "Comprehensive Manuscript Services" : "ሰፊ የብራና አገልግሎቶች"}
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-3 text-slate-600 md:text-lg leading-relaxed"
      >
        {language === "en"
          ? "From creation to restoration, we offer complete manuscript services that honor Ethiopian traditions while meeting modern standards."
          : "ከፍጠራ እስከ እድሳት፣ የኢትዮጵያ ባህሎችን በማክበር ዘመናዊ ደረጃዎችን የሚያሟሉ ሙሉ የብራና አገልግሎቶችን እንሰጣለን።"}
      </motion.p>
    </div>

    <Tabs defaultValue="manuscript-creation" className="w-full">
      <div className="flex justify-center mb-10">
<TabsList
  className="
    inline-flex p-1 rounded-full shadow-md border bg-white
    space-x-1
  "
>

          {services.map((service, index) => (
            <TabsTrigger
              key={service.id}
              value={service.id}
              className="rounded-full data-[state=active]:bg-primary data-[state=active]:text-white px-5 py-2 text-xs sm:text-sm font-semibold"
              onClick={() => setActiveService(index)}
            >
              <span className="hidden sm:inline">{service.title}</span>
              <span className="sm:hidden">{service.icon}</span>
            </TabsTrigger>
          ))}
        </TabsList>
      </div>

      {services.map((service, index) => (
        <TabsContent key={service.id} value={service.id} className="mt-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="grid lg:grid-cols-2 gap-10 items-center"
          >
            <div className="space-y-5 max-w-xl mx-auto lg:mx-0">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 text-primary text-xl">
                  {service.icon}
                </div>
                <div>
                  
                  <h3 className="text-2xl font-bold text-slate-900 leading-tight">{service.title}</h3>
                  <p className="text-slate-600 text-sm">{service.subtitle}</p>
                </div>
              </div>

              <p className="text-slate-600 text-base leading-relaxed">{service.description}</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-primary" />
                    <span className="text-slate-600 text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex items-center space-x-6 pt-4 text-sm text-slate-600">
                <div className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>{service.duration}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>{service.price}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-5">
                <Button className="bg-primary hover:bg-primary/90 text-white rounded-full py-2 px-6 text-sm font-semibold flex items-center justify-center">
                  {language === "en" ? "Get Started" : "ይጀምሩ"}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" className="rounded-full py-2 px-6 text-sm font-semibold">
                  {language === "en" ? "Learn More" : "ተጨማሪ ይወቁ"}
                </Button>
              </div>
            </div>

            <div className="relative max-w-md mx-auto lg:mx-0">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6 }}
                className="relative aspect-[4/3] rounded-3xl shadow-2xl overflow-hidden"
              >
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 400px"
                  priority={index === activeService}
                />
              </motion.div>

              
            </div>
          </motion.div>
        </TabsContent>
      ))}
    </Tabs>
  </div>
</section>

      {/* Process Section */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4"
            >
              {language === "en" ? "How We Work" : "እንዴት እንሰራለን"}
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-4 text-slate-600 md:text-lg max-w-3xl mx-auto"
            >
              {language === "en"
                ? "Our streamlined process ensures quality results while maintaining the traditional craftsmanship that makes each manuscript unique."
                : "የተስተካከለ ሂደታችን እያንዳንዱን ብራና ልዩ የሚያደርገውን ባህላዊ ጥበብ በመጠበቅ የጥራት ውጤቶችን ያረጋግጣል።"}
            </motion.p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary/20 via-primary to-primary/20 transform -translate-y-1/2 hidden lg:block"></div>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative"
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                >
                  <Card
                    className={`text-center p-6 border-0 shadow-lg transition-all duration-300 ${
                      hoveredFeature === index ? "shadow-xl -translate-y-2 bg-primary text-white" : "bg-white"
                    }`}
                  >
                    <CardContent className="p-0">
                      {/* Step Number */}
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full mb-4 transition-all duration-300 ${
                          hoveredFeature === index ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                        }`}
                      >
                        {step.icon}
                      </div>

                      {/* Step Badge */}
                      <div
                        className={`inline-block px-3 py-1 rounded-full text-xs font-bold mb-3 transition-all duration-300 ${
                          hoveredFeature === index ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                        }`}
                      >
                        {step.step}
                      </div>

                      <h3
                        className={`text-lg font-bold mb-2 transition-all duration-300 ${
                          hoveredFeature === index ? "text-white" : "text-slate-900"
                        }`}
                      >
                        {step.title}
                      </h3>

                      <p
                        className={`text-sm transition-all duration-300 ${
                          hoveredFeature === index ? "text-white/90" : "text-slate-600"
                        }`}
                      >
                        {step.description}
                      </p>
                    </CardContent>
                  </Card>

                  {/* Connection Dot */}
                  <div className="absolute top-1/2 -right-4 w-3 h-3 bg-primary rounded-full transform -translate-y-1/2 hidden lg:block"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4"
            >
              <Users className="h-4 w-4 mr-2" />
              <span>{language === "en" ? "Client Testimonials" : "የደንበኞች ምስክርነት"}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4"
            >
              {language === "en" ? "What Our Clients Say" : "ደንበኞቻችን ምን ይላሉ"}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>

                    <p className="text-slate-600 mb-6 italic">"{testimonial.content}"</p>

                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={testimonial.image || "/placeholder.svg"}
                          alt={testimonial.name}
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{testimonial.name}</div>
                        <div className="text-slate-500 text-sm">{testimonial.role}</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
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
              {language === "en" ? "Ready to Start Your Project?" : "ፕሮጀክትዎን ለመጀመር ዝግጁ ነዎት?"}
            </h2>
            <p className="text-white/90 text-lg mb-8">
              {language === "en"
                ? "Contact us today to discuss your manuscript needs and get a personalized quote for your project."
                : "ስለ ብራና ፍላጎትዎ ለመወያየት እና ለፕሮጀክትዎ ልዩ ዋጋ ለማግኘት ዛሬ ያግኙን።"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">

              <Button
              variant="outline"
              className="h-12 px-8 bg-white text-primary hover:bg-white/10 rounded-full text-base">
                <Phone className="mr-2 h-4 w-4" />
                {language === "en" ? "Call Us Now" : "አሁን ይደውሉ"}
              </Button>


              <Button
                variant="outline"
                className="h-12 px-8 border-white/30  text-primary hover:bg-white/10 rounded-full text-base"
              >
                <Mail className="mr-2 h-4 w-4" />
                {language === "en" ? "Send Message" : "መልዕክት ይላኩ"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
