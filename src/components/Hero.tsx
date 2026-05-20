import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

import { useCMS } from '../contexts/CMSContext';

import { useNavigate } from 'react-router-dom';
import SlideButton from './ui/SlideButton';

export default function Hero() {
  const { content } = useCMS();
  const navigate = useNavigate();
  
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-brand-warm/10">
      {/* Refined Animated Background Blobs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.1, 1],
          rotate: [0, 90, 0],
          x: [0, 50, 0],
          y: [0, -30, 0]
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[800px] h-[800px] bg-brand-primary/5 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          x: [0, -60, 0],
          y: [0, 40, 0]
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-accent/5 rounded-full blur-[100px]" 
      />

      {/* Floating Decorative Elements */}
      <motion.div 
        animate={{ y: [0, -20, 0], rotate: [0, 10, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 hidden lg:block opacity-20"
      >
        <Heart className="w-12 h-12 text-brand-primary fill-brand-primary" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0], rotate: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute top-1/3 right-20 hidden lg:block opacity-20"
      >
        <Users className="w-16 h-16 text-brand-accent" />
      </motion.div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold tracking-widest uppercase mb-8 backdrop-blur-sm shadow-sm"
          >
            <Heart className="w-3 h-3 fill-brand-primary animate-pulse" />
            {content.hero.badge}
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="text-6xl md:text-8xl lg:text-9xl font-display font-medium leading-[1] text-brand-primary mb-10"
          >
            <span className="whitespace-nowrap">Every Donation</span>{' '}
            {content.hero.title.includes(' Brings ') ? (
              <>
                <motion.span 
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8, type: "spring" }}
                  className="font-accent font-bold text-brand-accent tracking-tighter inline-block"
                >
                  Brings
                </motion.span>{' '}
                {content.hero.title.split(' Brings ')[1]}
              </>
            ) : (
              content.hero.title
            )}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed opacity-80"
          >
            {content.hero.description}
          </motion.p>

          {/* Remembrance Tribute */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.65, duration: 1 }}
            className="flex flex-wrap items-center justify-center gap-1.5 md:gap-3 mb-12"
          >
            <span className="h-[1px] w-6 bg-brand-accent/30 hidden sm:inline-block" />
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-brand-accent">In Loving Memory of Begum Lutfennahar</span>
            <span className="font-signature text-2xl text-brand-accent -rotate-2 opacity-95 select-none font-medium ml-1">Lutfennahar</span>
            <span className="h-[1px] w-6 bg-brand-accent/30 hidden sm:inline-block" />
          </motion.div>

          <div className="flex flex-col items-center justify-center gap-4 mb-20 px-4">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-[10px] font-black text-brand-primary/40 uppercase tracking-[0.3em] mb-2"
            >
              Take action now
            </motion.p>
            <SlideButton 
              onSuccess={() => navigate('/donate')} 
              text="Slide to Help Someone"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="aspect-[21/9] rounded-[3rem] overflow-hidden shadow-2xl relative animate-float">
            <img
              src={content.hero.image}
              alt="Humanitarian impact"
              className="w-full h-full object-cover scale-105 hover:scale-100 transition-transform duration-[2s]"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-primary/60 via-transparent to-transparent" />
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="absolute bottom-8 right-8 left-8 md:right-12 md:left-12 flex flex-col md:flex-row items-center justify-between gap-6 glass p-8 rounded-3xl"
            >
              <div className="flex items-center gap-6">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ y: -5, zIndex: 10 }}
                      className="w-12 h-12 rounded-full border-4 border-white/50 overflow-hidden cursor-pointer"
                    >
                      <img src={`https://i.pravatar.cc/100?u=${i+20}`} alt="supporter" referrerPolicy="no-referrer" />
                    </motion.div>
                  ))}
                  <div className="w-12 h-12 rounded-full border-4 border-white bg-brand-accent flex items-center justify-center text-xs font-bold text-white shadow-lg animate-glow">
                    +10k
                  </div>
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-brand-primary uppercase tracking-widest">Our Bangladesh Community</p>
                  <p className="text-xs text-gray-600 font-medium">Serving local communities across the nation</p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="w-[1px] h-12 bg-brand-primary/10 hidden md:block" />
                <div className="text-center md:text-right">
                  <p className="text-2xl font-display font-bold text-brand-primary tracking-tight whitespace-nowrap">{content.hero.impactAmount}</p>
                  <p className="text-[10px] uppercase font-bold text-brand-accent tracking-widest">Total Impact Created</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
