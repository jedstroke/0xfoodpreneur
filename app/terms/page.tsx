"use client"

import { motion } from "framer-motion"
import Footer from "@/components/footer"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
    return (
        <main className="w-full min-h-screen bg-[#050505] text-white">
            {/* Navbar Placeholder / Back Button */}
            <nav className="fixed top-0 left-0 right-0 z-50 p-6">
                <a href="/" className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors text-sm font-medium">
                    <ArrowLeft className="w-4 h-4" />
                    Back to Home
                </a>
            </nav>

            <div className="max-w-4xl mx-auto pt-32 pb-24 px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-8 text-transparent bg-clip-text bg-linear-to-r from-primary to-purple-500">
                        Terms & Conditions
                    </h1>

                    <div className="space-y-12 text-slate-300 leading-relaxed">

                        {/* Mission Statement */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">1. The Mission</h2>
                            <p className="mb-4">
                                This website (<strong>foodpreneurgetyour.website</strong>) is designed to enable inclusion for small businesses and foodpreneurs.
                                Our goal is to help you true digital ownership without the burden of monthly subscriptions or platform lock-ins.
                            </p>
                            <p>
                                By participating, you are securing a professional digital presence through the power of <strong>Web3 technology</strong> and <strong>Smart Contracts</strong>.
                            </p>
                        </section>

                        {/* Ownership Model */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">2. Ownership and The Smart Contract</h2>
                            <p className="mb-4">
                                We utilize the <strong>ERC721 standard</strong> (popularly known as NFTs) to verify ownership and access permissions. In these terms, we refer to them as <strong>Access Tokens</strong>.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                <li>
                                    <strong>Your Access Token is Your Receipt:</strong> The token represents your purchase and grants you perpetual access to the website service and community.
                                </li>
                                <li>
                                    <strong>Transferability:</strong> Because ownership is managed via blockchain, you have the right to transfer, gift, or resell your access token to another business or individual.
                                </li>
                                <li>
                                    <strong>No Recurring Fees:</strong> Unlike traditional website builders, your smart contract ownership means you pay once for the setup and infrastructure access described in your package.
                                </li>
                            </ul>
                        </section>

                        {/* Service Delivery */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">3. Service Delivery</h2>
                            <p className="mb-4">
                                Development sprints are triggered in batches. As outlined in our roadmap, website delivery is guaranteed within a 2-week sprint for every batch of 10 users, fulfilled in chronological order of entry.
                            </p>
                        </section>

                        {/* Refund Policy & Trade-off */}
                        <section>
                            <h2 className="text-2xl font-bold text-white mb-4">4. Refund Policy & Community Responsibility</h2>
                            <div className="p-6 rounded-xl bg-linear-to-br from-red-500/10 to-orange-500/10 border border-red-500/20 mb-4">
                                <p className="font-bold text-red-400 mb-2">⚠ NON-REFUNDABLE</p>
                                <p>
                                    <strong>Access Token purchases are final and non-refundable.</strong>
                                </p>
                            </div>
                            <p className="mb-4">
                                This massive discount is a trade-off. We are offering high-value infrastructure at a fraction of the cost to build a community.
                            </p>

                            <h3 className="text-xl font-bold text-white mt-6 mb-3">The 50-Member Guarantee</h3>
                            <p className="mb-4">
                                <strong>Once the community exceeds 50 members, website delivery is guaranteed for everyone.</strong> At this stage, the project is self-sustaining, and you will receive your website regardless of whether your specific batch is full.
                            </p>
                            <p className="mb-4">
                                <strong>Below 50 members:</strong> The "Community Responsibility" rule applies. If you are in a "tense position" (your batch of 10 hasn't filled up), you are expected to help share the vision to fill the slots and trigger the development sprint.
                            </p>
                        </section>

                        {/* Privacy Policy */}
                        <section id="privacy">
                            <h2 className="text-2xl font-bold text-white mb-4">5. Privacy Policy</h2>
                            <p className="mb-4">
                                We believe in simplicity and sovereignty.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 marker:text-primary">
                                <li>
                                    <strong>No Cookies:</strong> We do not track you. We do not use cookies. We do not collect behavioral data.
                                </li>
                                <li>
                                    <strong>Your Data is Yours:</strong> We do not sell your customer data to third parties. The CRM tools provided give you direct access to your own customers.
                                </li>
                                <li>
                                    <strong>Wallet Privacy:</strong> Your wallet address is used solely for verification of ownership and access to the community.
                                </li>
                            </ul>
                        </section>

                        <section className="bg-white/5 border border-white/10 p-8 rounded-2xl text-center">
                            <p className="text-slate-300 mb-4">By connecting your wallet and purchasing an Access Token, you acknowledge that you have read, understood, and accepted these terms.</p>
                            <p className="italic text-slate-500 text-sm">
                                "We are building a future where foodpreneurs own their destiny. Thank you for being a part of this revolution."
                            </p>
                        </section>

                    </div>
                </motion.div>
            </div>

            <Footer />
        </main>
    )
}
