import { motion } from 'framer-motion';
import { Calendar, CheckCircle2, Flag, Rocket } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';

const icons = [Flag, CheckCircle2, Rocket, Calendar];
const colors = ['bg-emerald-500', 'bg-blue-500', 'bg-purple-500', 'bg-brand-accent'];

export default function Timeline() {
  const { content } = useCMS();

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-display font-medium text-brand-primary mb-4"
          >
            Our <span className="font-accent font-bold text-brand-accent tracking-tighter">Journey</span> of Hope
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-500 max-w-xl mx-auto"
          >
            Chronicle of our milestones and the lives we've touched along the way.
          </motion.p>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-slate-100 hidden md:block" />

          <div className="space-y-12 md:space-y-0">
            {content.milestones.map((item, i) => (
              <div key={i} className={`flex flex-col md:flex-row items-center gap-8 ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                <div className="flex-1 w-full">
                  <motion.div 
                    initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`p-8 rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:shadow-xl transition-all relative group h-full`}
                  >
                    <div className="absolute -top-4 -left-4 w-12 h-12 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center font-accent font-bold text-brand-primary group-hover:scale-110 transition-transform">
                      {item.year}
                    </div>
                    <h3 className="text-xl font-display font-bold text-brand-primary mb-3 mt-2">{item.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                </div>

                <div className="relative z-10 hidden md:flex w-16 h-16 items-center justify-center shrink-0">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    className={`w-12 h-12 rounded-2xl ${colors[i % colors.length]} shadow-lg flex items-center justify-center text-white`}
                  >
                    {(() => {
                      const Icon = icons[i % icons.length];
                      return <Icon size={20} />;
                    })()}
                  </motion.div>
                </div>

                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
