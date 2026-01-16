import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Smile, Gamepad2, Sparkles, Zap, Heart } from 'lucide-react';

const reasons = [
  { 
    icon: Smile, 
    color: "bg-yellow-100 text-yellow-600",
    title: "Papa's Smile", 
    text: "It cures my worst days instantly.",
    secret: "Your smile is my sunshine."
  },
  { 
    icon: Gamepad2, 
    color: "bg-blue-100 text-blue-600",
    title: "Papa's Childishness", 
    text: "My daily dose of serotonin.",
    secret: "Never grow up, okay?"
  },
  { 
    icon: Sparkles, 
    color: "bg-purple-100 text-purple-600",
    title: "Arthi's Innocence", 
    text: "It melts my heart every single time.",
    secret: "Purest heart I know."
  },
  { 
    icon: Zap, 
    color: "bg-pink-100 text-pink-600",
    title: "Papa's Chaos", 
    text: "You are my favorite kind of trouble.",
    secret: "My chaos coordinator."
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { y: 0, opacity: 1 }
};

const Reasons: React.FC = () => {
  const [flipped, setFlipped] = useState<number[]>([]);

  const toggleFlip = (idx: number) => {
    if (flipped.includes(idx)) {
      setFlipped(flipped.filter(i => i !== idx));
    } else {
      setFlipped([...flipped, idx]);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 w-full max-w-4xl mx-auto">
      <motion.h2
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="text-3xl md:text-4xl font-bold text-pink-600 mb-10 text-center"
      >
        Why Arthi is Special ✨
      </motion.h2>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full"
      >
        {reasons.map((card, idx) => (
          <motion.div
            key={idx}
            variants={item}
            whileHover={{ scale: 1.03 }}
            onClick={() => toggleFlip(idx)}
            className="cursor-pointer perspective-1000"
            style={{ perspective: '1000px' }}
          >
             <motion.div
                initial={false}
                animate={{ rotateX: flipped.includes(idx) ? 180 : 0 }}
                transition={{ duration: 0.6, type: "spring" }}
                style={{ transformStyle: 'preserve-3d' }}
                className="relative w-full h-32 md:h-40"
             >
                {/* Front */}
                <div className="absolute inset-0 backface-hidden bg-white/70 backdrop-blur-md p-6 rounded-3xl shadow-lg border border-white flex items-center gap-4" style={{ backfaceVisibility: 'hidden' }}>
                    <div className={`p-4 rounded-2xl ${card.color} shadow-inner`}>
                        <card.icon size={32} />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{card.title}</h3>
                        <p className="text-gray-600 font-medium">{card.text}</p>
                        <p className="text-xs text-pink-300 mt-2">(Tap to flip)</p>
                    </div>
                </div>

                {/* Back */}
                <div 
                    className="absolute inset-0 backface-hidden bg-gradient-to-br from-pink-400 to-purple-500 p-6 rounded-3xl shadow-lg border border-pink-300 flex items-center justify-center text-center"
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateX(180deg)' }}
                >
                    <div>
                        <Heart className="w-8 h-8 text-white mx-auto mb-2 animate-pulse" fill="white" />
                        <p className="text-white font-bold text-lg">{card.secret}</p>
                    </div>
                </div>
             </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Reasons;