import React, { useEffect, useState } from 'react';

const API_URL = 'https://vv-s-portfolio.vercel.app';

const ContentBrandingPage = ({ setCurrentPage }) => {
  const [partnerships, setPartnerships] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/api/content-branding`)
      .then(res => res.json())
      .then(data => {
        setPartnerships(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching content & branding:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center bg-black text-white font-serif text-xl">Loading Partnerships...</div>;
  }

  if (!partnerships || partnerships.length === 0) {
    return <div className="h-screen w-full flex items-center justify-center bg-black text-white font-serif text-xl">No partnerships available</div>;
  }

  const currentPartnership = partnerships[currentIndex];

  const nextPartnership = () => {
    setCurrentIndex((prev) => (prev + 1) % partnerships.length);
  };

  const prevPartnership = () => {
    setCurrentIndex((prev) => (prev - 1 + partnerships.length) % partnerships.length);
  };

  return (
    <div className="bg-off-white min-h-screen overflow-hidden flex flex-col">
      {/* Main Carousel - Full Height */}
      <div className="flex-1 flex flex-col items-center justify-center relative">
        <div className="w-full max-w-5xl px-4 md:px-12 py-20">
          {/* Back Button */}
          <button onClick={() => setCurrentPage('home')} className="mb-12 font-bold tracking-widest uppercase hover:text-brand-red transition-colors cursor-pointer text-gray-900">← BACK HOME</button>
          
          {/* Partnership Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Side - Partnership Info */}
            <div className="flex flex-col justify-center order-2 md:order-1">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-brand-red font-mono text-lg font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
                <span className="text-gray-400 text-sm">{currentPartnership.year}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-serif mb-2 text-gray-900">{currentPartnership.brand}</h1>
              <p className="text-lg text-brand-red font-semibold mb-8">{currentPartnership.category}</p>
              
              <div className="mb-8 pb-8 border-b border-gray-300">
                <p className="text-lg text-gray-600 leading-relaxed">{currentPartnership.description}</p>
              </div>

              <div className="mb-8">
                <h3 className="text-sm font-bold tracking-[0.2em] text-brand-red uppercase mb-4">Key Learning</h3>
                <p className="text-gray-700 leading-relaxed font-light mb-6">{currentPartnership.learning}</p>
              </div>

              <p className="text-gray-700 leading-relaxed font-light mb-8">{currentPartnership.content}</p>
              
              <div className="flex gap-4">
                <button onClick={prevPartnership} className="px-6 py-3 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-all uppercase font-bold">← PREV</button>
                <button onClick={nextPartnership} className="px-6 py-3 border-2 border-brand-red text-brand-red hover:bg-brand-red hover:text-white transition-all uppercase font-bold">NEXT →</button>
              </div>
            </div>

            {/* Right Side - Visual Showcase */}
            <div className="flex flex-col justify-center items-center order-1 md:order-2 gap-4">
              {/* Main Brand Card */}
              <div className="w-full bg-gradient-to-br from-brand-red/30 to-gray-300 rounded-lg p-8 flex flex-col items-center justify-center aspect-square relative overflow-hidden group cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-red/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative z-10 text-center">
                  <div className="text-7xl font-serif mb-4 text-brand-red/40 group-hover:text-brand-red/60 transition-colors">★</div>
                  <p className="text-3xl font-serif font-bold text-gray-900 group-hover:text-brand-red transition-colors mb-2">{currentPartnership.brand}</p>
                  <p className="text-sm text-gray-600">{currentPartnership.category}</p>
                </div>
              </div>

              {/* Placeholder Content Grid */}
              <div className="w-full grid grid-cols-2 gap-3">
                {/* Photo Placeholder 1 */}
                <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <div className="text-center">
                    <div className="text-3xl text-gray-400 mb-2">📷</div>
                    <p className="text-xs text-gray-500">Brand Photo</p>
                  </div>
                </div>

                {/* Photo Placeholder 2 */}
                <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <div className="text-center">
                    <div className="text-3xl text-gray-400 mb-2">🎨</div>
                    <p className="text-xs text-gray-500">Design Work</p>
                  </div>
                </div>

                {/* Photo Placeholder 3 */}
                <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <div className="text-center">
                    <div className="text-3xl text-gray-400 mb-2">📱</div>
                    <p className="text-xs text-gray-500">Content</p>
                  </div>
                </div>

                {/* Photo Placeholder 4 */}
                <div className="bg-gray-200 rounded-lg aspect-square flex items-center justify-center hover:bg-gray-300 transition-colors">
                  <div className="text-center">
                    <div className="text-3xl text-gray-400 mb-2">✨</div>
                    <p className="text-xs text-gray-500">Campaign</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Indicators */}
          <div className="flex justify-center gap-2 mt-12">
            {partnerships.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${
                  idx === currentIndex ? 'bg-brand-red w-8' : 'bg-gray-400 hover:bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          {/* Counter */}
          <div className="text-center mt-8 text-gray-600 text-sm">
            {currentIndex + 1} of {partnerships.length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentBrandingPage;
