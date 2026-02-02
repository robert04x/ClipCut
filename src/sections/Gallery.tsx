import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import images from "../public/";

gsap.registerPlugin(ScrollTrigger);

const Gallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const images = [
    {
      src: '/public/foto1.jpeg',
      alt: 'Barber styling hair',
    },
    {
      src: '/public/foto2.jpeg',
      alt: 'Classic haircut',
    },
    {
      src: '/public/foto3.jpeg',
      alt: 'Beard trim',
    },
    {
      src: '/public/foto4.jpeg',
      alt: 'Hair styling',
    },
    {
      src: '/public/foto5.jpeg',
      alt: 'Modern haircut',
    },
  ];

  // Number of visible images based on screen size
  const getVisibleCount = () => {
    if (typeof window === 'undefined') return 1;
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 640) return 2;
    return 1;
  };

  const [visibleCount, setVisibleCount] = useState(1);
  const maxIndex = Math.max(0, images.length - visibleCount);

  useEffect(() => {
    const handleResize = () => setVisibleCount(getVisibleCount());
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title entrance
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

      // Carousel entrance
      gsap.fromTo(
        carouselRef.current,
        { rotateY: -30, opacity: 0, scale: 0.9 },
        {
          rotateY: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: carouselRef.current,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    const image = e.currentTarget;
    gsap.to(image, {
      rotateY: isEntering ? 10 : 0,
      rotateX: isEntering ? -5 : 0,
      translateZ: isEntering ? 30 : 0,
      scale: isEntering ? 1.05 : 1,
      duration: 0.4,
      ease: 'power2.out',
    });
  };

  return (
    <section
      ref={sectionRef}
      id="galerie"
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6"
      style={{ perspective: '1000px' }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Section Title */}
        <div ref={titleRef} className="text-center mb-8 sm:mb-12 px-4" style={{ transformStyle: 'preserve-3d' }}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-3 sm:mb-4 shiny-text">
            Stiluri din Reteaua Noastră
          </h2>
          <p className="text-white/60 text-sm sm:text-base md:text-lg">
            Vezi lucrările incredibile de la cei mai buni frizeri din rețeaua ClipCut.
          </p>
        </div>

        {/* Gallery Carousel */}
        <div ref={carouselRef} className="relative" style={{ transformStyle: 'preserve-3d' }}>
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className="btn-3d absolute left-2 sm:left-0 top-1/2 -translate-y-1/2 sm:-translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          <button
            onClick={nextSlide}
            disabled={currentIndex >= maxIndex}
            className="btn-3d absolute right-2 sm:right-0 top-1/2 -translate-y-1/2 sm:translate-x-4 z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </button>

          {/* Images Container */}
          <div className="overflow-hidden rounded-xl sm:rounded-2xl mx-12 sm:mx-16">
            <div
              className="flex gap-3 sm:gap-4 transition-transform duration-700 ease-out"
              style={{ 
                transform: `translateX(-${currentIndex * (100 / visibleCount + 2)}%)`,
                transformStyle: 'preserve-3d'
              }}
            >
              {images.map((image, index) => (
                <div
                  key={index}
                  className="flex-shrink-0 w-full sm:w-1/2 lg:w-1/3 aspect-[4/5] rounded-lg sm:rounded-xl overflow-hidden cursor-pointer"
                  style={{ transformStyle: 'preserve-3d' }}
                  onMouseEnter={(e) => handleImageHover(e, true)}
                  onMouseLeave={(e) => handleImageHover(e, false)}
                >
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="w-full h-full object-cover transition-all duration-500"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Dots indicator */}
          <div className="flex justify-center gap-2 mt-4 sm:mt-6">
            {[...Array(maxIndex + 1)].map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-white scale-125 shadow-lg shadow-white/30'
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Gallery;
