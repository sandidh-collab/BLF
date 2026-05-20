import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Book, Utensils, Stethoscope, Zap, X, ChevronRight, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const causes = [
  {
    title: 'Food Assistance',
    description: 'Providing essential food supplies and nutritious meals to helpless families and individuals.',
    longDescription: 'Our food assistance program is the cornerstone of our mission. We believe no human should go to bed hungry. We identify families living below the poverty line and provide them with monthly food baskets containing essentials like rice, pulses, oil, and salt.',
    icon: Utensils,
    color: 'bg-orange-500',
    delay: 0,
    impactPoints: [
      'Daily meal distribution for the homeless in city centers.',
      'Monthly food bundles for 500+ identified helpless families.',
      'Special nutrition kits for pregnant women and infants.',
      'Emergency dry food supply during local flooding or disasters.'
    ]
  },
  {
    title: 'Medical Support',
    description: 'Offering medical assistance, free checkups, and necessary medicines for the helpless.',
    longDescription: 'Quality healthcare is often beyond the reach of the marginalized. BLF bridges this gap by organizing mobile clinics and partnering with local healthcare providers to ensure everyone receives the treatment they deserve.',
    icon: Stethoscope,
    color: 'bg-emerald-500',
    delay: 0.1,
    impactPoints: [
      'Free diagnostic camps in remote rural areas twice a month.',
      'Provision of life-saving medicines for chronic illnesses.',
      'Financial aid for critical surgeries and hospital stays.',
      'Regular eye-care camps including free cataract surgeries.'
    ]
  },
  {
    title: 'Education',
    description: 'Supporting poor and talented students with their educational needs and scholarships.',
    longDescription: 'We believe education is the most powerful tool for breaking the cycle of poverty. We support students from primary to higher education whose families cannot afford the costs of schooling.',
    icon: Book,
    color: 'bg-blue-500',
    delay: 0.2,
    impactPoints: [
      'Full scholarships for brilliant students in 15 different districts.',
      'Distribution of textbooks, uniforms, and stationery kits.',
      'After-school coaching programs for underprivileged children.',
      'Vocational training support for older students and dropouts.'
    ]
  },
  {
    title: 'Disaster Relief',
    description: 'Standing beside people affected by natural disasters with rapid response and rehabilitation.',
    longDescription: 'In times of crisis, speed is everything. Our volunteer network is trained to mobilize within hours of a natural disaster to provide immediate relief and long-term recovery support.',
    icon: Zap,
    color: 'bg-red-500',
    delay: 0.3,
    impactPoints: [
      'Swift distribution of dry food and clean drinking water.',
      'Setting up temporary shelters for displaced families.',
      'Rebuilding houses destroyed by storms or river erosion.',
      'Post-disaster medical camps to prevent infectious diseases.'
    ]
  },
];

export default function Causes() {
  const [selectedCause, setSelectedCause] = useState<typeof causes[0] | null>(null);

  return (
    <section id="causes" className="py-24 bg-brand-white">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1 rounded-full bg-brand-primary/5 text-brand-primary text-xs font-bold tracking-widest uppercase mb-4"
          >
            What we do
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-medium text-brand-primary mb-6"
          >
            Transforming Lives Through <span className="font-accent font-bold text-brand-accent tracking-tighter">Purposeful</span> Action.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600"
          >
            We focus on core pillars that create sustainable long-term impact in the lives of those who need it most.
          </motion.p>
        </div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {causes.map((cause, i) => (
            <motion.div
              key={cause.title}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group glass p-6 rounded-[2.5rem] hover:bg-brand-primary transition-all duration-500 hover:shadow-2xl hover:shadow-brand-primary/20 flex flex-col h-full"
            >
              <div className={`w-14 h-14 ${cause.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                <cause.icon className="w-7 h-7" />
              </div>
              <h3 className="text-2xl font-display font-bold text-brand-primary mb-4 group-hover:text-white transition-colors">
                {cause.title}
              </h3>
              <p className="text-gray-600 group-hover:text-white/80 transition-colors leading-relaxed mb-6 flex-grow">
                {cause.description}
              </p>
              <div className="mt-auto">
                <button 
                  onClick={() => setSelectedCause(cause)}
                  className="text-brand-primary font-bold inline-flex items-center gap-2 group-hover:text-brand-accent transition-colors"
                >
                  Learn More
                  <div className="w-8 h-[1px] bg-brand-primary/20 group-hover:bg-brand-accent group-hover:w-12 transition-all duration-500" />
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedCause && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCause(null)}
              className="absolute inset-0 bg-brand-primary/40 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden relative shadow-2xl z-10"
            >
              <div className={`h-40 ${selectedCause.color} relative overflow-hidden`}>
                {/* Extra Animations: Decorative background shapes */}
                <motion.div 
                  animate={{ 
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl p-1" 
                />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.5, 1],
                    x: [0, 50, 0],
                  }}
                  transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-20 -right-20 w-80 h-80 bg-black/5 rounded-full blur-3xl" 
                />

                <div className="absolute inset-0 opacity-10 flex items-center justify-center pointer-events-none">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                  >
                    <selectedCause.icon size={240} />
                  </motion.div>
                </div>
                <button 
                  onClick={() => setSelectedCause(null)}
                  className="absolute top-6 right-6 w-10 h-10 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white backdrop-blur-sm transition-all z-20"
                >
                  <X className="w-6 h-6" />
                </button>
                <div className="absolute bottom-6 left-8 flex items-center gap-4 z-10">
                  <motion.div 
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center"
                  >
                    <selectedCause.icon className={`w-6 h-6 text-brand-primary`} />
                  </motion.div>
                  <motion.h3 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl font-display font-bold text-white tracking-tight"
                  >
                    {selectedCause.title}
                  </motion.h3>
                </div>
              </div>
              
              <div className="p-8 md:p-12">
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-gray-600 mb-8 leading-relaxed"
                >
                  {selectedCause.longDescription}
                </motion.p>
                
                <motion.h4 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="font-bold text-brand-primary uppercase tracking-widest text-xs mb-6 flex items-center gap-2"
                >
                  <Heart className="w-4 h-4 text-brand-accent fill-brand-accent animate-pulse" />
                  Impact & Activities
                </motion.h4>
                
                <div className="space-y-4">
                  {selectedCause.impactPoints.map((point, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + (0.1 * i) }}
                      whileHover={{ x: 5 }}
                      className="flex gap-4 text-sm text-gray-600 items-start bg-slate-50/50 p-4 rounded-2xl border border-transparent hover:border-brand-primary/5 hover:bg-white hover:shadow-sm transition-all"
                    >
                      <div className="w-6 h-6 bg-brand-accent/10 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
                        <ChevronRight className="w-4 h-4 text-brand-accent" />
                      </div>
                      <span className="leading-relaxed">{point}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
