import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, PiggyBank, Zap, Clock, Users, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SelectiveAccess = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      icon: TrendingUp,
      title: 'Crește vizibilitatea clienților potențiali',
      description: 'Prin promovarea centralizată, salonul tău apare în fața unei audiențe mai mari decât dacă te promovezi singur. Mai multe vizualizări = mai multe oportunități de programări.',
    },
    {
      icon: PiggyBank,
      title: 'Reducerea costurilor de marketing individual',
      description: 'În loc să cheltui fiecare leu pe reclame sau promovare dispersată, CLIPCUT consolidează vizibilitatea într-un canal mai puternic, eficientizând investiția.',
    },
    {
      icon: Zap,
      title: 'Creșterea ratei de conversie',
      description: 'O prezență solidă în CLIPCUT transmite profesionalism și legitimitate. Oamenii rezervă mai ușor la cine pare serios, nu doar ocupat.',
    },
    {
      icon: Clock,
      title: 'Economisești timp = maximizezi veniturile',
      description: 'Promovarea individuală îți consumă timp (postări, strategii, texte, reels). Parteneriatul CLIPCUT preia o parte din expunere, astfel: tu te concentrezi pe clienți economisești timp = mai multe programări rentabile Timp economisit - bani câștigați.',
    },
    {
      icon: Users,
      title: 'Acces la colaborări și recomandări',
      description: 'Fiind parte dintr-o comunitate selectivă, îți crești șansele: să fii recomandat de alți membri prețuri mai bune de la distribuitori să fii invitat la evenimente sau campanii Toate acestea pot aduce clienți nou fără cost direct.',
    },
    {
      icon: ShieldCheck,
      title: 'Efect de „proof of quality"',
      description: 'Accesul selectiv CLIPCUT funcționează ca o validare externă, reducând ezitarea clientului și susținând o decizie mai rapidă și mai sigură. Această validare nu promite rezultate, dar reduce fricțiunea deciziei: clientul caută mai puțin, compară mai puțin, se îndoiește mai puțin. În practică, asta poate însemna: decizie mai rapidă de programare, mai puține întrebări legate de preț, mai multă deschidere către servicii complete, o percepție generală de profesionalism ridicat. „Proof of quality" nu este despre a spune că ești cel mai bun, ci despre a nu fi nevoit să demonstrezi constant.',
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title shiny entrance
      gsap.fromTo(
        titleRef.current,
        { rotateX: -70, opacity: 0, y: 60 },
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

      // Cards 3D staggered entrance from different directions
      const cards = gridRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card, index) => {
          const direction = index % 2 === 0 ? -1 : 1;
          gsap.fromTo(
            card,
            { 
              rotateY: direction * 60, 
              opacity: 0, 
              x: direction * 50,
              scale: 0.9 
            },
            {
              rotateY: 0,
              opacity: 1,
              x: 0,
              scale: 1,
              duration: 0.8,
              delay: index * 0.08,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 90%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleCardHover = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    const card = e.currentTarget;
    gsap.to(card, {
      rotateX: isEntering ? -8 : 0,
      rotateY: isEntering ? 8 : 0,
      translateZ: isEntering ? 50 : 0,
      scale: isEntering ? 1.03 : 1,
      duration: 0.4,
      ease: 'power2.out',
    });

    const icon = card.querySelector('.feature-icon');
    if (icon) {
      gsap.to(icon, {
        rotateZ: isEntering ? 360 : 0,
        scale: isEntering ? 1.3 : 1,
        duration: 0.6,
        ease: 'power2.out',
      });
    }

    if (isEntering) {
      gsap.to(card, {
        boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 40px rgba(255, 255, 255, 0.15)',
        duration: 0.4,
      });
    } else {
      gsap.to(card, {
        boxShadow: '0 0 0 rgba(0, 0, 0, 0)',
        duration: 0.4,
      });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="parteneri"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-6xl mx-auto">
        {/* Section Title with shiny effect */}
        <h2
          ref={titleRef}
          className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white text-center mb-12 sm:mb-16 uppercase tracking-wide shiny-text px-4"
          style={{ transformStyle: 'preserve-3d' }}
        >
          ACCESUL ESTE SELECTIV
        </h2>

        {/* Features Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
          style={{ perspective: '1000px' }}
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="card-3d glass-card-3d rounded-xl p-4 sm:p-6 cursor-pointer"
              style={{ transformStyle: 'preserve-3d' }}
              onMouseEnter={(e) => handleCardHover(e, true)}
              onMouseLeave={(e) => handleCardHover(e, false)}
            >
              {/* Icon */}
              <div
                className="feature-icon w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full bg-white/10 flex items-center justify-center mb-3 sm:mb-4"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white/80" />
              </div>

              {/* Title */}
              <h3 className="text-base sm:text-lg font-semibold text-white mb-2 sm:mb-3">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-white/50 text-xs sm:text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectiveAccess;
