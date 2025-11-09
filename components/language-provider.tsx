"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "am"

interface LanguageContextType {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

// Translation dictionary
const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    about: "About Melad",
    services: "Services",
    products: "Products",
    gallery: "Gallery",
    contact: "Contact Us",
    heroTitle: "Preserving Ancient Ethiopian Manuscripts",
    heroSubtitle:
      "Melad Ancient Parchment Books Preparation Center specializes in the creation, restoration, and preservation of traditional Ethiopian manuscripts.",
    emailPlaceholder: "Enter your email",
    getStarted: "Get Started",
    learnMore: "Learn More",
    contactUs: "Contact Us",

    manuscripts: "Manuscripts",
    years: "Years Experience",
    clients: "Satisfied Clients",
    contactDescription: "Get in touch with us or support our mission to preserve Ethiopia's literary heritage.",
    getInTouch: "Get in Touch",
    contactSubtitle: "We'd love to hear from you",
    sponsorship: "Sponsorship",
    firstName: "First Name",
    firstNamePlaceholder: "John",
    lastName: "Last Name",
    email: "Email",
    emailInputPlaceholder: "your@email.com",
    subject: "Subject",
    subjectPlaceholder: "How can we help?",
    message: "Message",
    messagePlaceholder: "Your message here...",
    sendMessage: "Send Message",
    organizationName: "Organization Name",
    organizationNamePlaceholder: "Your Organization",
    contactPerson: "Contact Person",
    contactPersonPlaceholder: "Full Name",
    phone: "Phone",
    phonePlaceholder: "+251 91 234 5678",
    sponsorshipType: "Sponsorship Type",
    selectType: "Select a type",
    financial: "Financial Support",
    materials: "Materials Donation",
    equipment: "Equipment Donation",
    other: "Other",
    sponsorshipDetails: "Sponsorship Details",
    sponsorshipDetailsPlaceholder: "Please provide details about your sponsorship...",
    submitSponsorship: "Submit Sponsorship",
    contactInformation: "Contact Information",
    address: "Address",
    openingHours: "Opening Hours",
    mondayFriday: "Monday - Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed: "Closed",
    watchVideo: "Watch Video",
    featuredManuscript: "Featured Manuscript",
    ancientGeez: "Ancient Ge'ez Scripture",
    featuredMelad: "Featured Melad",
    viewAll: "View All",
    ancientManuscript: "Ancient Manuscript",
    illuminatedText: "Illuminated Text",
    decorativeBorders: "Decorative Borders",
    manuscriptDescription1: "Rare 16th century Ethiopian manuscript with traditional binding",
    manuscriptDescription2: "Beautifully illuminated religious text with vibrant colors",
    manuscriptDescription3: "Intricate knotwork borders with traditional Ethiopian patterns",
    weeklyPopular: "Weekly Popular",
    harmonyInLife: "Harmony in Life",
    momentOfSilence: "Moment of Silence",
    soundOfNature: "Sound of Nature",

    // Gallery page translations
    galleryTitle: "Our Manuscript Gallery",
    galleryDescription:
      "Explore our collection of rare and beautiful Ethiopian manuscripts, preserved through traditional craftsmanship.",
    featuredManuscripts: "Featured Manuscripts",
    exploreCollection: "Explore Our Collection",
    all: "All",
    illuminated: "Illuminated",
    religious: "Religious",
    decorative: "Decorative",
    preservationTitle: "Preserving Ethiopia's Literary Heritage",
    preservationDesc1:
      "Our team of skilled artisans uses traditional techniques passed down through generations to preserve these invaluable cultural treasures.",
    preservationDesc2:
      "Each manuscript is carefully restored using authentic materials and methods, ensuring these ancient texts will endure for future generations.",
    learnMorePreservation: "Learn more about our preservation process",

