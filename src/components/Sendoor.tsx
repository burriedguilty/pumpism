import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const usernames = [
  "SolanaSurge", "DepthHunter", "MidnightRider", "IronPulse", "ShadyPump",
  "ShadowRiser", "VoltWarden", "SolanatorX", "PumpVanguard", "CoinEcho",
  "DeepRaider", "GhostSurge", "IronSurge", "RiserRaider", "PhantomPump",
  "RogueRider", "PulseSeeker", "SurgeHunter", "SpiritRise", "PumpRaider",
  "SolanaStrike", "VoltEcho", "StormWalker", "RiserHawk", "PhantomVolt",
  "CoinCrawler", "TheSilentRaider", "PumpSpecter", "EtherEcho", "ShadowRanger",
  "SurgeBreaker", "LostRider", "PumpHawk", "EtherGuard", "GhostRaider",
  "StealthSeeker", "RogueStrike", "SpiritEcho", "PhantomStrike"
]

const chatTerms = [
  "Sendoor's got us in deep trenches!",
  "Sendoor's latest rug pull, we're in the pit now!",
  "These trenches are Sendoor's playground now",
  "Sendoor's new algo just dug these trenches deeper",
  "Sendoor's liquidity is bone dry, we're stuck",
  "Sendoor's latest update turned this into a wasteland",
  "These losses are Sendoor's masterpiece",
  "Sendoor just opened up some fresh pain",
  "Sendoor's eating good tonight, we're starving",
  "Sendoor's new feature is digging our graves",
  "These dumps are Sendoor's new home",
  "Sendoor's latest pump left us in the dust",
  "Sendoor's laughing all the way to the bank",
  "Sendoor just turned the market into a dumpster fire",
  "These losses are Sendoor's gift to us",
  "Sendoor's new token is nothing but hot air",
  "Sendoor's got us all fooled, again",
  "Sendoor's latest move dug these holes",
  "This mess is Sendoor's playground",
  "Sendoor just opened the floodgates to chaos",
  "Sendoor's on a roll today, we're getting crushed",
  "Sendoor's new strategy is all about pain",
  "These losses are Sendoor's bread and butter",
  "Sendoor just turned the bull run into a bear massacre",
  "Sendoor's playing 4D chess, we're playing checkers",
  "Sendoor's latest airdrop is pure misery",
  "These dumps are Sendoor's magnum opus",
  "Sendoor just flipped the script to our disadvantage",
  "Sendoor's got diamond hands now, we're left with dust",
  "Sendoor's new dex is digging our financial graves",
  "These losses are Sendoor's new normal",
  "Sendoor just turned the moon into a black hole",
  "Sendoor's on a rampage, we're the casualties",
  "Sendoor's latest hack opened up a can of worms",
  "This carnage is Sendoor's playground",
  "Sendoor just turned hodling into a fool's errand",
  "Sendoor's got us by the wallets, no escape",
  "Sendoor's new NFT collection is misery incarnate",
  "These dumps are Sendoor's legacy now",
  "Sendoor just flipped the bears into raging bulls"
]

const Sendoor: React.FC = () => {
  const [messages, setMessages] = useState<{ id: number; username: string; content: string }[]>([])
  const [maxMessages] = useState(100)
  const containerRef = useRef<HTMLDivElement>(null)

  const generateMessage = () => {
    const username = usernames[Math.floor(Math.random() * usernames.length)]
    const content = chatTerms[Math.floor(Math.random() * chatTerms.length)]
    return { username, content }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setMessages(prevMessages => {
        const newMessage = {
          id: Date.now(),
          ...generateMessage()
        }
        const updatedMessages = [...prevMessages, newMessage]
        return updatedMessages.slice(-maxMessages)
      })
    }, 500 + Math.random() * 1000) // Random interval between 0.5-1.5 seconds

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
          <div className="p-4 bg-gray-800 text-green-400 font-bold text-xl text-center">Sendoor Chat</div>
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

export default Sendoor