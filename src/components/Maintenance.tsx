import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Heart, ShieldAlert } from 'lucide-react';

export default function Maintenance() {
  return (
    <div className="min-h-screen bg-brand-white flex items-center justify-center p-6 text-center overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/5 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/4 -right-20 w-[30rem] h-[30rem] bg-brand-accent/5 rounded-full blur-[120px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-xl w-full relative z-10"
      >
        <div className="relative mb-12 flex justify-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="w-32 h-32 bg-brand-primary/5 rounded-[2.5rem] flex items-center justify-center border border-brand-primary/10"
          >
            <Settings className="w-16 h-16 text-brand-primary opacity-20" />
          </motion.div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-2xl flex items-center justify-center">
              <ShieldAlert className="w-8 h-8 text-brand-accent" />
            </div>
          </div>
        </div>

        <h1 className="text-4xl md:text-5xl font-display font-bold text-brand-primary mb-6 tracking-tight">
          System Under <span className="font-accent font-bold text-brand-accent italic tracking-tighter">Maintenance</span>
        </h1>
        
        <p className="text-lg text-gray-500 font-medium leading-relaxed mb-10">
          We're currently performing some scheduled updates to the foundation's portal for a better donor experience. We'll be back shortly!
        </p>

        <div className="flex flex-col items-center gap-6">
          <div className="h-2 w-48 bg-gray-100 rounded-full overflow-hidden">
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: "100%" }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-full h-full bg-brand-primary"
            />
          </div>
          <div className="flex items-center gap-2 text-brand-primary/40 font-bold uppercase tracking-widest text-[10px]">
            <Heart className="w-3 h-3 fill-brand-accent text-brand-accent" />
            Humanity Above All
          </div>
        </div>

        <div className="mt-20 pt-10 border-t border-gray-100">
          <p className="text-xs text-gray-400 font-medium">
            Begum Lutfennahar Foundation Operational Terminal
          </p>
        </div>
      </motion.div>
    </div>
  );
}
