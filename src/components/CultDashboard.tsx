import React from 'react';
import { motion } from 'framer-motion';
import Matrix from './MatrixSVG';

const menuItems = [
  {
    title: 'Next Gathering',
    content: 'Zion Temple, 23:59',
  },
  {
    title: 'Mission Status',
    content: 'In Progress',
  },
  {
    title: 'Members Online',
    content: '1,337',
  },
  {
    title: 'Sacred Texts',
    content: '42 Documents',
  },
];

export const CultDashboard = () => {
  return (
    <motion.div 
      className="space-y-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center space-y-4">
        <Matrix.Text 
          text="Welcome to The System"
          fontSize="1.875rem"
          className="mb-4"
        />
        <Matrix.Text 
          text='"The Matrix is everywhere. It is all around us."'
          fontSize="0.875rem"
          glowEffect={false}
          className="opacity-80"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menuItems.map((item, index) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Matrix.Card>
              <Matrix.Text 
                text={item.title}
                fontSize="1.125rem"
                className="mb-2"
              />
              <Matrix.Text 
                text={item.content}
                fontSize="0.875rem"
                glowEffect={false}
                className="opacity-80"
              />
            </Matrix.Card>
          </motion.div>
        ))}
      </div>

      <Matrix.Text 
        text='"Free your mind."'
        fontSize="0.875rem"
        glowEffect={false}
        className="text-center opacity-60 mt-8"
      />
    </motion.div>
  );
};

export default CultDashboard;