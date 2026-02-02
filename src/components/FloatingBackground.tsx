import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const elements = container.querySelectorAll('.floating-text');
    const particles = container.querySelectorAll('.bg-particle');
    
    elements.forEach((el, index) => {
      const element = el as HTMLElement;
      const duration = 6 + Math.random() * 10;
      const delay = index * 0.2;
      
      // Complex floating animation
      gsap.to(element, {
        y: `random(-150, 150)`,
        x: `random(-80, 80)`,
        rotation: `random(-15, 15)`,
        scale: `random(0.8, 1.3)`,
        duration: duration,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay,
      });

      // Opacity pulsing
      gsap.to(element, {
        opacity: `random(0.02, 0.15)`,
        duration: duration / 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay,
      });
    });

    // Animate particles
    particles.forEach((particle, index) => {
      const p = particle as HTMLElement;
      gsap.to(p, {
        y: '-120vh',
        x: `random(-50, 50)`,
        rotation: `random(0, 360)`,
        duration: 10 + Math.random() * 15,
        repeat: -1,
        delay: index * 0.5,
        ease: 'none',
      });
    });

    return () => {
      gsap.killTweensOf(elements);
      gsap.killTweensOf(particles);
    };
  }, []);

  // Generate TONS of floating text elements
  const generateFloatingElements = () => {
    const elements = [];
    const texts = ['ClipCut', 'CLIP', 'CUT', 'CC'];
    const sizes = ['text-xs', 'text-sm', 'text-base', 'text-lg', 'text-xl', 'text-2xl', 'text-3xl', 'text-4xl', 'text-5xl', 'text-6xl'];
    
    // Create 100+ elements scattered across the page
    for (let i = 0; i < 120; i++) {
      const text = texts[Math.floor(Math.random() * texts.length)];
      const size = sizes[Math.floor(Math.random() * sizes.length)];
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      const opacity = Math.random() * 0.12 + 0.02;
      
      elements.push({
        text,
        x: `${x}%`,
        y: `${y}%`,
        size,
        opacity,
        key: i,
      });
    }
    return elements;
  };

  const floatingElements = generateFloatingElements();

  return (
    <div ref={containerRef} className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60" />
      
      {/* Floating ClipCut text */}
      {floatingElements.map((el) => (
        <div
          key={el.key}
          className={`floating-text absolute ${el.size} font-bold text-white whitespace-nowrap select-none`}
          style={{
            left: el.x,
            top: el.y,
            opacity: el.opacity,
            textShadow: '0 0 30px rgba(255, 255, 255, 0.15)',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {el.text}
        </div>
      ))}

      {/* Additional layer - larger text */}
      {[...Array(30)].map((_, i) => (
        <div
          key={`large-${i}`}
          className="floating-text absolute text-7xl sm:text-8xl md:text-9xl font-bold text-white whitespace-nowrap select-none"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.015,
            textShadow: '0 0 50px rgba(255, 255, 255, 0.1)',
            fontFamily: "'Playfair Display', serif",
          }}
        >
          {['ClipCut', 'CLIP', 'CUT'][Math.floor(Math.random() * 3)]}
        </div>
      ))}

      {/* Moving particles */}
      {[...Array(50)].map((_, i) => (
        <div
          key={`particle-${i}`}
          className="bg-particle absolute rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: '110%',
            width: `${2 + Math.random() * 4}px`,
            height: `${2 + Math.random() * 4}px`,
            background: `rgba(255, 255, 255, ${0.1 + Math.random() * 0.3})`,
            boxShadow: '0 0 10px rgba(255, 255, 255, 0.3)',
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      {[...Array(15)].map((_, i) => (
        <div
          key={`shape-${i}`}
          className="floating-text absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${20 + Math.random() * 60}px`,
            height: `${20 + Math.random() * 60}px`,
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: Math.random() > 0.5 ? '50%' : '0',
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: 0.1,
          }}
        />
      ))}

      {/* Light streaks */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`streak-${i}`}
          className="floating-text absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${100 + Math.random() * 200}px`,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent)',
            transform: `rotate(${Math.random() * 360}deg)`,
          }}
        />
      ))}
    </div>
  );
};

export default FloatingBackground;
