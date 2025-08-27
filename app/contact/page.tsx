"use client"

import type React from "react"

import { useState } from "react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  ArrowRight,
  MessageCircle,
  Heart,
  Users,
  Globe,
  CheckCircle,
  Star,
  Sparkles,
  Building,
  User,
  FileText,
  DollarSign,
  Palette,
  BookOpen,
} from "lucide-react"

export default function ContactPage() {
  const { language } = useLanguage()
  const [activeTab, setActiveTab] = useState("general")
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    organization: "",
    contactPerson: "",
    sponsorshipType: "",
    projectType: "",
    budget: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const contactReasons = [
    {
      id: "general",
      icon: <MessageCircle className="h-6 w-6" />,
      title: language === "en" ? "General Inquiry" : "አጠቃላይ ጥያቄ",
      description: language === "en" ? "Questions about our services or manuscripts" : "ስለ አገልግሎቶቻችን ወይም ብራናዎቻችን ጥያቄዎች",
      badge: language === "en" ? "Most Common" : "በጣም የተለመደ",
    },
    {
      id: "commission",
      icon: <BookOpen className="h-6 w-6" />,
      title: language === "en" ? "Custom Commission" : "ልዩ ትዕዛዝ",
      description: language === "en" ? "Request a custom manuscript or artwork" : "ልዩ ብራና ወይም ጥበብ ሥራ ይጠይቁ",
      badge: language === "en" ? "Popular" : "ተወዳጅ",
    },
    {
      id: "sponsorship",
      icon: <Heart className="h-6 w-6" />,
      title: language === "en" ? "Sponsorship" : "ስፖንሰርሺፕ",
      description: language === "en" ? "Support our preservation mission" : "የጥበቃ ተልእኮአችንን ይደግፉ",
      badge: language === "en" ? "Impact" : "ተጽዕኖ",
    },
    {
      id: "partnership",
      icon: <Users className="h-6 w-6" />,
      title: language === "en" ? "Partnership" : "አጋርነት",
      description: language === "en" ? "Collaborate with our organization" : "ከድርጅታችን ጋር ይተባበሩ",
      badge: language === "en" ? "Strategic" : "ስትራቴጂያዊ",
    },
  ]

  const contactInfo = [
    {
      icon: <MapPin className="h-6 w-6" />,
      title: language === "en" ? "Visit Our Center" : "ማዕከላችንን ይጎብኙ",
      content:
        language === "en"
          ? "Grarar Jarso Wereda, Chagal, Debre Libanos, Ethiopia"
          : "ግራር ጃርሶ ወረዳ፣ ጫጋል፣ ደብረ ሊባኖስ፣ ኢትዮጵያ",
      action: language === "en" ? "Get Directions" : "አቅጣጫ ያግኙ",
    },
    {
      icon: <Phone className="h-6 w-6" />,
      title: language === "en" ? "Call Us" : "ይደውሉልን",
      content: "+251 91 234 5678",
      action: language === "en" ? "Call Now" : "አሁን ይደውሉ",
    },
    {
      icon: <Mail className="h-6 w-6" />,
      title: language === "en" ? "Email Us" : "ኢሜይል ይላኩልን",
      content: "info@melad.org",
      action: language === "en" ? "Send Email" : "ኢሜይል ይላኩ",
    },
    {
      icon: <Globe className="h-6 w-6" />,
      title: language === "en" ? "Follow Us" : "ይከተሉን",
      content: language === "en" ? "Stay updated on social media" : "በማህበራዊ ሚዲያ ዝማኔ ያግኙ",
      action: language === "en" ? "Follow" : "ይከተሉ",
    },
  ]

  const workingHours = [
    {
      day: language === "en" ? "Monday - Friday" : "ሰኞ - አርብ",
      hours: "9:00 AM - 5:00 PM",
      status: "open",
    },
    {
      day: language === "en" ? "Saturday" : "ቅዳሜ",
      hours: "10:00 AM - 2:00 PM",
      status: "open",
    },
    {
      day: language === "en" ? "Sunday" : "እሁድ",
      hours: language === "en" ? "Closed" : "ዝግ ነው",
      status: "closed",
    },
  ]

  const testimonials = [
    {
      name: language === "en" ? "Abune Petros Monastery" : "አቡነ ጴጥሮስ ገዳም",
      role: language === "en" ? "Religious Institution" : "ሃይማኖታዊ ተቋም",
      content:
        language === "en"
          ? "Exceptional service and beautiful manuscripts. Highly recommended!"
          : "ልዩ አገልግሎት እና ውብ ብራናዎች። በጣም የሚመከር!",
      rating: 5,
    },
    {
      name: language === "en" ? "Dr. Alemayehu Teshome" : "ዶክተር አለማየሁ ተሾመ",
      role: language === "en" ? "Cultural Historian" : "የባህል ታሪክ ምሁር",
      content:
        language === "en"
          ? "Professional team with deep knowledge of Ethiopian manuscript traditions."
          : "በኢትዮጵያ የብራና ባህሎች ጥልቅ እውቀት ያላቸው ሙያዊ ቡድን።",
      rating: 5,
    },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setSubmitSuccess(true)

    // Reset form after success
    setTimeout(() => {
      setSubmitSuccess(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        organization: "",
        contactPerson: "",
        sponsorshipType: "",
        projectType: "",
        budget: "",
      })
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white ml-9 mr-9">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] w-full overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-primary/80">
        <div className="absolute inset-0 bg-[url('/images/manuscript-pattern.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/3 blur-3xl"></div>

        <div className="container relative z-10 flex h-full flex-col items-center justify-center space-y-6 text-center px-4 ">
          

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl font-bold tracking-tighter text-white sm:text-5xl md:text-6xl max-w-4xl"
          >
            {language === "en" ? "Let's Create Something Beautiful Together" : "አብረን ውብ ነገር እንፍጠር"}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-[800px] text-white/90 md:text-xl"
          >
            {language === "en"
              ? "Whether you need a custom manuscript, want to support our mission, or have questions about our services, we're here to help."
              : "ልዩ ብራና ይፈልጉ፣ ተልእኮአችንን መደገፍ ይፈልጉ፣ ወይም ስለ አገልግሎቶቻችን ጥያቄዎች ካሉዎት፣ ለመርዳት እዚህ ነን።"}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 mt-8"
          >
            <Button 
            variant="outline"

              className="h-12 px-8 border-white/30 text-primary hover:bg-white/10 rounded-full text-base">
              {language === "en" ? "Start Conversation" : "ውይይት ይጀምሩ"}
            </Button>
            <Button
              variant="outline"
              className="h-12 px-8 border-white/30 text-primary hover:bg-white/10 rounded-full text-base"
            >
              {language === "en" ? "Schedule Visit" : "ጉብኝት ያቅዱ"}
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Contact Reasons */}
      <section className="py-8 md:py-4 bg-white">
  <div className="container px-4 md:px-6">
    <div className="text-center mb-8">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-sm font-medium text-primary mb-4"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              <span>{language === "en" ? "How Can We Help?" : "እንዴት ልንረዳዎት እንችላለን?"}</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-4"
            >
              {language === "en" ? "Choose Your Inquiry Type" : "የጥያቄ አይነትዎን ይምረጡ"}
            </motion.h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {contactReasons.map((reason, index) => (
              <motion.div
                key={reason.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group"
              >
                <Card
                  className={`cursor-pointer border-0 shadow-lg hover:shadow-xl transition-all duration-300 group-hover:-translate-y-2 ${
                    activeTab === reason.id ? "ring-2 ring-primary bg-primary/5" : ""
                  }`}
                  onClick={() => setActiveTab(reason.id)}
                >
                  <CardContent className="p-6 text-center">
                    <div className="relative mb-4">
                      <div
                        className={`inline-flex items-center justify-center w-16 h-16 rounded-full transition-all duration-300 ${
                          activeTab === reason.id
                            ? "bg-primary text-white"
                            : "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white"
                        }`}
                      >
                        {reason.icon}
                      </div>
                      <Badge className="absolute -top-2 -right-2 bg-primary/90 text-white text-xs">
                        {reason.badge}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 mb-2">{reason.title}</h3>
                    <p className="text-slate-600 text-sm">{reason.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-2xl overflow-hidden">
              <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Send className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{language === "en" ? "Send Us a Message" : "መልዕክት ይላኩልን"}</h3>
                    <p className="text-white/80">
                      {language === "en" ? "We'll get back to you within 24 hours" : "በ24 ሰዓት ውስጥ እንመልስልዎታለን"}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-8">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsContent value="general" className="mt-0">
  <form onSubmit={handleSubmit} className="space-y-4">
    <div className="grid md:grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-600 flex items-center">
          <User className="h-3.5 w-3.5 mr-1.5" />
          {language === "en" ? "First Name" : "መጠሪያ ስም"}
        </label>
        <Input
          value={formData.firstName}
          onChange={(e) => handleInputChange("firstName", e.target.value)}
          placeholder={language === "en" ? "John" : "ዮሐንስ"}
          className="h-10 text-sm border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
          required
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-600 flex items-center">
          <User className="h-3.5 w-3.5 mr-1.5" />
          {language === "en" ? "Last Name" : "የአባት ስም"}
        </label>
        <Input
          value={formData.lastName}
          onChange={(e) => handleInputChange("lastName", e.target.value)}
          placeholder={language === "en" ? "Doe" : "ተስፋዬ"}
          className="h-10 text-sm border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
          required
        />
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-3">
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-600 flex items-center">
          <Mail className="h-3.5 w-3.5 mr-1.5" />
          {language === "en" ? "Email" : "ኢሜይል"}
        </label>
        <Input
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange("email", e.target.value)}
          placeholder={language === "en" ? "your@email.com" : "የእርስዎ@ኢሜይል.com"}
          className="h-10 text-sm border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
          required
        />
      </div>
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-gray-600 flex items-center">
          <Phone className="h-3.5 w-3.5 mr-1.5" />
          {language === "en" ? "Phone" : "ስልክ"}
        </label>
        <Input
          type="tel"
          value={formData.phone}
          onChange={(e) => handleInputChange("phone", e.target.value)}
          placeholder="+251 91 234 5678"
          className="h-10 text-sm border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
        />
      </div>
    </div>

    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-600 flex items-center">
        <FileText className="h-3.5 w-3.5 mr-1.5" />
        {language === "en" ? "Subject" : "ርዕሰ ጉዳይ"}
      </label>
      <Input
        value={formData.subject}
        onChange={(e) => handleInputChange("subject", e.target.value)}
        placeholder={language === "en" ? "How can we help you?" : "እንዴት ልንረዳዎት እንችላለን?"}
        className="h-10 text-sm border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
        required
      />
    </div>

    <div className="space-y-1.5">
      <label className="text-xs font-medium text-gray-600 flex items-center">
        <MessageCircle className="h-3.5 w-3.5 mr-1.5" />
        {language === "en" ? "Message" : "መልዕክት"}
      </label>
      <Textarea
        value={formData.message}
        onChange={(e) => handleInputChange("message", e.target.value)}
        placeholder={
          language === "en" ? "Tell us more about your inquiry..." : "ስለ ጥያቄዎ ተጨማሪ ይንገሩን..."
        }
        className="min-h-[120px] text-sm border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary"
        required
      />
    </div>

    <Button
      type="submit"
      disabled={isSubmitting || submitSuccess}
      className="w-full h-10 text-sm font-medium rounded-md bg-primary hover:bg-primary/90 transition-colors"
    >
      {isSubmitting ? (
        <div className="flex items-center space-x-1.5">
          <div className="animate-spin rounded-full h-3.5 w-3.5 border-b-2 border-white"></div>
          <span>{language === "en" ? "Sending..." : "እየላከ..."}</span>
        </div>
      ) : submitSuccess ? (
        <div className="flex items-center space-x-1.5">
          <CheckCircle className="h-3.5 w-3.5" />
          <span>{language === "en" ? "Message Sent!" : "መልዕክት ተልኳል!"}</span>
        </div>
      ) : (
        <div className="flex items-center space-x-1.5">
          <Send className="h-3.5 w-3.5" />
          <span>{language === "en" ? "Send Message" : "መልዕክት ላክ"}</span>
        </div>
      )}
    </Button>
  </form>
</TabsContent>
                  <TabsContent value="commission" className="mt-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            {language === "en" ? "Full Name" : "ሙሉ ስም"}
                          </label>
                          <Input
                            value={formData.firstName}
                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                            placeholder={language === "en" ? "Your full name" : "ሙሉ ስምዎ"}
                            className="h-12 border-slate-200 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            {language === "en" ? "Email" : "ኢሜይል"}
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder={language === "en" ? "your@email.com" : "የእርስዎ@ኢሜይል.com"}
                            className="h-12 border-slate-200 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 flex items-center">
                            <Palette className="h-4 w-4 mr-2" />
                            {language === "en" ? "Project Type" : "የፕሮጀክት አይነት"}
                          </label>
                          <select
                            value={formData.projectType}
                            onChange={(e) => handleInputChange("projectType", e.target.value)}
                            className="flex h-12 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                            required
                          >
                            <option value="">{language === "en" ? "Select project type" : "የፕሮጀክት አይነት ይምረጡ"}</option>
                            <option value="manuscript">{language === "en" ? "Custom Manuscript" : "ልዩ ብራና"}</option>
                            <option value="artwork">{language === "en" ? "Sacred Artwork" : "ቅዱስ ጥበብ"}</option>
                            <option value="restoration">{language === "en" ? "Restoration" : "እድሳት"}</option>
                            <option value="binding">{language === "en" ? "Book Binding" : "መጽሐፍ አሰራር"}</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 flex items-center">
                            <DollarSign className="h-4 w-4 mr-2" />
                            {language === "en" ? "Budget Range" : "የበጀት ክልል"}
                          </label>
                          <select
                            value={formData.budget}
                            onChange={(e) => handleInputChange("budget", e.target.value)}
                            className="flex h-12 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          >
                            <option value="">{language === "en" ? "Select budget range" : "የበጀት ክልል ይምረጡ"}</option>
                            <option value="under-500">Under $500</option>
                            <option value="500-1000">$500 - $1,000</option>
                            <option value="1000-2500">$1,000 - $2,500</option>
                            <option value="2500-5000">$2,500 - $5,000</option>
                            <option value="over-5000">Over $5,000</option>
                          </select>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          {language === "en" ? "Project Details" : "የፕሮጀክት ዝርዝሮች"}
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder={
                            language === "en"
                              ? "Describe your project requirements, timeline, and any specific details..."
                              : "የፕሮጀክት መስፈርቶችዎን፣ የጊዜ ሰሌዳ እና ልዩ ዝርዝሮችን ይግለጹ..."
                          }
                          className="min-h-[150px] border-slate-200 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting || submitSuccess}
                        className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-lg font-medium rounded-full"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {language === "en" ? "Submitting..." : "እየላከ..."}
                          </div>
                        ) : submitSuccess ? (
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {language === "en" ? "Request Submitted!" : "ጥያቄ ተልኳል!"}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Send className="h-4 w-4 mr-2" />
                            {language === "en" ? "Submit Commission Request" : "የትዕዛዝ ጥያቄ ላክ"}
                          </div>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="sponsorship" className="mt-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 flex items-center">
                            <Building className="h-4 w-4 mr-2" />
                            {language === "en" ? "Organization Name" : "የድርጅት ስም"}
                          </label>
                          <Input
                            value={formData.organization}
                            onChange={(e) => handleInputChange("organization", e.target.value)}
                            placeholder={language === "en" ? "Your organization" : "ድርጅትዎ"}
                            className="h-12 border-slate-200 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            {language === "en" ? "Contact Person" : "የሚገናኙት ሰው"}
                          </label>
                          <Input
                            value={formData.contactPerson}
                            onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                            placeholder={language === "en" ? "Full name" : "ሙሉ ስም"}
                            className="h-12 border-slate-200 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            {language === "en" ? "Email" : "ኢሜይል"}
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder={language === "en" ? "contact@organization.com" : "ግንኙነት@ድርጅት.com"}
                            className="h-12 border-slate-200 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {language === "en" ? "Phone" : "ስልክ"}
                          </label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+251 91 234 5678"
                            className="h-12 border-slate-200 focus:border-primary focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center">
                          <Heart className="h-4 w-4 mr-2" />
                          {language === "en" ? "Sponsorship Type" : "የስፖንሰርሺፕ አይነት"}
                        </label>
                        <select
                          value={formData.sponsorshipType}
                          onChange={(e) => handleInputChange("sponsorshipType", e.target.value)}
                          className="flex h-12 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                          required
                        >
                          <option value="">
                            {language === "en" ? "Select sponsorship type" : "የስፖንሰርሺፕ አይነት ይምረጡ"}
                          </option>
                          <option value="financial">{language === "en" ? "Financial Support" : "የገንዘብ ድጋፍ"}</option>
                          <option value="materials">{language === "en" ? "Materials Donation" : "የቁሳቁስ ልገሳ"}</option>
                          <option value="equipment">{language === "en" ? "Equipment Donation" : "የመሳሪያ ልገሳ"}</option>
                          <option value="partnership">
                            {language === "en" ? "Strategic Partnership" : "ስትራቴጂያዊ አጋርነት"}
                          </option>
                          <option value="other">{language === "en" ? "Other" : "ሌላ"}</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center">
                          <FileText className="h-4 w-4 mr-2" />
                          {language === "en" ? "Sponsorship Details" : "የስፖንሰርሺፕ ዝርዝሮች"}
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder={
                            language === "en"
                              ? "Please provide details about your sponsorship proposal, goals, and how you'd like to support our mission..."
                              : "እባክዎን ስለ ስፖንሰርሺፕ ሀሳብዎ፣ ዓላማዎች እና ተልእኮአችንን እንዴት መደገፍ እንደሚፈልጉ ዝርዝር ይስጡ..."
                          }
                          className="min-h-[150px] border-slate-200 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting || submitSuccess}
                        className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-lg font-medium rounded-full"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {language === "en" ? "Submitting..." : "እየላከ..."}
                          </div>
                        ) : submitSuccess ? (
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {language === "en" ? "Proposal Submitted!" : "ሀሳብ ተልኳል!"}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Heart className="h-4 w-4 mr-2" />
                            {language === "en" ? "Submit Sponsorship Proposal" : "የስፖንሰርሺፕ ሀሳብ ላክ"}
                          </div>
                        )}
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="partnership" className="mt-0">
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 flex items-center">
                            <Building className="h-4 w-4 mr-2" />
                            {language === "en" ? "Organization Name" : "የድርጅት ስም"}
                          </label>
                          <Input
                            value={formData.organization}
                            onChange={(e) => handleInputChange("organization", e.target.value)}
                            placeholder={language === "en" ? "Your organization" : "ድርጅትዎ"}
                            className="h-12 border-slate-200 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 flex items-center">
                            <User className="h-4 w-4 mr-2" />
                            {language === "en" ? "Contact Person" : "የሚገናኙት ሰው"}
                          </label>
                          <Input
                            value={formData.contactPerson}
                            onChange={(e) => handleInputChange("contactPerson", e.target.value)}
                            placeholder={language === "en" ? "Full name and title" : "ሙሉ ስም እና ማዕረግ"}
                            className="h-12 border-slate-200 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 flex items-center">
                            <Mail className="h-4 w-4 mr-2" />
                            {language === "en" ? "Email" : "ኢሜይል"}
                          </label>
                          <Input
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder={language === "en" ? "partnerships@organization.com" : "አጋርነት@ድርጅት.com"}
                            className="h-12 border-slate-200 focus:border-primary focus:ring-primary"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-slate-700 flex items-center">
                            <Phone className="h-4 w-4 mr-2" />
                            {language === "en" ? "Phone" : "ስልክ"}
                          </label>
                          <Input
                            type="tel"
                            value={formData.phone}
                            onChange={(e) => handleInputChange("phone", e.target.value)}
                            placeholder="+251 91 234 5678"
                            className="h-12 border-slate-200 focus:border-primary focus:ring-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700 flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          {language === "en" ? "Partnership Proposal" : "የአጋርነት ሀሳብ"}
                        </label>
                        <Textarea
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder={
                            language === "en"
                              ? "Describe your organization, partnership goals, mutual benefits, and how we can collaborate..."
                              : "ድርጅትዎን፣ የአጋርነት ዓላማዎች፣ የጋራ ጥቅሞች እና እንዴት መተባበር እንደምንችል ይግለጹ..."
                          }
                          className="min-h-[150px] border-slate-200 focus:border-primary focus:ring-primary"
                          required
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting || submitSuccess}
                        className="w-full h-12 bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-lg font-medium rounded-full"
                      >
                        {isSubmitting ? (
                          <div className="flex items-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            {language === "en" ? "Submitting..." : "እየላከ..."}
                          </div>
                        ) : submitSuccess ? (
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {language === "en" ? "Proposal Submitted!" : "ሀሳብ ተልኳል!"}
                          </div>
                        ) : (
                          <div className="flex items-center">
                            <Users className="h-4 w-4 mr-2" />
                            {language === "en" ? "Submit Partnership Proposal" : "የአጋርነት ሀሳብ ላክ"}
                          </div>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </div>
            </Card>
          </div>
        </div>
      </section>
{/* Contact Information & Hours - Professional Compact Version */}
<section className="py-12 md:py-20 bg-white">
  <div className="container px-4 mx-auto max-w-6xl">
    <div className="grid lg:grid-cols-2 gap-8 md:gap-10">
      {/* Contact Information */}
      <div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-primary/10 text-xs font-medium text-primary mb-3">
            <MapPin className="h-3.5 w-3.5 mr-1.5" />
            <span>{language === "en" ? "Visit Us" : "ይጎብኙን"}</span>
          </div>
          
          <h2
  id="contact-team"
  className="text-2xl md:text-3xl font-semibold text-gray-900 mb-3"
>
  {language === "en" ? "Contact Our Team" : "ከቡድናችን ጋር ያግኙ"}
</h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="text-gray-600 text-sm md:text-base"
          >
            {language === "en"
              ? "We're here to help with all your manuscript needs."
              : "ለሁሉም የብራና ፍላጎቶችዎ ለመርዳት እዚህ ነን።"}
          </motion.p>
        </motion.div>

        <div className="space-y-4">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <div className="flex items-start p-4 hover:bg-gray-50 rounded-lg transition-colors border border-gray-100">
                <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary mr-4">
                  {info.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900 text-sm mb-1">{info.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{info.content}</p>
                  <a href="#" className="inline-flex items-center text-primary text-xs font-medium hover:underline">
                    {info.action}
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Working Hours & Testimonials */}
      <div className="space-y-6">
        {/* Working Hours */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-primary px-5 py-4">
              <h3 className="flex items-center text-white font-medium text-sm">
                <Clock className="h-4 w-4 mr-2" />
                {language === "en" ? "Working Hours" : "የስራ ሰዓታት"}
              </h3>
            </div>
            <div className="p-5">
              <div className="space-y-3">
                {workingHours.map((schedule, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 text-sm"
                  >
                    <div className="flex items-center">
                      <div className={`w-2 h-2 rounded-full mr-3 ${schedule.status === "open" ? "bg-green-500" : "bg-gray-300"}`} />
                      <span className="text-gray-700">{schedule.day}</span>
                    </div>
                    <span className="text-gray-600 font-medium">{schedule.hours}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 p-3 bg-gray-50 rounded text-xs text-gray-500">
                {language === "en"
                  ? "For urgent matters outside business hours, please email us."
                  : "ከስራ ሰዓት ውጭ ለአስቸኳይ ጉዳዮች እባክዎን ኢሜይል ይላኩ።"}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <div className="border border-gray-200 rounded-lg overflow-hidden">
            <div className="bg-primary px-5 py-4">
              <h3 className="flex items-center text-white font-medium text-sm">
                <Star className="h-4 w-4 mr-2" />
                {language === "en" ? "Client Feedback" : "የደንበኞች አስተያየት"}
              </h3>
            </div>
            <div className="p-5">
              <div className="space-y-4">
                {testimonials.slice(0, 2).map((testimonial, index) => (
                  <div key={index} className="pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="flex mb-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400 mr-0.5" />
                      ))}
                    </div>
                    <p className="text-gray-600 text-sm italic mb-3">"{testimonial.content}"</p>
                    <div className="text-xs">
                      <div className="font-medium text-gray-900">{testimonial.name}</div>
                      <div className="text-gray-500">{testimonial.role}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
              {language === "en" ? "Ready to Start Your Journey?" : "ጉዞዎን ለመጀመር ዝግጁ ነዎት?"}
            </h2>
            <p className="text-white/90 text-lg mb-8">
              {language === "en"
                ? "Join us in preserving Ethiopia's manuscript heritage. Whether you're commissioning a piece or supporting our mission, every connection matters."
                : "የኢትዮጵያን የብራና ቅርስ በመጠበቅ ይቀላቀሉን። ቁራጭ እየተዘዙ ወይም ተልእኮአችንን እየደገፉ፣ እያንዳንዱ ግንኙነት ጠቃሚ ነው።"}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
              variant="outline"

              className="h-12 px-8 bg-white text-primary hover:bg-white/90 rounded-full text-base">
                {language === "en" ? "Schedule a Visit" : "ጉብኝት ያቅዱ"}
              </Button>
              <Button
                variant="outline"
                className="h-12 px-8 border-white/30 text-primary hover:bg-white/10 rounded-full text-base"
              >
                {language === "en" ? "Download Brochure" : "ብሮሹር ያውርዱ"}
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
