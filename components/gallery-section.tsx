"use client"

import { useLanguage } from "./language-provider"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Dialog, DialogContent, DialogClose } from "@/components/ui/dialog"
import { ChevronLeft, ChevronRight, X } from "lucide-react"

export default function GallerySection() {
  const { t, language } = useLanguage()
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  const galleryItems = [
    {
      src: "/images/manuscript-open1.png",
      alt: "Illuminated Ethiopian Manuscript",
      title: language === "en" ? "Illuminated Religious Text" : "በሐረግ የተሰራ ሃይማኖታዊ ጽሑፍ",
      description:
        language === "en"
          ? "A beautifully illuminated Ethiopian manuscript showing the Dormition of Mary with disciples, featuring traditional Ge'ez text with red and black ink."
          : "የቅድስት ማርያምን ዕረፍት ከደቀ መዛሙርት ጋር የሚያሳይ በሚያምር ሁኔታ የተሰራ የኢትዮጵያ ብራና፣ በቀይና ጥቁር ቀለም የተጻፈ ባህላዊ የግዕዝ ጽሑፍን ያካተተ።",
    },
    {
      src: "/images/manuscript-crucifixion.png",
      alt: "Crucifixion Illumination",
      title: language === "en" ? "Crucifixion Scene" : "የመስቀል ላይ ስቃይ ትዕይንት",
      description:
        language === "en"
          ? "A vibrant illumination depicting the Crucifixion with Mary and John, surrounded by decorative borders and Ge'ez text below."
          : "ቅድስት ማርያምንና ዮሐንስን ከመስቀሉ አጠገብ በሚያሳይ ደማቅ ስዕል፣ በጌጣጌጥ ድንበሮች የተከበበ እና ከታች የግዕዝ ጽሑፍ ያለው።",
    },
    {
      src: "/images/manuscript-open2.png",
      alt: "Ethiopian Manuscript with Hand",
      title: language === "en" ? "Traditional Reading Posture" : "ባህላዊ የንባብ አቀማመጥ",
      description:
        language === "en"
          ? "A reader holding an Ethiopian manuscript showing the traditional way these sacred texts are handled and read."
          : "እነዚህ ቅዱሳት ጽሑፎች በባህላዊ መንገድ እንዴት እንደሚያዙና እንደሚነበቡ የሚያሳይ የኢትዮጵያ ብራናን የያዘ አንባቢ።",
    },
    {
      src: "/images/manuscript-text.png",
      alt: "Ge'ez Text Page",
      title: language === "en" ? "Ancient Ge'ez Script" : "ጥንታዊ የግዕዝ ጽሑፍ",
      description:
        language === "en"
          ? "A beautifully preserved page of Ge'ez text with colorful decorative headers, written in the traditional black and red ink."
          : "በባህላዊ ጥቁርና ቀይ ቀለም የተጻፈ፣ ቀለማማ ጌጣጌጥ ራስጌዎችን ያለው በጥሩ ሁኔታ የተጠበቀ የግዕዝ ጽሑፍ ገጽ።",
    },
    {
      src: "/images/manuscript-closed.png",
      alt: "Bound Ethiopian Manuscript",
      title: language === "en" ? "Traditional Binding" : "ባህላዊ አሰራር",
      description:
        language === "en"
          ? "A traditionally bound Ethiopian manuscript with red leather cover, displayed on ceremonial cloth."
          : "በቀይ ቆዳ ሽፋን የታሰረ ባህላዊ የኢትዮጵያ ብራና፣ በሥነ-ሥርዓት ጨርቅ ላይ የቀረበ።",
    },
    {
      src: "/images/manuscript-open3.png",
      alt: "Illuminated Ethiopian Manuscript",
      title: language === "en" ? "Sacred Illumination" : "ቅዱስ ሐረግ",
      description:
        language === "en"
          ? "An Ethiopian manuscript displaying vibrant illumination alongside traditional Ge'ez text, showcasing the artistic heritage preserved by Melad."
          : "ደማቅ ሐረግን ከባህላዊ የግዕዝ ጽሑፍ ጎን ለጎን የሚያሳይ የኢትዮጵያ ብራና፣ በሜላድ የሚጠበቀውን የጥበብ ቅርስ የሚያሳይ።",
    },
  ]

  const handlePrevious = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === 0 ? galleryItems.length - 1 : selectedImage - 1)
  }

  const handleNext = () => {
    if (selectedImage === null) return
    setSelectedImage(selectedImage === galleryItems.length - 1 ? 0 : selectedImage + 1)
  }

  return (
    <section id="gallery"   className="relative w-full h-screen min-h-[500px] bg-gray-100 flex items-center justify-center"
>
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-2"
          >
           
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-gray-900">{t("gallery")}</h2>
            <p className="mx-auto max-w-[700px] text-gray-600 md:text-xl">
              {language === "en"
                ? "Explore our collection of authentic Ethiopian manuscripts, created using traditional techniques passed down through generations."
                : "ከትውልድ ወደ ትውልድ በተላለፉ ባህላዊ ቴክኒኮች የተሰሩ እውነተኛ የኢትዮጵያ ብራናዎች ስብስባችንን ይመልከቱ።"}
            </p>
          </motion.div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 w-full max-w-5xl mt-8">
            {galleryItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
                onClick={() => setSelectedImage(index)}
              >
                <div className="relative aspect-square overflow-hidden rounded-lg manuscript-border">
                  <Image
                    src={item.src || "/placeholder.svg"}
                    alt={item.alt}
                    fill
                    className="object-cover transition-transform hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      className="mt-2 text-white border-white/30 bg-white/10 hover:bg-white/20 w-fit"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {language === "en" ? "View Details" : "ዝርዝር ይመልከቱ"}
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

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
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Image Modal */}
      <Dialog open={selectedImage !== null} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="max-w-5xl p-0 bg-transparent border-0 shadow-none">
          {selectedImage !== null && (
            <div className="relative bg-black/95 rounded-lg overflow-hidden">
              <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70">
                <X className="h-5 w-5" />
              </DialogClose>

              {/* Navigation */}
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

              <div className="flex flex-col">
                <div className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] w-full">
                  <Image
                    src={galleryItems[selectedImage].src || "/placeholder.svg"}
                    alt={galleryItems[selectedImage].alt}
                    fill
                    className="object-contain"
                  />
                </div>

                <div className="bg-black p-4 sm:p-6 text-white">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h3 className="text-xl font-bold">{galleryItems[selectedImage].title}</h3>
                      <p className="mt-2 text-white/90">{galleryItems[selectedImage].description}</p>
                    </div>
                    <Link href="/manuscripts">
                      <Button className="rounded-full bg-primary hover:bg-primary/90 text-white">
                        <ExternalLink className="mr-2 h-4 w-4" />
                        {language === "en" ? "Learn More" : "ተጨማሪ ይወቁ"}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
