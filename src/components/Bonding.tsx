"use client"

import React, { useState, useEffect, useCallback } from 'react'

interface Candlestick {
  open: number
  high: number
  low: number
  close: number
}

interface BondingProps {
  chartHeight?: number
  minWickHeight?: number
  maxWickHeight?: number
  bodyHeightMultiplier?: number
}

const Bonding: React.FC<BondingProps> = ({
  chartHeight = 120,
  minWickHeight = 5,
  maxWickHeight = 50,
  bodyHeightMultiplier = 1.5
}) => {
  const [progress, setProgress] = useState(0)
  const [marketCap, setMarketCap] = useState(3000)
  const [candlesticks, setCandlesticks] = useState<Candlestick[]>([])
  const [scribble, setScribble] = useState('')
  const [solanaAddress, setSolanaAddress] = useState('')
  const [solanaTransaction, setSolanaTransaction] = useState('')
  const [pilgrimsId, setPilgrimsId] = useState<[number, number][]>([])
  const [isBonding, setIsBonding] = useState(false)

  const generateSolanaAddress = () => {
    const chars = 'ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz123456789'
    let address = ''
    for (let i = 0; i < 44; i++) {
      address += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return address
  }

  const generateSolanaTransaction = () => {
    const amount = (Math.random() * 9.99 + 0.01).toFixed(2)
    const action = Math.random() < 0.5 ? 'Buying' : 'Selling'
    return `${action} ${amount} SOL`
  }

  const calculateMarketCap = useCallback((currentMarketCap: number, lastCandle: Candlestick | null) => {
    if (isBonding) {
      // Faster accumulation during bonding
      return Math.min(133244355, currentMarketCap * 1.1)
    }
    
    // Dynamic calculation before bonding
    let newMarketCap = currentMarketCap
    
    if (lastCandle) {
      const candleHeight = Math.abs(lastCandle.close - lastCandle.open)
      const candleImpact = candleHeight * 2000 // Increased multiplier for faster progress
      if (lastCandle.close > lastCandle.open) {
        newMarketCap += candleImpact
      } else {
        newMarketCap -= candleImpact
      }
    }
    
    // Ensure market cap stays within range and check for bonding trigger
    newMarketCap = Math.max(3000, Math.min(70000, newMarketCap))
    if (newMarketCap >= 70000 && !isBonding) {
      setIsBonding(true)
    }
    
    return newMarketCap
  }, [isBonding])

  useEffect(() => {
    const generateCandlestick = (prevClose: number): Candlestick => {
      const bullishBias = isBonding || Math.random() < 0.7 // 70% chance of bullish before bonding, always bullish during bonding
      const volatility = prevClose * (isBonding ? 0.08 : 0.05)
      const change = bullishBias ? Math.random() * volatility : -Math.random() * volatility * 0.6
      const open = prevClose
      const close = prevClose + change
      const high = Math.max(open, close) * (1 + Math.random() * (isBonding ? 0.04 : 0.03))
      const low = Math.min(open, close) * (1 - Math.random() * (isBonding ? 0.02 : 0.025))
      return { open, high, low, close }
    }

    const updateCandlesticks = () => {
      setCandlesticks(prev => {
        const newStick = generateCandlestick(prev[prev.length - 1]?.close || 100)
        const newSticks = [...prev.slice(-19), newStick]
        setMarketCap(prevCap => calculateMarketCap(prevCap, newStick))
        return newSticks
      })
    }

    // Initialize with 20 candlesticks
    setCandlesticks(Array(20).fill(0).map(() => generateCandlestick(100)))

    const candleInterval = setInterval(updateCandlesticks, 500) // Updated to 500ms for faster updates
    return () => clearInterval(candleInterval)
  }, [isBonding, calculateMarketCap])

  useEffect(() => {
    const updateSolanaInfo = () => {
      setSolanaAddress(generateSolanaAddress())
      setSolanaTransaction(generateSolanaTransaction())
    }

    updateSolanaInfo() // Initial update
    const solanaInterval = setInterval(updateSolanaInfo, 200) // Update every 200ms

    return () => clearInterval(solanaInterval)
  }, [])

  useEffect(() => {
    const generateScribble = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+'
      let result = ''
      for (let i = 0; i < 20; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length))
      }
      setScribble(result)
    }

    const interval = setInterval(generateScribble, 100)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    const generatePilgrimsId = () => {
      const newPilgrimsId: [number, number][] = []
      for (let i = 0; i < 3; i++) {
        const id = Math.floor(Math.random() * 1000000)
        const faith = Math.random() * 100
        newPilgrimsId.push([id, faith])
      }
      setPilgrimsId(newPilgrimsId)
    }

    const interval = setInterval(generatePilgrimsId, 500)
    return () => clearInterval(interval)
  }, [])

  const getASCIIProgress = () => {
    if (isBonding) {
      return "⭐ BONDING ⭐"
    }
    const percent = ((marketCap - 3000) / (70000 - 3000)) * 100
    const filled = Math.floor(percent / 5)
    const empty = 20 - filled
    return `[${'#'.repeat(filled)}${'.'.repeat(empty)}] ${percent.toFixed(2)}%`
  }

  const maxPrice = Math.max(...candlesticks.map(c => c.high))
  const minPrice = Math.min(...candlesticks.map(c => c.low))
  const priceRange = maxPrice - minPrice

  return (
    <div className="relative w-full text-green-400 font-mono">
      <h1 className="text-2xl sm:text-3xl mb-5 text-center text-shadow">$PUMPISM</h1>
      <div className={`text-lg sm:text-xl mb-3 ${isBonding ? 'animate-pulse' : ''} text-center`}>
        <pre className="whitespace-pre-wrap">{getASCIIProgress()}</pre>
      </div>
      <div className="text-sm sm:text-base mb-6 text-center">
        Market Cap: {marketCap.toLocaleString(undefined, { maximumFractionDigits: 0 })}
      </div>
      <div className="w-full mb-8">
        <h2 className="text-xl sm:text-2xl mb-3 text-center">Current Pilgrims Faith</h2>
        <div className="flex justify-between items-end border-b border-green-400" style={{ height: `${chartHeight}px` }}>
          {candlesticks.map((stick, index) => {
            const wickHeight = Math.max(minWickHeight, Math.min(maxWickHeight, ((stick.high - stick.low) / priceRange) * chartHeight))
            const bodyHeight = Math.abs(stick.close - stick.open) / priceRange * chartHeight * bodyHeightMultiplier
            const isGreen = stick.close > stick.open

            return (
              <div key={index} className="w-1 sm:w-2 relative" style={{ height: '100%' }}>
                <div 
                  className={`w-px sm:w-0.5 absolute left-1/2 transform -translate-x-1/2 ${isGreen ? 'bg-green-400' : 'bg-red-500'}`} 
                  style={{
                    height: `${wickHeight}px`,
                    bottom: `${((stick.low - minPrice) / priceRange) * chartHeight}px`
                  }}
                ></div>
                <div 
                  className={`w-full absolute ${isGreen ? 'bg-green-400' : 'bg-red-500'}`} 
                  style={{
                    height: `${bodyHeight}px`,
                    bottom: `${((Math.min(stick.open, stick.close) - minPrice) / priceRange) * chartHeight}px`
                  }}
                ></div>
              </div>
            )
          })}
        </div>
      </div>
      <div className="text-sm sm:text-base text-center w-full">
        <pre className="whitespace-pre-wrap break-all">
          {solanaAddress}
          {'\n'}
          {solanaTransaction}
        </pre>
      </div>
      <div className="mt-4 w-full text-center">
        <h3 className="text-lg sm:text-xl mb-2">Pilgrims ID</h3>
        {pilgrimsId.map((pilgrim, index) => (
          <div key={index} className="flex justify-center text-sm sm:text-base">
            <span className="w-1/4 text-right pr-2">{pilgrim[0]}</span>
            <span className="w-1/4 text-left pl-2">{pilgrim[1].toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="mt-8 text-xl sm:text-2xl font-bold animate-pulse text-center">
        {scribble}
      </div>
    </div>
  )
}

export default Bonding