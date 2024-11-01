import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import CommandPrompt from './components/CommandPrompt';
import MatrixRain from './components/MatrixRain';
import LandingPage from './components/LandingPage';
import Ansem from './components/Ansem';
import Sendoor from './components/Sendoor';
import Ctothis from './components/Ctothis';
import Dexpayed from './components/Dexpayed';
import BondingWrapper from './components/BondingWrapper';
import Trenches from './components/Trenches';
import Gambool from './components/Gambool';

export function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isError, setIsError] = useState(false);

  const handleAuthenticate = () => {
    setIsAuthenticated(true);
    console.log('User authenticated');
  };

  const handleError = (error: boolean) => {
    setIsError(error);
    console.log('Authentication error:', error);
  };

  return (
    <Router>
      <div className="min-h-screen bg-black overflow-hidden relative">
        <MatrixRain isError={isError} />
        
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/" element={
              <CommandPrompt 
                onAuthenticate={handleAuthenticate} 
                onError={handleError}
              />
            } />
            <Route path="/landing" element={<LandingPage />} />
            <Route path="/ansem" element={<Ansem />} />
            <Route path="/sendoor" element={<Sendoor />} />
            <Route path="/ctothis" element={<Ctothis />} />
            <Route path="/dexpayed" element={<Dexpayed />} />
            <Route path="/bonding" element={<BondingWrapper />} />
            <Route path="/trenches" element={<Trenches />} />
            <Route path="/gambool" element={<Gambool />} />
          </Routes>
        </AnimatePresence>
      </div>
    </Router>
  );
}

export default App;