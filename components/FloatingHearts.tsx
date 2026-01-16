import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FloatingHearts: React.FC = () => {
  // Use state to ensure random values are stable after mount
  const [elements, setElements] = useState<{ id: number; left: number; duration: number; delay: number; scale: number; type: 'heart' | 'star' }[]>([]);

  useEffect(() => {
    const newElements = Array.from({ length: 25 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      duration: Math.random() * 10 + 10,
      delay: Math.random() * 5,
      scale: Math.random() * 0.5 + 0.5,
      type: Math.random() > 0.7 ? 'star' : 'heart' as 'heart' | 'star',
    }));
    setElements(newElements);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {elements.map((el) => (
        <motion.div
          key={el.id}
          initial={{ y: '110vh', opacity: 0 }}
          animate={{ 
            y: '-10vh', 
            opacity: [0, 0.8, 0],
            rotate: [0, 10, -10, 0]
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "linear"
          }}
          style={{
            position: 'absolute',
            left: `${el.left}%`,
            fontSize: `${el.scale * 2}rem`,
          }}
          className="text-pink-300/40 filter blur-[1px]"
        >
          {el.type === 'heart' ? '❤' : '✨'}
        </motion.div>
      ))}
      {/* Soft overlay for gradient consistency */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 via-purple-100/40 to-blue-100/40 z-0 mix-blend-overlay" />
    </div>
  );
};

export default FloatingHearts;