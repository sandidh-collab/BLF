import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCMS } from '../contexts/CMSContext';
import { User, ShieldCheck, Heart, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

export default function GoverningBody() {
  const { content } = useCMS();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(4);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setVisibleItems(1);
      else if (window.innerWidth < 1024) setVisibleItems(2);
      else setVisibleItems(4);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % content.governingBody.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + content.governingBody.length) % content.governingBody.length);
  };

  return (
    <section id="governing-body" className="py-32 bg-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-accent/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/5 border border-brand-primary/10 text-brand-primary text-xs font-black uppercase tracking-[0.2em] mb-6"
          >
            <ShieldCheck className="w-4 h-4" />
            Leadership & Transparency
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-bold text-brand-primary mb-6"
          >
            Governing <span className="text-brand-accent tracking-tighter">Body</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="w-24 h-1.5 bg-brand-accent mx-auto rounded-full mb-8"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-gray-600 text-lg leading-relaxed"
          >
            Our foundation is guided by a dedicated group of visionaries who ensure 
            every donation reaches it's intended destination with maximum impact.
          </motion.p>
        </div>

        {/* Slider Controls */}
        <div className="flex justify-center md:justify-end gap-3 mb-10">
          <button 
            onClick={prev}
            className="w-14 h-14 rounded-full border border-slate-100 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-lg shadow-slate-100/50 active:scale-95 group"
          >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={next}
            className="w-14 h-14 rounded-full border border-slate-100 flex items-center justify-center text-brand-primary hover:bg-brand-primary hover:text-white transition-all shadow-lg shadow-slate-100/50 active:scale-95 group"
          >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="relative overflow-visible">
          <div className="overflow-hidden px-4 -mx-4 py-10">
            <motion.div 
              className="flex"
              animate={{ x: `-${currentIndex * (100 / visibleItems)}%` }}
              transition={{ type: "spring", damping: 25, stiffness: 100 }}
            >
              {content.governingBody.map((member, i) => (
                <div 
                  key={member.id} 
                  className={cn(
                    "shrink-0 px-5 transition-all duration-500",
                    visibleItems === 1 ? "w-full" : visibleItems === 2 ? "w-1/2" : "w-1/4"
                  )}
                >
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ y: -10 }}
                    className="group"
                  >
                    <div className="relative mb-8">
                      <div className={cn(
                        "aspect-[3/4] rounded-[3rem] overflow-hidden shadow-2xl transition-all duration-500 bg-slate-100 border-4 relative z-10",
                        member.name.toLowerCase().includes('lutfennahar') 
                          ? "border-brand-accent shadow-[0_15px_45px_rgba(212,175,55,0.25)] ring-2 ring-brand-accent/20" 
                          : "border-white group-hover:shadow-brand-primary/20"
                      )}>
                        <img 
                          src={member.image} 
                          alt={member.name} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        
                        {/* Memorial Badge on Image */}
                        {member.name.toLowerCase().includes('lutfennahar') && (
                          <div className="absolute top-4 right-4 bg-brand-accent/90 backdrop-blur-md text-white text-[8px] font-black uppercase tracking-widest px-3 py-1.5 rounded-full shadow-[0_4px_12px_rgba(212,175,55,0.3)] z-20 flex items-center gap-1">
                            <Heart className="w-2 h-2 fill-white animate-pulse" />
                            In Memorial
                          </div>
                        )}

                        {/* Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/90 via-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-10">
                          <motion.div 
                            initial={{ y: 20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            className="bg-white/10 backdrop-blur-md rounded-2xl p-4 w-full border border-white/20"
                          >
                            <p className="text-white text-xs font-bold uppercase tracking-widest text-center">View Profile</p>
                          </motion.div>
                        </div>
                      </div>
                      {/* Glow Decoration */}
                      <div className={cn(
                        "absolute -inset-4 rounded-[4rem] transition-all blur-2xl -z-0",
                        member.name.toLowerCase().includes('lutfennahar')
                          ? "bg-brand-accent/10 opacity-100"
                          : "bg-brand-accent/0 group-hover:bg-brand-accent/5"
                      )} />
                    </div>
                    
                    <div className="text-center px-4">
                      <h3 className="text-2xl font-display font-medium text-brand-primary mb-2 group-hover:text-brand-accent transition-colors">
                        {member.name}
                        {member.name.toLowerCase().includes('lutfennahar') && (
                          <span className="block text-xs font-signature text-brand-accent mt-0.5 opacity-90 select-none">
                            Our Guiding Light
                          </span>
                        )}
                      </h3>
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-[1px] bg-brand-accent" />
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-sans">
                          {member.role}
                        </p>
                        <div className="w-4 h-[1px] bg-brand-accent" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-24 pt-12 border-t border-slate-100 text-center"
        >
          <p className="text-gray-400 text-sm font-medium flex items-center justify-center gap-3">
            <ShieldCheck className="w-4 h-4 text-brand-accent" />
            Empowered by Collective Responsibility & Ethics
          </p>
        </motion.div>
      </div>
    </section>
  );
}
