import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';

const stats = [
  { label: 'Families Helped', value: 3500, suffix: '+' },
  { label: 'Education Support', value: 1200, suffix: '+' },
  { label: 'Total Impact', value: 10000, suffix: '+' },
  { label: 'Volunteers', value: 450, suffix: '+' },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);
      
      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function Impact() {
  return (
    <section id="impact" className="py-24 bg-brand-primary relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 overflow-hidden">
        <motion.div 
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-accent rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ x: [0, -40, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-white rounded-full blur-[100px]" 
        />
        <motion.div 
          animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20%] h-[20%] bg-brand-accent rounded-full blur-[80px]" 
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-medium text-white mb-6"
          >
            The <span className="font-accent font-bold text-brand-accent tracking-tighter">Human</span> Behind the Numbers.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-xl mx-auto"
          >
            Every statistic represents a life changed, a dream restored, and a community strengthened.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: i * 0.1, 
                type: "spring", 
                stiffness: 100, 
                damping: 15 
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="text-center group p-8 rounded-[2.5rem] hover:bg-white/5 transition-colors relative"
            >
              {/* Point 8: Extra Sparkle on Hover */}
              <motion.div 
                whileHover={{ opacity: [0, 1, 0], scale: [0.8, 1.2, 1] }}
                className="absolute inset-0 bg-brand-accent/10 rounded-[2.5rem] blur-xl opacity-0 transition-opacity pointer-events-none group-hover:opacity-100"
              />
              <motion.div 
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: i * 0.5 }}
                className="text-5xl md:text-6xl font-display font-bold text-brand-accent mb-4 drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] whitespace-nowrap relative z-10"
              >
                <Counter value={stat.value} suffix={stat.suffix} />
              </motion.div>
              <div className="text-white/80 font-medium tracking-widest uppercase text-sm group-hover:text-white transition-colors relative z-10">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
