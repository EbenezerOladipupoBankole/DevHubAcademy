import React, { useState } from 'react';
import { ArrowRight, Sparkles, Menu, X } from 'lucide-react';
import devhubLogo from './assets/devhub.jpeg';
import './index.css';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">
          <img src={devhubLogo} alt="DevHub Academy" className="logo-img" />
        </div>
        
        {/* Desktop Navigation */}
        <nav className="nav-links">
          <a href="#" className="active">Home</a>
          <a href="#">About</a>
          <a href="#">Get Involved</a>
          <a href="#">Contact Us</a>
        </nav>
        <div className="header-actions">
          <button className="btn-primary">Join Waitlist</button>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Mobile Navigation Dropdown */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <nav>
            <a href="#" className="active" onClick={() => setIsMenuOpen(false)}>Home</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>About</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Get Involved</a>
            <a href="#" onClick={() => setIsMenuOpen(false)}>Contact Us</a>
            <button className="btn-primary w-full mt-4" onClick={() => setIsMenuOpen(false)}>Join Waitlist</button>
          </nav>
        </div>
      )}

      <main className="hero">
        <div className="hero-content">
          <h1>Coming Soon</h1>
          
          <p className="subtitle">
            We are building a thriving community of developers. A new space to learn, 
            collaborate, and accelerate your tech career is on the way.
          </p>
          
          <div className="cta-group">
            <button className="btn-primary large">
              Get Notified <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
