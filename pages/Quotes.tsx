import React from 'react';
import { motion } from 'framer-motion';
import { Quote } from 'lucide-react';

const quotes = [
  "If loving you was homework, I’d never skip a day.",
  "Your laugh sounds like home.",
  "You’re my happy place with human shape.",
  "I don’t need magic, I have you.",
  "My heart writes your name even when my head isn’t watching."
];

const Quotes: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-2xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-8"
      >
        <Quote className="text-pink-300 w-12 h-12 mx-auto mb-2" />
        <h2 className="text-center text-2xl font-bold text-pink-800">Little Notes</h2>
      </motion.div>

      <div className="space-y-6 w-full">
        {quotes.map((text, idx) => (
          <motion.div
            key={idx}
            initial={{ x: idx % 2 === 0 ? -20 : 20, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`
              p-6 rounded-2xl shadow-sm border border-white/60 backdrop-blur-sm
              ${idx % 2 === 0 ? 'bg-white/80 rotate-1' : 'bg-pink-50/80 -rotate-1'}
              transform transition-all
            `}
          >
            <p className="text-lg md:text-xl font-medium text-gray-700 text-center font-serif italic">
              "{text}"
            </p>
          </motion.div>
        ))}
      </div>
      
      <div className="h-20"></div> {/* Spacer for bottom nav */}
    </div>
  );
};

export default Quotes;