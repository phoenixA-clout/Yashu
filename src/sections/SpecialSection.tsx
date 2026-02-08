import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SpecialSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const pillsRef = useRef<HTMLDivElement>(null);

  const pills = [
    { text: 'Beautiful', x: '8%', y: '20%', delay: 0 },
    { text: 'Kind', x: '28%', y: '12%', delay: 0.1 },
    { text: 'Pookie', x: '48%', y: '18%', delay: 0.2 },
    { text: 'Funny', x: '68%', y: '10%', delay: 0.3 },
    { text: 'Cute', x: '85%', y: '22%', delay: 0.4 },
    { text: 'Strong', x: '15%', y: '55%', delay: 0.5 },
    { text: 'Genuine', x: '38%', y: '62%', delay: 0.6 },
    { text: 'My Favorite', x: '62%', y: '58%', delay: 0.7 },
    { text: 'Gorgeous', x: '82%', y: '65%', delay: 0.8 },
    { text: 'Special', x: '25%', y: '85%', delay: 0.9 },
    { text: 'Amazing', x: '50%', y: '90%', delay: 1.0 },
    { text: 'Loved', x: '75%', y: '82%', delay: 1.1 },
  ];

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );

      // Subheading animation
      gsap.fromTo(
        subheadingRef.current,
        { y: 24, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );

      // Pills animation with stagger
      const pillElements = pillsRef.current?.querySelectorAll('.love-pill');
      if (pillElements) {
        gsap.fromTo(
          pillElements,
          { y: 30, scale: 0.9, opacity: 0 },
          {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'back.out(1.4)',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            },
          }
        );

        // Subtle parallax on pills
        pillElements.forEach((pill, index) => {
          gsap.to(pill, {
            y: -15 - (index % 3) * 8,
            ease: 'none',
            scrollTrigger: {
              trigger: section,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          });
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="special"
      className="relative bg-[#F6E7E7] py-24 lg:py-32 overflow-hidden"
      style={{ zIndex: 100 }}
    >
      {/* Heart Watermark */}
      <svg
        className="heart-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[50vw] max-w-[600px]"
        viewBox="0 0 200 200"
        fill="#E86A6A"
      >
        <path d="M100 180L85 165C40 125 15 100 15 65C15 40 35 20 60 20C75 20 90 28 100 42C110 28 125 20 140 20C165 20 185 40 185 65C185 100 160 125 115 165L100 180Z" />
      </svg>

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-dancing text-5xl lg:text-7xl font-bold text-[#5A3A3A] text-center mb-4"
        >
          Why You're Special
        </h2>

        {/* Subheading */}
        <p
          ref={subheadingRef}
          className="font-inter text-lg text-[#8F6B6B] text-center mb-16"
        >
          A few tiny truths 💫
        </p>

        {/* Pills Cloud */}
        <div
          ref={pillsRef}
          className="relative h-[500px] lg:h-[450px]"
        >
          {pills.map((pill, index) => (
            <div
              key={index}
              className="love-pill absolute cursor-default"
              style={{
                left: pill.x,
                top: pill.y,
              }}
            >
              {pill.text}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialSection;
