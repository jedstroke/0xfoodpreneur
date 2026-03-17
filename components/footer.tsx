"use client"

import { DotLottieReact } from "@lottiefiles/dotlottie-react"
import { motion } from "framer-motion"
import { Twitter, Mail, ExternalLink } from "lucide-react"

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-16 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-4 gap-12 mb-16">

          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-6">
              <div className="w-12 relative bottom-2 h-12">
                <DotLottieReact
                  src="https://lottie.host/7b5ff5be-6164-497f-820f-3d8b897579bd/Ne51mEHQpA.lottie"
                  loop
                  autoplay
                />
              </div>
              <h3 className="text-2xl font-bold tracking-tight"><span className="text-slate-400">Ox</span>Foodprenuer</h3>
            </div>
            <p className="text-slate-400 max-w-sm leading-relaxed mb-8">
              Empowering food businesses to own their digital presence. No commissions. No lock-ins. Just growth.
            </p>
            <div className="flex gap-4">
              <a href="https://x.com/jedshock" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="mailto:jedidiah@jedshock.com" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 hover:text-primary transition-colors">
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Product */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="font-bold text-lg mb-6">Explore</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="#what-you-get" className="hover:text-primary transition-colors">Overview</a></li>
              <li><a href="#bonding-curve" className="hover:text-primary transition-colors">Bonding Curve</a></li>
              <li><a href="#faq" className="hover:text-primary transition-colors">FAQs</a></li>
            </ul>
          </motion.div>

          {/* Legal/Other */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="font-bold text-lg mb-6">Legal</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a href="/terms" className="hover:text-primary transition-colors">Terms & Conditions</a></li>
              <li><a href="/terms#privacy" className="hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </motion.div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm gap-4">
          <p>
            &copy; 2026 FoodpreneurXJedshock. All rights reserved.
          </p>
          <p className="flex items-center gap-1">
            Built by <a href="https://www.jedshock.com" target="_blank" rel="noopener noreferrer" className="text-white font-medium hover:underline">Jedidiah Gabriel</a> <ExternalLink className="w-3 h-3" />
          </p>
        </div>
      </div>
    </footer>
  )
}
