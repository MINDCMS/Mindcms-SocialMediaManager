import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import BlogsPage from './pages/BlogsPage';
import VideoGeneratingPage from './pages/VideoGeneratingPage';
import CaptionsPage from './pages/CaptionsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/blogs" element={<BlogsPage />} />
        <Route path="/video-generating" element={<VideoGeneratingPage />} />
        <Route path="/captions" element={<CaptionsPage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

const HomePageLink = ({ to, icon, title, description }) => (
  <Link to={to} className="box-link">
    <div className="box">
      <div className="box-content">
        <i className="box-icon">{icon}</i>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  </Link>
);

function HomePage() {
  return (
    <div className="app-container">
      <header className="header">
        <div className="logo-container">
          {/* <div className="logo">YourLogo</div> */}
          <h1 className="website-name">MINDCMS.AI</h1>
        </div>
      </header>
      
      <main className="main-content">
        <h2 className="welcome-text">Welcome to Your Platform</h2>
        <p className="subtitle">Choose an option below to get started</p>
        
        <div className="boxes-container">
          <HomePageLink to="/blogs" icon="📝" title="Blogs" description="Explore our collection of insightful articles" />
          <HomePageLink to="/video-generating" icon="🎬" title="Video Generating" description="Create stunning videos with our tools" />
          <HomePageLink to="/captions" icon="💬" title="Caption or Posts for Ads" description="Generate engaging captions for your advertisements" />
        </div>
      </main>
      
      <footer className="footer">
        <p>&copy; 2025 MINDCMS.AI. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
