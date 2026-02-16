"use client";

import { useState } from 'react';
import { MOCK_BATCH, calculateExtractionYield } from '@/lib/traceability';
import { motion } from 'framer-motion';

export default function TraceabilitySection() {
    const [batch] = useState(MOCK_BATCH);
    const extractionYield = calculateExtractionYield(batch.tds, batch.beverageWeight, batch.dryCoffeeWeight);

    return (
        <section className="py-24 bg-brand-charcoal/30 backdrop-blur border-y border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-8 relative z-10">
                <h2 className="font-display text-4xl md:text-5xl text-white mb-16 text-center">
                    <span className="text-brand-copper">PRECISION</span> EXTRACTION
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    {/* Formula Display */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        className="font-mono bg-black/50 p-8 rounded-lg border border-brand-green/30"
                    >
                        <div className="text-xs text-brand-green mb-4 tracking-widest uppercase">Target Equation</div>
                        <div className="text-xl md:text-2xl text-white leading-loose">
                            RE (%) = <span className="text-brand-copper">{batch.tds}%</span> × <span className="text-brand-copper">{batch.beverageWeight}g</span>
                            <div className="w-full h-px bg-white/20 my-2"></div>
                            <div className="text-center text-brand-copper">{batch.dryCoffeeWeight}g</div>
                        </div>

                        <div className="mt-8 flex justify-between items-end">
                            <span className="text-sm text-gray-400">Calculated Yield:</span>
                            <span className="text-4xl text-brand-green font-bold text-glow">{extractionYield.toFixed(2)}%</span>
                        </div>
                    </motion.div>

                    {/* Description */}
                    <div className="space-y-6">
                        <h3 className="text-2xl text-white font-display">The Science of Flavor</h3>
                        <p className="text-gray-400 leading-relaxed">
                            We monitor Total Dissolved Solids (TDS) to ensure every batch extracts the optimal spectrum of flavor notes.
                            Our Cyber-Wash process guarantees a clean, transparent cup profile consistent with our 21% extraction target.
                        </p>
                        <div className="flex gap-4">
                            <div className="px-4 py-2 border border-brand-copper text-brand-copper text-xs tracking-widest uppercase rounded">
                                Batch: {batch.id}
                            </div>
                            <div className="px-4 py-2 border border-white/20 text-white/50 text-xs tracking-widest uppercase rounded">
                                Roast: {batch.roastDate}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
