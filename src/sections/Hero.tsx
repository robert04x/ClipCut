import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MessageCircle, Instagram, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    { icon: Phone, label: 'Sună-ne', href: 'tel:0733357222' },
    { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/40733357222' },
    { icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/_clipcut_?igsh=NTRmNWlvbmthenho' },
    { icon: MapPin, label: 'Găsește-ne', href: 'https://www.google.com/maps/place/CLIPCUT/@45.6360676,25.6254649,17z/data=!3m1!4b1!4m6!3m5!1s0x6075110fb8e488c3:0xb6aaa023b07bcb52!8m2!3d45.6360676!4d25.6280398!16s%2Fg%2F11xsjpcnrr?entry=ttu&g_ep=EgoyMDI2MDEyOC4wIKXMDSoASAFQAw%3D%3D' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Logo entrance with 3D rotation
      tl.fromTo(
        logoRef.current,
        { rotateY: -180, rotateX: 45, opacity: 0, scale: 0.5 },
        { rotateY: 0, rotateX: 0, opacity: 1, scale: 1, duration: 1.2 },
        0.2
      );

      // Title entrance with shiny effect
      tl.fromTo(
        titleRef.current,
        { rotateX: -90, opacity: 0, y: 50 },
        { rotateX: 0, opacity: 1, y: 0, duration: 1 },
        0.5
      );

      // Tagline fade in
      tl.fromTo(
        taglineRef.current,
        { opacity: 0, y: 30, letterSpacing: '0.5em' },
        { opacity: 1, y: 0, letterSpacing: '0.15em', duration: 0.8 },
        0.8
      );

      // Description fade in
      tl.fromTo(
        descRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8 },
        1
      );

      // Buttons bounce in
      tl.fromTo(
        buttonsRef.current?.children || [],
        { opacity: 0, y: 40, scale: 0.8 },
        { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.15 },
        1.2
      );

      // Social links slide up
      tl.fromTo(
        socialRef.current?.children || [],
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.1 },
        1.5
      );

      // Scroll-triggered 3D exit animation
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(titleRef.current, {
            rotateX: progress * -45,
            translateZ: progress * -100,
            opacity: 1 - progress * 0.8,
            duration: 0.1,
          });
          gsap.to(logoRef.current, {
            rotateY: progress * 30,
            scale: 1 - progress * 0.2,
            opacity: 1 - progress * 0.7,
            duration: 0.1,
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-12 px-4 sm:px-6"
      style={{ perspective: '1000px' }}
    >
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto w-full">
        {/* Logo Image with 3D effect */}
        <div
          ref={logoRef}
          className="mb-6 mx-auto"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 mx-auto rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl hover:shadow-white/20 transition-shadow duration-500">
            <img
              src="/logo.jpeg"
              alt="ClipCut Logo"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
          </div>
        </div>

        {/* Main Title with shiny effect */}
        <h1
          ref={titleRef}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-3 sm:mb-4 tracking-tight shiny-text"
          style={{ transformStyle: 'preserve-3d' }}
        >
          ClipCut
        </h1>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="text-sm sm:text-base md:text-lg text-white/80 tracking-[0.15em] uppercase mb-4 sm:mb-6 px-2"
        >
          ONE BRAND THOUSANDS OF CHAIRS
        </p>

        {/* Description */}
        <p
          ref={descRef}
          className="text-white/60 text-sm sm:text-base md:text-lg max-w-xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4"
        >
          conectează profesioniști independenți sub o promovare comună, fără a
          le schimba stilul, regulile sau prețurile. Independența rămâne.
          Percepția se amplifică.
        </p>

        {/* CTA Buttons */}
        <div ref={buttonsRef} className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-10 sm:mb-12 px-4">
          <Button
            size="lg"
            className="btn-3d bg-white text-black hover:bg-white/90 font-medium px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
            asChild
          >
            <a href="#join">Devino Partener</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="btn-3d-outline border-white/30 text-white hover:bg-white/10 font-medium px-6 sm:px-8 py-5 sm:py-6 text-base sm:text-lg w-full sm:w-auto"
            asChild
          >
            <a href="#servicii">Serviciile Noastre</a>
          </Button>
        </div>

        {/* Social Links */}
        <div ref={socialRef} className="flex justify-center gap-4 sm:gap-6 md:gap-8 flex-wrap px-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex flex-col items-center gap-1 sm:gap-2 group"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget, {
                  rotateY: 10,
                  translateZ: 20,
                  scale: 1.1,
                  duration: 0.3,
                });
              }}
              onMouseLeave={(e) => {
                gsap.to(e.currentTarget, {
                  rotateY: 0,
                  translateZ: 0,
                  scale: 1,
                  duration: 0.3,
                });
              }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:border-white/50 group-hover:bg-white/5 group-hover:shadow-lg group-hover:shadow-white/10">
                <link.icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white/70 group-hover:text-white transition-colors" />
              </div>
              <span className="text-white/50 text-xs sm:text-sm group-hover:text-white/80 transition-colors">
                {link.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
