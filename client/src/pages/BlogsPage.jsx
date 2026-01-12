import React, { useEffect, useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const BlogsPage = ({ setCurrentPage }) => {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPageIndex] = useState(0);
  const blogsPerPage = 6;
  const totalPages = Math.ceil(blogs.length / blogsPerPage);
  const hasMultiplePages = blogs.length > 6;
  const paginatedBlogs = blogs.slice(currentPage * blogsPerPage, (currentPage + 1) * blogsPerPage);

  useEffect(() => {
    fetch(`${API_URL}/api/blogs`)
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  }, []);

  const openBlog = (blog) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeBlog = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedBlog(null), 300);
  };

  const nextBlog = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPageIndex(currentPage + 1);
    }
  };

  const prevBlog = () => {
    if (currentPage > 0) {
      setCurrentPageIndex(currentPage - 1);
    }
  };

  if (loading) {
    return <div className="h-screen w-full flex items-center justify-center bg-black text-white font-serif text-xl">Loading Blogs...</div>;
  }

  if (!blogs || blogs.length === 0) {
    return <div className="h-screen w-full flex items-center justify-center bg-black text-white font-serif text-xl">No blogs available</div>;
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Back Button - Top Left */}
      <div className="fixed top-8 left-8 z-30">
        <button onClick={() => setCurrentPage('home')} className="font-bold tracking-widest uppercase hover:text-brand-red transition-colors cursor-pointer">
          &lt; HOME
        </button>
      </div>

      {/* Header */}
      <div className="pt-24 pb-4 px-6 md:px-12">
      </div>

      {/* Grid Navigation - Left/Right Arrows */}
      {hasMultiplePages && (
        <>
          <button
            onClick={prevBlog}
            disabled={currentPage === 0}
            className="fixed left-8 top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-brand-red text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center group"
          >
            <span className="text-3xl group-hover:scale-125 transition-transform pb-1">&lt;</span>
          </button>

          <button
            onClick={nextBlog}
            disabled={currentPage === totalPages - 1}
            className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 w-16 h-16 rounded-full bg-brand-red text-white hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center group"
          >
            <span className="text-3xl group-hover:scale-125 transition-transform pb-1">&gt;</span>
          </button>
        </>
      )}

      {/* Grid of Blogs */}
      <div className="px-6 md:px-12 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {paginatedBlogs.map((blog, index) => {
            const globalIndex = currentPage * blogsPerPage + index;
            return (
            <div
              key={blog.id}
              onClick={() => openBlog(blog)}
              className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
            >
              {/* Blog Card */}
              <div className="relative overflow-hidden rounded-lg shadow-lg h-96 bg-gradient-to-br from-brand-red/20 to-brand-red/5">
                {/* Background Image */}
                {blog.image && (
                  <img
                    src={`${API_URL}${blog.image}`}
                    alt={blog.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity duration-300"
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-300"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="flex items-baseline gap-3 mb-4">
                    <span className="text-brand-red font-mono text-sm font-bold">{String(globalIndex + 1).padStart(2, '0')}</span>
                    <span className="text-gray-300 text-xs uppercase">{blog.date}</span>
                  </div>
                  <h3 className="text-2xl font-serif mb-2 group-hover:text-brand-red transition-colors duration-300">
                    {blog.title}
                  </h3>
                  {blog.subtitle && (
                    <p className="text-sm italic text-gray-300 mb-4 line-clamp-2">{blog.subtitle}</p>
                  )}
                  <div className="flex items-center gap-2 text-brand-red opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>READ MORE</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Page Indicator */}
        {hasMultiplePages && (
          <div className="flex justify-center items-center gap-4 mt-12">
            <span className="text-gray-400 text-sm">Page {currentPage + 1} of {totalPages}</span>
            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPageIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentPage ? 'bg-brand-red w-8' : 'bg-gray-700 hover:bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Modal Backdrop */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 animate-fade-in"
          onClick={closeBlog}
        ></div>
      )}

      {/* Modal - Blog Detail */}
      {selectedBlog && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none transition-all duration-300 ${
            isModalOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0'
          }`}
        >
          <div
            className={`bg-black rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto flex flex-col transform transition-all duration-300 shadow-2xl ${
              isModalOpen ? 'scale-100' : 'scale-95'
            } pointer-events-auto relative`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Blurred Background Image */}
            {selectedBlog?.image && (
              <div className="absolute inset-0 -z-10 rounded-lg overflow-hidden">
                <img
                  src={`${API_URL}${selectedBlog.image}`}
                  alt="background"
                  className="w-full h-full object-cover blur-md opacity-20"
                  onError={(e) => e.target.style.display = 'none'}
                />
                <div className="absolute inset-0 bg-black/70"></div>
              </div>
            )}
            {/* Close Button */}
            <button
              onClick={closeBlog}
              className="absolute top-6 right-6 z-50 text-white hover:text-brand-red transition-colors text-3xl"
            >
              ×
            </button>

            {/* Modal Content */}
            <div className="p-12">
              {/* Blog Number and Date */}
              <div className="flex items-baseline gap-4 mb-8">
                <span className="text-brand-red font-mono text-lg font-bold">
                  {String(blogs.findIndex(b => b.id === selectedBlog.id) + 1).padStart(2, '0')}
                </span>
                <span className="text-gray-300 text-sm">{selectedBlog.date}</span>
              </div>

              {/* Title */}
              <h1 className="text-5xl md:text-6xl font-serif mb-4 text-white">{selectedBlog.title}</h1>

              {/* Subtitle */}
              {selectedBlog.subtitle && (
                <p className="text-xl italic text-gray-300 mb-8 pb-8 border-b border-gray-800">
                  {selectedBlog.subtitle}
                </p>
              )}

              {/* Content */}
              <div className="text-gray-300 leading-relaxed font-light whitespace-pre-wrap text-lg">
                {selectedBlog.content}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-in-out;
        }

        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default BlogsPage;