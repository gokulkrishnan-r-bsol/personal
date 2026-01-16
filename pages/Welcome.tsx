import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, PartyPopper, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Welcome: React.FC = () => {
  const navigate = useNavigate();
  const [clicks, setClicks] = useState(0);

  const handleGiftClick = () => {
    setClicks(prev => prev + 1);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] text-center px-4 relative overflow-visible">
      
      {/* Hidden Surprise Layer */}
      {clicks > 0 && Array.from({ length: clicks }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 1, y: 0, x: 0, scale: 0.5 }}
          animate={{ opacity: 0, y: -400, x: (Math.random() - 0.5) * 400, scale: 1.5, rotate: Math.random() * 360 }}
          transition={{ duration: 2.5, ease: "easeOut" }}
          className="absolute text-5xl pointer-events-none z-50"
          style={{ top: '40%', left: '50%' }}
        >
          {['❤️', '🌸', '✨', '🧁', '😘', '🐣', '🦋'][i % 7]}
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -20 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="mb-8 relative cursor-pointer z-20 group"
        onClick={handleGiftClick}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
      >
        <div className="absolute top-40 -left-25 text-6xl animate-bounce delay-75 pointer-events-none">🎈</div>
        <div className="absolute top-36 -right-25 text-6xl animate-bounce delay-100 pointer-events-none">🎂</div>
        
        <div className="bg-white/40 p-8 rounded-full shadow-2xl backdrop-blur-md border-4 border-pink-200 relative group-hover:border-pink-300 transition-colors">
           <Gift size={80} className="text-pink-500 drop-shadow-md" />
           {/* Sparkle icon */}
           <motion.div 
             animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
             transition={{ repeat: Infinity, duration: 2 }}
             className="absolute top-2 right-2"
           >
              <Sparkles size={24} className="text-yellow-400" />
           </motion.div>
        </div>
        <button className="text-xs text-pink-600 font-bold mt-4 animate-pulse bg-white/60 rounded-full px-3 py-1 shadow-sm border border-white/50 inline-block">
            (Tap me for surprises!)
        </button>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="text-4xl md:text-6xl font-bold text-pink-600 mb-6 tracking-wide drop-shadow-sm leading-tight"
      >
        Happy 24th Birthday,<br />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Arthi (My Papa) 🌸
        </span>
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-white/30 backdrop-blur-sm p-6 rounded-2xl border border-white/40 shadow-sm max-w-md mx-auto mb-10"
      >
        <p className="text-lg text-gray-800 font-medium leading-relaxed">
            Welcome to age <span className="font-bold text-pink-600 text-xl">24</span>! <br/>
            Before you open your gift… <br />
            here’s something from my heart to yours.
        </p>
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/page/2')}
        className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-10 py-4 rounded-full shadow-xl font-bold text-xl flex items-center gap-3 z-10 hover:shadow-2xl transition-all border border-white/20"
      >
        <PartyPopper size={24} />
        Open Our Story
      </motion.button>
    </div>
  );
};

export default Welcome;