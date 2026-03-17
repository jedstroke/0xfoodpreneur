"use client"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import { Gift, Sparkles } from "lucide-react"
import { GlassCard } from "@/components/ui/glass-card"

export default function GiftingSection() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="w-full py-24 px-6 bg-[#0a0a0a] relative flex items-center justify-center">
      {/* Abstract Shapes */}
      <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-pink-500/10 blur-[80px] rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10 w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <GlassCard variant="neon" className="p-12 text-center border-pink-500/20 bg-gradient-to-br from-pink-900/10 to-transparent">
            <div className="mb-6 inline-flex p-4 rounded-full bg-gradient-to-br from-pink-500 to-rose-500 shadow-xl shadow-pink-500/20 items-center justify-center">
              <Gift className="w-8 h-8 text-white animate-bounce-short" />
            </div>

            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Perfect <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-rose-600">Gift</span>
            </h2>

            <p className="text-lg text-slate-300 leading-relaxed max-w-2xl mx-auto mb-8">
              Know someone grinding in the kitchen? A friend with a dream?
              This NFT is more than an asset—it's a key to owning a website and a community of forward thinking foodprenuers.
              <span className="block mt-4 text-pink-400 font-semibold flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4" /> Give them the power of ownership.
              </span>
            </p>

            <button className="px-8 py-3 rounded-full bg-pink-600 hover:bg-pink-500 text-white font-bold transition-all shadow-[0_0_20px_-5px_var(--color-pink-500)]">
              Buy as a Gift
            </button>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  )
}
