import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, X, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';
import { useCMS } from '../contexts/CMSContext';

export default function Gallery() {
  const { content } = useCMS();
  const [selectedItem, setSelectedItem] = useState<null | typeof content.gallery[0]>(null);

  const getSpan = (index: number) => {
    const spans = [
      'md:col-span-2 md:row-span-2', // Large
      'col-span-1 md:row-span-1',    // Small
      'col-span-1 md:row-span-1',    // Small
      'col-span-1 md:row-span-1',    // Small
      'md:col-span-1 md:row-span-2', // Tall
      'md:col-span-2 md:row-span-1', // Wide
    ];
    return spans[index % spans.length];
  };

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex items-center gap-2 text-brand-accent font-bold tracking-widest uppercase text-xs mb-4"
            >
              <Camera className="w-4 h-4" />
              Impact in Pictures
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-display font-medium text-brand-primary"
            >
              Capturing Moments of <span className="font-accent font-bold text-brand-accent tracking-tighter">Change</span>.
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
             <a href="#" className="inline-flex items-center gap-2 font-bold text-brand-primary hover:text-brand-accent transition-colors group">
              View full gallery portfolio
              <div className="w-10 h-[1px] bg-brand-primary/20 group-hover:bg-brand-accent group-hover:w-16 transition-all duration-500" />
            </a>
          </motion.div>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]"
        >
          {content.gallery.map((item, i) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, scale: 0.9, y: 30 },
                visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              onClick={() => setSelectedItem(item)}
              className={cn(
                "relative group overflow-hidden rounded-[2.5rem] cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700", 
                getSpan(i)
              )}
            >
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-110 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/95 via-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-8">
                <div className="transform translate-y-12 group-hover:translate-y-0 transition-all duration-500 w-full">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-[1px] bg-brand-accent" />
                    <p className="text-brand-accent font-accent font-bold text-[10px] uppercase tracking-[0.2em]">Story {i + 1}</p>
                  </div>
                  <h3 className="text-white font-display font-bold text-2xl tracking-tight leading-loose mb-6">{item.title}</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white scale-0 group-hover:scale-100 transition-transform duration-500">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-brand-primary/95 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="bg-white w-full max-w-5xl rounded-[3rem] overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row"
            >
              <div className="md:w-3/5 h-80 md:h-auto relative">
                <img 
                  src={selectedItem.url} 
                  alt={selectedItem.title} 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="md:w-2/5 p-10 md:p-16 flex flex-col justify-center">
                <button 
                  onClick={() => setSelectedItem(null)}
                  className="absolute top-6 right-8 p-3 rounded-full hover:bg-slate-50 text-slate-400 hover:text-brand-primary transition-all"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="mb-6">
                  <div className="w-12 h-1 h-brand-accent bg-brand-accent mb-6 rounded-full" />
                  <p className="text-brand-accent font-bold tracking-widest uppercase text-xs mb-4">Case Study</p>
                  <h3 className="text-4xl font-display font-bold text-brand-primary mb-6 leading-tight">
                    {selectedItem.title.split(' ').map((word, i) => (
                      <span key={i} className={i === 1 ? "font-accent text-brand-accent" : ""}>{word} </span>
                    ))}
                  </h3>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8">
                    {selectedItem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
