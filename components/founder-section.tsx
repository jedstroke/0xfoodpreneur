"use client"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import { Heart } from "lucide-react"

export default function FounderSection() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="w-full py-24 px-6 bg-[#030303] text-white relative overflow-hidden">
      {/* Abstract Background */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-900/10 blur-[100px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 blur-[100px] rounded-full" />

      <div className="max-w-5xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        {/* Left: Image/Avatar Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <div className="relative group">
            <div className="w-64 h-80 rounded-2xl bg-slate-900 relative z-10 overflow-hidden shadow-2xl">
              {/* Founder Image */}
              <img src="/jed.jpg" className="w-full h-full object-cover" alt="Jedidiah Gabriel" />
            </div>

            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-4 -right-4 bg-white text-black px-4 py-1 rounded-full font-bold shadow-lg z-20 flex items-center gap-2 border border-slate-200"
            >
              <Heart className="w-4 h-4 text-emerald-900 fill-emerald-900" />
              <span>Built with Love</span>
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Story */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why I Built <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">This</span>
          </h2>

          <div className="space-y-6 text-slate-300 leading-relaxed">
            <p>
              My name is <strong className="text-white">Jedidiah Gabriel</strong>. I've seen talented chefs and foodpreneurs lost in the ether of the internet.
              I've seen the <span className="text-white underline decoration-primary decoration-2 underline-offset-4">blind spots</span> of the finest foodprenuers with impeccable culinary skills on the web where some customers are accustom to discovering a specific dish of a specific requirement of which their brand checks all the marks but are <span className="text-white underline decoration-primary decoration-2 underline-offset-4">blind to spot</span> through a Google search.
            </p>
            <p>
              I've watched amazing shawarma spots and home cooks struggle while paying brutal 30% commissions to apps that don't care about their brand.
              Imagine creating <span className="text-white font-medium">infinite directories</span>—a digital signpost just a like 5-meter walk from a popular landmark in your area. Contextually, people should find you because you showed up, and AI summaries will help you show up even more.
            </p>
            <p className="p-4 border-l-4 border-primary bg-white/5 rounded-r-xl italic text-white/90">
              "You owe it to your audience to show up. You didn't just show up by cooking, you showed up by being online too."
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-white/10 flex-col items-center gap-4">
            <p className="font-vibes text-2xl text-white">Jedidiah Gabriel</p>
            <p className="text-xs text-slate-500 uppercase tracking-wider">Founder & Lead Dev</p>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
