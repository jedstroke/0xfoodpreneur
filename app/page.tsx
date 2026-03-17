"use client"
import Hero from "@/components/hero"
import ValueProps from "@/components/value-props"
import ProblemSection from "@/components/problem-section"
import Web3Explanation from "@/components/web3-explanation"
import FounderSection from "@/components/founder-section"
import GiftingSection from "@/components/gifting-section"
import FAQSection from "@/components/faq-section"
import RoadmapSection from "@/components/roadmap-section"
import FinalCTA from "@/components/final-cta"
import Footer from "@/components/footer"
import ShareSection from "@/components/share-section"

export default function Home() {
  return (
    <main className="w-full min-h-screen bg-background">
      <Hero />
      <ValueProps />
      <RoadmapSection />
      <ProblemSection />
      <Web3Explanation />
      <FounderSection />
      <GiftingSection />
      <FAQSection />
      <ShareSection />
      <FinalCTA />
      <Footer />
    </main>
  )
}
