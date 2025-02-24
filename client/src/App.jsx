import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';

const router = createBrowserRouter([
  {
    path: '/admin',
    element: <AdminPanel />
  },
  {
    path: '/',
    element: (
      <>
        <Header />
        <main className="container mx-auto py-8 px-4">
          <Hero />
          <About />
          <Projects />
          <section id="contact" className="mb-16">
            <h2 className="text-3xl font-bold mb-8">Contact Me</h2>
            <div className="glass-effect rounded-lg p-8 max-w-2xl mx-auto">
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input type="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea rows="4" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition duration-300">Send Message</button>
              </form>
            </div>
          </section>
        </main>
        <footer className="gradient-bg text-white py-8">
          <div className="container mx-auto text-center">
            <p>&copy; 2024 My Portfolio. All rights reserved.</p>
          </div>
        </footer>
      </>
    )
  }
], {
  future: {
    v7_startTransition: true
  }
});

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
