import { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Our Love Week', id: 'love-week' },
    { label: 'Love Notes', id: 'special' },
    { label: 'Memories', id: 'gallery' },
    { label: 'Finale', id: 'finale' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        scrolled
          ? 'bg-white/70 backdrop-blur-xl shadow-lg py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="w-full px-6 lg:px-12 flex items-center justify-between">
        {/* Logo */}
        <button
          onClick={() => scrollToSection('hero')}
          className="flex items-center gap-2 group"
        >
          <span className={`font-dancing text-2xl lg:text-3xl font-semibold transition-colors ${
            scrolled ? 'text-[#E86A6A]' : 'text-[#5A3A3A]'
          }`}>
            My baby
          </span>
          <span className="text-xl animate-pulse">💕</span>
        </button>

        {/* Navigation Links - Desktop */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => scrollToSection(link.id)}
              className={`relative text-sm font-medium transition-all duration-300 hover:text-[#E86A6A] group ${
                scrolled ? 'text-[#5A3A3A]' : 'text-[#5A3A3A]'
              }`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#E86A6A] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </div>

        {/* User Icon */}
        <div className="flex items-center gap-2">
          <span className="hidden sm:block font-caveat text-lg text-[#8F6B6B]">Yashika</span>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#E86A6A] to-[#f08080] flex items-center justify-center shadow-md">
            <Heart className="w-4 h-4 text-white fill-white" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
