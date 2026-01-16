import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Stars, RotateCcw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Letter: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto px-6 pb-20">
      
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.div
            key="closed"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
            className="flex flex-col items-center text-center"
          >
            <h2 className="text-3xl font-bold text-purple-800 mb-8">One Last Thing, Papa...</h2>
            
            <motion.button
              onClick={() => setIsOpen(true)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-pink-400 rounded-full blur-xl opacity-50 group-hover:opacity-80 transition-opacity animate-pulse"></div>
              <div className="relative bg-gradient-to-br from-pink-500 to-rose-500 text-white w-40 h-40 rounded-full flex items-center justify-center shadow-2xl border-4 border-pink-200">
                <Heart size={64} fill="currentColor" className="text-white animate-pulse" />
              </div>
              <p className="mt-6 text-pink-600 font-bold text-lg animate-bounce">Tap to open my heart</p>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="open"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="bg-white/90 backdrop-blur-xl p-8 md:p-12 rounded-3xl shadow-2xl border border-pink-100 relative overflow-hidden"
          >
            {/* Decorative background elements inside card */}
            <div className="absolute top-0 right-0 p-4 opacity-20">
              <Stars className="text-yellow-400 w-24 h-24" />
            </div>

            <div className="relative z-10 text-center space-y-6">
              <h1 className="text-2xl md:text-3xl font-bold text-pink-600 mb-4">
                To My Dearest Arthi Papa
              </h1>
              
              <div className="text-gray-700 leading-relaxed space-y-4 font-medium text-lg">
                <p>
                  My sweet Papa, I just wanted to take a moment to tell you how incredibly lucky I feel to have you in my life.
                </p>
                {/* <p>
                  You make the world brighter just by being in it. Every laugh we share, every 'Papa' we whisper, every silly argument—it all means the world to me.
                </p> */}
                <p>
                  I love you because my heart chooses you—every moment, every season, every version of us. You’re my favorite part of every day.
                </p>
                <p>
                  You give my life color, hope, and possibility. With you, even dreams feel real and the world feels kinder.
                </p>
                <p>
                  My love for you doesn’t expire. It is steady, patient, and unconditional—a love that chooses, grows, and stays.
                </p>
                <p className="font-serif italic text-purple-700 text-xl py-4">
                  "Thank you for being born, Arthi.<br/>
                  Thank you for being my Papa.<br/>
                  Thank you for letting me love you."
                </p>
              </div>

              <div className="pt-6 border-t border-pink-100 mt-6 flex flex-col items-center">
                <p className="text-sm text-gray-500 uppercase tracking-widest mb-2">Forever Yours,</p>
                <p className="font-handwriting text-3xl text-pink-500 font-bold rotate-[-5deg] mb-8">
                  Your Papa ❤️
                </p>
                
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => navigate('/')}
                    className="bg-white hover:bg-pink-50 text-pink-500 font-bold py-2 px-6 rounded-full border-2 border-pink-200 shadow-sm transition-all text-sm flex items-center gap-2"
                >
                    <RotateCcw size={16} />
                    Relive Our Story
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Letter;