"use client"

import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { useState } from "react"
import { MessageCircle, Gift, Menu } from "lucide-react"
import NftViewerModal from "@/components/nft-viewer-modal"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"

export default function Navbar() {
    const { scrollY } = useScroll()
    const [hidden, setHidden] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useMotionValueEvent(scrollY, "change", (latest) => {
        const previous = scrollY.getPrevious() ?? 0
        if (latest > previous && latest > 150) {
            setHidden(true)
        } else {
            setHidden(false)
        }
        setScrolled(latest > 50)
    })

    return (
        <motion.nav
            variants={{
                visible: { y: 0 },
                hidden: { y: -100 },
            }}
            animate={hidden ? "hidden" : "visible"}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className={`fixed top-0 left-0 right-0 z-50 flex justify-center py-4 px-2 transition-all duration-300 ${scrolled ? "py-4" : "py-6"
                }`}
        >
            <div
                className={`flex items-center justify-between w-[95%] max-w-5xl px-4 sm:px-6 py-3 rounded-full border transition-all duration-300 ${scrolled
                    ? "bg-black/60 backdrop-blur-xl border-white/10 shadow-lg shadow-black/20"
                    : "bg-transparent border-transparent"
                    }`}
            >
                {/* Logo */}
                <div className="flex items-center gap-2 shrink-0">
                    <img src="/logo.png" alt="Logo" className="w-24" />
                </div>

                {/* Links (Desktop) */}
                <ul className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <li><a href="#what-you-get" className="hover:text-white transition-colors">Features</a></li>
                    <li><a href="#bonding-curve" className="hover:text-white transition-colors">Bonding Curve</a></li>
                    <li><a href="#faq" className="hover:text-white transition-colors">Questions</a></li>
                </ul>

                {/* CTA (Desktop) */}
                <div className="hidden md:flex items-center gap-3">
                    <NftViewerModal
                        trigger={
                            <button className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-colors cursor-pointer">
                                <Gift className="w-4 h-4 text-purple-400" />
                                <span>My Access Tokens</span>
                            </button>
                        }
                    />
                    <a
                        href="https://t.me/jedshock"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-5 py-2 rounded-full bg-white text-black font-bold text-sm hover:bg-slate-200 transition-colors flex items-center gap-2 cursor-pointer"
                    >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat Now</span>
                    </a>
                </div>

                {/* Mobile Menu */}
                <div className="md:hidden flex items-center gap-2 shrink-0">
                    <Sheet>
                        <SheetTrigger asChild>
                            <button className="p-2 text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer">
                                <Menu className="w-6 h-6" />
                            </button>
                        </SheetTrigger>
                        <SheetContent side="right" className="bg-[#050505] border-white/10 text-white p-8 w-[80%] max-w-[300px]">
                            <SheetHeader className="text-left mb-8">
                                <SheetTitle className="text-white text-xl font-bold flex items-center gap-2">
                                    <img src="/logo.png" alt="Logo" className="w-24" />
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col gap-6">
                                <nav className="flex flex-col gap-4 text-lg font-medium text-slate-300">
                                    <a href="#what-you-get" className="hover:text-white transition-colors">Features</a>
                                    <a href="#bonding-curve" className="hover:text-white transition-colors">Bonding Curve</a>
                                    <a href="#faq" className="hover:text-white transition-colors">Questions</a>
                                </nav>

                                <div className="h-px bg-white/10 my-2" />

                                <div className="flex flex-col gap-4">
                                    <NftViewerModal
                                        trigger={
                                            <button className="flex items-center justify-center gap-2 px-6 py-3 rounded-full border border-white/20 text-white font-medium text-sm hover:bg-white/10 transition-colors cursor-pointer w-full">
                                                <Gift className="w-4 h-4 text-purple-400" />
                                                <span>My Access Tokens</span>
                                            </button>
                                        }
                                    />
                                    <a
                                        href="https://t.me/jedshock"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="px-6 py-3 rounded-full bg-white text-black font-bold text-sm hover:bg-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer w-full"
                                    >
                                        <MessageCircle className="w-4 h-4" />
                                        <span>Chat Now</span>
                                    </a>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </motion.nav>
    )
}
