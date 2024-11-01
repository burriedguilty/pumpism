import React, { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import MatrixRain from './MatrixRain';

const symbols = ['🍒', '🍋', '🍊', '🍇', '💎', '7️⃣', '🍀', '🎰', '🌟', '🃏', '🎲', '💰'];
const betOptions = [10, 20, 50, 100];

const cultPhrases = [
  "The shadows grow darker around you...",
  "Your soul feels heavier with each spin...",
  "The machine whispers your doom...",
  "Your luck is a fragile thread, ready to snap...",
  "The cursed reels hunger for your essence...",
  "Each bet feeds the ancient, malevolent forces...",
  "Your fate is sealed in this unholy game...",
  "The price of your greed is eternal torment...",
  "The machine's glow is the light of your damnation...",
  "Your misfortune is a delicacy for the dark ones...",
  "With each loss, the curse tightens its grip...",
  "The void of despair grows wider with every spin...",
  "Your destiny is intertwined with this infernal device...",
  "The weight of your sins pulls you deeper into darkness...",
  "The machine's hunger for your spirit is insatiable...",
  "Your soul teeters on the edge of the abyss...",
  "The reels spin a web of eternal misery...",
  "Your fate is written in the symbols of despair...",
  "The machine's cold embrace promises only sorrow...",
  "With each bet, you sacrifice a piece of your humanity..."
];

const SlotMachine: React.FC = () => {
  const [reels, setReels] = useState<string[]>(Array(9).fill(''));
  const [spinning, setSpinning] = useState(false);
  const [message, setMessage] = useState('');
  const [balance, setBalance] = useState(Math.floor(Math.random() * (777 - 300 + 1)) + 300);
  const [loanCount, setLoanCount] = useState(0);
  const [currentBet, setCurrentBet] = useState(betOptions[0]);

  const spin = useCallback(() => {
    if (balance < currentBet) {
      setMessage("Not enough balance to spin!");
      return;
    }

    setSpinning(true);
    setMessage('');
    setBalance(prevBalance => prevBalance - currentBet);
    
    const spinDuration = 500;
    const intervalDuration = 25;
    let elapsed = 0;

    const spinInterval = setInterval(() => {
      setReels(prevReels => prevReels.map(() => {
        const rand = Math.random();
        if (rand < 0.01) return '7️⃣';
        if (rand < 0.1) return '💎';
        return symbols[Math.floor(Math.random() * symbols.length)];
      }));
      elapsed += intervalDuration;

      if (elapsed >= spinDuration) {
        clearInterval(spinInterval);
        setSpinning(false);
        checkWin();
      }
    }, intervalDuration);
  }, [balance, currentBet]);

  const checkWin = useCallback(() => {
    const winningLines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    const jackpotWins = winningLines.filter(line => 
      reels[line[0]] === '7️⃣' && reels[line[1]] === '7️⃣' && reels[line[2]] === '7️⃣'
    );

    const bigWins = winningLines.filter(line => 
      reels[line[0]] === '💎' && reels[line[1]] === '💎' && reels[line[2]] === '💎'
    );

    const smallWins = winningLines.filter(line => 
      reels[line[0]] === reels[line[1]] && reels[line[1]] === reels[line[2]] && reels[line[0]] !== '7️⃣' && reels[line[0]] !== '💎'
    );

    if (jackpotWins.length > 0) {
      const winAmount = currentBet * 100 * jackpotWins.length;
      setBalance(prevBalance => prevBalance + winAmount);
      setMessage(`🎉 JACKPOT! You win $${winAmount} on ${jackpotWins.length} line${jackpotWins.length > 1 ? 's' : ''}! 🎉`);
    } else if (bigWins.length > 0) {
      const winAmount = currentBet * 10 * bigWins.length;
      setBalance(prevBalance => prevBalance + winAmount);
      setMessage(`💎 Big win! You win $${winAmount} on ${bigWins.length} line${bigWins.length > 1 ? 's' : ''}! 💎`);
    } else if (smallWins.length > 0) {
      const winAmount = currentBet * 2 * smallWins.length;
      setBalance(prevBalance => prevBalance + winAmount);
      setMessage(`🎈 Small win! You win $${winAmount} on ${smallWins.length} line${smallWins.length > 1 ? 's' : ''}! 🎈`);
    } else {
      setMessage(cultPhrases[Math.floor(Math.random() * cultPhrases.length)]);
    }
  }, [reels, currentBet]);

  const takeLoan = useCallback(() => {
    if (loanCount < 2) {
      setBalance(prevBalance => prevBalance + 500);
      setLoanCount(prevCount => {
        const newCount = prevCount + 1;
        setMessage(`Loan of $500 approved. Total loans: ${newCount}. ${cultPhrases[Math.floor(Math.random() * cultPhrases.length)]}`);
        return newCount;
      });
    } else {
      setMessage("Maximum number of loans reached! Your soul is beyond salvation...");
    }
  }, [loanCount]);

  const changeBet = useCallback((bet: number) => {
    setCurrentBet(bet);
    setMessage(cultPhrases[Math.floor(Math.random() * cultPhrases.length)]);
  }, []);

  return (
    <div className="text-center relative z-10">
      <pre className="text-green-500 text-xs whitespace-pre">
{`
 _______________________________
|        GAMBOOL MACHINE        |
|-------------------------------|
|   _____     _____     _____   |
|  |     |   |     |   |     |  |
|  |  ${reels[0]}  |   |  ${reels[1]}  |   |  ${reels[2]}  |  |
|  |_____|   |_____|   |_____|  |
|                               |
|   _____     _____     _____   |
|  |     |   |     |   |     |  |
|  |  ${reels[3]}  |   |  ${reels[4]}  |   |  ${reels[5]}  |  |
|  |_____|   |_____|   |_____|  |
|                               |
|   _____     _____     _____   |
|  |     |   |     |   |     |  |
|  |  ${reels[6]}  |   |  ${reels[7]}  |   |  ${reels[8]}  |  |
|  |_____|   |_____|   |_____|  |
|                               |
|_______________________________|
`}
      </pre>
      <p className="text-green-500 mt-2">Balance: ${balance}</p>
      <div className="mt-2">
        <p className="text-green-500">Current Bet: ${currentBet}</p>
        <div className="flex justify-center space-x-2 mt-2">
          {betOptions.map(bet => (
            <motion.button
              key={bet}
              onClick={() => changeBet(bet)}
              className={`px-2 py-1 rounded ${currentBet === bet ? 'bg-green-500 text-black' : 'bg-green-800 text-green-200'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              ${bet}
            </motion.button>
          ))}
        </div>
      </div>
      <motion.button 
        onClick={spin} 
        disabled={spinning || balance < currentBet}
        className="mt-4 px-4 py-2 bg-green-500 text-black rounded hover:bg-green-600 disabled:bg-gray-400 mr-2"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {spinning ? 'Spinning...' : `Spin ($${currentBet})`}
      </motion.button>
      <motion.button 
        onClick={takeLoan} 
        disabled={loanCount >= 2}
        className="mt-4 px-4 py-2 bg-yellow-500 text-black rounded hover:bg-yellow-600 disabled:bg-gray-400"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Loan $500
      </motion.button>
      <motion.p 
        className="mt-2 text-green-500"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {message}
      </motion.p>
      {balance < 0 && (
        <motion.p
          className="mt-4 text-red-500 text-xl font-bold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 10 }}
        >
          YOUR SOUL IS FORFEIT
        </motion.p>
      )}
    </div>
  );
};

const Gambool: React.FC = () => {
  return (
    <motion.div 
      className="fixed inset-0 flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <MatrixRain />
      <div className="bg-black bg-opacity-80 p-8 rounded-lg border border-green-500 text-green-500 relative z-10">
        <SlotMachine />
      </div>
    </motion.div>
  );
};

export default Gambool;