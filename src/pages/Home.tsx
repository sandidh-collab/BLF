import Hero from '../components/Hero';
import About from '../components/About';
import GoverningBody from '../components/GoverningBody';
import Timeline from '../components/Timeline';
import Causes from '../components/Causes';
import Impact from '../components/Impact';
import Testimonials from '../components/Testimonials';
import Events from '../components/Events';
import IdeaBox from '../components/IdeaBox';
import FAQ from '../components/FAQ';
import Donation from '../components/Donation';
import Gallery from '../components/Gallery';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Hero />
      <About />
      <GoverningBody />
      <Timeline />
      <Impact />
      <Causes />
      <Events />
      <Gallery />
      <Testimonials />
      <FAQ />
      <Donation />
      <IdeaBox />
    </motion.div>
  );
}
