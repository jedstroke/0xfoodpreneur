"use client"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import { Zap, ArrowRight, Lock } from "lucide-react"
import BuyUnitsModal from "@/components/buy-units-modal"

export default function FinalCTA() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="w-full py-24 px-6 relative overflow-hidden flex items-center justify-center">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-black z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent z-0 opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-red-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-500 font-bold mb-8 animate-pulse">
            <Lock className="w-4 h-4" />
            <span>Prices Increase Soon</span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight">
            Own Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">Future.</span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Stop renting your customers from delivery apps. <br className="hidden md:block" />
            Join the founders who are taking back control.
          </p>

          <BuyUnitsModal
            trigger={
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-12 py-6 bg-gradient-to-r from-orange-500 to-red-600 text-white font-bold rounded-full text-xl shadow-[0_0_40px_-10px_var(--color-orange-500)] hover:shadow-[0_0_60px_-15px_var(--color-orange-500)] transition-all duration-300"
              >
                <span className="flex items-center gap-3">
                  Seal the Deal — Own the Contract
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            }
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-12 flex flex-col md:flex-row items-center justify-center gap-6 text-sm text-slate-500"
          >
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span>Instant NFT Delivery</span>
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-slate-800" />
            <div>Secure Payment</div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
