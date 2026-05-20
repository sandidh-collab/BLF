import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, Send, CheckCircle2, Sparkles } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';

export default function IdeaBox() {
  const { addUserIdea } = useCMS();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    idea: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.idea.trim()) return;
    
    addUserIdea({
      text: formData.idea,
      user: formData.name,
      email: formData.email
    });

    setSubmitted(true);
    setFormData({ name: '', email: '', idea: '' });
    
    setTimeout(() => setSubmitted(false), 8000);
  };

  return (
    <section className="py-24 bg-brand-warm/30 relative overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-8 md:p-16 shadow-xl border border-brand-primary/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              className="w-20 h-20 bg-brand-accent rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-brand-accent/20 rotate-12"
            >
              <Lightbulb className="w-10 h-10 text-white animate-pulse" />
            </motion.div>
            
            <h2 className="text-3xl md:text-5xl font-display font-medium text-brand-primary mb-6">
              Have an <span className="font-accent font-bold text-brand-accent">Excellent Idea?</span>
            </h2>
            <p className="text-gray-600 mb-10 max-w-xl mx-auto">
              Share your innovative thoughts on how we can better serve our community. Your ideas inspire our next big mission.
            </p>

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form 
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit}
                  className="max-w-2xl mx-auto relative group space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Your Name"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent/50 focus:ring-4 focus:ring-brand-accent/5 transition-all font-sans"
                      required
                    />
                    <input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Your Email"
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 focus:outline-none focus:border-brand-accent/50 focus:ring-4 focus:ring-brand-accent/5 transition-all font-sans"
                      required
                    />
                  </div>
                  <textarea 
                    value={formData.idea}
                    onChange={(e) => setFormData({ ...formData, idea: e.target.value })}
                    placeholder="Describe your idea here..."
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-[2rem] p-8 text-lg focus:outline-none focus:border-brand-accent/50 focus:ring-4 focus:ring-brand-accent/5 transition-all h-40 resize-none font-sans"
                    required
                  />
                  <div className="mt-6 flex justify-center">
                    <button 
                      type="submit"
                      className="btn-primary min-w-[200px]"
                    >
                      Share My Idea
                      <Send className="w-5 h-5" />
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  transition={{ 
                    type: "spring", 
                    damping: 25,
                    stiffness: 120
                  }}
                  className="py-16 text-center relative pointer-events-none"
                >
                  <motion.div 
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ 
                      type: "spring", 
                      damping: 15, 
                      stiffness: 150,
                      delay: 0.1 
                    }}
                    className="w-24 h-24 bg-gradient-to-tr from-emerald-500 to-teal-400 rounded-full flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-emerald-200 relative z-10"
                  >
                    <CheckCircle2 className="w-12 h-12 text-white" />
                    
                    {/* Ripple Effect */}
                    <motion.div 
                      initial={{ scale: 1, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                      className="absolute inset-0 bg-emerald-400 rounded-full"
                    />
                  </motion.div>
                  
                  {/* Premium Sparkle Burst */}
                  {[...Array(20)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0, x: 0, y: 0 }}
                      animate={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1, 0],
                        x: Math.cos(i * (Math.PI / 10)) * (100 + Math.random() * 80),
                        y: Math.sin(i * (Math.PI / 10)) * (100 + Math.random() * 80),
                      }}
                      transition={{ 
                        duration: 1.5 + Math.random(), 
                        delay: 0.1, 
                        repeat: Infinity,
                        repeatDelay: Math.random() * 2
                      }}
                      className="absolute left-1/2 top-[40%] text-brand-accent transform -translate-x-1/2 -translate-y-1/2"
                    >
                      <Sparkles className="w-4 h-4 fill-brand-accent shadow-sm" />
                    </motion.div>
                  ))}

                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                    className="relative z-10"
                  >
                    <h3 className="text-4xl md:text-5xl font-display font-bold text-brand-primary tracking-tight">
                      Thanks for sharing with us
                    </h3>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
