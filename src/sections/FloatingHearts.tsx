import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const FloatingHearts = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const hearts = containerRef.current.querySelectorAll('.floating-heart');
    
    hearts.forEach((heart, index) => {
      gsap.to(heart, {
        y: `-=${100 + Math.random() * 200}`,
        x: `+=${-30 + Math.random() * 60}`,
        rotation: Math.random() * 30 - 15,
        duration: 10 + Math.random() * 10,
        repeat: -1,
        ease: 'none',
        delay: index * 1.5,
      });
    });

    return () => {
      hearts.forEach((heart) => {
        gsap.killTweensOf(heart);
      });
    };
  }, []);

  const hearts = [
    { size: 24, left: '5%', top: '90%', opacity: 0.3, delay: 0 },
    { size: 16, left: '15%', top: '95%', opacity: 0.25, delay: 2 },
    { size: 20, left: '25%', top: '88%', opacity: 0.35, delay: 4 },
    { size: 28, left: '75%', top: '92%', opacity: 0.3, delay: 1 },
    { size: 18, left: '85%', top: '87%', opacity: 0.25, delay: 3 },
    { size: 22, left: '95%', top: '94%', opacity: 0.3, delay: 5 },
    { size: 14, left: '40%', top: '96%', opacity: 0.2, delay: 2.5 },
    { size: 26, left: '60%', top: '89%', opacity: 0.35, delay: 4.5 },
  ];

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[5] overflow-hidden">
      {hearts.map((heart, index) => (
        <svg
          key={index}
          className="floating-heart absolute"
          style={{
            left: heart.left,
            top: heart.top,
            width: heart.size,
            height: heart.size,
            opacity: heart.opacity,
          }}
          viewBox="0 0 24 24"
          fill="#E86A6A"
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </svg>
      ))}
      
      {/* Sparkles */}
      {[...Array(12)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-sparkle"
          style={{
            left: `${5 + Math.random() * 90}%`,
            top: `${5 + Math.random() * 90}%`,
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${2 + Math.random() * 2}s`,
          }}
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path
              d="M6 0L7.5 4.5L12 6L7.5 7.5L6 12L4.5 7.5L0 6L4.5 4.5L6 0Z"
              fill="#E86A6A"
              fillOpacity="0.6"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;
