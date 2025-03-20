
import { useState } from 'react';
import { toast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast({
        title: "Invalid email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Success!",
        description: "You've been added to our waitlist.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 w-full max-w-md mx-auto">
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-2">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-md border-gray-300 bg-white bg-opacity-80 backdrop-blur-sm px-4 py-3 h-12 focus:ring-black focus:border-black"
        />
        <Button 
          type="submit" 
          disabled={isSubmitting}
          className="bg-black hover:bg-gray-800 text-white font-medium px-6 py-3 h-12 rounded-md transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Join Waitlist"}
        </Button>
      </div>
    </form>
  );
};

export default WaitlistForm;
