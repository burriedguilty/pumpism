import React from 'react';
import { motion } from 'framer-motion';

interface MatrixTextProps {
  text: string;
  fontSize?: string;
  className?: string;
  glowEffect?: boolean;
}

export const MatrixText: React.FC<MatrixTextProps> = ({
  text,
  fontSize = '1rem',
  className = '',
  glowEffect = true
}) => (
  <motion.div 
    className={`font-mono ${className}`}
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <span 
      className={`text-green-500 ${glowEffect ? 'animate-glow' : ''}`}
      style={{ fontSize }}
    >
      {text}
    </span>
  </motion.div>
);

interface MatrixButtonProps {
  text: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  className?: string;
  glowEffect?: boolean;
}

export const MatrixButton: React.FC<MatrixButtonProps> = ({
  text,
  onClick,
  type = 'button',
  className = '',
  glowEffect = true
}) => (
  <motion.button
    type={type}
    onClick={onClick}
    className={`w-full bg-green-500/20 border border-green-500/50 text-green-500 
      py-3 px-6 rounded font-mono transition-all duration-300
      hover:bg-green-500/30 hover:border-green-500 ${className}
      ${glowEffect ? 'hover:shadow-[0_0_15px_rgba(34,197,94,0.5)]' : ''}`}
    whileTap={{ scale: 0.98 }}
  >
    {text}
  </motion.button>
);

interface MatrixCardProps {
  children: React.ReactNode;
  className?: string;
}

export const MatrixCard: React.FC<MatrixCardProps> = ({
  children,
  className = ''
}) => (
  <div 
    className={`bg-black/80 border border-green-500/30 rounded-lg backdrop-blur-sm
      ${className}`}
  >
    {children}
  </div>
);

interface MatrixInputProps {
  className?: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

export const MatrixInput: React.FC<MatrixInputProps> = ({
  className = '',
  placeholder = '',
  value,
  onChange,
  type = 'text'
}) => (
  <div className={`relative ${className}`}>
    <svg 
      className="w-full h-full" 
      viewBox="0 0 800 120" 
      preserveAspectRatio="none"
    >
      {/* Outer border */}
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill="#D9D9D9"
        rx="4"
      />
      
      {/* Inner dark background */}
      <rect
        x="5"
        y="5"
        width="calc(100% - 10)"
        height="calc(100% - 10)"
        fill="#54504A"
        rx="2"
      />
      
      {/* Top bar */}
      <rect
        x="0"
        y="0"
        width="100%"
        height="15"
        fill="#6FAA79"
      />
      
      {/* Control buttons */}
      <circle cx="20" cy="7.5" r="3" fill="#D9D9D9" opacity="0.8" />
      <circle cx="35" cy="7.5" r="3" fill="#D9D9D9" opacity="0.8" />
      
      {/* Text content */}
      <text
        x="15"
        y="50%"
        dominantBaseline="middle"
        fill="#22c55e"
        className="font-mono text-sm"
        style={{ filter: 'url(#glow)' }}
      >
        &gt; {value || placeholder}
      </text>
      
      {/* Cursor */}
      <rect
        x={`${15 + (value || placeholder).length * 8 + 20}`}
        y="45%"
        width="8"
        height="2"
        fill="#22c55e"
      >
        <animate
          attributeName="opacity"
          values="0;1;0"
          dur="1s"
          repeatCount="indefinite"
        />
      </rect>
      
      {/* Glow filter */}
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
    </svg>
    
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="absolute inset-0 w-full h-full px-6 py-4 bg-transparent text-green-500 focus:outline-none font-mono mt-4"
      placeholder={placeholder}
      style={{ caretColor: 'transparent' }}
    />
  </div>
);

export default {
  Text: MatrixText,
  Input: MatrixInput,
  Button: MatrixButton,
  Card: MatrixCard,
};