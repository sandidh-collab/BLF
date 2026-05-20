import { motion } from 'framer-motion';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin, Heart } from 'lucide-react';
import { cn } from '../lib/utils';

import { useCMS } from '../contexts/CMSContext';

export default function Footer() {
  const { content } = useCMS();
  
  return (
    <footer className="bg-brand-primary text-white py-20 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="col-span-1 lg:col-span-1"
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center overflow-hidden shrink-0 bg-white shadow-lg">
                {content.logo ? (
                  <img src={content.logo} alt="Logo" className="w-full h-full object-cover" />
                ) : (
                  <Heart className="text-brand-primary w-6 h-6 fill-brand-primary" />
                )}
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg leading-tight tracking-tight text-white uppercase">Begum Lutfennahar Foundation (BLF)</span>
                <span className="text-[10px] uppercase tracking-widest text-white/60 font-semibold -mt-0.5">EST. 2023</span>
              </div>
            </div>
            <motion.p 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-white/60 leading-relaxed mb-8"
            >
              Building a world where everyone has access to the resources and support 
              they need to flourish. Join our mission today.
            </motion.p>
            <div className="flex items-center gap-4">
              {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                <motion.a 
                  key={i} 
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  whileHover={{ y: -5, backgroundColor: 'white', color: '#1A2E35' }}
                  href="#" 
                  className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:shadow-xl transition-all duration-300"
                >
                  <Icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <h4 className="font-display font-bold text-xl mb-8">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'About Foundation', href: '#about' },
                { name: 'Our Causes', href: '#causes' },
                { name: 'Impact Statistics', href: '#impact' },
                { name: 'Latest Events', href: '#events' }
              ].map((link, idx) => (
                <motion.li 
                  key={link.name}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + idx * 0.05 }}
                >
                  <a 
                    href={link.href} 
                    className="text-white/60 hover:text-brand-accent transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-accent scale-0 group-hover:scale-100 transition-transform" />
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <h4 className="font-display font-bold text-xl mb-8">Contact Info</h4>
            <ul className="space-y-6">
              {[
                { Icon: MapPin, text: '123 Humanity Lane, \nDhaka, Bangladesh' },
                { Icon: Phone, text: '+880 1234 567890' },
                { Icon: Mail, text: 'care@lutfennahar.org' }
              ].map((contact, idx) => (
                <motion.li 
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 + idx * 0.1 }}
                  className="flex items-start gap-4 text-white/60"
                >
                  <contact.Icon className="w-6 h-6 text-brand-accent shrink-0" />
                  <span className="whitespace-pre-line">{contact.text}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-1"
          >
             <h4 className="font-display font-bold text-xl mb-8">Join the Mission</h4>
             <p className="text-white/60 mb-8 text-sm leading-relaxed">Your support can change a life. Every contribution, big or small, helps us provide essential care to those in need.</p>
             <motion.button 
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => document.getElementById('causes')?.scrollIntoView({ behavior: 'smooth' })}
               className="px-8 py-4 bg-brand-accent text-white rounded-2xl text-sm font-bold uppercase tracking-widest hover:bg-white hover:text-brand-primary transition-all shadow-xl shadow-brand-accent/20"
             >
               Explore Causes
             </motion.button>
          </motion.div>
        </div>

        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex flex-col items-center md:items-start gap-1">
            <p 
              className="text-white/40 text-sm select-none cursor-default"
              onDoubleClick={() => window.location.href = '/admin'}
            >
              © {new Date().getFullYear()} Begum Lutfennahar Foundation. All Rights Reserved.
            </p>
            <div className="flex items-center gap-2 mt-4 group/sign cursor-pointer">
              <span className="text-white/20 text-[9px] uppercase tracking-widest font-black group-hover:text-white/40 transition-colors">Crafted by</span>
              <span className="text-brand-accent font-signature text-2xl opacity-90 group-hover:opacity-100 transition-all duration-500 origin-left select-none -mb-1 rotate-[-2deg] drop-shadow-[0_2px_5px_rgba(212,175,55,0.1)]">
                Sandid Hassan
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-brand-accent font-accent font-semibold text-lg animate-pulse text-center md:text-right">
              {content.footer.quote}
            </p>
            <p 
              className="text-white/40 text-[10px] uppercase tracking-widest text-right select-none cursor-default"
              onDoubleClick={() => window.location.href = '/moderator'}
            >
              {content.footer.citation}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
