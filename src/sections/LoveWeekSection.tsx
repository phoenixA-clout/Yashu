import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flower2, Gem, Cookie, ToyBrick, HeartHandshake, Armchair, Sparkles, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface LoveWeekSectionProps {
  day: string;
  title: string;
  image: string;
  message: string;
  icon: string;
  zIndex: number;
  isLast?: boolean;
}

const iconMap: Record<string, React.ElementType> = {
  rose: Flower2,
  ring: Gem,
  chocolate: Cookie,
  teddy: ToyBrick,
  promise: HeartHandshake,
  hug: Armchair,
  kiss: Sparkles,
  heart: Heart,
};

const LoveWeekSection = ({
  day,
  title,
  image,
  message,
  icon,
  zIndex,
  isLast = false,
}: LoveWeekSectionProps) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const photoRef = useRef<HTMLDivElement>(null);
  const noteRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const signatureRef = useRef<HTMLParagraphElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);

  const IconComponent = iconMap[icon] || Heart;

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: isLast ? '+=140%' : '+=130%',
          pin: true,
          scrub: 0.6,
        },
      });

      // ENTRANCE (0-30%)
      // Photo card slides in from left
      scrollTl.fromTo(
        photoRef.current,
        { x: '-60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0
      );

      // Note card slides in from right
      scrollTl.fromTo(
        noteRef.current,
        { x: '60vw', opacity: 0, scale: 0.96 },
        { x: 0, opacity: 1, scale: 1, ease: 'power2.out' },
        0
      );

      // Badge fades in
      scrollTl.fromTo(
        badgeRef.current,
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.1
      );

      // Title with icon
      scrollTl.fromTo(
        [iconRef.current, titleRef.current],
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.03, ease: 'power2.out' },
        0.15
      );

      // Body text
      scrollTl.fromTo(
        bodyRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.2
      );

      // Signature
      scrollTl.fromTo(
        signatureRef.current,
        { y: 18, opacity: 0 },
        { y: 0, opacity: 1, ease: 'power2.out' },
        0.25
      );

      // SETTLE (30-70%): Hold position - no animation needed

      // EXIT (70-100%)
      scrollTl.fromTo(
        photoRef.current,
        { x: 0, opacity: 1 },
        { x: '-28vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        noteRef.current,
        { x: 0, opacity: 1 },
        { x: '28vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        badgeRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.75
      );

      scrollTl.fromTo(
        signatureRef.current,
        { opacity: 1 },
        { opacity: 0, ease: 'power2.in' },
        0.8
      );
    }, section);

    return () => ctx.revert();
  }, [isLast]);

  return (
    <section
      ref={sectionRef}
      id={day === '7 Feb' ? 'love-week' : undefined}
      className="section-pinned bg-[#F6E7E7] flex items-center justify-center"
      style={{ zIndex }}
    >
      {/* Heart Watermark */}
      <svg
        className="heart-watermark absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] max-w-[700px]"
        viewBox="0 0 200 200"
        fill="#E86A6A"
      >
        <path d="M100 180L85 165C40 125 15 100 15 65C15 40 35 20 60 20C75 20 90 28 100 42C110 28 125 20 140 20C165 20 185 40 185 65C185 100 160 125 115 165L100 180Z" />
      </svg>

      {/* Content Container */}
      <div className="relative z-10 w-full px-6 lg:px-0 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
        {/* Photo Card */}
        <div
          ref={photoRef}
          className="photo-card w-[86vw] lg:w-[38vw] h-[44vh] lg:h-[64vh] relative"
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#5A3A3A]/10 to-transparent" />
        </div>

        {/* Note Card */}
        <div className="relative">
          {/* Day Badge */}
          <div
            ref={badgeRef}
            className="day-badge absolute -top-10 left-0 lg:left-0"
          >
            {day}
          </div>

          <div
            ref={noteRef}
            className="love-card w-[86vw] lg:w-[40vw] min-h-[auto] lg:min-h-[56vh] p-8 lg:p-10"
          >
            {/* Title with Icon */}
            <div className="flex items-center gap-3 mb-6">
              <div
                ref={iconRef}
                className="w-10 h-10 rounded-full bg-[#E86A6A]/10 flex items-center justify-center"
              >
                <IconComponent className="w-5 h-5 text-[#E86A6A]" />
              </div>
              <h2
                ref={titleRef}
                className="font-dancing text-4xl lg:text-5xl font-bold text-[#5A3A3A]"
              >
                {title}
              </h2>
            </div>

            {/* Message Body */}
            <p
              ref={bodyRef}
              className="font-inter text-base lg:text-lg text-[#5A3A3A] leading-relaxed mb-8"
            >
              {message}
            </p>

            {/* Signature */}
            <p
              ref={signatureRef}
              className="signature text-right"
            >
              — Atharv
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoveWeekSection;
