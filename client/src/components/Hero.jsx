import React from 'react';

const Hero = () => {
  return (
    <section id="home" className="min-h-[90vh] flex items-center justify-center mb-16">
      <div className="glass-effect rounded-lg p-8 text-center max-w-4xl mx-auto transform hover:scale-105 transition-transform duration-300">
        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Welcome to My Portfolio
        </h1>
        <p className="text-2xl text-gray-600 mb-8">Full Stack Developer | MERN Specialist</p>
        <div className="flex justify-center space-x-4">
          <a 
            href="#projects" 
            className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
          >
            View My Work
          </a>
          <a 
            href="#contact" 
            className="border-2 border-indigo-600 text-indigo-600 px-6 py-3 rounded-full hover:bg-indigo-600 hover:text-white transition duration-300 transform hover:scale-105"
          >
            Contact Me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;