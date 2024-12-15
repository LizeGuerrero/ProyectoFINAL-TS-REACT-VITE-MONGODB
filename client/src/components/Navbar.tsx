// src/components/Navbar.tsx

import React, { useState } from 'react';
import './Navbar.css';

const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  const handleClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <nav>
      <div className="navbar">
        <ul className="list">

          <li>
            <a
              href="#home"
              className={activeTab === 'home' ? 'current' : ''}
              onClick={() => handleClick('home')}
            >
              Home
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={activeTab === 'about' ? 'current' : ''}
              onClick={() => handleClick('about')}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={activeTab === 'contact' ? 'current' : ''}
              onClick={() => handleClick('contact')}
            >
              Contacts
            </a>
          </li>
          <li>
            <a
              href="#help"
              className={activeTab === 'help' ? 'current' : ''}
              onClick={() => handleClick('help')}
            >
              Help
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
