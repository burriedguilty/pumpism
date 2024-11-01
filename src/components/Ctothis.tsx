import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const Ctothis: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; username: string; content: string }[]>([])
  const [maxMessages] = useState(20)
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
    const beggingWords = [
      "For f***'s sake, I'm down bad here", "I'm f***ing begging, ape", "Don't leave me in this s***hole, ngmi", 
      "Just send it, dammit, I'm rekt", "We're straight up rugged if you don't", "On my damn knees, save me", 
      "Throw a poor bastard a bone, SOS", "For the love of all bags, help me out", "I'm bleeding out here, send it now", 
      "F***ing help a soul out in the trenches", "Don't be a d***, hand it over", "Crawling through this s*** like a rekt pleb",
      "Get me out of this red candle hell", "I'm about to lose my f***ing s***", "Alpha or nothing, don't leave me hanging", 
      "Have some f***ing mercy, I'm toast", "Get off your a** and pump this", "My brain's fried, degens unite", 
      "Come on, don't be a LARP", "Send the f***ing juice, bruh", "I need this s*** like yesterday", 
      "In desperate f***ing need, SOS", "F***ing bleeding on the floor, save a degen", "Lost in the mempool, help me out", 
      "I'm losing it, just send the damn alpha", "Don't gatekeep me into oblivion", "Bagless and hopeless, I'm on copium", 
      "I'm on-chain and out of sanity", "This is max pain, just give it already", "For crying out f***ing loud, my bags are empty"
    ]

    const beggingWord = beggingWords[Math.floor(Math.random() * beggingWords.length)]

    return Math.random() < 0.5
      ? `${beggingWord}, CTO THIS`
      : `CTO THIS, ${beggingWord.toLowerCase()}`
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prevMessages => {
        const newMessage = {
          id: Date.now(),
          username: generateUsername(),
          content: generateMessage()
        }
        const updatedMessages = [...prevMessages, newMessage]
        return updatedMessages.slice(-maxMessages)
      })
    }, 1500 + Math.random() * 1500) // Random interval between 1.5-3 seconds

    return () => clearInterval(interval)
  }, [maxMessages])

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [messages])

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black overflow-auto">
      <div className="w-full max-w-2xl mx-auto px-4">
        <div className="bg-gray-900 rounded-lg shadow-xl overflow-hidden">
          <div className="p-4 bg-gray-800 text-green-400 font-bold text-xl text-center">CTO THIS TRACKER</div>
          <div ref={containerRef} className="h-[60vh] overflow-y-auto p-4 space-y-4">
            <AnimatePresence initial={false}>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gray-800 rounded-lg p-3"
                >
                  <div className="font-medium text-green-400">{message.username}</div>
                  <div className="text-gray-300 mt-1">{message.content}</div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Ctothis