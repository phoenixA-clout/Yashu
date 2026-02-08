import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subheadingRef = useRef<HTMLParagraphElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const galleryItems: { image: string; caption: string; rotate?: boolean }[] = [
    { image: '/gallery_1.png', caption: 'That smile.' },
    { image: '/gallery_2.png', caption: 'Those eyes.' },
    { image: '/gallery_3.png', caption: 'Quiet Afternoons.' },
    { image: '/gallery_4.png', caption: 'Us being us.', rotate: true },
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

      // Gallery cards animation
      const cards = gridRef.current?.querySelectorAll('.gallery-card');
      if (cards) {
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 85%',
              end: 'top 40%',
              scrub: 1,
            },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="gallery"
      className="relative bg-[#F6E7E7] py-24 lg:py-32 overflow-hidden"
      style={{ zIndex: 110 }}
    >
      {/* Heart Watermark */}
      <svg
        className="heart-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[45vw] max-w-[550px]"
        viewBox="0 0 200 200"
        fill="#E86A6A"
      >
        <path d="M100 180L85 165C40 125 15 100 15 65C15 40 35 20 60 20C75 20 90 28 100 42C110 28 125 20 140 20C165 20 185 40 185 65C185 100 160 125 115 165L100 180Z" />
      </svg>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2
          ref={headingRef}
          className="font-dancing text-5xl lg:text-7xl font-bold text-[#5A3A3A] text-center mb-4"
        >
          Our Moments
        </h2>

        {/* Subheading */}
        <p
          ref={subheadingRef}
          className="font-inter text-lg text-[#8F6B6B] text-center mb-16"
        >
          Proof that happiness looks like you 📸
        </p>

        {/* Gallery Grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto"
        >
          {galleryItems.map((item, index) => (
            <div
              key={index}
              className="gallery-card group cursor-pointer"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.caption}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${item.rotate ? 'rotate-90' : ''}`}
                />
                {/* Caption Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#5A3A3A]/70 to-transparent p-4">
                  <p className="font-caveat text-xl text-white">
                    {item.caption}
                  </p>
                </div>
                {/* Hover Glow */}
                <div className="absolute inset-0 bg-[#E86A6A]/0 group-hover:bg-[#E86A6A]/10 transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
