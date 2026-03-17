"use client"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import { AlertCircle, TrendingDown, Zap } from "lucide-react"

export default function ProblemSection() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="w-full py-24 px-6 bg-black relative">
      {/* Background Splatter */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Money Left on the <span className="text-red-500">Table</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Your food is 5-star quality. But your online presence is invisible.
            Stop letting apps eat your profits.
          </p>
        </motion.div>

        <div className="space-y-6">
          {[
            {
              icon: AlertCircle,
              title: "Ghost on Google",
              desc: "Customers search 'basmati jollof rice in wuse 2', but you don't show up. They end up settling for 'regular jollof rice' from a local restaurant.",
            },
            {
              icon: TrendingDown,
              title: "30% Commission Fees",
              desc: "Delivery apps like UberEats and Bolt take a huge slice of your hard-earned revenue. It's unsustainable except you're a big brand that can afford to lose 30% of your revenue.",
            },
            {
              icon: Zap,
              title: "No Customer Owership",
              desc: "You don't know who your customers are. You can't retarget them, email them on their birthdays, send them special offers, or build loyalty.",
            },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="flex gap-6 p-8 rounded-2xl border border-white/5 bg-white/5 backdrop-blur-sm hover:border-red-500/30 hover:bg-white/10 transition-all duration-300 group"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-6 h-6 text-red-500" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                  <p className="text-slate-400 leading-relaxed font-light">{item.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
