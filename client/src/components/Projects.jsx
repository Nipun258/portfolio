import React from 'react';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce Platform',
      description: 'A full-stack MERN e-commerce platform with user authentication and payment integration.',
      tech: ['React', 'Node.js', 'MongoDB', 'Express'],
      image: '/project1.jpg'
    },
    {
      title: 'Task Management App',
      description: 'Real-time task management application with collaborative features.',
      tech: ['React', 'Socket.io', 'Express', 'MongoDB'],
      image: '/project2.jpg'
    },
    {
      title: 'Social Media Dashboard',
      description: 'Analytics dashboard for social media metrics with data visualization.',
      tech: ['React', 'D3.js', 'Node.js', 'MongoDB'],
      image: '/project3.jpg'
    }
  ];

  return (
    <section id="projects" className="mb-16">
      <h2 className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
        Projects
      </h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <div key={index} className="glass-effect rounded-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 shadow-lg">
            <div className="h-48 bg-gray-200 relative overflow-hidden">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-indigo-600">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech, techIndex) => (
                  <span 
                    key={techIndex}
                    className="px-3 py-1 bg-indigo-100 text-indigo-600 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Projects;