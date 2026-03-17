"use client"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import { Lock, TrendingUp, Users, Zap, MessageCircle } from "lucide-react"
import { BondingCurveChart } from "@/components/ui/bonding-curve-chart"

export default function BondingCurveSection() {
  const { ref, isInView } = useInView()

  return (
    <section id="bonding-curve" ref={ref} className="w-full py-24 px-6 relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* Left: Explanation */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              The Early Bird <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600 font-vibes text-6xl px-3">Gets The Deal</span>
            </h2>
            <p className="text-lg text-slate-400 leading-relaxed">
              We use a <strong>Bonding Curve</strong> pricing model. This means the price automatically increases as more people join.
              Early believers get the lowest price. Latecomers pay close to what I will normally charge.
            </p>
          </motion.div>

          <div className="space-y-8">
            {[
              {
                icon: TrendingUp,
                title: "Price Starts Low (₦150k)",
                desc: "The first batch of spots are strictly limited. Once they're gone, the price jumps.",
              },
              {
                icon: Lock,
                title: "Locked-in Value",
                desc: "Your entry price is your forever price. You own the slot. You own the contract.",
              },
              {
                icon: Users,
                title: "Membership Access",
                desc: "Buying the NFT isn't just for a website. It's your ticket into our exclusive Foodpreneur community.",
              },
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="flex gap-5"
                >
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-slate-400 text-sm">{item.desc}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <div className="mt-12">
            <a
              href="https://t.me/jedshock"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full border border-white/10 hover:bg-white/5 transition-colors text-white flex items-center gap-2 text-sm cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-blue-400" />
              Still confused? Chat with me on Telegram
            </a>
          </div>
        </div>

        {/* Right: Chart Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          <div className="glass-card p-8 rounded-3xl border-primary/20 bg-black/40">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white">Live Pricing</h3>
                <p className="text-sm text-slate-500">Current market demand curve</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-500 uppercase">Current Price</p>
                <p className="text-3xl font-bold text-primary">₦150,000</p>
              </div>
            </div>

            <BondingCurveChart />

            <div className="mt-6 flex gap-4 text-xs text-slate-500 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/20 border border-primary"></div>
                <span>Available Slots</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-secondary/20 border border-secondary"></div>
                <span>Filled Slots</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
