
import React from 'react';
import { Button } from '@/components/ui/button';

const SimpleMailchimpForm = () => {
  const handleClick = () => {
    window.open('https://inaamyourmoney.notion.site/20710e25656b8102b835ca8c1e7fcfd5?pvs=105');
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
