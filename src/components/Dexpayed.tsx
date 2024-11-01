"use client"

import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const DEXPAYED: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; username: string; content: string; timestamp: string }[]>([])
  const [maxMessages] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const generateUsername = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let address = ''
    for (let i = 0; i < 44; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    const start = address.slice(0, 4 + Math.floor(Math.random() * 3))
    const end = address.slice(-4 - Math.floor(Math.random() * 3))
    return `${start}...${end}`
  }

  const generateMessage = () => {
    const messages = [
      "Just aped in! LFG! 🚀",
      "Who's holding $DEXPAYED? Diamond hands only! 💎🙌",
      "When moon? 🌕",
      "Bullish AF on this project! 📈",
      "WAGMI fam! 🙏",
      "Devs are based, trust the process 🧠",
      "Staking rewards are insane! 🤑",
      "Weak hands getting rekt, stay strong! 💪",
      "This is gonna flip ETH, mark my words 🔮",
      "Just bought the dip, thanks for the discount 😎",
      "Roadmap looks solid, bullish! 🛣️",
      "Tokenomics are 🔥🔥🔥",
      "HODL or NGMI 🚫📄🙌",
      "We're still early, NFA 🐣",
      "Whales are accumulating, you know what that means 🐳",
      "Can't wait for the NFT drop! 🖼️",
      "This is the gwei 🌠",
      "Ser, when Binance? 🏦",
      "Paper hands exit here ➡️🚪",
      "Just check the chart, we're mooning! 📊🚀"
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
          username: generateUsername(),
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
    <div className="fixed inset-0 flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md h-[80vh] bg-white rounded-lg shadow-xl overflow-hidden flex flex-col">
        <div className="bg-[#5682a3] text-white p-4 flex items-center">
          <div className="w-10 h-10 bg-[#4e7298] rounded-full flex items-center justify-center text-xl font-bold mr-3">P</div>
          <div>
            <h1 className="font-bold text-lg">PUMPISM</h1>
            <p className="text-sm opacity-75">6969 members</p>
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
                <div className="w-8 h-8 bg-[#4e7298] rounded-full flex items-center justify-center text-white text-sm font-bold mr-2">
                  {message.username.charAt(0).toUpperCase()}
                </div>
                <div className="flex-grow">
                  <div className="flex items-baseline">
                    <span className="font-bold text-[#4e7298] mr-2">{message.username}</span>
                    <span className="text-xs text-gray-500">{message.timestamp}</span>
                  </div>
                  <p className="text-gray-800 mt-1">{message.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="bg-white border-t border-gray-200 p-4 flex items-center">
          <input type="text" placeholder="Write a message..." className="flex-grow bg-gray-100 rounded-full py-2 px-4 focus:outline-none" />
          <button className="ml-2 bg-[#5682a3] text-white rounded-full p-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DEXPAYED