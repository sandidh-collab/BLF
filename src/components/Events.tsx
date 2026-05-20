import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useCMS } from '../contexts/CMSContext';

export default function Events() {
  const { content } = useCMS();

  return (
    <section id="events" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-full text-xs font-bold uppercase tracking-widest mb-4"
          >
            <Calendar className="w-4 h-4" />
            Stay Connected
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-medium text-brand-primary mb-4"
          >
            Upcoming <span className="font-accent font-bold text-brand-accent italic">Events</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            Join us in our journey of service. Here are the upcoming activities where we'll be making a difference together.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 gap-10">
          {content.events.map((event, i) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              className="bg-brand-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 group flex flex-col lg:flex-row"
            >
              <div className="lg:w-2/5 relative overflow-hidden">
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-64 lg:h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-2xl text-brand-primary font-bold shadow-xl">
                  {event.date.split(',')[0]}
                </div>
              </div>
              
              <div className="lg:w-3/5 p-10 flex flex-col justify-center">
                <div className="flex items-center gap-2 text-brand-accent text-xs font-bold uppercase tracking-widest mb-4">
                  <MapPin className="w-4 h-4" />
                  {event.location}
                </div>
                <h3 className="text-2xl font-display font-bold text-brand-primary mb-4 group-hover:text-brand-accent transition-colors">
                  {event.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-8">
                  {event.description}
                </p>
                <div className="mt-auto">
                  <button className="inline-flex items-center gap-2 font-bold text-brand-primary hover:text-brand-accent transition-colors group/btn">
                    Remind Me
                    <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {content.events.length === 0 && (
          <div className="text-center py-20 bg-brand-white rounded-[3rem] border-2 border-dashed border-gray-100">
             <Calendar className="w-16 h-16 text-gray-200 mx-auto mb-4" />
             <p className="text-gray-400 font-medium font-display text-xl">No upcoming events at the moment.</p>
             <p className="text-gray-400 text-sm">Follow our social media for instant updates on spontaneous drives.</p>
          </div>
        )}
      </div>
    </section>
  );
}
