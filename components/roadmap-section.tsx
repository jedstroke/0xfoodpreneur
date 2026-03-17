"use client"

import { motion } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import { Separator } from "@/components/ui/separator"

const steps = [
    {
        phase: "Phase 1",
        title: "Community Onboarding",
        description: "The journey begins with you. We are gathering an exclusive group of visionary foodpreneurs.",
        points: [
            "Gated community access via NFT ownership",
            "Target: Minimum 10 Foodpreneurs to unlock Phase 2",
            "Direct brainstorming with the founder"
        ]
    },
    {
        phase: "Phase 2",
        title: "Development & Delivery",
        description: "Building your digital empire. We move in batches to ensure quality and speed.",
        points: [
            "For every 10 entries into the community",
            "Websites delivered within a 2-week sprint",
            "Fulfilled in chronological order of entry"
        ]
    },
    {
        phase: "Phase 3",
        title: "Growth & Support",
        description: "You aren't just buying a website; you're gaining a technical partner.",
        points: [
            "Full-time technical support all year round",
            "Ongoing feature updates and strategy sessions",
            "A lifetime community of growing food businesses"
        ]
    }
]

export default function RoadmapSection() {
    const { ref, isInView } = useInView()

    return (
        <section ref={ref} className="w-full py-24 px-6 bg-[#050505] relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[600px] bg-primary/5 blur-[100px] rounded-full" />

            <div className="max-w-4xl mx-auto relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">The Roadmap</h2>
                    <p className="text-lg text-slate-400">Our journey to digitizing your food business.</p>
                </motion.div>

                <div className="space-y-12">
                    {steps.map((step, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.6, delay: idx * 0.2 }}
                            className="relative pl-8 md:pl-0"
                        >
                            {/* Connector Line (Mobile) */}
                            {idx !== steps.length - 1 && (
                                <div className="absolute left-[3px] top-2 h-full w-[2px] bg-white/10 md:hidden" />
                            )}

                            <div className="md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4 items-start">
                                {/* Center Marker (Desktop) - Explicitly placed in col 2 */}
                                <div className="hidden md:flex col-start-2 flex-col items-center h-full">
                                    <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_10px_var(--primary)] z-10" />
                                    {idx !== steps.length - 1 && <div className="w-[1px] h-32 bg-gradient-to-b from-primary/50 to-transparent my-2" />}
                                </div>

                                {/* Mobile Marker */}
                                <div className="absolute left-0 top-2 w-2 h-2 rounded-full bg-primary md:hidden shadow-[0_0_8px_var(--primary)]" />

                                {/* Content Card */}
                                <div className={`bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors ${idx % 2 !== 0 ? "md:col-start-3 md:text-left" : "md:col-start-1 md:text-right"}`}>
                                    <span className="text-primary text-xs font-bold uppercase tracking-wider mb-2 block">
                                        {step.phase}
                                    </span>
                                    <h3 className="text-2xl font-bold text-white mb-3">{step.title}</h3>
                                    <p className="text-slate-400 mb-4 text-sm leading-relaxed">{step.description}</p>
                                    <Separator className="bg-white/10 mb-4" />
                                    <ul className={`space-y-2 text-sm text-slate-300 ${idx % 2 !== 0 ? "" : "md:flex md:flex-col md:items-end"}`}>
                                        {step.points.map((p, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <span className={`text-primary mt-1 md:hidden`}>•</span>
                                                <span>{p}</span>
                                                <span className={`text-primary mt-1 hidden  ${idx % 2 === 0 ? "md:block" : ""}`}>•</span>
                                                <span className={`text-primary mt-1 hidden  ${idx % 2 !== 0 ? "md:hidden" : ""}`}>•</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
