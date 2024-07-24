import React, { useEffect, useState } from 'react';
import 'font-awesome/css/font-awesome.min.css';
import FeatureItem from '../component/Featureitem';
import Subtitle from '../component/Subtitle';

import iconChat from '../assets/icon-chat.webp';
import iconMoney from '../assets/icon-money.webp';
import iconSecurity from '../assets/icon-security.webp';

const HomePage = () => {
  // Correctly declare user state and setUser function
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Failed to fetch user profile');
          }
          return response.json();
        })
        .then((data) => {
          if (data.body) {
            setUser(data.body);
          } else {
            throw new Error('User data not found in response');
          }
        })
        .catch((error) => {
          console.error('Error fetching user profile:', error.message);
        });
    }
  }, []);

  return (
    <div>
      <main>
        <div className="hero">
          <section className="hero-content">
            <h2 className="sr-only">Promoted Content</h2>
            <Subtitle text="No fees." />
            <Subtitle text="No minimum deposit." />
            <Subtitle text="High interest rates." />
            <p className="text">Open a savings account with Argent Bank today!</p>
          </section>
        </div>
        <section className="features">
          <h2 className="sr-only">Features</h2>
          <FeatureItem
            imgSrc={iconChat}
            imgAlt="Chat Icon"
            title="You are our #1 priority"
            description="Need to talk to a representative? You can get in touch through our 24/7 chat or through a phone call in less than 5 minutes."
          />
          <FeatureItem
            imgSrc={iconMoney}
            imgAlt="Money Icon"
            title="More savings means higher rates"
            description="The more you save with us, the higher your interest rate will be!"
          />
          <FeatureItem
            imgSrc={iconSecurity}
            imgAlt="Security Icon"
            title="Security you can trust"
            description="We use top of the line encryption to make sure your data and money is always safe."
          />
        </section>
      </main>
      <footer className="footer">
        <p className="footer-text">Copyright 2020 Argent Bank</p>
      </footer>
    </div>
  );
};

export default HomePage;
