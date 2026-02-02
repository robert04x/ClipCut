import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Megaphone, Users, Tag, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const MemberBenefits = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const benefits = [
    {
      icon: Megaphone,
      title: 'Promovare Centralizată',
      description: 'Beneficiezi de expunere în rețeaua ClipCut fără efort suplimentar din partea ta.',
    },
    {
      icon: Users,
      title: 'Acces în Comunitate',
      description: 'Fii parte dintr-o rețea exclusivă de profesioniști din domeniul frizeriei.',
    },
    {
      icon: Tag,
      title: 'Discount de la Distribuitori',
      description: 'Obține prețuri preferențiale la produsele profesionale de care ai nevoie.',
    },
    {
      icon: Calendar,
      title: 'Acces la Evenimente ClipCut',
      description: 'Participă la workshop-uri, training-uri și evenimente exclusive pentru membri.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title shiny entrance
      gsap.fromTo(
        titleRef.current,
        { rotateX: -60, opacity: 0, y: 50 },
        {
          rotateX: 0,
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      // Cards 3D staggered entrance
      const cards = cardsRef.current?.children;
      if (cards) {
        gsap.fromTo(
          cards,
          { rotateY: -90, opacity: 0, x: -50 },
          {
            rotateY: 0,
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: isEntering ? -5 : 0,
      rotateY: isEntering ? 5 : 0,
      translateZ: isEntering ? 40 : 0,
      scale: isEntering ? 1.02 : 1,
      duration: 0.4,
      ease: 'power2.out',
    });

    const icon = card.querySelector('.benefit-icon');
    if (icon) {
      gsap.to(icon, {
        rotateY: isEntering ? 360 : 0,
        scale: isEntering ? 1.2 : 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="servicii"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title with shiny effect */}
        <h2
          ref={titleRef}
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-12 sm:mb-16 shiny-text px-4"
          style={{ transformStyle: 'preserve-3d' }}
        >
          Avantajele Membrilor
        </h2>

        {/* Benefits Cards - 2 columns on mobile, 4 on desktop */}
        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
          style={{ perspective: '1000px' }}
        >
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="card-3d glass-card-3d rounded-xl sm:rounded-2xl p-6 sm:p-8 text-center cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              {/* Icon */}
              <div
                className="benefit-icon w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4 sm:mb-6"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <benefit.icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white/80" />
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-4">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MemberBenefits;
