"use client"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import { GlassCard } from "@/components/ui/glass-card"
import {
  Globe,
  PencilSimple,
  CreditCard,
  Users,
  Article,
  MagnifyingGlass,
  GoogleLogo,
} from "@phosphor-icons/react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const features = [
  {
    title: "Custom Website",
    description: "Your own professional site. No generic templates, just your brand shining online.",
    icon: Globe,
    gradient: "from-[#F59E0B] to-[#EF4444]", // Amber to Red
    iconColor: "text-[#FEF3C7]",
    shadow: "shadow-amber-500/20",
  },
  {
    title: "Instant Menu Updates",
    description: "Change prices and items instantly on your phone. No graphic designer needed.",
    icon: PencilSimple,
    gradient: "from-[#06B6D4] to-[#3B82F6]", // Cyan to Blue
    iconColor: "text-[#CFFAFE]",
    shadow: "shadow-cyan-500/20",
  },
  {
    title: "Direct Payments",
    description: "Money goes straight to you. Accept cards and transfers without the middleman.",
    icon: CreditCard,
    gradient: "from-[#8B5CF6] to-[#D946EF]", // Violet to Fuchsia
    iconColor: "text-[#FAE8FF]",
    shadow: "shadow-purple-500/20",
  },
  {
    title: "Own Your Customers",
    description: "Build your own list. Send promos and keep them coming back for more.",
    icon: Users,
    gradient: "from-[#10B981] to-[#14B8A6]", // Emerald to Teal
    iconColor: "text-[#D1FAE5]",
    shadow: "shadow-emerald-500/20",
  },
  {
    title: "Blog & Updates",
    description: "Share your story and new dishes. Get found by foodies searching online.",
    icon: Article,
    gradient: "from-[#F43F5E] to-[#E11D48]", // Rose
    iconColor: "text-[#FFE4E6]",
    shadow: "shadow-rose-500/20",
  },
  {
    title: "Google Discovery",
    description: "Get seen when hungry people search for 'food near me' in your area.",
    icon: MagnifyingGlass,
    gradient: "from-[#3B82F6] to-[#6366F1]", // Blue to Indigo
    iconColor: "text-[#E0E7FF]",
    shadow: "shadow-blue-500/20",
  },
  {
    title: "Google Business Profile",
    description: "Full setup and verification of your Google Business profile to boost local visibility.",
    icon: GoogleLogo,
    gradient: "from-[#FBBF24] to-[#F59E0B]", // Amber
    iconColor: "text-[#FEF3C7]",
    shadow: "shadow-amber-500/20",
  },
]

export default function ValueProps() {
  const { ref, isInView } = useInView()

  return (
    <section ref={ref} className="w-full pointer py-24 px-6 relative bg-[#080808]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl  mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 id="what-you-get" className="text-4xl md:text-5xl font-bold text-white mb-4">What You Get</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Everything you need to grow your food empire—owned by you, not rented from an app.
          </p>
        </motion.div>

        <div className="relative px-4 md:px-12">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent>
              {features.map((feature, idx) => {
                const Icon = feature.icon
                return (
                  <CarouselItem key={idx} className="md:basis-1/2 cursor-grab active:cursor-grabbing lg:basis-1/3 pl-6">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={isInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ duration: 0.6, delay: idx * 0.05 }}
                      className="h-full"
                    >
                      <GlassCard className="h-[320px] flex flex-col justify-between group overflow-hidden relative border-white/5 hover:border-white/10">
                        {/* Subtle Gradient Overlay on Hover */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`} />

                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${feature.gradient} ${feature.shadow} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className={`w-7 h-7 ${feature.iconColor}`} weight="fill" />
                        </div>

                        <div className="relative z-10">
                          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-primary transition-colors">{feature.title}</h3>
                          <p className="text-slate-400 leading-relaxed font-light text-sm">{feature.description}</p>
                        </div>

                        <div className="w-12 h-1 bg-white/10 rounded-full mt-6 group-hover:w-2/3 group-hover:bg-gradient-to-r from-white/20 to-transparent transition-all duration-500" />
                      </GlassCard>
                    </motion.div>
                  </CarouselItem>
                )
              })}
            </CarouselContent>
            <CarouselPrevious className="hidden md:flex -left-4 bg-white/5 border-white/10 hover:bg-white/10 text-white" />
            <CarouselNext className="hidden md:flex -right-4 bg-white/5 border-white/10 hover:bg-white/10 text-white" />
          </Carousel>
        </div>
      </div>
    </section>
  )
}
