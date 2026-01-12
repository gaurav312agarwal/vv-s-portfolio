import React, { useEffect, useState } from 'react';

const API_URL = 'https://vv-s-portfolio.vercel.app';

const ShortFilmsPage = ({ setCurrentPage }) => {
  const [films, setFilms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/short-films`)
      .then(res => res.json())
      .then(data => {
        setFilms(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching short films:", err);
        setLoading(false);
      });
  }, []);

  // Auto-scroll effect - every 10 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % (films.length || 1));
    }, 10000);
    return () => clearInterval(interval);
  }, [films.length]);

  const nextFilm = () => {
    setCurrentIndex((prev) => (prev + 1) % films.length);
  };

  const prevFilm = () => {
    setCurrentIndex((prev) => (prev - 1 + films.length) % films.length);
  };

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center bg-black text-white font-serif text-xl">Loading Short Films...</div>;
  }

  if (!films || films.length === 0) {
    return <div className="h-screen w-full flex items-center justify-center bg-black text-white font-serif text-xl">No short films available</div>;
  }

  const currentFilm = films[currentIndex];

  return (
    <div className="min-h-screen overflow-hidden text-white flex flex-col relative bg-black/40">
      {/* Back Button - Top Left */}
      <div className="absolute top-8 left-8 z-20">
        <button onClick={() => setCurrentPage('home')} className="font-bold tracking-widest uppercase hover:text-brand-red transition-colors cursor-pointer">
          &lt; BACK HOME
        </button>
      </div>

      {/* Left Arrow Navigation */}
      <button
        onClick={prevFilm}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-brand-red text-white hover:bg-red-700 transition-all flex items-center justify-center group"
      >
        <span className="text-3xl group-hover:scale-125 transition-transform pb-1">&lt;</span>
      </button>

      {/* Right Arrow Navigation */}
      <button
        onClick={nextFilm}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-brand-red text-white hover:bg-red-700 transition-all flex items-center justify-center group"
      >
        <span className="text-3xl group-hover:scale-125 transition-transform pb-1">&gt;</span>
      </button>

      {/* Main Content - Full Height */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10">
        <div className="w-full max-w-6xl px-4 md:px-12 py-20">
          {/* Film Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            
            {/* Left Side - Visual */}
            <div className="flex items-center justify-center order-2 md:order-1">
              <div className="w-full max-w-md aspect-square bg-gradient-to-br from-gray-900 via-gray-800 to-black rounded-lg flex items-center justify-center relative overflow-hidden shadow-lg group cursor-pointer">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/10 to-transparent"></div>
                
                {/* Play Button Visual */}
                <div className="relative z-10 w-20 h-20 rounded-full border-2 border-white/30 flex items-center justify-center bg-white/10 backdrop-blur-sm group-hover:scale-110 transition-transform duration-300">
                  <div className="ml-1 text-3xl text-white">▶</div>
                </div>
              </div>
            </div>

            {/* Right Side - Film Info */}
            <div className="flex flex-col justify-center order-1 md:order-2">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-brand-red font-mono text-lg font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="text-gray-300 text-sm">{currentFilm.year} • {currentFilm.duration}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif mb-6 text-white">{currentFilm.title}</h1>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">{currentFilm.description}</p>
              <p className="text-gray-400 leading-relaxed font-light mb-8 max-h-48 overflow-y-auto custom-scrollbar pr-2">
                {currentFilm.content}
              </p>
              
              <div className="flex gap-4">
                <button onClick={prevFilm} className="px-6 py-3 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-all uppercase font-bold">
                  &lt; PREV
                </button>
                <button onClick={nextFilm} className="px-6 py-3 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-all uppercase font-bold">
                  NEXT &gt;
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Bottom Navigation - Indicators and Counter */}
      <div className="relative z-20 py-8 px-4 border-t border-gray-800/50">
        <div className="flex flex-col items-center gap-4">
          {/* Indicators */}
          <div className="flex justify-center gap-2">
            {films.map((_, idx) => (
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
            {currentIndex + 1} of {films.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShortFilmsPage;