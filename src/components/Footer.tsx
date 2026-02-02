import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
  const footerRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: footerRef.current,
            start: 'top 95%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative py-12 sm:py-16 px-4 border-t border-white/10"
    >
      <div ref={contentRef} className="max-w-4xl mx-auto text-center px-4">
        {/* Logo with 3D effect */}
        <div 
          className="flex items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 group cursor-pointer"
          style={{ transformStyle: 'preserve-3d' }}
          onMouseEnter={(e) => {
            gsap.to(e.currentTarget, {
              rotateY: 10,
              scale: 1.05,
              duration: 0.4,
            });
          }}
          onMouseLeave={(e) => {
            gsap.to(e.currentTarget, {
              rotateY: 0,
              scale: 1,
              duration: 0.4,
            });
          }}
        >
          <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg overflow-hidden">
            <img
              src="/logo.jpeg"
              alt="ClipCut Logo"
              className="w-full h-full object-cover"
            />
          </div>
          <span className="text-white font-semibold text-lg sm:text-xl">
            ClipCut Membership
          </span>
        </div>

        {/* Tagline */}
        <p className="text-white/60 mb-3 sm:mb-4 text-sm sm:text-base md:text-lg">
          Pașaportul tău pentru îngrijire premium.
        </p>

        {/* Copyright */}
        <p className="text-white/40 text-xs sm:text-sm">
          © {new Date().getFullYear()} ClipCut. Toate drepturile rezervate.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
