"use client"
import { useState } from "react"
import { useLanguage } from "./language-provider"
import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, ArrowRight, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Footer() {
  const { t, language } = useLanguage()
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    
    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setMessage(language === "en" ? "Please enter a valid email address." : "እባክዎ ትክክለኛ የኢሜይል አድራሻ ያስገቡ።")
      setLoading(false)
      return
    }
    
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      
      const data = await res.json()
      
      if (res.ok) {
        setMessage(language === "en" ? "Subscribed successfully!" : "በተሳካ ሁኔታ ተመዝግበዋል!")
        setIsSubscribed(true)
        setEmail("")
        
        // Reset subscription status after 5 seconds
        setTimeout(() => {
          setIsSubscribed(false)
        }, 5000)
      } else {
        setMessage(data.error || (language === "en" ? "Subscription failed. Please try again." : "መመዝገብ አልተሳካም። እባክዎ ደግመው ይሞክሩ።"))
      }
    } catch (error) {
      console.error("Subscription error:", error)
      setMessage(language === "en" ? "Subscription failed. Please try again." : "መመዝገብ አልተሳካም። እባክዎ ደግመው ይሞክሩ።")
    }
    setLoading(false)
  }

  const menuItems = [
    { key: "home", href: "/" },
    { key: "about", href: "/about" },
    { key: "services", href: "/services" },
    { key: "products", href: "/products" },
    { key: "gallery", href: "/gallery" },
    { key: "contact", href: "/contact" },
  ]

  return (
    <footer className="w-full bg-slate-900 text-white ml-9  mr-9">
      <div className="container py-12 md:py-16">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-primary to-primary/80 p-6 md:p-8 lg:p-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

          <div className="relative grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-white">
                {language === "en" ? "Stay Connected" : "ተገናኝተው ይቆዩ"}
              </h2>
              <p className="text-white/80 mb-6 max-w-md">
                {language === "en"
                  ? "Subscribe to our newsletter to receive updates on our latest manuscripts, events, and preservation efforts."
                  : "ስለ አዲስ ብራናዎቻችን፣ ዝግጅቶቻችን እና የጥበቃ ጥረቶቻችን ዝማኔዎችን ለመቀበል ለጋዜጣችን ይመዝገቡ።"}
              </p>
              {message && (
                <p className={`font-semibold mb-2 ${isSubscribed ? 'text-green-300' : 'text-red-300'}`}>
                  {isSubscribed && <CheckCircle className="inline h-4 w-4 mr-1" />}
                  {message}
                </p>
              )}
            </div>

            {!isSubscribed ? (
              <form className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3" onSubmit={handleNewsletterSubmit}>
                <Input
                  type="email"
                  placeholder={language === "en" ? "Your email address" : "የኢሜይል አድራሻዎ"}
                  className="h-12 bg-white/20 border-white/10 text-white placeholder:text-white/60 focus:border-white focus:ring-white"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={loading}
                />
                <Button className="h-12 px-6 bg-white text-primary hover:bg-white/90 font-medium" type="submit" disabled={loading}>
                  {loading ? (language === "en" ? "Subscribing..." : "በመመዝገብ ላይ...") : (language === "en" ? "Subscribe" : "ይመዝገቡ")}
                </Button>
              </form>
            ) : (
              <div className="p-4 bg-white/10 rounded-lg text-center">
                <CheckCircle className="h-12 w-12 text-green-300 mx-auto mb-3" />
                <p className="text-white font-semibold">
                  {language === "en" ? "Thank you for subscribing!" : "ለመመዝገብዎ እናመሰግናለን!"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container py-12 border-t border-slate-800">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and About */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <div className="relative h-12 w-12">
                <Image src="/images/brana-logo.png" alt="ብራና Logo" fill className="object-contain" />
              </div>
              <div>
                <span className="block text-xl font-bold text-primary">ብራና</span>
                <span className="block text-sm text-slate-400">Melad Ancient Parchment</span>
              </div>
            </Link>

            <p className="text-slate-400 mb-6">
              {language === "en"
                ? "Preserving Ethiopia's rich manuscript heritage through traditional craftsmanship and innovation since 2015."
                : "ከ2015 ጀምሮ በባህላዊ ጥበብና ፈጠራ የኢትዮጵያን ሀብታም የብራና ቅርስ እየጠበቅን።"}
            </p>

            <div className="flex space-x-3">
              <Link
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-primary transition-colors duration-300"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-primary transition-colors duration-300"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href="#"
                className="flex items-center justify-center w-10 h-10 rounded-full bg-slate-800 hover:bg-primary transition-colors duration-300"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="sm:mt-0">
            <h3 className="text-lg font-bold mb-6 text-white">{language === "en" ? "Quick Links" : "ፈጣን አገናኞች"}</h3>
            <ul className="space-y-3">
              {menuItems.map((item) => (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className="text-slate-400 hover:text-primary transition-colors duration-300 flex items-center"
                  >
                    <ArrowRight className="h-3 w-3 mr-2" />
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="sm:mt-0">
            <h3 className="text-lg font-bold mb-6 text-white">{language === "en" ? "Our Services" : "አገልግሎቶቻችን"}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/services"
                  className="text-slate-400 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  {language === "en" ? "Manuscript Creation" : "የብራና ፍጠራ"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-400 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  {language === "en" ? "Restoration" : "እድሳት"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-400 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  {language === "en" ? "Training & Education" : "ስልጠና እና ትምህርት"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-400 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  {language === "en" ? "Consultation" : "ምክክር"}
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-slate-400 hover:text-primary transition-colors duration-300 flex items-center"
                >
                  <ArrowRight className="h-3 w-3 mr-2" />
                  {language === "en" ? "Custom Orders" : "ልዩ ትዕዛዞች"}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="sm:mt-0">
            <h3 className="text-lg font-bold mb-6 text-white">{language === "en" ? "Contact Us" : "ያግኙን"}</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span className="text-slate-400">
                  {language === "en"
                    ? "Grarar Jarso Wereda, Chagal, Debre Libanos, Ethiopia"
                    : "ግራር ጃርሶ ወረዳ፣ ጫጋል፣ ደብረ ሊባኖስ፣ ኢትዮጵያ"}
                </span>
              </li>
              <li className="flex items-start">
                <Phone className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span className="text-slate-400">+251 91 234 5678</span>
              </li>
              <li className="flex items-start">
                <Mail className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                <span className="text-slate-400">info@melad.org</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="container py-6 border-t border-slate-800">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} ብራና. {language === "en" ? "All rights reserved." : "መብቱ በህግ የተጠበቀ ነው።"}
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-sm text-slate-500 hover:text-primary transition-colors duration-300">
              {language === "en" ? "Privacy Policy" : "የግላዊነት ፖሊሲ"}
            </Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-primary transition-colors duration-300">
              {language === "en" ? "Terms of Service" : "የአገልግሎት ውሎች"}
            </Link>
            <Link href="#" className="text-sm text-slate-500 hover:text-primary transition-colors duration-300">
              {language === "en" ? "Cookie Policy" : "የኩኪ ፖሊሲ"}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}