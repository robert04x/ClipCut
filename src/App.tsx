import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FloatingBackground from './components/FloatingBackground';
import Hero from './sections/Hero';
import MemberBenefits from './sections/MemberBenefits';
import BrandStatement from './sections/BrandStatement';
import SelectiveAccess from './sections/SelectiveAccess';
import Gallery from './sections/Gallery';
import JoinForm from './sections/JoinForm';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Smooth scroll behavior for anchor links
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLAnchorElement;
      if (target.tagName === 'A' && target.hash) {
        const element = document.querySelector(target.hash);
        if (element) {
          e.preventDefault();
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    // Refresh ScrollTrigger on resize
    const handleResize = () => {
      ScrollTrigger.refresh();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* Floating Background with animated ClipCut text */}
      <FloatingBackground />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <MemberBenefits />
        <BrandStatement />
        <SelectiveAccess />
        <Gallery />
        <JoinForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
