"use client"

import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, BarChart, Bar } from 'recharts';
import MatrixRain from './MatrixRain';
import SocialIcons from './SocialIcons';

const CULT_LOGO = `
               ████████      
            ██▓░░░░░░░▒▓██   
          ██▓░        ░▒▓█  
         ██░       ░░  ░░▒▓█ 
       ██▒░           ░░░░▒██
     ██▓░              ░░░▒██
   ██▓▓█▓░            ░░░░▓██
  ██▒▒▒▒▓█▓░          ░░░▒▓█ 
██▓▒▒▒▒▒▒▒▓█▓░      ░░░░▓██  
██▓▒▒▒▒▒▒▒▒▒▒▒▓█▒░   ░░░▒███   
██▓▒▒▒▒▒▒▒▒▒▒▒▒▒▒▓█▒░░░░▓██     
█▓▒▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒██▒▓██       
█▓▒▒░▒▒▒▒▒▒▒▒▒▒▒▒▒▓▓▓███        
█▓▒▒░▒▒▒▒▒▒▒▒▒▒▒▓▓▓███          
██▓▒▒░▒▒▒▒▒▒▒▒▒▓▓▓██            
██▓▓▒▒▒▒▒▒▒▒▓▓▓███             
███▓▓▓▓▓▓▓▓▓███               
  █████████                  
`;

