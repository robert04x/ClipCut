import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const BrandStatement = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title shiny entrance with rotation
      gsap.fromTo(
        titleRef.current,
        { rotateX: -80, opacity: 0, scale: 0.8 },
        {
          rotateX: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Description fade in
      gsap.fromTo(
        descRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: descRef.current,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Parallax effect on scroll
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(titleRef.current, {
            rotateX: (progress - 0.5) * 20,
            translateZ: (progress - 0.5) * -50,
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
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-4xl mx-auto text-center px-4">
        {/* Main Statement with shiny effect */}
        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 sm:mb-8 tracking-tight shiny-text"
          style={{ transformStyle: 'preserve-3d' }}
        >
          ONE BRAND. THOUSANDS OF CHAIRS.
        </h2>

        {/* Description */}
        <p
          ref={descRef}
          className="text-white/60 text-sm sm:text-base md:text-lg leading-relaxed"
        >
          CLIPCUT conectează profesioniști independenți sub o promovare comună, fără a le schimba
          stilul, regulile sau prețurile. Independența rămâne. Percepția se amplifică.
        </p>
      </div>
    </section>
  );
};

export default BrandStatement;
