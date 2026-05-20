import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';
import { useCMS } from '../contexts/CMSContext';

export default function Navbar() {
  const { content } = useCMS();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activePath, setActivePath] = useState(window.location.pathname + window.location.hash);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleLocationChange = () => {
      setActivePath(window.location.pathname + window.location.hash);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('popstate', handleLocationChange);
    // Rough handle for hash changes or link clicks
    const interval = setInterval(handleLocationChange, 500);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('popstate', handleLocationChange);
      clearInterval(interval);
    };
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '#about' },
    { name: 'Causes', href: '#causes' },
    { name: 'Impact', href: '#impact' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isScrolled ? 'py-4 bg-white/80 backdrop-blur-md shadow-sm border-b' : 'py-6 bg-transparent'
      )}
    >
      <motion.div 
        style={{ scaleX: scrollYProgress }} 
        className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-accent origin-left"
      />
      <div className="container mx-auto px-6 flex items-center justify-between">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Link
            to="/"
            className="flex items-center gap-2 group"
          >
            <div className={cn(
              "w-10 h-10 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform shadow-lg overflow-hidden shrink-0",
              !content.logo ? "bg-brand-primary shadow-brand-primary/10" : "bg-white"
            )}>
              {content.logo ? (
                <img src={content.logo} alt="Logo" className="w-full h-full object-cover" />
              ) : (
                <Heart className="text-white w-6 h-6 fill-white" />
              )}
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold text-lg leading-tight tracking-tight text-brand-primary">Begum Lutfennahar</span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-gray-500 font-bold -mt-0.5">Foundation (BLF)</span>
            </div>
          </Link>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => {
            const isActive = activePath === link.href || (link.href === '/' && activePath === '') || (link.href === '/' && activePath === '/#');
            return (
              <motion.a
                key={link.name}
                whileHover={{ y: -2 }}
                href={link.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "text-xs uppercase tracking-widest transition-all relative group",
                  isActive 
                    ? "font-black text-brand-accent scale-105" 
                    : "font-bold text-brand-primary/70 hover:text-brand-accent"
                )}
              >
                {link.name}
                <span className={cn(
                  "absolute -bottom-1.5 left-0 h-0.5 bg-brand-accent transition-all duration-300",
                  isActive ? "w-full" : "w-0 group-hover:w-full"
                )} />
              </motion.a>
            );
          })}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Link
              to="/donate"
              className="px-8 py-3 bg-brand-primary text-white rounded-full text-xs font-bold uppercase tracking-widest shadow-xl shadow-brand-primary/20 hover:bg-brand-accent transition-all inline-block"
            >
              Donate
            </Link>
          </motion.div>
        </div>


        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-brand-primary"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-b overflow-hidden"
          >
            <div className="flex flex-col gap-4 p-6">
              {navLinks.map((link) => {
                const isActive = activePath === link.href || (link.href === '/' && activePath === '') || (link.href === '/' && activePath === '/#');
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={cn(
                      "text-lg transition-all",
                      isActive ? "font-black text-brand-accent" : "font-medium text-slate-600"
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.name}
                  </a>
                );
              })}
              <Link
                to="/donate"
                className="w-full text-center py-3 bg-brand-primary text-white rounded-full font-semibold"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Donate Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
