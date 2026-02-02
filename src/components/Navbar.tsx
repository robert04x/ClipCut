import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Entrance animation
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, []);

  const handleLogoHover = (isHovering: boolean) => {
    if (logoRef.current) {
      gsap.to(logoRef.current, {
        rotateY: isHovering ? 15 : 0,
        rotateX: isHovering ? 5 : 0,
        scale: isHovering ? 1.1 : 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  };

  const navLinks = [
    { label: 'Servicii', href: '#servicii' },
    { label: 'Pentru Parteneri', href: '#parteneri' },
    { label: 'Galerie', href: '#galerie' },
    { label: 'Alătură-te', href: '#join' },
  ];

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/10"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo with 3D effect */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-3 group"
            onMouseEnter={() => handleLogoHover(true)}
            onMouseLeave={() => handleLogoHover(false)}
          >
            <div
              ref={logoRef}
              className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 rounded-lg overflow-hidden"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <img
                src="/logo.jpeg"
                alt="ClipCut Logo"
                className="w-full h-full object-cover transition-all duration-300 group-hover:brightness-110"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-white font-semibold text-sm sm:text-base md:text-lg tracking-tight hidden sm:block group-hover:text-shadow-glow transition-all duration-300">
              ClipCut
            </span>
          </a>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="nav-link-3d relative text-white/70 hover:text-white text-sm font-medium transition-all duration-300 py-2 px-1"
                style={{
                  transformStyle: 'preserve-3d',
                }}
                onMouseEnter={(e) => {
                  gsap.to(e.currentTarget, {
                    rotateX: 10,
                    translateZ: 10,
                    duration: 0.3,
                  });
                }}
                onMouseLeave={(e) => {
                  gsap.to(e.currentTarget, {
                    rotateX: 0,
                    translateZ: 0,
                    duration: 0.3,
                  });
                }}
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            <Button
              variant="secondary"
              className="btn-3d bg-white text-black hover:bg-white/90 font-medium text-xs sm:text-sm px-3 sm:px-6 py-2 sm:py-2.5 hidden sm:flex"
              asChild
            >
              <a href="#join">Devino Partener</a>
            </Button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-white" />
              ) : (
                <Menu className="w-5 h-5 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${
            mobileMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="py-4 space-y-3 border-t border-white/10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-white/70 hover:text-white text-sm font-medium py-2 px-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Button
              variant="secondary"
              className="btn-3d bg-white text-black hover:bg-white/90 font-medium text-sm w-full mt-3"
              asChild
            >
              <a href="#join" onClick={() => setMobileMenuOpen(false)}>Devino Partener</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
