// pages/SendEmail.js
import React, { useState } from 'react';

const SendEmail = () => {
  const [response, setResponse] = useState(null);

  console.log("INSIDE SENDEMAIL COMPONENT")

  const sendEmail = async () => {
    const payload = {
      recipient: 'fred@example.org',
      items: [
        { product: 'Apples', qty: 5, price: '$0.60' },
        { product: 'Grapes', qty: 2, price: '$5.80' },
      ],
    };

    try {
      const res = await fetch('https://ainiguez.com/send-test-email.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await res.json();
      setResponse(result);
    } catch (error) {
      console.error('Error sending email:', error);
      setResponse({ status: 'error', message: 'Failed to send email' });
    }
  };

  return (
    <div>
      <button onClick={sendEmail}>Send Email</button>
      {response && (
        <div>
          <h3>Response</h3>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default SendEmail;
