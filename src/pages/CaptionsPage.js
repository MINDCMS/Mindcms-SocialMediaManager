// import React from 'react';
// import { Link } from 'react-router-dom';

// function CaptionsPage() {
//   return (
//     <div className="page-container">
//       <div className="page-content">
//         <h1>Caption or Posts for Ads</h1>
//         <p>This is the captions page content.</p>
//         <Link to="/" className="back-button">Back to Home</Link>
//       </div>
//     </div>
//   );
// }

// export default CaptionsPage;




// 2nd code



// CaptionsPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CaptionsPage.css';

function CaptionsPage() {
  const [inputText, setInputText] = useState('');
  const [captionsGenerated, setCaptionsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Dummy data for generated captions
  const dummyCaptions = {
    funkyCaptions: [
      "When life gives you lemons, add tequila and salt! 🍋✨",
      "Squad goals: Surviving Monday like... 💪😎",
      "Filtered reality vs. My morning face ☕👀",
      "Cheat meal activated 🍔🚀 #NoRegrets",
      "When someone says 'we need to talk' 😬📉",
      "Self-care mode: Activated 🛁📚🎶",
      "Proof I left my house this month 📸🌳",
      "Treat yo'self 2024 edition 💸🛍️",
      "That glow up though 💫🧖♀️ #SkinCareWins",
      "Main character energy activated 🎬🍿"
    ],
    professionalCaptions: [
      "Elevating possibilities through innovation 🚀💡",
      "Success is a journey, not a destination 🌟📈",
      "Redefining excellence in the digital age 💻🌐",
      "Where vision meets execution 🔍🎯",
      "Building tomorrow's solutions today 🏗️⚙️",
      "Strategic thinking, measurable results 📊✅",
      "Collaboration x Innovation = Transformation ✨🤝",
      "Mastering the art of digital influence 📱💼",
      "Data-driven decisions for impactful results 📈🔍",
      "Leadership reimagined for the modern era 👔🌍"
    ],
    stats: {
      engagementScore: 94,
      bestPlatforms: ["Instagram", "TikTok", "LinkedIn"],
      optimalLength: "15-25 words"
    }
  };

  const handleGenerate = () => {
    if (!inputText) return;
    
    setIsGenerating(true);
    
    setTimeout(() => {
      setIsGenerating(false);
      setCaptionsGenerated(true);
    }, 1500);
  };

  const handleReset = () => {
    setInputText('');
    setCaptionsGenerated(false);
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    // You can add a toast notification here if needed
  };

  return (
    <div className="captions-page">
      <header className="captions-header">
        <div className="logo-container">
          {/* <div className="logo">YourLogo</div> */}
          <h1 className="website-name">Caption Gen</h1>
        </div>
        <nav className="captions-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/blogs" className="nav-link">Blog Generator</Link>
          <Link to="/video-generating" className="nav-link">Video Generator</Link>
        </nav>
      </header>
      
      <div className="hero-section">
        <h1 className="hero-title">AI-Powered Caption Generation</h1>
        <p className="hero-subtitle">Create viral-worthy captions for any platform in seconds</p>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">10M+</span>
            <span className="stat-label">Captions Generated</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">95%</span>
            <span className="stat-label">Engagement Boost</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Industries Supported</span>
          </div>
        </div>
      </div>

      <main className="captions-main-content">
        <div className="form-container">
          <div className="form-card">
            <h2 className="form-title">Generate Perfect Captions</h2>
            <p className="form-description">Describe your post content or upload context</p>
            
            <div className="input-group">
              <label htmlFor="captionInput">Content Description *</label>
              <textarea
                id="captionInput"
                placeholder="E.g., 'A fitness post showing before/after transformation with gym equipment in the background'"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isGenerating || captionsGenerated}
                required
              />
            </div>
            
            <div className="button-group">
              {!captionsGenerated ? (
                <button 
                  className={`generate-button ${!inputText ? 'disabled' : ''}`}
                  onClick={handleGenerate}
                  disabled={!inputText || isGenerating}
                >
                  {isGenerating ? (
                    <><span className="spinner"></span> Generating...</>
                  ) : (
                    'Generate Captions'
                  )}
                </button>
              ) : (
                <button 
                  className="reset-button"
                  onClick={handleReset}
                >
                  Start New Session
                </button>
              )}
            </div>
          </div>
          
          {captionsGenerated && (
            <div className="results-container">
              <div className="captions-grid">
                <div className="caption-category">
                  <h3 className="category-title">🔥 Trendy & Funky Captions</h3>
                  <div className="captions-list">
                    {dummyCaptions.funkyCaptions.map((caption, index) => (
                      <div 
                        key={`funky-${index}`} 
                        className="caption-item"
                        onClick={() => handleCopy(caption)}
                      >
                        <div className="caption-text">{caption}</div>
                        <div className="copy-indicator">Click to Copy</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="caption-category">
                  <h3 className="category-title">💼 Professional & Brand Captions</h3>
                  <div className="captions-list">
                    {dummyCaptions.professionalCaptions.map((caption, index) => (
                      <div 
                        key={`pro-${index}`} 
                        className="caption-item"
                        onClick={() => handleCopy(caption)}
                      >
                        <div className="caption-text">{caption}</div>
                        <div className="copy-indicator">Click to Copy</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="performance-section">
                <h3 className="performance-title">Optimization Insights</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <span className="stat-value">{dummyCaptions.stats.engagementScore}%</span>
                    <span className="stat-label">Predicted Engagement Rate</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">{dummyCaptions.stats.optimalLength}</span>
                    <span className="stat-label">Ideal Caption Length</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-value">{dummyCaptions.stats.bestPlatforms.join(' • ')}</span>
                    <span className="stat-label">Recommended Platforms</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="features-section">
          <h2 className="features-title">Why Our Caption Generator?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🚀</div>
              <h3>Viral Potential</h3>
              <p>Captions optimized for maximum shareability and engagement</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Platform-Specific</h3>
              <p>Tailored captions for Instagram, LinkedIn, TikTok & more</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Trend Integration</h3>
              <p>Real-time integration of trending hashtags and phrases</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📈</div>
              <h3>Performance AI</h3>
              <p>Predictive analytics for caption effectiveness</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎨</div>
              <h3>Tone Matching</h3>
              <p>Generate casual, professional, or creative tones</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🔁</div>
              <h3>Smart Repurposing</h3>
              <p>Automatically adapt captions across platforms</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="captions-footer">
        {/* Same footer structure as previous pages */}
      </footer>
    </div>
  );
}

export default CaptionsPage;