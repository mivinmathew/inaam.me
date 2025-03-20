
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
          "max-w-5xl w-full mx-auto rounded-full px-6 py-3 transition-all duration-300 border relative",
          scrolled 
            ? "bg-white/80 backdrop-blur-md shadow-lg border-gray-200" 
            : "bg-black/75 backdrop-blur-md border-white/10",
          "apple-menu-glow overflow-hidden"
        )}
      >
        {/* Animated subtle gradient border effect */}
        <div className="absolute inset-0 z-0 apple-menu-border-animation rounded-full"></div>
        
        <div className="flex items-center justify-between relative z-10">
          <a href="/" className="flex items-center">
            <img 
              src="/lovable-uploads/19489af6-3903-4757-8ef4-954d876c449e.png" 
              alt="inaam" 
              className="h-8 md:h-10"
            />
          </a>
          <nav className="hidden md:block">
            <ul className="flex space-x-8">
              <li>
                <a 
                  href="#waitlist" 
                  className={cn(
                    "transition-colors font-inter text-sm font-medium",
                    scrolled 
                      ? "text-black hover:text-gray-600" 
                      : "text-white hover:text-gray-200"
                  )}
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
