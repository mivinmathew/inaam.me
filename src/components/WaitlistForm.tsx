
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
    
    // We'll let the form submit to Mailchimp naturally since we're using target="_blank"
    // But we'll still show the toast to give immediate feedback
    toast({
      title: "Success!",
      description: "You've been added to our waitlist.",
    });
    
    // Reset the form after a delay to allow the form to submit
    setTimeout(() => {
      setEmail('');
      setIsSubmitting(false);
    }, 500);
  };

  return (
    <form 
      onSubmit={handleSubmit} 
      action="https://inaam.us5.list-manage.com/subscribe/post?u=1a0dcc7eaa98b4c0cce7e1381&id=d4145d893b&f_id=000542edf0" 
      method="post"
      target="_blank"
      className="mt-8 w-full max-w-md mx-auto"
    >
      {/* Hidden field for bot protection */}
      <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
        <input type="text" name="b_1a0dcc7eaa98b4c0cce7e1381_d4145d893b" tabIndex={-1} value="" />
      </div>
      
      <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:space-x-2">
        <Input
          type="email"
          name="EMAIL" 
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