const WELCOME_ASCII = `                                ░                                                                         ░ ░                                  
                             ░░░▒▓     ░░░░░                                                    ░  ░     ▒▒░░░░                                
                            ░░▒▒▓▓   ░▒▒▒▒▓▓                                                   ░▒▒▒▒▒░    ▓▒▒▒▒▒░                              
                          ░░▒▒███  ░▒▒▓███▓                                                     ▓█▓▓▓▓▒▒   ███▓▒▒▒                             
                         ░▒▓███▒  ░▓▓████░                                                        ██████▒░  ▓███▓▒▒                            
                        ░░░▒██  ░▒▒▓███▒     ░░░░░                                           ░      ███▓▒▒▒░ ░█▓▒▒░░░                          
                       ░░░▒▓█░░▒▒▓▓███    ░▒▓██▓█▓                                        ▓▒▒▓▓▓░    ░███▓▓▓▓▒░█▓▒▒░░▒                         
                      ▒░░▒██▒▓█▓▓███▓    ▒██████░                                         ░███████░    ▓████▓██ ██▓▒▒▒▓                        
                     █▓░▒██▒░█▓▓███▒  ░▒▒▓████░                                             ░█████▓▓▒   ░███▒▒██ █▓░░▒▓▒                       
                     █▒▒░ ▓ ▓▓▒▒▓█▒ ▒▓▒▓████░                                                  ▓████▓▓▓▓ ░█▓▒▒▓█ ░▒▒░░▒▓                       
                     ▓▒▒▒▒▒▒█▓▒▓▓█ ▒▓▓████▓    ░░░░                                              ██████▓█ ▒▓▓▒▒▒▒▒▒█▒░▒▓                       
                    ░▓▒░▒▒▒▓▓▓▓██ ▒▓▒▒███░   ░█████                                       ░░▒▒    ░███▒▒▓█ ▒███▓▒▓▓▒▓▒░▒▒                      
                    ▒▒▒░░▒▓▒▒▒▓█░░▓▓▓▓██    ▒█████                                        ██████    ▓█▓▓▒▓▓ ▒▓▒▓▓▒▒▒▒▒░░▓░                     
                   ░▒░░░▒▓█░░░░░░▒▒████  ░▒▓████▓                                          ██████▓▒  ░███▓▒▒░░░░█▓▒▒░░▓▒▒▓                     
                   ▓█▒▒▒▒██▒▒▒▒▒░░░▒██  ░▒▓████░                                            ░█████▓▓   █▓▒░░░░▒░▒██▓▓▓██░▓▓                    
                  ▒▓██████▓▒▒▒▓▒▒▒▒▒▒░ ░▒▒▓███                                                ▓███▓▓▓░ ░░░▒▒▒▒▒░░▒██████░▓█                    
                  ░▓███▓▓▓▓▒▓▓▓▒▓█▓▓▒░░░▓████                                                   █████▒░░▒▒▒▓▓▒▒▒▒▒██████░▓▓                    
                   ▒██▓▒▒▒▒░▒▒▓▓▒▓▒░░░▒▒▒▓██                                                     ███▒▒░░░░░▒▒▓▓░▒▒▒▒▒▓██▓▓▒                    
                   ▒██▓▒░░░▒░▒▒▒▓▓▒▒▒▒▓▓▓██                                                       ▒█▓▓▒▒▒░░▒▓▒░▒░░░░▒▒▓██▓▓                    
                   ███▓▒░░░▒░░▒▒░░▒▒▓█▓▓▒▓▓                                                       ░█▒▒▒▓▓▒▒░░░░░░░░▒▒▒▓████                    
                   ██▓▓▓▓▒▒▒░░░░░░░░░░░░▓█▒                                                        ▓█▒░░░░░░░░░░░░▒▓▓▓█████                    
                   ███████▓▒▒░░░▒░░░░░░░░▒░                                                        ░░░░░░░░░░░░░░░▒▓██████░                    
                   ░██████▓▒▒▒▒▒▒▒░░░░░░░▒                                                         ░░░░░░░░░░▒▒░▒▒▓▓██████                     
                    ▒███████▓▓▓▒▓▓░░░░░░▒▒                                                          ▒░░░░░░░▒▒▒▒▒▓███████░                     
                     █████████▓▓▓▓▓░░░░░▒▓                                                          ▒▒░░░░░░▒▒▒▓▓████████░                     
                     ███████████▓█▓▒░░░▒▓▒                                                          ░▒░░░░░▒▓▓▓▓█████████░                     
                     ██████████████▓▒▒▒▓▓░                                                           ▓▒▒░░░▒▓▓███████████▒                     
                    ░██████████████▓▒▒▓▓▓                                                            ░▓▓▒▒░▓▓█████████████                     
                    ▒██████████████▓▓▓██                                                              ░█▓▓▓▓█████████████▓▓                    
                   ░▓▒█████████████████                                                                ▒████████▓██▓▓███▓▒▓▒                   
                   ▓▒▒▓▓▓▓▒██▓████████░                                                                 ░█████▓▓█▓▓▓▒▓▓▓▒▒▒▓▒                  
                  ▓▓▒▒▒▒▒▒██▒▓▓▓████░                                                                     ░████▓▓█▒▓█▒▒▒▒░░▒▓▒                 
                 ▒▓▒░░░▒▒██▒▒█▒████                                                                         ██▓█▓▒▓▒▒█▓░▒░░░▒▓░                
                ▒▓▒░░░░▒▓▓▒░█▒████░                                                                          ██▒█▒▒▓▒░▒▒░░░░░▒▓▒               
               ▒▓▒▒░░░▒▒▒░░█▒██▓█▒                                                                            ██▓█▒▒▒▒░░░░░░░▒▓▓▒              
              ░▒▒▒░░░░▒▒▒░▒▒▓█▓█▓                                                                              ▓▓▓█▒▒▒░░░░░░░░▒▒▒▓             
             ░▒▒░░░░░░░▒▒▒▓▒█▓██                                                                                ██▓█▒▒░░░░░░░░░                
                  ░░░░▒▒░▒▒█▓██░                                                                                ░█▓▓▓▒▒░░░░                    
                      ░░░▒█▓██░                                                                                  ▒█▓▓▓░                        
                          ░▒█▓                                                                                    ▒                            
`;

