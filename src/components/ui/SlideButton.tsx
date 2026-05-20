import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from 'framer-motion';
import { ChevronRight, Heart } from 'lucide-react';

interface SlideButtonProps {
  onSuccess: () => void;
  text?: string;
  successText?: string;
}

export default function SlideButton({ onSuccess, text = "Slide to Donate", successText = "Redirecting..." }: SlideButtonProps) {
  const [complete, setComplete] = useState(false);
  const constraintsRef = useRef(null);
  const x = useMotionValue(0);
  
  // Custom transforms for fluid animation
  const opacity = useTransform(x, [0, 150], [1, 0]);
  const scale = useTransform(x, [0, 250], [1, 1.05]);
  const bgOpacity = useTransform(x, [0, 250], [0.05, 0.2]);
  
  const handleDragEnd = () => {
    if (x.get() > 200) {
      setComplete(true);
      animate(x, 240, { type: "spring", stiffness: 500, damping: 30 });
      setTimeout(onSuccess, 800);
    } else {
      animate(x, 0, { type: "spring", stiffness: 400, damping: 25 });
    }
  };

  return (
    <div className="relative w-full max-w-[340px] h-20 bg-white/40 rounded-full p-2 backdrop-blur-xl border border-white/50 shadow-[0_8px_32px_rgba(0,0,0,0.05)] overflow-hidden select-none group/slider">
      {/* Dynamic Background Glow */}
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 bg-brand-primary"
      />

      {/* Progress Track */}
      <motion.div 
        className="absolute left-0 top-0 bottom-0 bg-gradient-to-r from-brand-primary/20 to-brand-primary/40 rounded-full"
        style={{ width: useTransform(x, (v) => v + 64) }}
      />

      {/* Background Hint Text */}
      <div className="absolute inset-0 flex items-center justify-center pl-10">
        <motion.p 
          style={{ opacity }}
          className="text-brand-primary font-black tracking-[0.2em] uppercase text-[10px] pointer-events-none"
        >
          {text}
        </motion.p>
      </div>

      <div ref={constraintsRef} className="relative w-full h-full flex items-center">
        <motion.div
          drag="x"
          dragConstraints={{ left: 0, right: 244 }}
          dragElastic={0.05}
          onDragEnd={handleDragEnd}
          style={{ x, scale }}
          className="z-20 w-16 h-16 bg-brand-primary rounded-[1.4rem] flex items-center justify-center cursor-grab active:cursor-grabbing shadow-2xl shadow-brand-primary/40 text-white relative overflow-hidden active:scale-95 transition-transform"
        >
          {/* Internal Glow Effect */}
          <motion.div 
            animate={{ 
              top: ["-100%", "100%"],
              left: ["-100%", "100%"]
            }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="absolute w-20 h-2 bg-white/20 rotate-45 blur-md"
          />

          {complete ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
              <Heart className="w-8 h-8 fill-white animate-pulse" />
            </motion.div>
          ) : (
            <div className="relative">
              <ChevronRight className="w-8 h-8 group-hover/slider:translate-x-1 transition-transform duration-300" />
              <motion.div 
                animate={{ x: [0, 5, 0], opacity: [0, 1, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="absolute -right-2 top-1"
              >
                <ChevronRight className="w-4 h-4 opacity-50" />
              </motion.div>
            </div>
          )}
        </motion.div>
      </div>

      <AnimatePresence>
        {complete && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex items-center justify-center bg-brand-primary backdrop-blur-md rounded-full shadow-inner"
          >
            <span className="text-white font-black tracking-widest uppercase text-xs flex items-center gap-2">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}>
                <Heart className="w-3 h-3 fill-white" />
              </motion.div>
              {successText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
