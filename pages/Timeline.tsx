import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, Phone, Heart, Users, Star, Instagram } from 'lucide-react';

const events = [
  { 
    icon: Instagram, 
    title: "Met on Instagram (Jan 17, 2024)", 
    desc: "How sweet that you found me on your birthday… feels like a lucky sign.", 
    secret: "I scrolled through your profile knowing you were the one." 
  },
  { 
    icon: Phone, 
    title: "First Call (Jun 18, 2025)", 
    desc: "Hearing Papa's voice for the very first time.", 
    secret: "Your voice became my favorite sound instantly." 
  },
  { 
    icon: Heart, 
    title: "We became 'Papa' (Nov 2, 2025)", 
    desc: "Two bodies, one nickname, infinite love.", 
    secret: "The day our souls truly merged." 
  },
  { 
    icon: Users, 
    title: "First Date (Jan 22, 2026)", 
    desc: "Counting down the seconds to hold you.", 
    secret: "I've already planned the perfect hug." 
  },
];

const Timeline: React.FC = () => {
  const [selectedId, setSelectedId] = useState<number | null>(null);

  return (
    <div className="flex flex-col items-center justify-start min-h-[80vh] px-4 py-8 max-w-2xl mx-auto">
      <motion.h2 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="text-3xl font-bold text-purple-600 mb-8"
      >
        Our Journey, Papa 🛤️
      </motion.h2>

      <div className="relative w-full">
        {/* Vertical Line */}
        <div className="absolute left-8 md:left-1/2 top-4 bottom-4 w-1 bg-pink-200 rounded-full md:-ml-0.5" />

        <div className="space-y-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              initial={{ x: index % 2 === 0 ? -50 : 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: index * 0.2, type: "spring" }}
              className={`flex items-center gap-4 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
            >
              <div 
                className="relative z-10 shrink-0 cursor-pointer"
                onClick={() => setSelectedId(selectedId === index ? null : index)}
              >
                <motion.div 
                  whileHover={{ scale: 1.2, rotate: 180 }}
                  className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md border-4 border-pink-100 text-pink-500"
                >
                  <event.icon size={24} />
                </motion.div>
                {selectedId === index && (
                    <motion.div 
                        initial={{ scale: 0 }} 
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 bg-yellow-300 rounded-full p-1"
                    >
                        <Star size={12} className="text-yellow-600" />
                    </motion.div>
                )}
              </div>
              
              <div 
                onClick={() => setSelectedId(selectedId === index ? null : index)}
                className={`flex-1 bg-white/60 backdrop-blur-sm p-4 rounded-2xl shadow-sm border border-white/50 cursor-pointer hover:bg-white/80 transition-colors ${index % 2 !== 0 ? 'md:text-right' : ''}`}
              >
                <h3 className="text-xl font-bold text-purple-800">{event.title}</h3>
                <p className="text-gray-600 text-sm mt-1">{event.desc}</p>
                
                <AnimatePresence>
                  {selectedId === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-2 text-pink-500 font-medium text-xs border-t border-pink-200 pt-2">
                        🤫 Secret: {event.secret}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.5 }}
        className="mt-12 bg-pink-100/80 p-6 rounded-xl border border-pink-200 shadow-inner text-center max-w-md"
      >
        <p className="text-pink-800 font-medium italic font-serif text-lg">
          “Every version of Arthi is my favorite, but the Papa beside me is priceless.”
        </p>
      </motion.div>
    </div>
  );
};

export default Timeline;