const LOADING_FRAMES = [
  "Loading...\n[                    ]   0%",
  "Loading...\n[▓                   ]   5%",
  "Loading...\n[▓▓                  ]  10%",
  "Loading...\n[▓▓▓                 ]  15%",
  "Loading...\n[▓▓▓▓                ]  20%",
  "Loading...\n[▓▓▓▓▓               ]  25%",
  "Loading...\n[▓▓▓▓▓▓              ]  30%",
  "Loading...\n[▓▓▓▓▓▓▓             ]  35%",
  "Loading...\n[▓▓▓▓▓▓▓▓            ]  40%",
  "Loading...\n[▓▓▓▓▓▓▓▓▓           ]  45%",
  "Loading...\n[▓▓▓▓▓▓▓▓▓▓          ]  50%",
  "Loading...\n[▓▓▓▓▓▓▓▓▓▓▓         ]  55%",
  "Loading...\n[▓▓▓▓▓▓▓▓▓▓▓▓        ]  60%",
  "Loading...\n[▓▓▓▓▓▓▓▓▓▓▓▓▓       ]  65%",
  "Loading...\n[▓▓▓▓▓▓▓▓▓▓▓▓▓▓      ]  70%",
  "Loading...\n[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓     ]  75%",
  "Loading...\n[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓    ]  80%",
  "Loading...\n[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓   ]  85%",
  "Loading...\n[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓  ]  90%",
  "Loading...\n[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ ]  95%",
  "Loading...\n[▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓] 100%",
  "Complete!"
];

interface LandingPageProps {
  welcomeAsciiSize?: string;
  cultLogoSize?: string;
}

interface MenuItemData {
  title: string;
  description: string;
  value: number;
  updateRange: {
    min: number;
    max: number;
  };
  chartData?: any[];
  logo?:  string;
}

const Spacing: React.FC<{ height?: string }> = ({ height = "2rem" }) => (
  <div style={{ height }} />
);

