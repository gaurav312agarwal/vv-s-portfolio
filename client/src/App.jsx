import React, { useEffect, useState } from 'react';
import HomePage from './pages/HomePage';
import BlogsPage from './pages/BlogsPage';
import ScriptsPage from './pages/ScriptsPage';
import ShortFilmsPage from './pages/ShortFilmsPage';
import ContentBrandingPage from './pages/ContentBrandingPage';

const API_URL = 'https://vv-s-portfolio.vercel.app';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/portfolio`)
      .then(res => res.json())
      .then(d => {
        setData(d);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center bg-black text-white font-serif text-xl">Loading Experience...</div>;
  }

  if (!data) {
    return <div className="h-screen w-full flex items-center justify-center bg-black text-red-500">Error connecting to server. Ensure Node backend is running on port 5001.</div>;
  }

  return (
    <div>
      {currentPage === 'home' && <HomePage data={data} setCurrentPage={setCurrentPage} />}
      {currentPage === 'blogs' && <BlogsPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'scripts' && <ScriptsPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'short-films' && <ShortFilmsPage setCurrentPage={setCurrentPage} />}
      {currentPage === 'content-branding' && <ContentBrandingPage setCurrentPage={setCurrentPage} />}
    </div>
  );
};

export default App;

