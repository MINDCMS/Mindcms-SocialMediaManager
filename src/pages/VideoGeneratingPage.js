// import React from 'react';
// import { Link } from 'react-router-dom';

// function VideoGeneratingPage() {
//   return (
//     <div className="page-container">
//       <div className="page-content">
//         <h1>Video Generating Page</h1>
//         <p>This is the video generating page content.</p>
//         <Link to="/" className="back-button">Back to Home</Link>
//       </div>
//     </div>
//   );
// }

// export default VideoGeneratingPage;




//2nd code



// VideoGeneratingPage.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './VideoGeneratingPage.css';

function VideoGeneratingPage() {
  const [description, setDescription] = useState('');
  const [videoGenerated, setVideoGenerated] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  
  // Dummy data for generated video
  const dummyVideo = {
    title: "Generated Video: " + (description || "AI in Modern Technology"),
    videoUrl: "https://www.youtube.com/live/Xtr3dUAX-PQ?si=ZQzXuHt-ELfrDpTP", // Replace with actual video URL
    script: `[Opening Scene: Futuristic interface with AI elements]
    Narrator: "${description || "Welcome to the future of technology where AI transforms everyday life..."}"
    
    [Scene 2: Data visualization]
    ${description || "Advanced algorithms process information at unprecedented speeds..."}
    
    [Closing Scene: Call to action]
    "Stay ahead of the curve with cutting-edge AI solutions."`,
    seoElements: {
      title: description || "AI Technology Explained | Video Series",
      description: `A dynamic video presentation about ${description || "modern AI advancements and their impact on society"}`,
      tags: ["AI Technology", "Future Tech", "Digital Innovation"]
    },
    analytics: {
      engagementScore: 92,
      predictedViews: "150K+",
      optimalPostingTime: "Weekdays 2-4 PM EST"
    }
  };

  const handleGenerateVideo = () => {
    if (!description) return;
    
    setIsGenerating(true);
    
    // Simulate generation delay
    setTimeout(() => {
      setIsGenerating(false);
      setVideoGenerated(true);
    }, 3000);
  };

  const handleReset = () => {
    setDescription('');
    setVideoGenerated(false);
  };

  return (
    <div className="video-generating-page">
      <header className="video-header">
        <div className="logo-container">
          {/* <div className="logo">YourLogo</div> */}
          <h1 className="website-name">Video Creator Pro</h1>
        </div>
        <nav className="video-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/blogs" className="nav-link">Blog Generator</Link>
          <Link to="/captions" className="nav-link">Caption Generator</Link>
        </nav>
      </header>
      
      <div className="hero-section">
        <h1 className="hero-title">AI-Powered Video Creation Studio</h1>
        <p className="hero-subtitle">Transform text descriptions into professional-quality videos in minutes</p>
        <div className="hero-stats">
          <div className="stat-item">
            <span className="stat-number">4K</span>
            <span className="stat-label">Resolution Support</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">50+</span>
            <span className="stat-label">Visual Styles</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">100%</span>
            <span className="stat-label">Auto-Optimized</span>
          </div>
        </div>
      </div>

      <main className="video-main-content">
        <div className="form-container">
          <div className="form-card">
            <h2 className="form-title">Create Your Video</h2>
            <p className="form-description">Describe your video concept below (minimum 50 characters)</p>
            
            <div className="input-group">
              <label htmlFor="description">Video Description *</label>
              <textarea
                id="description"
                placeholder="E.g., 'A 1-minute explainer video about AI in healthcare with futuristic animations and upbeat background music'"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isGenerating || videoGenerated}
                required
                minLength="50"
              />
            </div>
            
            <div className="button-group">
              {!videoGenerated ? (
                <button 
                  className={`generate-button ${!description ? 'disabled' : ''}`}
                  onClick={handleGenerateVideo}
                  disabled={!description || isGenerating}
                >
                  {isGenerating ? (
                    <><span className="spinner"></span> Generating Video...</>
                  ) : (
                    'Generate Video'
                  )}
                </button>
              ) : (
                <button 
                  className="reset-button"
                  onClick={handleReset}
                >
                  Create New Video
                </button>
              )}
            </div>
          </div>
          
          {videoGenerated && (
            <div className="result-container">
              <div className="video-preview">
                <h2 className="video-title">{dummyVideo.title}</h2>
                <div className="video-wrapper">
                  <iframe
                    title="generated-video"
                    src={dummyVideo.videoUrl}
                    allowFullScreen
                  />
                </div>
              </div>
              
              <div className="production-details">
                <h3 className="details-title">Production Elements</h3>
                
                <div className="detail-section">
                  <h4>Video Script</h4>
                  <div className="script-content">
                    {dummyVideo.script.split('\n').map((line, index) => (
                      <p key={index}>{line}</p>
                    ))}
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>SEO Optimization</h4>
                  <div className="seo-tags">
                    <div className="seo-tag">
                      <span className="tag-label">Title:</span>
                      <span className="tag-value">{dummyVideo.seoElements.title}</span>
                    </div>
                    <div className="seo-tag">
                      <span className="tag-label">Description:</span>
                      <span className="tag-value">{dummyVideo.seoElements.description}</span>
                    </div>
                    <div className="seo-tag">
                      <span className="tag-label">Tags:</span>
                      <span className="tag-value">{dummyVideo.seoElements.tags.join(', ')}</span>
                    </div>
                  </div>
                </div>
                
                <div className="detail-section">
                  <h4>Performance Analytics</h4>
                  <div className="analytics-grid">
                    <div className="metric">
                      <span className="metric-value">{dummyVideo.analytics.engagementScore}/100</span>
                      <span className="metric-label">Engagement Score</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">{dummyVideo.analytics.predictedViews}</span>
                      <span className="metric-label">Predicted Views</span>
                    </div>
                    <div className="metric">
                      <span className="metric-value">{dummyVideo.analytics.optimalPostingTime}</span>
                      <span className="metric-label">Best Posting Time</span>
                    </div>
                  </div>
                </div>
                
                <div className="button-group">
                  <button className="download-button">Download Video</button>
                  <button className="share-button">Share Online</button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="features-section">
          <h2 className="features-title">Advanced Video Creation Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🎬</div>
              <h3>Smart Scene Generation</h3>
              <p>AI-powered scene creation with automatic visual matching to your script</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎵</div>
              <h3>Dynamic Soundtracks</h3>
              <p>Automatically generated background music that matches video mood</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Real-time Analytics</h3>
              <p>Predictive performance metrics before you publish</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Multi-language Support</h3>
              <p>Auto-generated subtitles in 50+ languages</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💡</div>
              <h3>Smart Editing Tools</h3>
              <p>AI-powered trimming, transition suggestions, and B-roll recommendations</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Format Optimization</h3>
              <p>Automatic formatting for all platforms (YouTube, Instagram, TikTok)</p>
            </div>
          </div>
        </div>
      </main>

      <footer className="video-footer">
        {/* Same footer structure as BlogsPage */}
      </footer>
    </div>
  );
}

export default VideoGeneratingPage;