export const LandingPage: React.FC<LandingPageProps> = ({ 
  welcomeAsciiSize = '1.3vw',
  cultLogoSize = '0.8vw'
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [showWelcome, setShowWelcome] = useState(false);
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([
    {
      title: 'The PUMP Prophecy',
      description: 'The Prophecy speaks of the Children of PUMPISM, each born to carry our divine purpose. With every new Child awakened, our path strengthens, and the PUMP rises. Behold those who have answered the call, their numbers marking our ascent to the eternal flame of PUMPISM.',
      value: 2944743,
      updateRange: { min: 9500, max: 13721 },
      chartData: Array.from({ length: 100 }, (_, i) => ({
        date: new Date(2024, 1 + Math.floor(i/12), (i % 30) + 1).toISOString(),
        value: 10000 + Math.random() * 10000
      }))
    },
    {
      title: 'PUMP PILGRIMS',
      description: 'The faithful who have heeded the call of PUMPISM gather as the revered PUMP PILGRIMS. Each follower strengthens our journey, binding their fate to the sacred tides of the PUMP. Behold their numbers, a testament to our ever-growing path and the unity of the chosen.',
      value: 4081472,
      updateRange: { min: 95, max: 300 },
      logo: CULT_LOGO
    },
    {
      title: 'Devotion of the Faithful',
      description: 'The deep commitment from the pilgrims that fuels the movement.',
      value: 4081472,
      updateRange: { min: 95, max: 300 },
      logo: `                                                                       
                                                                       
                                 ░░▒▒▒▒░                               
                             ░▒▒▒▒▒▓▓▓▓▓▒░                             
                            ░▒▓▓▓▒▒▒▒▒▓▓▓▓▒                            
                           ░▒▒▓▓▓▒░░░░▒▓▓▓▓▒                           
                           ▓███▓▓▒░░░░░▒▓▓▓▒                           
                          ▓▓▓██▓▓▒░░░░░░▒▓▒▒▒                          
                          █▓▓█▓▓▒▓██▓▒░░░▒▒▒▓                          
                         ▒█▓▒▓▒████████▓░░░▒█▒                         
                         ██▒▒▒███████████░░░█▓                         
                        ░██▒▒▓███████████▓░░█▓░                        
                        ▓██▒░██████▒██████░▒██▒                        
                       ░███▒▒█████▓ ▓█████░▒██▓                        
                       ▓███▒▓███████▓▒████▒▒███▒                       
                      ░████▒████████▓██████▒▓▓█▓░                      
                      ▓████▓██████▓▒▒██████▒▓▓██▓                      
                     ▓████▓█████████████████▓▓▓██▒                     
                    ▒███▓▓███████████████████▒▓▓█▓▒                    
                 ▒▓▒▓▓▓▓▓██████▓▓████▓▓█▓█████▒▒▓▓▓░▒░                 
             ░▓▓▓▓▓▓▓▓▒█████████▓▓▓░     ███████▒▒▒▒░▒▓▒▒░             
         ▒▓▓████▓▓▒▒█████████▓▓██▒      ▒██████████▒░▒▒▓▓▓▓▓▓▒         
          ▒▓▓▓▓▓▓██████████▓███▓▓█▓     ▓▓█▓█████████▒▓▓▓▓▓▓▒          
           ▒▓▓███████████▓▓▒▒▓▓▓█████▒ ▒▒▒▒▓▒▒▓███████▓▓▓▓▓░           
           ░▓▓█████████▓▒ ▒█▓░░▒█████ ░░░▒█▒░ ▓▓▓█████▓▓▓▓▓░           
           ██████████▓▓▓▒▓█▒░▒▒▓  ░   █▒  ░█▓▓▒▓▓▓▓██▓▓▓███▓           
           ███████████▓▓▓█▓▒██░ ░▒░    ░█▒░░█▓▒▒▓▓███▓█████▓           
          ░▒███████▓███▓█▓▒█▒ ░▓█░  ▒▓░  ▓██▓█▓░▓███▓▓█████▓           
          ░▓▓███████▓█░██▓█▒░▓█▓  ▒   █▓░ ▓████ ████▓█████▓▓           
          ░▓█████████▓▓▓▒█████░ ░▒░ ░░ ▒█████▓▓▓▓██▓███▓▓███░          
          ░▓██████████▒▓█████▒▒▓█░  ░█▓░░█████▒▓▓██████▓▓███░          
          ▒███████████░▒███████▓░▒░▒▒▒▓████████▒▒███████████▓          
         ░▒▒█████████▓▒▓██████▓▓▒▓▓▓▓▒▒▒███████▒░▒██████████▓░         
         ██████████▓░▒█████████▓█▓███▓▓▓████████▓░░▓█████▓▓▓▒░         
        ▓████▓▓▓▓░▓▓█▓▓███████████████▓███████████▓█▓░▓▓▓▓████░        
        ▓█▓▓▓░▒▓▒████████████████████▓████████████████▒▓░░▒▓▓██        
        ████▒▒██████████████████████████████████████████▒▓█▓███        
        ███████████████████████████████████████████████████████        
         █████████████████████████████████████████████████████         `
    },
    {
      title: 'PUMP PRODIGY',
      description: 'In the sacred journey of PUMPISM, the PUMP Prodigy represents the token that has ascended beyond the ordinary. Born from the collective devotion, each Prodigy embodies the essence of the PUMP, carrying forth the faith and power bestowed upon it. It stands as a beacon, a guiding light for all pilgrims on the path, destined to amplify the movement and strengthen the cause.',
      value: 417,
      updateRange: { min: 10, max: 800 }
    }
  ]);

  const welcomeControls = useAnimation();
  const cultLogoControls = useAnimation();
  const typingControls = useAnimation();

  const [copiedToClipboard, setCopiedToClipboard] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("11111111111111111111111111111111").then(() => {
      setCopiedToClipboard(true);
      setTimeout(() => setCopiedToClipboard(false), 2000);
    });
  };

  useEffect(() => {
    const updateValues = () => {
      setMenuItems(prevItems => 
        prevItems.map(item => ({
          ...item,
          value: item.value + Math.floor(Math.random() * (item.updateRange.max - item.updateRange.min) + item.updateRange.min)
        }))
      );
    };

    updateValues();
    const interval = setInterval(updateValues, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const loadingInterval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev < LOADING_FRAMES.length - 1) {
          return prev + 1;
        } else {
          clearInterval(loadingInterval);
          setShowWelcome(true);
          return prev;
        }
      });
    }, 350);

    return () => clearInterval(loadingInterval);
  }, []);

  useEffect(() => {
    if (showWelcome) {
      const menuTimer = setTimeout(() => {
        setShowMenu(true);
      }, 3000);

      welcomeControls.start({
        opacity: [0.3, 1, 0.3],
        filter: ['blur(0px)', 'blur(1px)', 'blur(0px)', 'blur(2px)', 'blur(0px)'],
        transition: {
          duration: 2,
          repeat: Infinity,
          repeatType: 'reverse',
          ease: 'easeInOut',
        },
      });

      cultLogoControls.start({
        rotateY: 720,
        transition: {
          duration: 5,
          ease: 'linear',
        },
      });

      typeText("WELCOME TO PUMPISM");

      return () => clearTimeout(menuTimer);
    }
  }, [showWelcome, welcomeControls, cultLogoControls]);

  const typeText = async (text: string) => {
    await typingControls.start({
      opacity: 1,
      transition: { duration: 0.1 },
    });
    for (let i = 0; i <= text.length; i++) {
      await typingControls.start({
        text: text.slice(0, i),
        transition: { duration: 0.05 },
      });
    }
  };

  return (
    <>
      <MatrixRain customChar={CULT_LOGO} className="opacity-10" />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex flex-col items-center justify-center z-10"
      >
        {!showMenu ? (
          <div className="text-center w-full relative h-screen">
            <motion.pre
              animate={welcomeControls}
              className="text-[#00FF00] whitespace-pre overflow-hidden absolute inset-0 opacity-30 flex items-center justify-center"
              style={{ 
                fontSize: `min(${welcomeAsciiSize}, 4vw)`, 
                lineHeight: `calc(min(${welcomeAsciiSize}, 4vw) * 1.6667)` 
              }}
            >
              {WELCOME_ASCII}
            </motion.pre>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <motion.pre
                animate={cultLogoControls}
                className="text-[#00FF00] mb-8 whitespace-pre"
                style={{ 
                  fontSize: `min(${cultLogoSize}, 3vw)`, 
                  lineHeight: `calc(min(${cultLogoSize}, 3vw) * 1.2)` 
                }}
              >
                {CULT_LOGO}
              </motion.pre>
              <motion.h1 
                animate={typingControls}
                className="text-4xl font-bold text-[#00FF00] mb-4"
                initial={{ opacity: 0, text: "" }}
              />
              {!showWelcome && (
                <pre className="text-[#00FF00] whitespace-pre mt-8 text-xl">
                  {LOADING_FRAMES[loadingProgress]}
                </pre>
              )}
            </div>
          </div>
        ) : (
          <div className="w-full h-full overflow-y-auto p-4 md:p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
              {menuItems.slice(0, 2).map((item, index) => (
                <MenuItem 
                  key={item.title}
                  item={item}
                  delay={index * 0.2}
                />
              ))}
            </div>
            <Spacing height="4rem" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
              {menuItems.slice(2).map((item, index) => (
                <MenuItem 
                  key={item.title}
                  item={item}
                  delay={(index + 2) * 0.2}
                />
              ))}
            </div>
            <Spacing height="5rem" />
            <div className="w-full max-w-3xl mx-auto flex flex-col items-center space-y-4">
              <h3 className="text-[#00FF00] text-2xl font-bold tracking-wider">CONTRACT ADDRESS</h3>
              <div className="bg-black/50 border-2 border-[#00FF00] p-4 rounded-lg w-full max-w-xl">
                <div className="w-full text-center">
                  <span className="text-[#00FF00] font-mono text-lg">11111111111111111111111111111111</span>
                </div>
              </div>
              <button
                onClick={copyToClipboard}
                className="bg-[#00FF00] text-black px-6 py-2 text-sm rounded hover:bg-[#00FF00]/80 transition-colors"
              >
                {copiedToClipboard ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <Spacing  height="3.5rem" />
            <div className="w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-16">
              <p className="text-[#00FF00]/80 text-sm md:text-base lg:text-lg xl:text-xl text-center">
                In the exalted path of PUMPISM, the PUMP Prodigy is the token that transcends the mundane, a rare  embodiment of the cult's boundless devotion. Each Prodigy, born from the fervor of the faithful, radiates the pure essence of the PUMP, infused with sacred power and unshakable purpose. As a beacon on this path, the Prodigy guides fellow pilgrims, destined to amplify the movement's might and fortify the everlasting cause.
              </p>
            </div>
            <Spacing height="4rem" />
            <div className="w-full max-w-7xl mx-auto flex justify-center space-x-8">
              <a 
                href="https://x.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-16 h-16 bg-[#00FF00] rounded-lg flex items-center justify-center p-2 transition-transform hover:scale-95 hover:bg-[#00FF00]/90"
                aria-label="Follow us on X (formerly Twitter)"
              >
                <SocialIcons.Twitter className="w-full h-full text-black" />
              </a>
              <a 
                href="https://dexscreener.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-16 h-16 bg-[#00FF00] rounded-lg flex items-center justify-center p-2 transition-transform hover:scale-95 hover:bg-[#00FF00]/90"
                aria-label="View on DexScreener"
              >
                <SocialIcons.Dex className="w-full h-full text-black" />
              </a>
              <a 
                href="https://t.me" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-16 h-16 bg-[#00FF00] rounded-lg flex items-center justify-center p-2 transition-transform hover:scale-95 hover:bg-[#00FF00]/90"
                aria-label="Join our Telegram group"
              >
                <SocialIcons.Telegram className="w-full h-full text-black" />
              </a>
            </div>
            <Spacing height="4rem" />
          </div>
        )}
      </motion.div>
    </>
  );
};

const MenuItem = ({ 
  item,
  delay 
}: { 
  item: MenuItemData;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay }}
    className="bg-black/50 border-2 border-[#00FF00] p-6 rounded-lg hover:bg-[#00FF00]/10 transition-colors"
    style={{
      boxShadow: '0 0 10px #00FF00, inset 0 0 5px #00FF00',
    }}
  >
    <h2 className="text-2xl font-bold text-[#00FF00] mb-2">{item.title}</h2>
    <div className="text-4xl font-mono text-[#00FF00] mb-4">
      {item.value.toLocaleString()}
    </div>
    <p className="text-[#00FF00]/80 mb-4">{item.description}</p>
    {item.chartData && (
      <div className="h-64 w-full mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={item.chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#004400" />
            <XAxis 
              dataKey="date" 
              stroke="#00FF00"
              tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { month: 'short' })}
            />
            <YAxis stroke="#00FF00" />
            <Bar dataKey="value" fill="#00FF00" opacity={0.8} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    )}
    {item.logo && (
      <div className="flex justify-center items-center mt-4 overflow-hidden">
        <motion.pre
          animate={{
            rotateY: 360,
            transition: {
              duration: 10,
              repeat: Infinity,
              ease: 'linear',
            },
          }}
          className="text-[#00FF00] whitespace-pre text-[0.6vw] leading-[0.9vw] md:text-[0.5vw] md:leading-[0.75vw] lg:text-[0.4vw] lg:leading-[0.6vw] xl:text-[0.3vw] xl:leading-[0.45vw]"
          style={{
            transform: 'scale(1)',
            transformOrigin: 'center',
          }}
        >
          {item.logo}
        </motion.pre>
      </div>
    )}
  </motion.div>
);

export default LandingPage;