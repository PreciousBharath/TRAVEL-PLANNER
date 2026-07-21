import React, { useState } from 'react'
import { FaEnvelope, FaLock, FaGlobeAmericas, FaDollarSign, FaTicketAlt, FaShieldAlt } from 'react-icons/fa'

const features = [
  { icon: <FaGlobeAmericas />, title: 'Explore 100+ Destinations' },
  { icon: <FaDollarSign />, title: 'Best Price Guarantee' },
  { icon: <FaTicketAlt />, title: 'Instant Booking' },
  { icon: <FaShieldAlt />, title: 'Secure & Trusted' }
]

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('traveler@example.com')
  const [password, setPassword] = useState('travelx123')

  const handleSubmit = (event) => {
    event.preventDefault()

    if (!email.trim() || !password.trim()) {
      return
    }

    onLogin?.(email.trim(), password)
  }

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-hero">
          <div className="hero-visual" aria-hidden="true">
            <div className="flight-scene">
              <div className="cloud cloud-one" />
              <div className="cloud cloud-two" />
              <div className="flight-path">
                <div className="flight-plane">✈️</div>
                <div className="flight-trail" />
              </div>
            </div>
            <div className="hero-icons">
              <span>🌍</span>
              <span>📍</span>
              <span>🏖️</span>
              <span>🧳</span>
            </div>
          </div>

          <div className="login-brand">
            <span className="logo-dot" />
            <span>PRAVEEN AND MARTIN TRAVELS</span>
          </div>
          <h1>Your Ultimate Travel Companion</h1>
          <p className="login-copy">
            Plan your next getaway with curated routes, smart budgets, and seamless booking support.
          </p>
        </div>

        <div className="login-card">
          <form className="login-form" onSubmit={handleSubmit}>
            <label>
              <span>Email Address</span>
              <div className="input-with-icon">
                <FaEnvelope />
                <input
                  type="email"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                />
              </div>
            </label>

            <label>
              <span>Password</span>
              <div className="input-with-icon">
                <FaLock />
                <input
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Enter your password"
                />
              </div>
            </label>

            <button className="primary-btn login-btn" type="submit">
              Login
            </button>
          </form>

          <div className="login-footer">
            <p>Don&apos;t have an account?</p>
            <button type="button" className="text-btn">
              Sign Up
            </button>
          </div>
        </div>
      </div>

      <div className="feature-grid">
        {features.map((feature) => (
          <div className="feature-card" key={feature.title}>
            <div className="feature-icon">{feature.icon}</div>
            <p>{feature.title}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default LoginPage
