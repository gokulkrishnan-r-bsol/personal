import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Star, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Countdown: React.FC = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number} | null>(null);
  const [canEnter, setCanEnter] = useState(false);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      // Target: January 17, 2026 at 00:00:00
      const targetDate = new Date('2026-01-17T00:00:00');

      const difference = targetDate.getTime() - now.getTime();

      if (difference <= 0) {
        setCanEnter(true);
        setTimeLeft(null);
      } else {
        setCanEnter(false);
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const m = Math.floor((difference / 1000 / 60) % 60);
        const s = Math.floor((difference / 1000) % 60);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white/40 backdrop-blur-md p-10 rounded-[2rem] shadow-xl border border-white/50 max-w-2xl w-full relative overflow-hidden"
      >
        {/* Decorative background blur */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 translate-y-1/2 -translate-x-1/2"></div>

        {!canEnter && timeLeft ? (
          <>
            <Clock size={48} className="text-purple-500 mx-auto mb-6 animate-pulse" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">The Big Day is Coming!</h1>
            <p className="text-pink-600 font-medium mb-8">Counting down to Jan 17, 2026...</p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {[
                { label: 'Days', value: timeLeft.days },
                { label: 'Hours', value: timeLeft.hours },
                { label: 'Mins', value: timeLeft.minutes },
                { label: 'Secs', value: timeLeft.seconds }
              ].map((item, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="bg-white w-20 h-20 md:w-24 md:h-24 rounded-2xl shadow-lg flex items-center justify-center border-2 border-pink-100 relative">
                    <span className="text-2xl md:text-4xl font-bold text-purple-600 font-mono">
                      {String(item.value).padStart(2, '0')}
                    </span>
                    {i === 3 && (
                        <motion.div 
                            animate={{ opacity: [0, 1, 0] }}
                            transition={{ duration: 1, repeat: Infinity }}
                            className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"
                        />
                    )}
                  </div>
                  <span className="text-xs font-bold text-gray-500 mt-2 uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>

            <p className="text-gray-500 text-sm italic">
              "Patience, Papa. Age 24 is just around the corner..." ⏳
            </p>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center"
          >
             <Star size={64} className="text-yellow-400 mb-4 animate-spin-slow" fill="currentColor" />
             <h2 className="text-3xl font-bold text-purple-600 mb-4">It's Time! 🎉</h2>
             <p className="text-gray-600 mb-8">Happy 24th Birthday! The wait is finally over.</p>
             
             <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.reload()} 
                className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-4 px-8 rounded-full shadow-lg flex items-center gap-2 hover:shadow-xl transition-all"
             >
                Start The Celebration <ArrowRight />
             </motion.button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default Countdown;