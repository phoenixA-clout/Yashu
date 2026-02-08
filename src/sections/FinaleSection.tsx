import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const FinaleSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);
  const messageRef = useRef<HTMLHeadingElement>(null);
  const footerRef = useRef<HTMLParagraphElement>(null);
  const [clickCount, setClickCount] = useState(0);
  const [showHearts, setShowHearts] = useState<{ id: number; x: number; y: number }[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Big heart animation
      gsap.fromTo(
        heartRef.current,
        { scale: 0.7, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: 'back.out(1.4)',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );

      // Continuous pulse animation for heart
      gsap.to(heartRef.current, {
        scale: 1.08,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });

      // Message animation
      gsap.fromTo(
        messageRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            end: 'top 40%',
            scrub: 1,
          },
        }
      );

      // Footer animation
      gsap.fromTo(
        footerRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            end: 'top 30%',
            scrub: 1,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const handleHeartClick = (e: React.MouseEvent<SVGSVGElement>) => {
    const rect = heartRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const newHeart = { id: Date.now(), x, y };
      setShowHearts(prev => [...prev, newHeart]);
      setClickCount(prev => prev + 1);
      
      // Remove heart after animation
      setTimeout(() => {
        setShowHearts(prev => prev.filter(h => h.id !== newHeart.id));
      }, 1000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="finale"
      className="relative bg-[#F9D6D6] py-24 lg:py-32 overflow-hidden min-h-screen flex flex-col items-center justify-center"
      style={{ zIndex: 120 }}
    >
      {/* Floating Hearts Background */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <svg
            key={i}
            className="absolute animate-float-slow"
            style={{
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 3) * 25}%`,
              width: 20 + (i % 3) * 10,
              height: 20 + (i % 3) * 10,
              opacity: 0.15 + (i % 3) * 0.05,
              animationDelay: `${i * 0.5}s`,
            }}
            viewBox="0 0 24 24"
            fill="#E86A6A"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        ))}
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        {/* Big Heart */}
        <div className="relative inline-block mb-10">
          <svg
            ref={heartRef}
            onClick={handleHeartClick}
            className="w-40 h-40 lg:w-56 lg:h-56 cursor-pointer transition-all hover:drop-shadow-[0_0_30px_rgba(232,106,106,0.5)]"
            viewBox="0 0 24 24"
            fill="#E86A6A"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          
          {/* Click burst hearts */}
          {showHearts.map((heart) => (
            <svg
              key={heart.id}
              className="absolute w-6 h-6 animate-float"
              style={{
                left: heart.x,
                top: heart.y,
              }}
              viewBox="0 0 24 24"
              fill="#E86A6A"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          ))}
          
          {/* Click counter */}
          {clickCount > 0 && (
            <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-bounce">
              <span className="text-sm font-bold text-[#E86A6A]">{clickCount}</span>
            </div>
          )}
        </div>

        {/* Main Message */}
        <h2
          ref={messageRef}
          className="font-dancing text-4xl sm:text-5xl lg:text-6xl font-bold text-[#5A3A3A] mb-6"
        >
          Made with love, just for you, Yashika 💕
        </h2>

        {/* Footer Message */}
        <p
          ref={footerRef}
          className="font-caveat text-xl lg:text-2xl text-[#8F6B6B]"
        >
          From Atharv, who really, really likes you.
        </p>

        {/* Small hearts decoration */}
        <div className="flex justify-center gap-3 mt-10">
          {[...Array(5)].map((_, i) => (
            <Heart
              key={i}
              className="w-5 h-5 text-[#E86A6A] fill-[#E86A6A] animate-pulse"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>

        {/* Interactive hint */}
        <p className="mt-8 text-sm text-[#8F6B6B]/70">
          Click the heart! 💝
        </p>
      </div>
    </section>
  );
};

export default FinaleSection;