    // Manuscript titles and descriptions
    manuscript1Title: "Ge'ez Prayer Book",
    manuscript1Desc: "A beautifully preserved prayer book written in Ge'ez script with traditional Ethiopian binding.",
    manuscript2Title: "Illuminated Gospel",
    manuscript2Desc: "Richly decorated gospel manuscript featuring vibrant colors and intricate patterns.",
    manuscript3Title: "Ancient Psalter",
    manuscript3Desc: "A rare psalter manuscript from the royal collection with gold leaf embellishments.",
    manuscript4Title: "Decorative Border Work",
    manuscript4Desc: "Exquisite example of Ethiopian manuscript border decoration with geometric patterns.",
    manuscript5Title: "Royal Manuscript",
    manuscript5Desc: "A manuscript commissioned by Ethiopian royalty featuring elaborate illustrations.",
    manuscript6Title: "Saint's Life",
    manuscript6Desc: "Illustrated manuscript depicting the life of an Ethiopian saint with narrative scenes.",
    manuscript7Title: "Prayer Scroll",
    manuscript7Desc: "Protective prayer scroll with talismanic properties and magical diagrams.",
    manuscript8Title: "Knotwork Pattern",
    manuscript8Desc: "Detailed manuscript page showcasing the distinctive Ethiopian interlaced pattern work.",
    manuscript9Title: "Historical Chronicle",
    manuscript9Desc: "Royal chronicle documenting the lineage and deeds of Ethiopian rulers.",
    manuscript10Title: "Liturgical Text",
    manuscript10Desc: "Manuscript containing liturgical texts used in Ethiopian Orthodox ceremonies.",
    manuscript11Title: "Biblical Scene",
    manuscript11Desc: "Vivid illustration of biblical narratives in traditional Ethiopian style.",
    manuscript12Title: "Calendar Manuscript",
    manuscript12Desc: "Manuscript containing the Ethiopian liturgical calendar with feast days and saints.",
  },
  am: {
    home: "መነሻ",
    about: "ስለ መላድ",
    services: "አገልግሎቶች",
    products: "ምርቶች",
    gallery: "ማዕከለ-ስዕላት",
    more: "ተጨማሪ", 

    contact: "ያግኙን",
    heroTitle: "የጥንታዊ ኢትዮጵያዊ ጽሑፎችን መጠበቅ",
    heroSubtitle:
      "የመላድ ጥንታዊ የብራና መጽሐፍት ዝግጅት ማዕከል በባህላዊ ቴክኒኮችና ቁሳቁሶች በመጠቀም የኢትዮጵያ ጥንታዊ ጽሑፎችን በመፍጠር፣ በማደስና በመጠበቅ ላይ ይሰራል።",
    emailPlaceholder: "ኢሜይልዎን ያስገቡ",
    getStarted: "ይጀምሩ",
    learnMore: "ተጨማሪ ይወቁ",
    contactUs: "ያግኙን",
    manuscripts: "ብራናዎች",
    years: "ዓመታት ልምድ",
    clients: "ደስተኛ ደንበኞች",
    contactDescription: "ያግኙን ወይም የኢትዮጵያን የጽሑፍ ቅርስ ለመጠበቅ የሚደረገውን ጥረት ይደግፉ።",
    getInTouch: "ያግኙን",
    contactSubtitle: "ከእርስዎ መስማት እንፈልጋለን",
    sponsorship: "ስፖንሰርሺፕ",
    firstName: "መጠሪያ ስም",
    firstNamePlaceholder: "ጆን",
    lastName: "የአባት ስም",
    lastNamePlaceholder: "ዶው",
    email: "ኢሜይል",
    emailInputPlaceholder: "your@email.com",
    subject: "ርዕሰ ጉዳይ",
    subjectPlaceholder: "እንዴት ልንረዳዎት እንችላለን?",
    message: "መልዕክት",
    messagePlaceholder: "መልዕክትዎን እዚህ ይጻፉ...",
    sendMessage: "መልዕክት ይላኩ",
    organizationName: "የድርጅት ስም",
    organizationNamePlaceholder: "ድርጅትዎ",
    contactPerson: "የሚገናኙት ሰው",
    contactPersonPlaceholder: "ሙሉ ስም",
    phone: "ስልክ",
    phonePlaceholder: "+251 91 234 5678",
    sponsorshipType: "የስፖንሰርሺፕ አይነት",
    selectType: "አይነት ይምረጡ",
    financial: "የገንዘብ ድጋፍ",
    materials: "የቁሳቁስ ልገሳ",
    equipment: "የመሳሪያ ልገሳ",
    other: "ሌላ",
    sponsorshipDetails: "የስፖንሰርሺፕ ዝርዝሮች",
    sponsorshipDetailsPlaceholder: "እባክዎን ስለ ስፖንሰርሺፕዎ ዝርዝር ይስጡ...",
    submitSponsorship: "ስፖንሰርሺፕ ያስገቡ",
    contactInformation: "የመገናኛ መረጃ",
    address: "አድራሻ",
    openingHours: "የስራ ሰዓታት",
    mondayFriday: "ሰኞ - አርብ",
    saturday: "ቅዳሜ",
    sunday: "እሁድ",
    closed: "ዝግ ነው",
    watchVideo: "ቪዲዮ ይመልከቱ",
    featuredManuscript: "የተመረጠ ብራና",
    ancientGeez: "ጥንታዊ የግዕዝ መጽሐፍ",
    featuredMelad: "የተመረጡ መላድ",
    viewAll: "ሁሉንም ይመልከቱ",
    ancientManuscript: "ጥንታዊ ብራና",
    illuminatedText: "የተሰዉረ ጽሑፍ",
    decorativeBorders: "ጌጣጌጥ ያለው ድንበር",
    manuscriptDescription1: "ከ16ኛው ክፍለ ዘመን የመጣ ጥሩ የኢትዮጵያ ብራና",
    manuscriptDescription2: "በቀለማት የተሞላ የሃይማኖት ጽሑፍ",
    manuscriptDescription3: "ውስብስብ የኢትዮጵያ ባህላዊ ንድፎች ያሉት ድንበሮች",
    weeklyPopular: "በሳምንት የታዩ",
    harmonyInLife: "በሕይወት ውስጥ ሰላም",
    momentOfSilence: "የዝምታ ጊዜ",
    soundOfNature: "የተፈጥሮ ድምጽ",

    // Gallery page translations
    galleryTitle: "የብራና ማዕከለ-ስዕላት",
    galleryDescription: "በባህላዊ ጥበብ የተጠበቁ ጥቂት እና ውብ የኢትዮጵያ ብራናዎችን ይመልከቱ።",
    featuredManuscripts: "የተመረጡ ብራናዎች",
    exploreCollection: "ስብስባችንን ይመልከቱ",
    all: "ሁሉም",
    illuminated: "የተሰዉሩ",
    religious: "ሃይማኖታዊ",
    decorative: "ጌጣጌጥ ያላቸው",
    preservationTitle: "የኢትዮጵያን የጽሑፍ ቅርስ መጠበቅ",
    preservationDesc1: "የሙያተኞች ቡድናችን ከትውልድ ወደ ትውልድ የተላለፉ ባህላዊ ቴክኒኮችን በመጠቀም እነዚህን የማይተኩ ባህላዊ ሀብቶችን ይጠብቃል።",
    preservationDesc2: "እያንዳንዱ ብራና እነዚህ ጥንታዊ ጽሑፎች ለወደፊት ትውልዶች እንዲቆዩ ለማድረግ በትክክለኛ ቁሳቁሶች እና ዘዴዎች በጥንቃቄ ይታደሳል።",
    learnMorePreservation: "ስለ ጥበቃ ሂደታችን ተጨማሪ ይወቁ",

    // Manuscript titles and descriptions
    manuscript1Title: "የግዕዝ የጸሎት መጽሐፍ",
    manuscript1Desc: "በባህላዊ የኢትዮጵያ አሰራር በግዕዝ ፊደል የተጻፈ በጥሩ ሁኔታ የተጠበቀ የጸሎት መጽሐፍ።",
    manuscript2Title: "የተሰዉረ ወንጌል",
    manuscript2Desc: "ደማቅ ቀለሞችን እና ውስብስብ ንድፎችን ያካተተ በሐብት የተሰራ የወንጌል ብራና።",
    manuscript3Title: "ጥንታዊ መዝሙር",
    manuscript3Desc: "ከንጉሳዊ ስብስብ የመጣ ከወርቅ ቅጠል ጌጦች ጋር ያለ ጥቂት የመዝሙር ብራና።",
    manuscript4Title: "ጌጣጌጥ ያለው የድንበር ስራ",
    manuscript4Desc: "ከጂኦሜትሪያዊ ንድፎች ጋር የኢትዮጵያ ብራና ድንበር ጌጥ የሚያሳይ ምርጥ ምሳሌ።",
    manuscript5Title: "ንጉሳዊ ብራና",
    manuscript5Desc: "ዝርዝር ስዕሎችን ያካተተ በኢትዮጵያ ንጉሳዊ ቤተሰብ የታዘዘ ብራና።",
    manuscript6Title: "የቅዱስ ሕይወት",
    manuscript6Desc: "ታሪካዊ ትረካዎችን ያካተተ የኢትዮጵያ ቅዱስን ሕይወት የሚያሳይ የተሰዉረ ብራና።",
    manuscript7Title: "የጸሎት ጥቅል",
    manuscript7Desc: "ጥበቃ የሚሰጥ የጸሎት ጥቅል ከአስማት ባህሪያት እና ሥዕላዊ ንድፎች ጋር።",
    manuscript8Title: "የተቆላለፈ ንድፍ",
    manuscript8Desc: "የተለየውን የኢትዮጵያ የተቆላለፈ ንድፍ ስራን የሚያሳይ ዝርዝር የብራና ገጽ።",
    manuscript9Title: "ታሪካዊ ዜና መዋዕል",
    manuscript9Desc: "የኢትዮጵያ ገዥዎችን ትውልድ እና ተግባራት የሚዘግብ ንጉሳዊ ዜና መዋዕል።",
    manuscript10Title: "የአምልኮ ጽሑፍ",
    manuscript10Desc: "በኢትዮጵያ ኦርቶዶክስ ሥርዓቶች ውስጥ የሚያገለግሉ የአምልኮ ጽሑፎችን የያዘ ብራና።",
    manuscript11Title: "የመጽሐፍ ቅዱስ ትዕይንት",
    manuscript11Desc: "በባህላዊ የኢትዮጵያ ዘይቤ የመጽሐፍ ቅዱስ ታሪኮችን የሚያሳይ ደማቅ ስዕል።",
    manuscript12Title: "የቀን መቁጠሪያ ብራና",
    manuscript12Desc: "ከበዓላት እና ቅዱሳን ጋር የኢትዮጵያን የአምልኮ ቀን መቁጠሪያ የያዘ ብራና።",
  },
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
