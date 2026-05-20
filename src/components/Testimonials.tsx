import { useState } from 'react';
import { motion } from 'framer-motion';
import { Quote, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';

export default function Testimonials() {
  const { content } = useCMS();
  const stories = content.stories || [];
  const [index, setIndex] = useState(0);

  const nextStep = () => {
    if (stories.length === 0) return;
    setIndex((prev) => (prev + 1) % stories.length);
  };

  const prevStep = () => {
    if (stories.length === 0) return;
    setIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section id="stories" className="py-24 bg-brand-warm/10 overflow-hidden relative">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 text-brand-primary font-bold tracking-widest uppercase text-[10px] mb-4 bg-white/50 px-3 py-1 rounded-lg border border-brand-primary/5"
            >
              <Heart className="w-3 h-3 text-brand-accent fill-brand-accent" />
              Community Impact
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-medium text-brand-primary line-height-tight"
            >
              Stories of <span className="font-accent font-bold text-brand-accent tracking-tighter">Resilience</span>.
            </motion.h2>
          </div>
          
          <div className="flex gap-4 mb-2">
            <button
              onClick={prevStep}
              className="w-14 h-14 rounded-2xl bg-white border border-brand-primary/5 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-xl shadow-brand-primary/5 active:scale-90 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <ChevronLeft className="w-6 h-6 relative z-10 group-hover:-translate-x-1 transition-transform" />
            </button>
            <button
              onClick={nextStep}
              className="w-14 h-14 rounded-2xl bg-white border border-brand-primary/5 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-xl shadow-brand-primary/5 active:scale-90 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-brand-primary/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <ChevronRight className="w-6 h-6 relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        <div className="relative">
          <motion.div 
            animate={{ x: `-${index * (100 / (window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 3))}%` }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="flex gap-8"
          >
            {stories.map((t) => (
              <motion.div
                key={t.id}
                className="min-w-full md:min-w-[calc(50%-1rem)] lg:min-w-[calc(33.333%-1.5rem)] glass p-10 rounded-[3rem] relative group border border-white/60 hover:border-brand-accent/40 shadow-sm hover:shadow-2xl transition-all duration-700 flex flex-col h-full"
              >
                <div className="absolute top-10 right-10 opacity-5 group-hover:opacity-10 group-hover:scale-110 transition-all duration-700">
                  <Quote className="w-20 h-20 text-brand-primary" />
                </div>
                
                <div className="flex items-center gap-5 mb-10 relative z-10">
                  <div className="relative">
                    <motion.div 
                      className="absolute inset-0 bg-brand-accent/20 rounded-[1.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                    />
                    <motion.img 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      src={t.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(t.name)}&background=F3F4F6&color=4B5563&size=200`} 
                      alt={t.name} 
                      className="w-20 h-20 rounded-[1.5rem] object-cover ring-4 ring-white shadow-xl relative z-20" 
                      referrerPolicy="no-referrer" 
                    />
                  </div>
                  <div>
                    <h4 className="font-bold text-xl text-brand-primary leading-tight mb-1">{t.name}</h4>
                    <div className="flex flex-col gap-1">
                      <p className="text-[10px] text-brand-accent font-bold uppercase tracking-widest leading-none">{t.role}</p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                        <MapPin className="w-3 h-3" />
                        {t.location}
                      </div>
                    </div>
                  </div>
                </div>
                
                <p className="text-slate-600 leading-relaxed group-hover:text-brand-primary transition-colors duration-500 text-lg relative z-10 flex-grow">
                  "{t.content}"
                </p>

                <div className="mt-8 pt-8 border-t border-brand-primary/5 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity">
                   <div className="w-12 h-1 bg-brand-primary/10 rounded-full" />
                   <Heart className="w-4 h-4 text-brand-accent" />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <div className="flex justify-center gap-3 mt-16">
          {stories.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`transition-all duration-700 rounded-full ${
                i === index ? "w-10 h-2.5 bg-brand-primary" : "w-2.5 h-2.5 bg-brand-primary/10 hover:bg-brand-primary/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const Heart = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);

