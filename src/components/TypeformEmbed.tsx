
import React, { useEffect } from 'react';

const TypeformEmbed = () => {
  useEffect(() => {
    // Ensure the Typeform script has loaded and initialized
    const script = document.querySelector('script[src*="embed.typeform.com"]');
    if (script && window.tf) {
      window.tf.load();
    }
  }, []);

  return (
    <div className="typeform-container">
      <div data-tf-live="01JT84NR1YQ7V3YRYDHQ904BFK"></div>
      <style jsx>{`
        .typeform-container {
          max-width: 480px;
          margin: 0 auto;
        }
      `}</style>
    </div>
  );
};

export default TypeformEmbed;
