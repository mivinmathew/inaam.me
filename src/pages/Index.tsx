
import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import MailchimpForm from '@/components/MailchimpForm';

const Index = () => {
  // This will help us implement the staggered animation effect
  useEffect(() => {
    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      el.classList.add('opacity-0');
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0');
            entry.target.classList.add('animate-fade-up');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 px-6 md:px-10 relative">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <section className="py-16 md:py-24 relative">
            {/* Hero content */}
            <div className="text-center space-y-8 max-w-3xl mx-auto relative z-10">
              <div className="space-y-5">
                <span className="inline-block text-sm font-medium uppercase tracking-wide bg-black text-white px-3 py-1 rounded-full animate-fade-in appear-first">
                  Coming Soon
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl leading-tight animate-fade-in appear-second">
                  Impact investing in your pocket.
                </h1>
                <p className="text-gray-600 text-lg md:text-xl animate-fade-in appear-third">
                  From you, for impact.
                </p>
              </div>
              
              <div className="animate-fade-in appear-fourth" id="waitlist">
                <MailchimpForm />
              </div>
            </div>
          </section>
          
          {/* Features Section */}
          <section className="py-16 md:py-24">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="animate-on-scroll opacity-0 space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 16V12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 8H12.01" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Simplified</h3>
                <p className="text-gray-600">
                  Investment made accessible for everyone, regardless of your experience level.
                </p>
              </div>
              
              <div className="animate-on-scroll opacity-0 space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17 8L21 12M21 12L17 16M21 12H3" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Impactful</h3>
                <p className="text-gray-600">
                  Make investments that align with your values and create positive change.
                </p>
              </div>
              
              <div className="animate-on-scroll opacity-0 space-y-4">
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-black">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2 20H22" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M5 20V13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9 20V9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 20V4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M17 20V11" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="text-2xl font-bold">Growth</h3>
                <p className="text-gray-600">
                  Smart investment strategies designed to help your money grow over time.
                </p>
              </div>
            </div>
          </section>
          
          {/* Call to Action */}
          <section className="py-16 md:py-24 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold animate-on-scroll opacity-0">
                Be the first to experience a new way of impact investing
              </h2>
              <p className="text-gray-600 text-lg animate-on-scroll opacity-0">
                Join our waitlist today and be notified when we launch.
              </p>
              <div className="animate-on-scroll opacity-0">
                <MailchimpForm />
              </div>
            </div>
          </section>
        </div>
      </main>
      
      <footer className="py-8 border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-6 md:px-10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/0a23badb-d7a6-419a-89ce-8103e50caea0.png" 
                alt="inaam" 
                className="h-6"
              />
            </div>
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} inaam. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
