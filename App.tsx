import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import FloatingHearts from './components/FloatingHearts';
import Navigation from './components/Navigation';

// Pages
import Welcome from './pages/Welcome';
import Countdown from './pages/Countdown';
import Timeline from './pages/Timeline';
import Reasons from './pages/Reasons';
import Quiz from './pages/Quiz';
import Quotes from './pages/Quotes';
import Letter from './pages/Letter';

const PageWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className="w-full max-w-4xl mx-auto pt-8 pb-24 relative z-10"
    >
      {children}
    </motion.div>
  );
};

// Countdown vs Welcome Gatekeeper
const LandingPage: React.FC = () => {
  const [isBirthday, setIsBirthday] = useState(false);

  useEffect(() => {
    const now = new Date();
    const targetDate = new Date('2026-01-17T00:00:00');

    setIsBirthday(now >= targetDate);
  }, []);

  if (!isBirthday) {
    return <PageWrapper><Countdown /></PageWrapper>;
  }

  return <PageWrapper><Welcome /></PageWrapper>;
};

const AnimatedRoutes: React.FC = () => {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" key={location.pathname}>
      <Routes location={location}>
        <Route path="/" element={<LandingPage />} />
        <Route path="/page/1" element={<LandingPage />} />
        <Route path="/page/2" element={<PageWrapper><Timeline /></PageWrapper>} />
        <Route path="/page/3" element={<PageWrapper><Reasons /></PageWrapper>} />
        <Route path="/page/4" element={<PageWrapper><Quiz /></PageWrapper>} />
        <Route path="/page/5" element={<PageWrapper><Quotes /></PageWrapper>} />
        <Route path="/page/6" element={<PageWrapper><Letter /></PageWrapper>} />
      </Routes>
    </AnimatePresence>
  );
};

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-800 font-sans overflow-hidden relative">
      <FloatingHearts />
      <Router>
        <AnimatedRoutes />
        <Navigation />
      </Router>
    </div>
  );
};

export default App;
