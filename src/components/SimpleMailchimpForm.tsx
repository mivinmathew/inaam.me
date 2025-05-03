
import React from 'react';
import { Button } from '@/components/ui/button';

const SimpleMailchimpForm = () => {
  const handleClick = () => {
    window.open('https://flying-bramble-4ef.notion.site/1e7f4b9db627801da7cbfe871bb5129c?pvs=105', '_blank');
  };

  return (
    <div className="max-w-md mx-auto">
      <Button 
        onClick={handleClick} 
        className="w-full bg-black hover:bg-zinc-800 text-white py-3 px-4 rounded-md text-base font-medium transition-colors"
      >
        Join the Waitlist
      </Button>
    </div>
  );
};

export default SimpleMailchimpForm;
