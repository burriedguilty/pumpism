import React, { useEffect, useRef } from 'react';

interface RandomWordEffectProps {
  className?: string;
}

const WORDS = [
  'pumpism',
  'ansem',
  'sendoor',
  'cto this',
  'ctothis',
  'dex paid',
  'bonding',
  'trenches',
  'gambool',
  'gamble'
];

export const RandomWordEffect: React.FC<RandomWordEffectProps> = ({
  className = ''
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const words: {
      text: string;
      x: number;
      y: number;
      opacity: number;
      speed: number;
    }[] = [];

    const addWord = () => {
      const text = WORDS[Math.floor(Math.random() * WORDS.length)];
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const opacity = 0;
      const speed = Math.random() * 0.02 + 0.005;

      words.push({ text, x, y, opacity, speed });
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      words.forEach((word, index) => {
        ctx.font = '16px Arial';
        ctx.fillStyle = `rgba(0, 255, 0, ${word.opacity})`;
        ctx.fillText(word.text, word.x, word.y);

        word.opacity += word.speed;

        if (word.opacity >= 1) {
          word.speed = -word.speed;
        }

        if (word.opacity <= 0) {
          words.splice(index, 1);
        }
      });

      if (Math.random() < 0.05 && words.length < 10) {
        addWord();
      }

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
    />
  );
};

export default RandomWordEffect;