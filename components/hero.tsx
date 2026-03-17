"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight, MessageCircle, Star, Gift } from "lucide-react"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import BuyUnitsModal from "@/components/buy-units-modal"
import NftViewerModal from "@/components/nft-viewer-modal"

const tickers = [
  { price: "₦150,000", label: "Price in Naira" },
  { price: "$100", label: "Price in Dollar" },
]

export default function Hero() {
  const [tickerIndex, setTickerIndex] = useState(0)
  const [competitorIndex, setCompetitorIndex] = useState(0)

  // Competitor names to cycle through with brand colors
  // Note: Colors are chosen to be visible on dark background while respecting brand identity
  const competitors = [
    {
      name: "UberEats",
      color: "text-[#06C167]", // Uber Green
      dotColor: "text-white",
      decoration: "decoration-white"
    },
    {
      name: "Chowdeck",
      color: "text-[#F7C325]", // Chowdeck Yellow (Green is too dark for black bg)
      dotColor: "text-[#0C513F]", // Chowdeck Green 
      decoration: "decoration-[#0C513F]"
    },
    {
      name: "Glovo",
      color: "text-[#FFC244]", // Glovo Yellow
      dotColor: "text-[#00A082]", // Glovo Green
      decoration: "decoration-[#00A082]"
    },
    {
      name: "Bolt Food",
      color: "text-[#34D186]", // Bolt Green
      dotColor: "text-white",
      decoration: "decoration-white"
    },
    {
      name: "Food Court",
      color: "text-[#E60A2B]", // Approximate FoodCourt Orange/Red
      dotColor: "text-[#E3EDF9]",
      decoration: "decoration-white"
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % tickers.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const interval = setInterval(() => {
      setCompetitorIndex((prev) => (prev + 1) % competitors.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const currentCompetitor = competitors[competitorIndex]

  return (
    <section className="relative w-full min-h-screen pt-24 pb-12 lg:py-2 flex items-center justify-center overflow-hidden bg-[#050505]">
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-secondary/20 rounded-full blur-[120px] animate-float" />
        <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] bg-amber-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">

        {/* Left Column: Copy */}
        <div className="text-left space-y-6 lg:space-y-8 pt-8 lg:pt-12">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl pt-4 md:text-7xl font-bold leading-tight tracking-tight text-white min-h-[140px] sm:min-h-0"
          >
            Don't just be<br className="hidden sm:block" />
            <span className="sm:hidden"> </span>on <AnimatePresence mode="wait">
              <motion.span
                key={currentCompetitor.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className={`line-through decoration-4 inline-block ${currentCompetitor.color} ${currentCompetitor.decoration}`}
              >
                {currentCompetitor.name}
                <span className={currentCompetitor.dotColor}>.</span>
              </motion.span>
            </AnimatePresence> <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 block mt-1 sm:mt-0">
              Own Your Presence.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg md:text-xl text-slate-400 max-w-xl leading-relaxed"
          >
            2026 is not the year to be caught lacking or left in the dust. You cook the best dishes, yet they remain undiscovered. Don't let an algorithm keep folks away from your <span className="text-primary font-semibold"> finger-licking dishes</span>. <br className="hidden sm:block" /><span className="text-primary font-semibold">Take control, and turn your kitchen into an empire.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4 pt-2 sm:pt-4 w-full sm:w-auto"
          >
            <BuyUnitsModal
              trigger={
                <button className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-gradient-to-r cursor-pointer from-primary to-orange-500 text-black font-bold rounded-full text-base sm:text-lg shadow-[0_0_30px_-5px_var(--primary)] hover:scale-105 transition-all flex items-center justify-center gap-2">
                  Claim Slot <ArrowRight className="w-5 h-5" />
                </button>
              }
            />
            <NftViewerModal
              trigger={
                <button className="w-full sm:w-auto px-6 sm:px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full text-base sm:text-lg hover:bg-white/10 transition-all flex items-center justify-center gap-2 cursor-pointer">
                  <Gift className="w-5 h-5 text-purple-400" /> View / Gift Access Token
                </button>
              }
            />
          </motion.div>

          <div className="flex items-center gap-4 text-xs sm:text-sm text-slate-500 mt-4">
            <p>15+ Foodpreneurs are making inquiries weekly</p>
          </div>
        </div>

        {/* Right Column: Visuals & Ticker */}
        <div className="relative h-[400px] sm:h-[500px] lg:h-[600px] flex items-center justify-center w-full mt-4 lg:mt-0">
          {/* Rotating Price Card */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative z-20 w-full max-w-[350px] px-4 sm:px-0"
          >
            <div className="glass-card w-full p-6 sm:p-8 rounded-[2rem] border-white/10 relative overflow-hidden bg-black/40 backdrop-blur-xl">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary" />

              <div className="mb-6 sm:mb-8">
                <h3 className="text-slate-400 text-xs sm:text-sm uppercase tracking-wider mb-2">Current Entry Price</h3>
                <div className="h-16 sm:h-20 relative overflow-hidden">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={tickerIndex % tickers.length}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      exit={{ y: -40, opacity: 0 }}
                      transition={{ duration: 0.5, ease: "backOut" }}
                      className="absolute inset-0"
                    >
                      <div className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        {tickers[tickerIndex % tickers.length].price}
                      </div>
                      <div className="text-xs sm:text-sm font-medium text-primary mt-1">
                        {tickers[tickerIndex % tickers.length].label}
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-xs sm:text-sm text-slate-400">
                  <span>Next Price of the Curve</span>
                  <span className="text-white">₦175,000</span>
                </div>
                <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "75%" }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                  />
                </div>
                <p className="text-[10px] sm:text-xs text-right text-amber-500 font-medium animate-pulse">
                  🔥 12 slots remaining at this price chef!
                </p>
              </div>
            </div>
          </motion.div>

          {/* Background Geometric Decor */}
          <svg className="absolute inset-0 w-full h-full z-0 opacity-30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 20 0 50 0 100 100 Z" fill="none" stroke="url(#gradient)" strokeWidth="0.5" />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--secondary)" />
              </linearGradient>
            </defs>
          </svg>
        </div>

      </div>
    </section>
  )
}
