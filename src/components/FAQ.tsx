import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, ShieldCheck } from 'lucide-react';
import { cn } from '../lib/utils';

const faqs = [
  {
    question: "How can I be sure my donation is being used correctly?",
    answer: "Transparency is our priority. Every month, we release a public report detailing funds received and their exact allocation. You can also view our ongoing gallery and success stories for real-time impact updates."
  },
  {
    question: "Can I donate non-monetary items like clothes or books?",
    answer: "Yes! While our primary focus is health and food, we accept high-quality clothes, educational books, and medical equipment. Please contact us via social media or our support email for logistics."
  },
  {
    question: "Is Begum Lutfennahar Foundation a registered NGO?",
    answer: "We are currently operating as a private non-profit initiative with 4 years of solid track record. We are in the process of formal registration to expand our national reach."
  },
  {
    question: "How do I become a regular monthly donor?",
    answer: "You can sign up for our recurring impact program. Currently, please use the manual donation steps for monthly payments, and we will tag your record as a 'Regular Hero'."
  }
];

export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-brand-warm/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-black uppercase tracking-widest mb-6">
              <HelpCircle size={14} className="text-brand-accent" />
              Information Center
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-bold text-brand-primary mb-6">Common Questions</h2>
            <p className="text-gray-500 text-lg">Everything you need to know about our transparency and operations.</p>
          </motion.div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "rounded-3xl border transition-all overflow-hidden",
                  activeIndex === index ? "bg-white border-brand-primary/20 shadow-xl" : "bg-white/50 border-brand-primary/5 hover:bg-white"
                )}
              >
                <button
                  onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                  className="w-full p-6 md:p-8 flex items-center justify-between text-left"
                >
                  <span className={cn(
                    "font-display font-bold text-lg md:text-xl transition-colors",
                    activeIndex === index ? "text-brand-primary" : "text-slate-600"
                  )}>
                    {faq.question}
                  </span>
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center transition-all",
                    activeIndex === index ? "bg-brand-primary text-white rotate-0" : "bg-slate-100 text-slate-400 rotate-90"
                  )}>
                    {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                  </div>
                </button>
                
                <AnimatePresence>
                  {activeIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-8 pb-8 text-gray-500 leading-relaxed border-t border-slate-50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>


        </div>
      </div>
    </section>
  );
}
