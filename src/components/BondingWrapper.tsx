import React from 'react'
import Bonding from './Bonding'

const BondingWrapper: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black overflow-auto">
      <div className="w-full max-w-4xl mx-auto px-4 py-8">
        <Bonding />
      </div>
    </div>
  )
}

export default BondingWrapper