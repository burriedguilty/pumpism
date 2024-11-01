import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface PillsRainProps {
  className?: string;
}

const PILL_ASCII = `
  ___
 /   \\
|     |
 \\___/
`;

export const PillsRain: React.FC<PillsRainProps> = ({ className = '' }) => {
  const [pills, setPills] = useState<{ id: number; x: number; delay: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setPills(prev => {
        const newPills = [...prev];
        if (newPills.length < 30) {
          newPills.push({
            id: Date.now(),
            x: Math.random() * 100,
            delay: Math.random() * 2
          });
        }
        return newPills.slice(-30);
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`fixed inset-0 pointer-events-none ${className}`}>
      {pills.map(pill => (
        <motion.pre
          key={pill.id}
          className="absolute text-[#00FF00] whitespace-pre"
          initial={{ y: -100, x: `${pill.x}vw`, opacity: 0 }}
          animate={{ 
            y: '100vh', 
            opacity: [0, 1, 0],
            rotate: [0, 360]
          }}
          transition={{ 
            duration: 10,
            delay: pill.delay,
            ease: "linear"
          }}
        >
          {PILL_ASCII}
        </motion.pre>
      ))}
    </div>
  );
};

export default PillsRain;