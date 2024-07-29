import React from 'react';
import quizerniaLogo from '../assets/Quizernia2.png';

const Header = () => {
  return (
    <header className="bg-white shadow-md fixed left-0 right-0 z-10 h-24">
      <nav className="flex items-center justify-center h-16">
        <div className="flex items-center justify-center w-[150px] h-[100px] overflow-hidden mt-8">
          <img
            src={quizerniaLogo}
            alt="Quizernia Logo"
            className="object-contain"
          />
        </div>
      </nav>
    </header>
  );
}

export default Header;
