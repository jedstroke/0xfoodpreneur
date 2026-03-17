"use client"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import { Share2, Copy, Check } from "lucide-react"
import { useState } from "react"
import { GlassCard } from "@/components/ui/glass-card"

export default function ShareSection() {
  const { ref, isInView } = useInView()
  const [copied, setCopied] = useState(false)

  const referralUrl = "https://foodpreneurgetyour.website?ref=partner"

  const handleCopy = () => {
    navigator.clipboard.writeText(referralUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=I just found this incredible deal for restaurant owners - get a professional website built for a fraction of the cost. Check it out: ${referralUrl}`,
      "_blank",
    )
  }

  const shareViaEmail = () => {
    window.location.href = `mailto:?subject=Restaurant Owner? Check Out This Website Deal&body=I found an amazing opportunity for restaurant owners. Get your professional website built for way less. Check it out: ${referralUrl}`
  }

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(referralUrl)}`, "_blank")
  }

  return (
    <section ref={ref} className="w-full py-20 px-6 bg-[#050505] relative overflow-hidden">
      {/* Ambient Glow */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Share2 className="w-8 h-8 text-orange-500" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Know Another Restaurant Owner?</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Share this opportunity with fellow restaurant owners and help them level up their online presence. Limited
            slots available, so spread the word.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          {/* Copy Link */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            className="px-8 py-4 bg-white/5 border border-white/10 rounded-xl font-semibold text-white hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-2 hover:border-orange-500/50"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5 text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                Copy Link
              </>
            )}
          </motion.button>

          {/* Social Share Dropdown */}
          <div className="relative group">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full px-8 py-4 bg-gradient-to-r from-pink-600 to-orange-600 text-white rounded-xl font-bold hover:shadow-[0_0_20px_-5px_var(--color-orange-500)] transition-all duration-300"
            >
              Share on Social
            </motion.button>

            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1a1a1a] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-20 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
              <button
                onClick={shareOnTwitter}
                className="w-full px-6 py-3 text-left hover:bg-white/5 transition-colors flex items-center gap-3 text-slate-300 hover:text-white"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                Twitter/X
              </button>
              <button
                onClick={shareViaEmail}
                className="w-full px-6 py-3 text-left hover:bg-white/5 transition-colors flex items-center gap-3 text-slate-300 hover:text-white border-t border-white/5"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                Email
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="w-full px-6 py-3 text-left hover:bg-white/5 transition-colors flex items-center gap-3 text-slate-300 hover:text-white border-t border-white/5"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                LinkedIn
              </button>
            </div>
          </div>
        </motion.div>

        {/* Incentive Message */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 p-6 bg-white/5 rounded-xl border border-dashed border-orange-500/30 text-center"
        >
          <p className="text-slate-300 font-medium">
            Refer a fellow restaurant owner and both of you get an extra month of FREE support after year one.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
