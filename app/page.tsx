import HeroSection from "@/components/hero-section"
import AboutSection from "@/components/about-section"
import ServicesSection from "@/components/services-section"
import ProductsSection from "@/components/products-section"
import GallerySection from "@/components/gallery-section"
import ManuscriptProcess from "@/components/manuscript-process"
import ContactSection from "@/components/contact-section"

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center ">
      <HeroSection />
      <AboutSection />
      <ManuscriptProcess />
      <ServicesSection />
      <ProductsSection />
      <GallerySection />
      <ContactSection />
    </div>
  )
}
