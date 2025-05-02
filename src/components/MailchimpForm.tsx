
import { useEffect } from 'react';

const MailchimpForm = () => {
  // Add Mailchimp script after component mounts
  useEffect(() => {
    // Add the Mailchimp validation script
    const script = document.createElement('script');
    script.src = '//s3.amazonaws.com/downloads.mailchimp.com/js/mc-validate.js';
    script.async = true;
    
    // Add the validation function
    script.onload = () => {
      // @ts-ignore - using Mailchimp's global setup
      window.fnames = new Array();
      // @ts-ignore
      window.ftypes = new Array();
      // @ts-ignore
      window.fnames[0]='EMAIL';
      // @ts-ignore
      window.ftypes[0]='email';
      // @ts-ignore
      window.fnames[1]='FNAME';
      // @ts-ignore
      window.ftypes[1]='text';
      // @ts-ignore
      window.fnames[2]='LNAME';
      // @ts-ignore
      window.ftypes[2]='text';
    };
    
    document.body.appendChild(script);
    
    // Clean up the script when component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  return (
    <div className="mx-auto max-w-md w-full">
      <div id="mc_embed_shell">
        <link 
          href="//cdn-images.mailchimp.com/embedcode/classic-061523.css" 
          rel="stylesheet" 
          type="text/css" 
        />
        <style type="text/css">
          {`
            #mc_embed_signup {
              background: transparent;
              clear: left;
              font: inherit;
              width: 100%;
              max-width: 600px;
              margin: 0 auto;
              border-radius: 0.5rem;
              margin-top: -1rem;
            }
            #mc_embed_signup .button {
              background-color: black;
              height: 40px;
              font-weight: 500;
              border-radius: 0.375rem;
              transition: background-color 0.2s;
            }
            #mc_embed_signup .button:hover {
              background-color: #333;
            }
            #mc_embed_signup input.email {
              height: 48px;
              border-radius: 0.375rem;
              border: 1px solid #e2e8f0;
              padding: 0.5rem 1rem;
            }
            #mc_embed_signup h2 {
              display: none;
            }
            .mc-field-group {
              padding-bottom: 2%;
            }
            @media (max-width: 640px) {
              #mc_embed_signup {
                width: 100%;
                padding: 0;
              }
            }
          `}
        </style>
        
        <div id="mc_embed_signup">
          <form 
            action="https://inaam.us5.list-manage.com/subscribe/post?u=1a0dcc7eaa98b4c0cce7e1381&amp;id=d4145d893b&amp;f_id=000542edf0" 
            method="post" 
            id="mc-embedded-subscribe-form" 
            name="mc-embedded-subscribe-form" 
            className="validate" 
            target="_blank"
          >
            <div id="mc_embed_signup_scroll">
              <div className="indicates-required"><span className="asterisk">*</span> indicates required</div>
              <div className="mc-field-group">
                <label htmlFor="mce-EMAIL">
                  Email Address <span className="asterisk">*</span>
                </label>
                <input 
                  type="email" 
                  name="EMAIL" 
                  className="required email" 
                  id="mce-EMAIL" 
                  required 
                />
              </div>
              
              <div id="mce-responses" className="clear foot">
                <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
                <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
              </div>
              
              {/* Hidden field for bot protection */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
                <input 
                  type="text" 
                  name="b_1a0dcc7eaa98b4c0cce7e1381_d4145d893b" 
                  tabIndex={-1} 
                  defaultValue="" 
                />
              </div>
              
              <div className="optionalParent">
                <div className="clear foot">
                  <input 
                    type="submit" 
                    name="subscribe" 
                    id="mc-embedded-subscribe" 
                    className="button" 
                    value="Subscribe" 
                  />
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MailchimpForm;
