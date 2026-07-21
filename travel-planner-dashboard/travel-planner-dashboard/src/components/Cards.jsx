 
import React from 'react'
import { motion } from 'framer-motion'
import { FaPlane, FaGlobe, FaWallet, FaTicketAlt } from 'react-icons/fa'

const cards = [
  { title: 'Trips', value: 18, icon: <FaPlane /> },
  { title: 'Countries', value: 9, icon: <FaGlobe /> },
  { title: 'Budget', value: '₹10L', icon: <FaWallet /> },
  { title: 'Flights', value: 24, icon: <FaTicketAlt /> }
]

const Cards = () => {
  return (
    <div className="cards">
      {cards.map((card, index) => (
        <motion.div
          key={index}
          className="card"
          whileHover={{ y: -8 }}
          transition={{ type: 'spring', stiffness: 250, damping: 18 }}
        >
          <div className="card-icon">{card.icon}</div>
          <h2>{card.title}</h2>
          <p>{card.value}</p>
        </motion.div>
      ))}
    </div>
  )
}

export default Cards
