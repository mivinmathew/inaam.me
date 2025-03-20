
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out py-4 px-6 md:px-10 flex justify-center"
    >
      <div 
        className={cn(
          "max-w-3xl w-full mx-auto rounded-full px-6 py-3 transition-all duration-300 border relative",
          scrolled 
            ? "bg-white/90 backdrop-blur-md shadow-lg border-gray-200" 
            : "bg-transparent backdrop-blur-sm border-white/20",
          "apple-menu-glow overflow-hidden"
        )}
      >
        {/* Animated subtle gradient border effect */}
        <div className="absolute inset-0 z-0 apple-menu-border-animation rounded-full"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <a href="/" className="flex items-center transition-opacity duration-300">
            <img 
              src="/lovable-uploads/0a23badb-d7a6-419a-89ce-8103e50caea0.png" 
              alt="inaam" 
              className="h-8 md:h-10 transition-all duration-300 ease-in-out"
            />
          </a>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a 
                  href="#waitlist" 
                  className="transition-colors font-inter text-sm font-medium text-[#222222]"
                >
                  Join Waitlist
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
