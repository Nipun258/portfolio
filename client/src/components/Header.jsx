import React from 'react';

const Header = () => {
  return (
    <nav className="gradient-bg text-white p-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Portfolio</h1>
        <div className="space-x-4">
          <a href="#home" className="hover:text-gray-200">Home</a>
          <a href="#about" className="hover:text-gray-200">About</a>
          <a href="#projects" className="hover:text-gray-200">Projects</a>
          <a href="#contact" className="hover:text-gray-200">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Header;