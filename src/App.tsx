/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { ReactNode, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Causes from './components/Causes';
import Impact from './components/Impact';
import Gallery from './components/Gallery';
import Donation from './components/Donation';
import Footer from './components/Footer';
import Admin from './components/Admin';
import Moderator from './components/Moderator';
import Maintenance from './components/Maintenance';
import { useCMS } from './contexts/CMSContext';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
    } else {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [pathname, hash]);

  return null;
}

function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <div className="relative bg-pattern min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  const { content } = useCMS();

  const isMaintenanceMode = content.settings?.maintenanceMode && !['/admin', '/moderator'].includes(location.pathname);

  useEffect(() => {
    if (content.brandColor) {
      document.documentElement.style.setProperty('--brand-primary', content.brandColor);
    }
    if (content.accentColor) {
      document.documentElement.style.setProperty('--brand-accent', content.accentColor);
    }
  }, [content.brandColor, content.accentColor]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input or textarea
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
        return;
      }

      // Check for combinations
      if (e.ctrlKey && e.key === '/') {
        e.preventDefault();
        navigate('/admin');
      }
      if (e.altKey && e.key === '/') {
        e.preventDefault();
        navigate('/moderator');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [navigate]);

  if (isMaintenanceMode) {
    return <Maintenance />;
  }
  
  return (
    <AnimatePresence mode="wait">
      <Routes location={location}>
        <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
        <Route path="/causes" element={<PageWrapper><div className="pt-24"><Causes /></div></PageWrapper>} />
        <Route path="/impact" element={<PageWrapper><div className="pt-24"><Impact /></div></PageWrapper>} />
        <Route path="/gallery" element={<PageWrapper><div className="pt-24"><Gallery /></div></PageWrapper>} />
        <Route path="/donate" element={<PageWrapper><div className="pt-24"><Donation /></div></PageWrapper>} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/moderator" element={<Moderator />} />
      </Routes>
    </AnimatePresence>
  );
}

import { CMSProvider } from './contexts/CMSContext';

export default function App() {
  return (
    <BrowserRouter>
      <CMSProvider>
        <ScrollToTop />
        <AnimatedRoutes />
      </CMSProvider>
    </BrowserRouter>
  );
}


