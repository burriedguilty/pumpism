"use client"

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import MatrixRain from './MatrixRain';

const PUMPISM_ASCII = `
██████╗ ██╗   ██╗███╗   ███╗██████╗ ██╗███████╗███╗   ███╗
██╔══██╗██║   ██║████╗ ████║██╔══██╗██║██╔════╝████╗ ████║
██████╔╝██║   ██║██╔████╔██║██████╔╝██║███████╗██╔████╔██║
██╔═══╝ ██║   ██║██║╚██╔╝██║██╔═══╝ ██║╚════██║██║╚██╔╝██║
██║     ╚██████╔╝██║ ╚═╝ ██║██║     ██║███████║██║ ╚═╝ ██║
╚═╝      ╚═════╝ ╚═╝     ╚═╝╚═╝     ╚═╝╚══════╝╚═╝     ╚═╝
`;

const COUNTDOWN_ASCII = {
  1: `
   ░▒▓█▓▒░ 
░▒▓████▓▒░ 
   ░▒▓█▓▒░ 
   ░▒▓█▓▒░ 
   ░▒▓█▓▒░ 
   ░▒▓█▓▒░ 
   ░▒▓█▓▒░ 
           
           `,
  2: `
░▒▓███████▓▒░  
       ░▒▓█▓▒░ 
       ░▒▓█▓▒░ 
 ░▒▓██████▓▒░  
░▒▓█▓▒░        
░▒▓█▓▒░        
░▒▓████████▓▒░ 
               
               `,
  3: `
░▒▓███████▓▒░  
       ░▒▓█▓▒░ 
       ░▒▓█▓▒░ 
░▒▓███████▓▒░  
       ░▒▓█▓▒░ 
       ░▒▓█▓▒░ 
░▒▓███████▓▒░  
               
               `,
  4: `
░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓████████▓▒░ 
       ░▒▓█▓▒░ 
       ░▒▓█▓▒░ 
       ░▒▓█▓▒░ 
               
               
               `,
  5: `
░▒▓████████▓▒░ 
░▒▓█▓▒░        
░▒▓█▓▒░        
 ░▒▓██████▓▒░  
       ░▒▓█▓▒░ 
       ░▒▓█▓▒░ 
░▒▓██████▓▒░   
               
               `,
  6: `
 ░▒▓███████▓▒░ 
░▒▓█▓▒░        
░▒▓█▓▒░        
░▒▓███████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ 
 ░▒▓██████▓▒░  
               
               
               `,
  7: `
░▒▓████████▓▒░ 
       ░▒▓█▓▒░ 
       ░▒▓█▓▒░ 
       ░▒▓█▓▒░ 
       ░▒▓█▓▒░ 
       ░▒▓█▓▒░ 
       ░▒▓█▓▒░ 
               
               `,
  8: `
 ░▒▓██████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ 
 ░▒▓██████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ 
 ░▒▓██████▓▒░  
               
               `,
  9: `
 ░▒▓██████▓▒░  
░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ 
 ░▒▓███████▓▒░ 
       ░▒▓█▓▒░ 
       ░▒▓█▓▒░ 
 ░▒▓██████▓▒░  
               
               
               `,
  0: `
░▒▓████████▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓█▓▒░░▒▓█▓▒░ 
░▒▓████████▓▒░ 
               
               
               `
};

interface CommandPromptProps {
  onAuthenticate: () => void;
  onError: (error: boolean) => void;
  typingSpeed?: number;
  passcodeSpacing?: number;
}

