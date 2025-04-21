// CaptionsPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './CaptionsPage.css';

function CaptionsPage() {
  const [inputText, setInputText] = useState('');
  const [captionsGenerated, setCaptionsGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [captions, setCaptions] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = () => {
    if (!inputText.trim()) {
      setError('Please enter some content to generate captions');
      return;
    }

    setIsGenerating(true);
    setError(null);

    fetch('http://127.0.0.1:8000/generate/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ vibe: inputText, n: 5 }), // Sending vibe and n to match backend
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'Failed to generate captions');
        }
        return data;
      })
      .then((data) => {
        // Process the response to extract valid captions
        const processedCaptions = data.captions 
          ? data.captions.filter(line => line.trim() && !line.startsWith("Without the photo's vibe"))
          : [];
        
        setCaptions(processedCaptions);
        setCaptionsGenerated(true);
      })
      .catch((err) => {
        console.error('Generation error:', err);
        setError(err.message || 'Failed to generate captions. Please try again.');
      })
      .finally(() => {
        setIsGenerating(false);
      });
  };

  const handleReset = () => {
    setInputText('');
    setCaptionsGenerated(false);
    setCaptions(null);
    setError(null);
  };

  const handleCopy = (text, event) => {
    event.preventDefault();
    navigator.clipboard.writeText(text)
      .then(() => {
        const target = event.currentTarget;
        const copyIndicator = target.querySelector('.copy-indicator');
        const originalText = copyIndicator.textContent;
        copyIndicator.textContent = 'Copied!';
        setTimeout(() => {
          copyIndicator.textContent = originalText;
        }, 2000);
      })
      .catch((err) => {
        console.error('Failed to copy:', err);
      });
  };

  return (
    <div className="captions-page">
      {/* Header */}
      <header className="captions-header">
        <div className="logo-container">
          <h1 className="website-name">Caption Gen</h1>
        </div>
        <nav className="captions-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/blogs" className="nav-link">Blog Generator</Link>
          <Link to="/video-generating" className="nav-link">Image Generator</Link>
        </nav>
      </header>

      {/* Hero Section */}
      <div className="hero-section">
        <h1 className="hero-title">AI-Powered Caption Generation</h1>
        <p className="hero-subtitle">Create viral-worthy captions for any platform in seconds</p>
        <div className="hero-stats">
          <div className="stat-item"><span className="stat-number">5+</span><span className="stat-label">Captions Generated at a Time</span></div>
          <div className="stat-item"><span className="stat-number">95%</span><span className="stat-label">Engagement Boost</span></div>
          {/* <div className="stat-item"><span className="stat-number">50+</span><span className="stat-label">Industries Supported</span></div> */}
        </div>
      </div>

      {/* Main Content */}
      <main className="captions-main-content">
        <div className="form-container">
          <div className="form-card">
            <h2 className="form-title">Generate Perfect Captions</h2>
            <p className="form-description">Describe your post content or upload context</p>

            <div className="input-group">
              <label htmlFor="captionInput">Content Description *</label>
              <textarea
                id="captionInput"
                placeholder="E.g., 'A fitness post showing before/after transformation...'"
                value={inputText}
                onChange={(e) => {
                  setInputText(e.target.value);
                  if (error) setError(null);
                }}
                disabled={isGenerating || captionsGenerated}
                required
              />
            </div>

            <div className="button-group">
              {!captionsGenerated ? (
                <button
                  className={`generate-button ${!inputText.trim() ? 'disabled' : ''}`}
                  onClick={handleGenerate}
                  disabled={!inputText.trim() || isGenerating}
                >
                  {isGenerating ? (
                    <><span className="spinner"></span> Generating...</>
                  ) : (
                    'Generate Captions'
                  )}
                </button>
              ) : (
                <button className="reset-button" onClick={handleReset}>Start New Session</button>
              )}
            </div>
            {error && <p className="error-text">{error}</p>}
          </div>

          {/* Results Section */}
          {captionsGenerated && captions && (
            <div className="results-container">
              <h2 className="results-title">Generated Captions</h2>
              
              {captions.length > 0 ? (
                <div className="captions-list">
                  {captions.map((caption, index) => (
                    <div 
                      key={`caption-${index}`} 
                      className="caption-item" 
                      onClick={(e) => handleCopy(caption, e)}
                    >
                      <div className="caption-text">{caption}</div>
                      <div className="copy-indicator">Click to Copy</div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="no-captions-message">No captions were generated. Please try again with different input.</p>
              )}
            </div>
          )}
        </div>
      </main>

      <footer className="captions-footer">
        <p>&copy; 2025 Caption Gen. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default CaptionsPage;
