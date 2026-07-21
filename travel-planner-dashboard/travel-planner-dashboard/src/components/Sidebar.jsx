
import React from 'react'
import { FaHome, FaPlane, FaChartPie, FaWallet, FaCog } from 'react-icons/fa'

const menuMap = [
  { label: 'Dashboard', icon: <FaHome /> },
  { label: 'Trips', icon: <FaPlane /> },
  { label: 'Analytics', icon: <FaChartPie /> },
  { label: 'Budget', icon: <FaWallet /> },
  { label: 'Settings', icon: <FaCog /> }
]

const Sidebar = ({ active, items, onSelect }) => {
  const itemsToRender = items?.length ? menuMap.filter((item) => items.includes(item.label)) : menuMap

  return (
    <aside className="sidebar">
      <div className="logo">
        <span className="logo-dot" />
        TravelX
      </div>

      <div className="menu">
        {itemsToRender.map((item) => (
          <button
            key={item.label}
            type="button"
            className={`menu-item ${active === item.label ? 'active' : ''}`}
            onClick={() => onSelect?.(item.label)}
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </div>
    </aside>
  )
}

export default Sidebar