export const CommandPrompt: React.FC<CommandPromptProps> = ({ 
  onAuthenticate, 
  onError, 
  typingSpeed = 15,
  passcodeSpacing = 20
}) => {
  const [displayedText, setDisplayedText] = useState('');
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [typedText, setTypedText] = useState('');
  const promptRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    let currentText = '';
    const textArray = PUMPISM_ASCII.split('');
    const interval = setInterval(() => {
      if (currentText.length < textArray.length) {
        currentText += textArray[currentText.length];
        setDisplayedText(currentText);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setShowPrompt(true);
        }, 500);
      }
    }, typingSpeed);

    return () => clearInterval(interval);
  }, [typingSpeed]);

  const handleKeywordRedirect = (text: string) => {
    const keywords = {
      'pumpism': '/landing',
      'ansem': '/ansem',
      'sendoor': '/sendoor',
      'cto this': '/ctothis',
      'ctothis': '/ctothis',
      'dex paid': '/dexpayed',
      'bonding': '/bonding',
      'trenches': '/trenches',
      'gambool': '/gambool',
      'gamble': '/gambool'
    };
    return keywords[text.toLowerCase()] || null;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const destination = handleKeywordRedirect(passcode);
    if (destination) {
      if (passcode.toLowerCase() === 'sihubgay') {
        onAuthenticate();
      }
      navigate(destination);
    } else {
      setError(true);
      onError(true);
      setCountdown(10);
      startCountdown();
    }
  };

  const startCountdown = () => {
    let count = 10;
    const interval = setInterval(() => {
      count--;
      setCountdown(count);
      if (count === 0) {
        clearInterval(interval);
        setError(false);
        setCountdown(null);
        onError(false);
        setPasscode('');
        setTypedText('');
      }
    }, 1000);
  };

  useEffect(() => {
    if (error && countdown === 10) {
      let index = 0;
      const text = "IINCORRECT";
      const typingInterval = setInterval(() => {
        if (index < text.length) {
          setTypedText(prev => prev + text[index]);
          index++;
        } else {
          clearInterval(typingInterval);
        }
      }, 100);
      return () => clearInterval(typingInterval);
    }
  }, [error, countdown]);

  const handlePromptClick = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const seizureVariants = {
    animate: {
      filter: [
        'brightness(2) contrast(2)',
        'brightness(0.5) contrast(0.5)',
        'brightness(1.5) contrast(1.5)',
        'brightness(0.7) contrast(0.7)',
      ],
      transition: {
        duration: 0.2,
        repeat: Infinity,
        repeatType: 'reverse' as const,
      },
    },
  };

  return (
    <>
      <MatrixRain className="opacity-20" />
      <div className="fixed inset-0 flex items-center justify-center z-10 p-4">
        <motion.div 
          ref={promptRef}
          className="w-full max-w-[500px] bg-black bg-opacity-80 rounded-lg border shadow-lg overflow-hidden"
          animate={error ? 'animate' : 'initial'}
          variants={seizureVariants}
        >
          <div className={`px-4 py-2 flex items-center justify-center border-b sticky top-0 ${error ? 'bg-gradient-to-r from-[#ff0000] via-[#ff0000] to-transparent border-[#ff0000]' : 'bg-gradient-to-r from-[#00FF00] via-[#00FF00] to-transparent border-[#00FF00]'}`}>
            <span className={`font-bold font-mono text-sm ${error ? 'text-[#ff0000]' : 'text-black'}`}>WELCOME TO THE</span>
          </div>

          <div className="p-4 font-mono space-y-4 bg-black bg-opacity-80 min-h-[200px] flex flex-col items-center justify-center" onClick={handlePromptClick}>
            {!error && (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <motion.pre
                  className="text-[#00FF00] whitespace-pre text-center text-[0.5rem] leading-[0.7rem]"
                  animate={{
                    scale: [1, 1.02, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                  }}
                >
                  {displayedText}
                </motion.pre>
                {showPrompt && (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit}
                    className={`mt-${passcodeSpacing} relative w-full flex justify-center`}
                    style={{ marginTop: `${passcodeSpacing}px` }}
                  >
                    <div className="flex items-center">
                      <span className="text-[#00FF00] text-[0.525rem]">&gt;</span>
                      <div className="relative">
                        <input
                          ref={inputRef}
                          type="text"
                          value={passcode}
                          onChange={(e) => setPasscode(e.target.value)}
                          className="bg-transparent focus:outline-none text-[#00FF00] font-mono text-[0.525rem] pl-1"
                          style={{ caretColor: '#00FF00' }}
                          placeholder="ENTER PASSCODE"
                          autoFocus
                        />
                      </div>
                    </div>
                  </motion.form>
                )}
              </div>
            )}

            {error && countdown !== null && (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <motion.pre
                  key={countdown}
                  className="text-2xl whitespace-pre seizure-effect text-center text-[#ff0000]"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.5, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {COUNTDOWN_ASCII[countdown as keyof typeof COUNTDOWN_ASCII]}
                </motion.pre>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-xl mt-4 text-[#ff0000] font-['Roboto_Mono',_monospace]"
                >
                  {typedText}
                </motion.div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default CommandPrompt;