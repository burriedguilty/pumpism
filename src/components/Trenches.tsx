"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Trenches: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; username: string; content: string; timestamp: string }[]>([])
  const [maxMessages] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const usernames = [
    "RektRider", "AlphaHunter69", "BaglessBandit", "DegenDaze", "CandleCrusader",
    "DumpDigger", "ApeShaker", "ExitLiquidity", "RuggedReality", "NFA_Ninja",
    "WhaleWatcher", "TrenchTornado", "CopeKing", "BottomSniper", "SnipeSimp",
    "FloorFrenzy", "ScarcitySavage", "NGMIFool", "LiquidityLeech", "PumpPirate",
    "10xDelirium", "MoonRager", "BleedBuster", "HighRiskHero", "DeFiDoom",
    "HopiumHustler", "ChainDrain", "BagBeggar", "FloorFiend", "WreckedWizard"
  ]

  const generateMessage = () => {
    const messages = [
      "F**k me sideways, I'm so rekt I can't even afford ramen 🍜💸",
      "Wen lambo? More like wen cardboard box 📦😭",
      "Just mortgaged my left nut for more $COPE, LFG! 🚀🥜",
      "This rug pull hit harder than my stepdad 👊💔",
      "Eating nothing but hopium and air for dinner again 🍽️💨",
      "My portfolio's redder than Satan's ass crack 👹📉",
      "Guess I'll be behind Wendy's again tonight 🍔🥲",
      "Who needs kidneys when you can have more shitcoins? 💩🪙",
      "Chart's looking like my flatlined hopes and dreams 📊💀",
      "Margin called? More like margin f**ked 📞🖕",
      "Buying high and selling low, it's the degen way 📈🧠",
      "My bags are heavier than my emotional baggage 👜😢",
      "Forget diamond hands, I've got paper hands made of toilet paper 🧻🙌",
      "NGMI? More like NGFI - Never Gonna F**king Invest 🚫💰",
      "Staking my last braincell for 0.00001% APY 🧠💹",
      "Just found out I can't pay rent with NFTs 🏠🖼️",
      "Leveraged to the tits and about to get liquidated harder than my bowels after taco night 🌮💩",
      "My portfolio's so dead it qualifies for a funeral service ⚰️💐",
      "Bought the dip, but it keeps dipping. Guess I'll dip out of life 🏊‍♂️😵",
      "Watching charts 24/7 because sleep is for people with profits 👀💤",
      "Diversification? You mean buying different shitcoins, right? 💩🪙",
      "My trading strategy is like my sex life - short and disappointing 📊😔",
      "Forget 'to the moon,' I'm drilling to the earth's core 🌍⛏️",
      "I'm not addicted to trading, I can stop losing money anytime I want 🎰🧢",
      "Holding these bags tighter than my grandma holds her purse 👵👜",
      "I don't always FOMO, but when I do, I make sure it's at the top 📊🤡",
      "My TA is so bad, I should start a paid group 📈💸",
      "I'm not broke, I'm just temporarily embarrassed future millionaire 🤑🔮",
      "Forget Shark Tank, I need a Dumpster Fire Tank for my investments 🔥🗑️",
      "I'm so poor, I can't even pay attention 👀💸",
      "Losing money faster than I lose brain cells in this chat 💸🧠",
      "I'm not gambling, I'm 'investing' in digital lottery tickets 🎟️💻",
      "My portfolio's more volatile than my ex 📊😠",
      "I don't need food when I can eat these losses 🍽️📉",
      "Buying high and selling low, it's not a bug, it's a feature 🐛📉",
      "I'm not crying, it's just raining on my face... indoors 😭☔",
      "Forget 'buy the dip,' I'm buying the whole f**king Mariana Trench 🌊💰",
      "I've got 99 problems and they're all shitcoins 💩🪙",
      "My trading account's emptier than my Tinder matches 💸😢",
      "I'm not poor, I'm just early to poverty 🏆💸",
      "Forget yoga, watching my portfolio dump is all the stretching I need 🧘‍♂️📉",
      "I'm so broke, I can't even afford to pay respect 😔🙏",
      "My losses are transitory, just like my will to live 📉😵",
      "I don't need a girlfriend, my trades f**k me every day 🍆📊",
      "I'm not losing, I'm just winning at going broke 🥇💸",
      "Forget 'time in the market,' I'm doing time for my market choices ⏳⛓️",
      "I'm so rekt, I qualify for disaster relief 🏚️🆘",
      "My portfolio's redder than the devil's dick 👹🍆",
      "I'm not depressed, I'm just long-term bearish on life 🐻😔",
      "Forget 'buy low, sell high,' I'm on that 'buy high, sell my kidney' grind 💊🩸"
    ]

    return messages[Math.floor(Math.random() * messages.length)]
  }

  const generateTimestamp = () => {
    const date = new Date()
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prevMessages => {
        const newMessage = {
          id: Date.now(),
          username: usernames[Math.floor(Math.random() * usernames.length)],
          content: generateMessage(),
          timestamp: generateTimestamp()
        }
        const updatedMessages = [...prevMessages, newMessage]
        return updatedMessages.slice(-maxMessages)
      })
    }, 1000 + Math.random() * 2000) // Random interval between 1-3 seconds

    return () => clearInterval(interval)
  }, [maxMessages])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black p-4">
      <div className="w-full max-w-4xl h-[80vh] bg-gray-900 rounded-lg shadow-xl overflow-hidden flex flex-col border border-green-500">
        <div className="bg-gray-800 text-green-400 p-4 flex items-center">
          <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-xl font-bold mr-3 text-black">T</div>
          <div>
            <h1 className="font-bold text-lg">The Trenches</h1>
            <p className="text-sm opacity-75">133,769 rekt degens</p>
          </div>
        </div>
        <div ref={containerRef} className="flex-grow overflow-y-auto p-4 space-y-2">
          <AnimatePresence initial={false}>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="flex items-start"
              >
                <div className="flex-shrink-0 w-8 h-8 bg-green-500 rounded-sm flex items-center justify-center text-black text-sm font-bold mr-2">
                  {message.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-grow">
                  <div className="flex items-baseline">
                    <span className="font-bold text-green-400 mr-2">{message.username}</span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-gray-300 mt-1">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="bg-gray-800 border-t border-green-500 p-4 flex items-center">
          <input type="text" placeholder="Send a message..." className="flex-grow bg-gray-700 text-green-400 rounded-sm py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500" />
          <button className="ml-2 bg-green-500 text-black rounded-sm p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Trenches