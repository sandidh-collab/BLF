import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, ShieldCheck, MapPin } from 'lucide-react';

import { useCMS } from '../contexts/CMSContext';

export default function About() {
  const { content } = useCMS();
  
  return (
    <section id="about" className="py-24 bg-brand-white">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="grid grid-cols-2 gap-4 relative"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="pt-12"
            >
              <img src={content.about.image1} alt="foundation work" className="rounded-[3rem] shadow-xl w-full" referrerPolicy="no-referrer" />
            </motion.div>
            <div>
              <motion.img 
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300 }}
                src={content.about.image2} 
                alt="community" 
                className="rounded-[3rem] shadow-xl w-full mb-4" 
                referrerPolicy="no-referrer" 
              />
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-brand-primary p-8 rounded-[3rem] text-white shadow-xl"
              >
                <Heart className="w-8 h-8 mb-4 fill-brand-accent text-brand-accent animate-pulse" />
                <p className="text-2xl font-display font-bold">ESTD 2023</p>
                <p className="text-xs uppercase tracking-widest opacity-60">Serving Humanity</p>
              </motion.div>
            </div>

          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 text-brand-primary font-bold tracking-widest uppercase text-xs mb-4"
            >
              <ShieldCheck className="w-4 h-4" />
              Trusted & Transparent
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-4xl md:text-6xl font-display font-medium text-brand-primary mb-8 leading-tight"
            >
              {content.about.title.split(' Humanity ').map((part, i) => (
                <React.Fragment key={part}>
                  {i > 0 && <span className="font-accent font-bold text-brand-accent tracking-tighter">Humanity</span>}
                  {part}
                </React.Fragment>
              ))}
            </motion.h2>
            <div className="space-y-6 text-gray-600 text-lg leading-relaxed mb-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
              >
                {content.about.description}
              </motion.p>
              <ul className="space-y-4 list-none">
                {[content.about.pillar1, content.about.pillar2, content.about.pillar3].map((pillar, idx) => (
                  <motion.li 
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + idx * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-brand-accent/20 flex items-center justify-center shrink-0 mt-1">
                      <div className="w-2 h-2 rounded-full bg-brand-accent" />
                    </div>
                    <span>{pillar}</span>
                  </motion.li>
                ))}
              </ul>
            </div>


            <div className="grid md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-warm flex items-center justify-center text-brand-primary shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-primary">Bangladesh Focus</h4>
                  <p className="text-sm">Dedicated to serving the local communities across Bangladesh.</p>
                </div>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.9 }}
                className="flex gap-4"
              >
                <div className="w-12 h-12 rounded-2xl bg-brand-warm flex items-center justify-center text-brand-primary shrink-0">
                  <span className="font-accent font-black text-2xl leading-none">M</span>
                </div>
                <div>
                  <h4 className="font-bold text-brand-primary">Mindful Impact</h4>
                  <p className="text-sm">Every penny is tracked and used for meaningful change.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
