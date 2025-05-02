
import React from 'react';

const SimpleMailchimpForm = () => {
  return (
    <>
      <style>
        {`
          .inaam-form {
            max-width: 480px;
            margin: 0 auto;
            font-family: Inter, sans-serif;
            background: #fff;
            padding: 24px;
            border-radius: 8px;
            border: 1px solid #eee;
          }

          .inaam-form label {
            display: block;
            margin-bottom: 0.25rem;
            font-weight: 500;
            font-size: 0.95rem;
          }

          .inaam-form input[type="email"] {
            width: 100%;
            padding: 12px;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 6px;
            margin-bottom: 1rem;
          }

          .inaam-form input[type="submit"] {
            background-color: #000;
            color: white;
            padding: 12px;
            font-size: 1rem;
            border: none;
            border-radius: 6px;
            cursor: pointer;
            width: 100%;
          }

          .inaam-form input[type="submit"]:hover {
            background-color: #222;
          }

          .inaam-form small {
            display: block;
            margin-top: 0.5rem;
            font-size: 0.85rem;
            color: #777;
          }

          .inaam-form .hidden-field {
            position: absolute;
            left: -5000px;
          }
        `}
      </style>

      <form 
        className="inaam-form" 
        action="https://inaam.us5.list-manage.com/subscribe/post?u=1a0dcc7eaa98b4c0cce7e1381&id=d4145d893b&f_id=000542edf0" 
        method="post" 
        target="_blank" 
        noValidate
      >
        <label htmlFor="mce-EMAIL">Email Address</label>
        <input 
          type="email" 
          name="EMAIL" 
          id="mce-EMAIL" 
          required 
          placeholder="you@example.com" 
        />

        <div className="hidden-field" aria-hidden="true">
          <input 
            type="text" 
            name="b_1a0dcc7eaa98b4c0cce7e1381_d4145d893b" 
            tabIndex={-1} 
            value="" 
          />
        </div>

        <input type="submit" value="Join the Waitlist" />

        <small>We'll only email you when it's meaningful — no spam.</small>
      </form>
    </>
  );
};

export default SimpleMailchimpForm;
