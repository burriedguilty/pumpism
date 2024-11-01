import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Matrix from './MatrixSVG';
import confetti from 'canvas-confetti';

interface PasscodeFormProps {
  onAuthenticate: () => void;
}

export const PasscodeForm: React.FC<PasscodeFormProps> = ({ onAuthenticate }) => {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const correctPasscode = 'NEBUCHADNEZZAR';

  const createCustomConfetti = () => {
    const image = new Image();
    image.src = '/ascii-art.png'; // Make sure to place the image in your public folder
    image.onload = () => {
      const myConfetti = confetti.create(undefined, {
        resize: true,
        useWorker: true
      });
      
      myConfetti({
        shapes: ['image'],
        shapeImages: [image],
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        tint: [0, 255, 0], // Green tint
      });
    };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.toUpperCase() === correctPasscode) {
      createCustomConfetti();
      onAuthenticate();
      setError('');
    } else {
      setError('Invalid passcode. Try again.');
      setPasscode('');
    }
  };

  return (
    <motion.form 
      onSubmit={handleSubmit} 
      className="space-y-12 w-full max-w-xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="relative h-32">
        <Matrix.Input
          type="password"
          value={passcode}
          onChange={setPasscode}
          placeholder="Enter Access Code"
          className="h-full cmd-prompt"
        />

        {error && (
          <motion.p 
            className="text-red-500 text-sm mt-2 font-mono"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            {error}
          </motion.p>
        )}
      </div>

      <Matrix.Button
        text="ACCESS"
        type="submit"
        glowEffect={true}
      />
    </motion.form>
  );
};

export default PasscodeForm;