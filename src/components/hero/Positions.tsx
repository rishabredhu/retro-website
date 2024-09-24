import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Define an array of positions/skills
const positions = [
  "Software Developer",
  "AI/ML Engineer",
  "Data/Infrastructure Engineer",
  "Climate Tech Innovator",
];

export const Position: React.FC = () => {
  const [currentPosition, setCurrentPosition] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentPosition((prev) => (prev + 1) % positions.length);
    }, 3000); // Change position every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[30px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentPosition}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[18px] sm:text-[22px] text-secondary font-semibold"
        >
          {positions[currentPosition]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};