import React from 'react';

const About = () => {
  return (
    <section id="about" className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        About Me
      </h2>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="prose lg:prose-xl">
          <p className="text-lg text-gray-700 leading-relaxed">
            A passionate full-stack developer with expertise in the MERN stack. With a keen eye for detail and a love for clean code, I specialize in building scalable and efficient web applications.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mt-4">
            I love building modern web applications and solving complex problems. My approach combines technical expertise with creative problem-solving to deliver exceptional results.
          </p>
        </div>
        <div className="glass-effect rounded-lg p-6 transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-xl font-bold mb-4 text-indigo-600">Skills</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="hover-scale p-4 bg-white rounded shadow hover:shadow-lg transition duration-300">
              <h4 className="font-bold text-indigo-600">Frontend</h4>
              <ul className="mt-2 space-y-2">
                <li>React</li>
                <li>Tailwind CSS</li>
                <li>JavaScript/ES6+</li>
                <li>HTML5/CSS3</li>
              </ul>
            </div>
            <div className="hover-scale p-4 bg-white rounded shadow hover:shadow-lg transition duration-300">
              <h4 className="font-bold text-indigo-600">Backend</h4>
              <ul className="mt-2 space-y-2">
                <li>Node.js</li>
                <li>Express</li>
                <li>MongoDB</li>
                <li>RESTful APIs</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;