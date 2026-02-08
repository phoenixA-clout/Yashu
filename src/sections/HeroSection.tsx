import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, ChevronDown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const HeroSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);
  const dateRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);
  const heartRef = useRef<SVGSVGElement>(null);

  // Auto-play entrance animation on load
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Heart watermark fade in
      tl.fromTo(
        heartRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 0.1, scale: 1, duration: 1 }
      );

      // Headline animation with character stagger
      if (headlineRef.current) {
        const chars = headlineRef.current.textContent?.split('') || [];
        headlineRef.current.innerHTML = chars
          .map((char) => `<span class="inline-block">${char === ' ' ? '&nbsp;' : char}</span>`)
          .join('');
        
        tl.fromTo(
          headlineRef.current.querySelectorAll('span'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.03 },
          '-=0.5'
        );
      }

      // Subheadline
      tl.fromTo(
        subheadRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6 },
        '-=0.3'
      );

      // CTA button
      tl.fromTo(
        ctaRef.current,
        { y: 20, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.6 },
        '-=0.3'
      );

      // Date pill
      tl.fromTo(
        dateRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      // Scroll hint
      tl.fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 0.8, duration: 0.5 },
        '-=0.2'
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Scroll-driven exit animation
  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=130%',
          pin: true,
          scrub: 0.6,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back
            gsap.set([headlineRef.current, subheadRef.current, ctaRef.current, dateRef.current], {
              opacity: 1,
              y: 0,
            });
            gsap.set(heartRef.current, { opacity: 0.1, scale: 1 });
          },
        },
      });

      // ENTRANCE (0-30%): subtle scale on heart
      scrollTl.fromTo(
        heartRef.current,
        { scale: 1 },
        { scale: 1.04, ease: 'none' },
        0
      );

      // SETTLE (30-70%): hold position

      // EXIT (70-100%): fade out elements
      scrollTl.fromTo(
        headlineRef.current,
        { y: 0, opacity: 1 },
        { y: '-18vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        subheadRef.current,
        { y: 0, opacity: 1 },
        { y: '-14vh', opacity: 0, ease: 'power2.in' },
        0.72
      );

      scrollTl.fromTo(
        ctaRef.current,
        { y: 0, opacity: 1 },
        { y: '-10vh', opacity: 0, ease: 'power2.in' },
        0.74
      );

      scrollTl.fromTo(
        dateRef.current,
        { y: 0, opacity: 1 },
        { y: '-8vh', opacity: 0, ease: 'power2.in' },
        0.76
      );

      scrollTl.fromTo(
        heartRef.current,
        { scale: 1.04, opacity: 0.1 },
        { scale: 1.12, opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        scrollHintRef.current,
        { opacity: 0.8 },
        { opacity: 0, ease: 'power2.in' },
        0.7
      );
    }, section);

    return () => ctx.revert();
  }, []);

  const scrollToLoveWeek = () => {
    const element = document.getElementById('love-week');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="section-pinned bg-[#F6E7E7] flex items-center justify-center z-10"
    >
      {/* Large Heart Watermark */}
      <svg
        ref={heartRef}
        className="absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 w-[72vw] max-w-[900px] pointer-events-none"
        viewBox="0 0 200 200"
        fill="#E86A6A"
      >
        <path d="M100 180L85 165C40 125 15 100 15 65C15 40 35 20 60 20C75 20 90 28 100 42C110 28 125 20 140 20C165 20 185 40 185 65C185 100 160 125 115 165L100 180Z" />
      </svg>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 text-center px-6 max-w-4xl mx-auto"
      >
        {/* Main Headline */}
        <h1
          ref={headlineRef}
          className="font-dancing text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-[#5A3A3A] mb-6"
        >
          Yashika
        </h1>

        {/* Subheadline */}
        <p
          ref={subheadRef}
          className="font-inter text-lg sm:text-xl md:text-2xl text-[#8F6B6B] mb-10 max-w-xl mx-auto"
        >
          My Sweetheart 💖
        </p>

        {/* CTA Button */}
        <button
          ref={ctaRef}
          onClick={scrollToLoveWeek}
          className="btn-romantic inline-flex items-center gap-2 group"
        >
          <span>Click Me Cutu!!</span>
          <Heart className="w-4 h-4 fill-white group-hover:scale-110 transition-transform" />
        </button>
      </div>

      {/* Date Pill */}
      <div
        ref={dateRef}
        className="absolute left-6 lg:left-[6vw] bottom-[7vh] day-badge"
      >
        Bubu Days
      </div>

      {/* Scroll Hint */}
      <div
        ref={scrollHintRef}
        className="absolute right-6 lg:right-[6vw] bottom-[7vh] flex flex-col items-center gap-1 text-[#8F6B6B]"
      >
        <span className="text-xs font-medium uppercase tracking-wider">Scroll</span>
        <ChevronDown className="w-5 h-5 animate-bounce" />
      </div>
    </section>
  );
};

export default HeroSection;
