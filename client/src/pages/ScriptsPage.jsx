import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const ScriptsPage = ({ setCurrentPage }) => {
  const [scripts, setScripts] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/scripts`)
      .then(res => res.json())
      .then(data => {
        setScripts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching scripts:", err);
        setLoading(false);
      });
  }, []);

  // Auto-scroll effect - every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (scripts.length || 1));
    }, 7000);
    return () => clearInterval(interval);
  }, [scripts.length]);

  const nextScript = () => {
    setCurrentIndex((prev) => (prev + 1) % scripts.length);
  };

  const prevScript = () => {
    setCurrentIndex((prev) => (prev - 1 + scripts.length) % scripts.length);
  };

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center bg-black text-white font-serif text-xl">Loading Scripts...</div>;
  }

  if (!scripts || scripts.length === 0) {
    return <div className="h-screen w-full flex items-center justify-center bg-black text-white font-serif text-xl">No scripts available</div>;
  }

  const currentScript = scripts[currentIndex];

  return (
    <div className="min-h-screen overflow-hidden text-white flex flex-col relative bg-black/40">
      {/* Background Image */}
      {currentScript.image && (
        <div className="absolute inset-0 z-0">
          <img 
            src={`${API_URL}/images/scripts/${encodeURIComponent(currentScript.title)}/${encodeURIComponent(currentScript.image)}`}
            alt={currentScript.title}
            className="w-full h-full object-cover opacity-40"
            onError={(e) => {
              console.log('Background image failed to load:', e.target.src);
              e.target.style.display = 'none';
            }}
          />
          <div className="absolute inset-0 bg-black opacity-75"></div>
        </div>
      )}

      {/* Back Button - Top Left */}
      <div className="absolute top-8 left-8 z-20">
        <button onClick={() => setCurrentPage('home')} className="font-bold tracking-widest uppercase hover:text-brand-red transition-colors cursor-pointer">
          &lt; HOME
        </button>
      </div>

      {/* Left Arrow Navigation (Circular) */}
      <button
        onClick={prevScript}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-brand-red text-white hover:bg-red-700 transition-all flex items-center justify-center group"
      >
        <span className="text-3xl group-hover:scale-125 transition-transform pb-1">&lt;</span>
      </button>

      {/* Right Arrow Navigation (Circular) */}
      <button
        onClick={nextScript}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-brand-red text-white hover:bg-red-700 transition-all flex items-center justify-center group"
      >
        <span className="text-3xl group-hover:scale-125 transition-transform pb-1">&gt;</span>
      </button>

      {/* Main Content - Full Height */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-6xl px-4 md:px-12 py-20">
          
          {/* Script Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left Side - Image Display */}
            <div className="flex items-center justify-center order-2 md:order-1">
              {currentScript.image ? (
                <div className="w-full max-w-md aspect-video rounded-lg overflow-hidden relative shadow-lg">
                  <img 
                    src={`${API_URL}/images/scripts/${encodeURIComponent(currentScript.title)}/${encodeURIComponent(currentScript.image)}`}
                    alt={currentScript.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      console.log('Image failed to load:', e.target.src);
                      e.target.style.display = 'none';
                      // If image fails, show the sibling div (fallback)
                      if (e.target.nextElementSibling) {
                        e.target.nextElementSibling.classList.remove('hidden');
                        e.target.nextElementSibling.style.display = 'flex';
                      }
                    }}
                  />
                  {/* Fallback overlay if image fails or for styling */}
                  <div className="hidden absolute inset-0 bg-gradient-to-br from-brand-red to-red-900 flex-col items-center justify-center">
                    <div className="text-7xl font-serif mb-4 text-white/80">▶</div>
                    <p className="text-2xl font-serif text-white">{currentScript.title}</p>
                  </div>
                </div>
              ) : (
                <div className="w-full max-w-md aspect-video bg-gradient-to-br from-brand-red to-red-900 rounded-lg flex flex-col items-center justify-center relative overflow-hidden shadow-lg">
                  <div className="absolute inset-0 opacity-20 bg-[url('data:image/svg+xml,%3Csvg width=%2720%27 height=%2720%27 viewBox=%270 0 20 20%27 xmlns=%27http://www.w3.org/2000/svg%27%3E%3Cg fill=%27none%27 fill-rule=%27evenodd%27%3E%3Cg fill=%27%23ffffff%27 fill-opacity=%27.05%27%3E%3Cpath d=%27M0 0h20v20H0z%27/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')]"></div>
                  <div className="relative z-10 text-center">
                     <div className="text-7xl font-serif mb-4 text-white/80">▶</div>
                     <p className="text-2xl font-serif text-white">{currentScript.title}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Right Side - Script Info */}
            <div className="flex flex-col justify-center order-1 md:order-2">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-brand-red font-mono text-lg font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="text-gray-400 text-sm uppercase">{currentScript.genre}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif mb-6 text-white">{currentScript.title}</h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed text-justify">{currentScript.description}</p>
              {/* Only showing a snippet of content if it exists */}
              {currentScript.content && (
                 <p className="text-gray-400 leading-relaxed font-light mb-8 line-clamp-3">{currentScript.content}</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Navigation - Indicators and Counter */}
      <div className="relative z-20 py-8 px-4">
        <div className="flex flex-col items-center gap-4">
          {/* Indicators */}
          <div className="flex justify-center gap-2">
            {scripts.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-brand-red w-8' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          {/* Counter */}
          <div className="text-gray-400 text-sm">
            {currentIndex + 1} of {scripts.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScriptsPage;