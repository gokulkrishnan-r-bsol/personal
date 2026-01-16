import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronRight, ChevronLeft } from 'lucide-react';

const totalPages = 6;

const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLocked, setIsLocked] = useState(false);

  // Check if we are in locked countdown mode
  useEffect(() => {
    const now = new Date();
    const targetDate = new Date('2026-01-17T00:00:00');

    // If it's the home page AND not yet the target date, we hide navigation
    if (location.pathname === '/' || location.pathname === '/page/1') {
        if (now < targetDate) {
            setIsLocked(true);
        } else {
            setIsLocked(false);
        }
    } else {
        setIsLocked(false);
    }
  }, [location.pathname]);

  // If locked (Countdown mode), do not render navigation
  if (isLocked) return null;

  // Extract page number from path, default to 1
  const currentPage = location.pathname === '/' ? 1 : parseInt(location.pathname.replace('/page/', '')) || 1;

  const handleNext = () => {
    if (currentPage < totalPages) {
      navigate(`/page/${currentPage + 1}`);
    }
  };

  const handlePrev = () => {
    if (currentPage > 1) {
      navigate(currentPage === 2 ? '/' : `/page/${currentPage - 1}`);
    }
  };

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center items-center gap-8 pointer-events-none">
      <div className="pointer-events-auto flex items-center gap-8">
        {currentPage > 1 && (
            <button
            onClick={handlePrev}
            className="bg-white/80 backdrop-blur-md hover:bg-white text-pink-500 p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 group"
            aria-label="Previous Page"
            >
            <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
            </button>
        )}

        <div className="bg-white/60 backdrop-blur-sm px-4 py-1 rounded-full text-pink-800 font-bold text-sm shadow-sm">
            Chapter {currentPage} of {totalPages}
        </div>

        {currentPage < totalPages && (
            <button
            onClick={handleNext}
            className="bg-white/80 backdrop-blur-md hover:bg-white text-pink-500 p-3 rounded-full shadow-lg transition-all hover:scale-110 active:scale-95 group"
            aria-label="Next Page"
            >
            <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
        )}
      </div>
    </div>
  );
};

export default Navigation;