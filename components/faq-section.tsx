"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useInView } from "@/hooks/use-in-view"
import { ChevronDown, HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "What exactly do I get?",
    answer:
      "You receive a fully custom professional website, an editable menu system, payment processing, a dedicated Google Business Profile setup, and a lifetime pass to our exclusive foodpreneur community with technical support.",
  },
  {
    question: "Is this just an access token or an actual website?",
    answer:
      "It's both. The access token acts as your digital key to the community and your proof of ownership. It is built on NFT technology, which is powered by Web3 to ensure you truly own your digital presence.",
  },
  {
    question: "When does development start?",
    answer:
      "For every 10 foodpreneurs that join, we begin a new development sprint. We guarantee website delivery within 2 weeks of your batch filling up, fulfilled in chronological order.",
  },
  {
    question: "Is website delivery guaranteed?",
    answer:
      "Yes. Once the community hits 50 members, website delivery is guaranteed for all holders, even if a batch isn't full. Below 50 members, we rely on the community to help fill batches to trigger sprints.",
  },
  {
    question: "Why is it discounted?",
    answer:
      "We want to enable SMEs and local food businesses to get the reach they deserve. This early-bird pricing is a lower barrier to entry to help us build a strong foundation of success stories.",
  },
  {
    question: "Can I gift it?",
    answer:
      "Yes! You can purchase it and gift it to a family member, partner, or friend. The NFT is transferable to via your wallet to their wallet, meaning you can even resell it if you choose.",
  },
  {
    question: "What blockchain is the access token NFT built on?",
    answer:
      "The access token is built on the Starknet blockchain, which is a layer 2 scaling solution for Ethereum. And the wallet to use is \"Ready Wallet (Formerly Known as Argent)\""
  },
  {
    question: "Can I pay with normal money?",
    answer:
      "Yes. You can pay in Nigerian naira, USD, or other major currencies. You don't need to own crypto to participate. Crypto payment is optional.",
  },
  {
    question: "Who is this for?",
    answer:
      "Any food business: restaurants, home cooks, food trucks, shawarma spots, catering businesses. If you sell food and want to be visible online, this is for you.",
  },
  {
    question: "Still confused? Need help?",
    answer: (
      <span>
        If you need any clarification, don't hesitate to reach out. Chat with me directly on{" "}
        <a 
          href="https://t.me/jedshock" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary font-bold hover:underline"
        >
          Telegram (t.me/jedshock)
        </a>{" "}
        or DM me on{" "}
        <a 
          href="https://x.com/jedshock" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-primary font-bold hover:underline"
        >
          X (@jedshock)
        </a>. 
        I'm here to help.
      </span>
    ),
  },
]

export default function FAQSection() {
  const { ref, isInView } = useInView()
  const [openIdx, setOpenIdx] = useState<number | null>(null)

  return (
    <section id="faq" ref={ref} className="w-full py-24 px-6 bg-[#030303] relative border-t border-white/5">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center p-3 rounded-full bg-white/5 border border-white/10 mb-6">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Questions?</h2>
          <p className="text-lg text-slate-400">We've got answers.</p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              className={`border rounded-2xl overflow-hidden transition-all duration-300 ${openIdx === idx ? 'border-primary/50 bg-white/5 shadow-[0_0_15px_-5px_var(--primary)]' : 'border-white/5 bg-white/5 hover:border-white/20'}`}
            >
              <button
                onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                className="w-full p-6 flex items-center justify-between text-left focus:outline-none"
              >
                <span className={`text-lg font-medium transition-colors ${openIdx === idx ? 'text-white' : 'text-slate-300'}`}>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 transition-transform duration-300 flex-shrink-0 ml-4 ${openIdx === idx ? "rotate-180 text-primary" : ""
                    }`}
                />
              </button>

              <AnimatePresence>
                {openIdx === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-slate-400 leading-relaxed font-light border-t border-white/5 pt-4">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
