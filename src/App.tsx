import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './sections/Navbar';
import HeroSection from './sections/HeroSection';
import LoveWeekSection from './sections/LoveWeekSection';
import SpecialSection from './sections/SpecialSection';
import GallerySection from './sections/GallerySection';
import FinaleSection from './sections/FinaleSection';
import FloatingHearts from './sections/FloatingHearts';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Wait for all sections to mount before setting up global snap
    const timer = setTimeout(() => {
      const pinned = ScrollTrigger.getAll()
        .filter(st => st.vars.pin)
        .sort((a, b) => a.start - b.start);
      
      const maxScroll = ScrollTrigger.maxScroll(window);
      
      if (!maxScroll || pinned.length === 0) return;

      const pinnedRanges = pinned.map(st => ({
        start: st.start / maxScroll,
        end: (st.end ?? st.start) / maxScroll,
        center: (st.start + ((st.end ?? st.start) - st.start) * 0.5) / maxScroll,
      }));

      ScrollTrigger.create({
        snap: {
          snapTo: (value: number) => {
            const inPinned = pinnedRanges.some(
              r => value >= r.start - 0.02 && value <= r.end + 0.02
            );
            if (!inPinned) return value;

            const target = pinnedRanges.reduce(
              (closest, r) =>
                Math.abs(r.center - value) < Math.abs(closest - value)
                  ? r.center
                  : closest,
              pinnedRanges[0]?.center ?? 0
            );
            return target;
          },
          duration: { min: 0.15, max: 0.35 },
          delay: 0,
          ease: 'power2.out',
        },
      });
    }, 500);

    return () => {
      clearTimeout(timer);
      ScrollTrigger.getAll().forEach(st => st.kill());
    };
  }, []);

  return (
    <div ref={mainRef} className="relative overflow-x-hidden">
      {/* Noise Texture Overlay */}
      <div className="noise-overlay" />
      
      {/* Floating Hearts Background */}
      <FloatingHearts />
      
      {/* Navigation */}
      <Navbar />
      
      {/* Main Content */}
      <main className="relative">
        {/* Hero Section */}
        <HeroSection />
        
        {/* Love Week Sections */}
        <LoveWeekSection
          day="7 Feb"
          title="Rose Day"
          image="/rose_day.jpg"
          message="When I think about roses, I think about how something can be soft and strong at the same time. That's what you remind me of. You don't even try, yet you carry this quiet beauty that just stays with me."
          icon="rose"
          zIndex={20}
        />
        
        <LoveWeekSection
          day="8 Feb"
          title="Propose Day"
          image="/propose_day.jpg"
          message="I don't have a rehearsed speech or dramatic lines. I just know this — I like the idea of choosing you. Not once, not loudly, but every day in small ways. In the way I listen. In the way I stay."
          icon="ring"
          zIndex={30}
        />
        
        <LoveWeekSection
          day="9 Feb"
          title="Chocolate Day"
          image="/chocolate_day.jpg"
          message="Chocolate melts, and somehow so do my thoughts when you smile. You have that effect — turning normal moments into something sweeter without even realizing it."
          icon="chocolate"
          zIndex={40}
        />
        
        <LoveWeekSection
          day="10 Feb"
          title="Teddy Day"
          image="/teddy_day.jpg"
          message="There's something incredibly safe about you. Like a place I can rest without pretending to be anything else. You make softness feel okay. You make warmth feel real."
          icon="teddy"
          zIndex={50}
        />
        
        <LoveWeekSection
          day="11 Feb"
          title="Promise Day"
          image="/promise_day.jpg"
          message="I can't promise perfect days. But I can promise honesty. Effort. Care. I promise to try even when it's hard, and to stay gentle even when things aren't easy."
          icon="promise"
          zIndex={60}
        />
        
        <LoveWeekSection
          day="12 Feb"
          title="Hug Day"
          image="/hug_day.jpg"
          message="A hug doesn't fix everything, but it makes things feel less heavy. That's what I imagine when I think of you — comfort without questions. Warmth without conditions."
          icon="hug"
          zIndex={70}
        />
        
        <LoveWeekSection
          day="13 Feb"
          title="Kiss Day"
          image="/kiss_day.jpg"
          message="Some feelings don't need noise. They just exist — quietly, sincerely. That's what this is. A gentle moment. A pause where the world fades a little."
          icon="kiss"
          zIndex={80}
        />
        
        <LoveWeekSection
          day="14 Feb"
          title="Valentine's Day"
          image="/valentine_day.jpg"
          message="Today isn't about grand gestures. It's about truth. And the truth is simple — I love you, Yashika. Not loudly. Not perfectly. But genuinely. Today, tomorrow, and all the ordinary days in between — I choose you."
          icon="heart"
          zIndex={90}
          isLast={true}
        />
        
        {/* Special Section */}
        <SpecialSection />
        
        {/* Gallery Section */}
        <GallerySection />
        
        {/* Finale Section */}
        <FinaleSection />
      </main>
    </div>
  );
}

export default App;
