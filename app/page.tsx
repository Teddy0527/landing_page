import { HeroSection } from "@/components/hero-section"
import { ServiceSection } from "@/components/service-section"
import { CaseStudySection } from "@/components/case-study-section"
import { PricingSection } from "@/components/pricing-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { ChatbotScript } from "@/components/chatbot-script"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <ServiceSection />
        <CaseStudySection />
        <PricingSection />
        <ContactSection />
      </main>
      <Footer />
      <ChatbotScript />
    </div>
  )
}

