import React from 'react';

const API_URL = 'https://vv-s-portfolio.vercel.app';

const HomePage = ({ data, setCurrentPage }) => {
  const [scrollProgress, setScrollProgress] = React.useState({});
  const philosophyRef = React.useRef(null);

  React.useEffect(() => {
    const handleScroll = () => {
      if (!philosophyRef.current) return;

      const rect = philosophyRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate when section is in view
      const sectionTop = rect.top;
      const sectionBottom = rect.bottom;
      const sectionHeight = rect.height;

      if (sectionBottom < 0 || sectionTop > windowHeight) return;

      const paragraphs = philosophyRef.current.querySelectorAll('[data-philosophy-para]');
      const newScrollProgress = {};

      paragraphs.forEach((para, index) => {
        const paraRect = para.getBoundingClientRect();
        const paraCenter = paraRect.top + paraRect.height / 2;
        const windowCenter = windowHeight / 2;
        
        // Calculate distance from center of viewport
        const distance = Math.abs(paraCenter - windowCenter);
        const maxDistance = windowHeight / 2;
        
        // Progress: 1 when centered, 0 when far away
        let progress = Math.max(0, 1 - distance / maxDistance);
        progress = progress * progress; // Ease the progress
        
        newScrollProgress[index] = progress;
      });

      setScrollProgress(newScrollProgress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Call once on mount
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page) => {
    setCurrentPage(page);
  };

  const handleTocClick = (text) => {
    if (text === 'ABOUT ME') {
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (text === 'CREATIVE') {
      handleNavClick('blogs');
    } else if (text === 'EXPERIENCE') {
      document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
    } else if (text === 'PROCESS') {
      document.getElementById('process')?.scrollIntoView({ behavior: 'smooth' });
    } else if (text === 'PROJECT') {
      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' });
    } else if (text === 'NEXT STEPS') {
      document.getElementById('next-steps')?.scrollIntoView({ behavior: 'smooth' });
    } else if (text === 'CONTACT') {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="font-sans text-gray-900 bg-off-white selection:bg-brand-red selection:text-white overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full flex justify-between px-6 md:px-12 py-6 mix-blend-difference text-white z-50 pointer-events-none">
        <span className="font-bold tracking-widest uppercase pointer-events-auto cursor-default">{data.header.name}</span>
        <div className="space-x-6 hidden md:block pointer-events-auto">
          <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-semibold hover:text-brand-red transition-colors uppercase tracking-wider cursor-pointer">About</button>
          <button onClick={() => handleNavClick('blogs')} className="text-sm font-semibold hover:text-brand-red transition-colors uppercase tracking-wider cursor-pointer">Blogs</button>
          <button onClick={() => handleNavClick('content-branding')} className="text-sm font-semibold hover:text-brand-red transition-colors uppercase tracking-wider cursor-pointer">Branding</button>
          <button onClick={() => handleNavClick('scripts')} className="text-sm font-semibold hover:text-brand-red transition-colors uppercase tracking-wider cursor-pointer">Scripts</button>
          <button onClick={() => handleNavClick('short-films')} className="text-sm font-semibold hover:text-brand-red transition-colors uppercase tracking-wider cursor-pointer">Films</button>
          <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="text-sm font-semibold hover:text-brand-red transition-colors uppercase tracking-wider cursor-pointer">Contact</button>
        </div>
      </nav>

      {/* PAGE 1: HERO */}
      <section className="h-screen bg-black flex flex-col justify-center items-center text-white relative px-4 overflow-hidden">
        <video 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
          autoPlay 
          muted 
          loop
          src="https://res.cloudinary.com/dmftfmukb/video/upload/v1768219777/cover_video_uymgtr.mp4"
        ></video>
        <div className="absolute inset-0 bg-black/40"></div>
        <h1 className="text-5xl md:text-9xl font-serif mt-10 z-10 text-center tracking-tight animate-pulse opacity-85">CINEMA</h1>
        <div className="absolute bottom-10 flex justify-between w-full px-6 md:px-12 text-sm tracking-widest uppercase opacity-90">
          <span>{data.header.role}</span>
          <span>{data.header.year}</span>
        </div>
      </section>

      {/* PAGE 2: TOC */}
      <section className="min-h-screen bg-white text-black p-6 md:p-20 flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto w-full border-t-2 border-black pt-12">
            <div className="text-2xl font-bold tracking-tighter">CONTENT</div>
            <div className="space-y-6">
                {data.sections.find(s => s.id === 'toc').items.map((item) => (
                    <button key={item.num} onClick={() => handleTocClick(item.text)} className="flex justify-between border-b border-gray-200 pb-3 hover:border-brand-red hover:pl-2 transition-all cursor-pointer group w-full text-right">
                        <span className="text-gray-400 font-mono text-sm group-hover:text-brand-red">{item.num}</span>
                        <span className="font-serif text-2xl md:text-3xl">{item.text}</span>
                    </button>
                ))}
                <button onClick={() => handleNavClick('content-branding')} className="flex justify-between border-b border-gray-200 pb-3 hover:border-brand-red hover:pl-2 transition-all cursor-pointer group w-full text-right">
                    <span className="text-gray-400 font-mono text-sm group-hover:text-brand-red">08</span>
                    <span className="font-serif text-2xl md:text-3xl">CONTENT & BRANDING</span>
                </button>
                <button onClick={() => handleNavClick('scripts')} className="flex justify-between border-b border-gray-200 pb-3 hover:border-brand-red hover:pl-2 transition-all cursor-pointer group w-full text-right">
                    <span className="text-gray-400 font-mono text-sm group-hover:text-brand-red">09</span>
                    <span className="font-serif text-2xl md:text-3xl">SCRIPTS</span>
                </button>
                <button onClick={() => handleNavClick('short-films')} className="flex justify-between border-b border-gray-200 pb-3 hover:border-brand-red hover:pl-2 transition-all cursor-pointer group w-full text-right">
                    <span className="text-gray-400 font-mono text-sm group-hover:text-brand-red">10</span>
                    <span className="font-serif text-2xl md:text-3xl">SHORT FILMS</span>
                </button>
            </div>
        </div>
      </section>

      {/* PAGE 3: ABOUT */}
      <section id="about" className="min-h-screen grid grid-cols-1 md:grid-cols-2">
        <div className="bg-gray-100 flex items-center justify-center p-12 relative overflow-hidden">
            {/* Visual Decoration */}
            <div className="absolute w-64 h-64 bg-gray-200 rounded-full blur-3xl -top-10 -left-10"></div>
            <img src={`${API_URL}/data/cover_photo.jpg`} alt="Vaibhav Vinayak" className="w-full max-w-md aspect-[3/4] shadow-2xl relative z-10 object-cover" />
        </div>
        <div className="bg-brand-red text-white p-8 md:p-20 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-8">{data.sections.find(s => s.id === 'about').subtitle}</h2>
            <div className="space-y-6 text-lg font-light leading-relaxed opacity-90">
                {data.sections.find(s => s.id === 'about').content.map((para, i) => (
                    <p key={i}>{para}</p>
                ))}
            </div>
        </div>
      </section>

      {/* PAGE 4: PHILOSOPHY */}
      <section ref={philosophyRef} className="min-h-[80vh] bg-white text-black p-8 md:p-24 flex items-center">
        <div className="max-w-4xl mx-auto">
            <h2 className="text-xs font-bold tracking-[0.2em] text-brand-red mb-8 uppercase">Creative Philosophy</h2>
            {data.sections.find(s => s.id === 'philosophy').content.map((text, i) => {
              const progress = scrollProgress[i] || 0;
              
              return (
                <p 
                  key={i} 
                  data-philosophy-para
                  className="font-serif text-2xl md:text-5xl leading-tight mb-10 transition-all duration-300"
                  style={{
                    color: progress > 0.3 ? '#000000' : '#9CA3AF'
                  }}
                >
                    {text}
                </p>
              );
            })}
        </div>
      </section>

      {/* PAGE 5: EXPERIENCE */}
      <section id="experience" className="min-h-[70vh] bg-gray-50 p-6 md:p-24 flex flex-col justify-center">
        <h2 className="text-5xl md:text-7xl font-serif mb-20 text-center text-brand-red">EXPERIENCE</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto -mt-10 z-10">
            {data.sections.find(s => s.id === 'experience').jobs.map((job, i) => (
                <div key={i} className="bg-white p-10 shadow-sm border-t-4 border-brand-red hover:shadow-2xl hover:-translate-y-2 transition-all duration-300">
                    <h3 className="text-xl font-bold mb-6 tracking-wide uppercase text-brand-red">{job.role}</h3>
                    <p className="text-gray-600 leading-relaxed font-light">{job.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* PAGE 6: PROCESS */}
      <section id="process" className="min-h-[70vh] bg-black text-white p-8 md:p-24 flex flex-col justify-center">
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-gray-800 pb-8 mb-16">
            <h2 className="text-4xl md:text-6xl font-serif">Process</h2>
            <span className="text-gray-500 font-mono mt-4 md:mt-0">Workflow & Methodology</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {data.sections.find(s => s.id === 'process').steps.map((step, i) => (
                <div key={i} className="relative pl-6 border-l border-gray-800 hover:border-brand-red transition-colors group">
                    <span className="absolute -left-3 top-0 bg-gray-800 group-hover:bg-brand-red text-xs w-6 h-6 flex items-center justify-center rounded-full transition-colors">
                        {i + 1}
                    </span>
                    <h3 className="font-bold text-lg mb-4 mt-2">{step.title}</h3>
                    <p className="text-sm text-gray-400 leading-relaxed">{step.desc}</p>
                </div>
            ))}
        </div>
      </section>

      {/* PAGE 7 & 8: PROJECTS */}
      <section id="gallery" className="min-h-screen bg-white p-4 md:p-12">
        <div className="max-w-7xl mx-auto py-12">
            <div className="mb-16">
                <h2 className="text-4xl font-serif mb-4">Project Highlights</h2>
                <p className="text-gray-500 max-w-xl">{data.sections.find(s => s.id === 'projects').intro}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
                {/* Large Hero Project */}
                <div className="md:col-span-2 md:row-span-2 bg-red-50 relative overflow-hidden group cursor-pointer">
                     <div className="absolute inset-0 bg-red-900/10 group-hover:bg-red-900/0 transition-colors duration-500"></div>
                     <div className="absolute inset-0 flex items-center justify-center text-brand-red opacity-10 font-serif text-9xl font-bold">R</div>
                     <div className="absolute bottom-0 left-0 p-8 bg-gradient-to-t from-black/50 to-transparent w-full">
                        <span className="text-white font-bold text-3xl">RAYNA</span>
                        <p className="text-white/80 text-sm mt-2">Brand Identity & Strategy</p>
                     </div>
                </div>
                
                {/* Secondary Grids */}
                <div className="bg-gray-100 flex items-center justify-center text-xs font-mono text-gray-400">[Project Image]</div>
                <div className="bg-gray-900 text-white p-8 flex flex-col justify-end">
                    <span className="text-2xl font-serif italic">"{data.sections.find(s => s.id === 'projects').description}"</span>
                </div>
            </div>
        </div>
      </section>


      {/* PAGE 10: CONTACT */}
      <section id="contact" className="min-h-[60vh] bg-black text-white p-8 md:p-24 flex flex-col justify-between items-center relative">
        <div className="w-full flex-grow flex flex-col justify-center items-center">
            <h2 className="text-5xl md:text-8xl font-serif mb-10 text-center hover:text-brand-red transition-colors cursor-default">Let's Connect</h2>
            <p className="text-xl text-gray-500 mb-12">{data.sections.find(s => s.id === 'contact').content}</p>
            
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 text-center md:text-left text-lg">
                {data.sections.find(s => s.id === 'contact').details.map((detail, i) => (
                    <a key={i} href="#" className="border-b border-transparent hover:border-brand-red pb-1 transition-all">{detail}</a>
                ))}
            </div>
        </div>

        <div className="w-full flex justify-between border-t border-gray-800 pt-8 text-xs tracking-widest uppercase text-gray-600">
             <span>{data.header.name}</span>
             <span>{data.header.role}</span>
             <span>{data.header.year}</span>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
