import React, { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./BlogsPage.css";
import { Link } from "react-router-dom";

const BlogsPage = () => {
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("");
  const [blogPost, setBlogPost] = useState("");
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");
  const [seoKeywords, setSeoKeywords] = useState("");
  const [seoScore, setSeoScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleGenerateBlog = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://127.0.0.1:8000/generate-blog/", {
        topic,
        category,
      });

      setBlogPost(response.data.blog_post);
      setSeoTitle(response.data.seo_title || `Best ${topic} Guide`);
      setSeoDescription(response.data.seo_description || `Learn everything about ${topic} in this blog.`);
      setSeoKeywords(response.data.seo_keywords || topic.split(" ").join(", "));

      // SEO Score Calculation (Dummy Logic)
      setSeoScore(Math.floor(Math.random() * 20) + 80);
    } catch (err) {
      setError("Failed to fetch blog post. Please try again.");
    }

    setLoading(false);
  };

  const getSeoScoreColor = (score) => {
    if (score >= 90) return "#28a745"; // Excellent (Green)
    if (score >= 80) return "#ffc107"; // Good (Orange)
    return "#dc3545"; // Needs Improvement (Red)
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text("Generated Blog Report", 70, 15);
    doc.line(10, 20, 200, 20);

    doc.setFontSize(16);
    doc.text("SEO Insights", 10, 30);
    doc.setFontSize(12);
    doc.text(`Title: ${seoTitle}`, 10, 40);
    doc.text(`Meta Description: ${seoDescription}`, 10, 50);
    doc.text(`Keywords: ${seoKeywords}`, 10, 60);
    doc.text(`SEO Score: ${seoScore}/100`, 10, 70);

    doc.setFontSize(16);
    doc.text("Blog Content", 10, 85);
    doc.rect(10, 90, 190, 150);
    doc.setFontSize(12);
    doc.text(blogPost, 15, 100, { maxWidth: 180 });

    doc.save("Generated_Blog.pdf");
  };

  return (
    <div className="blogs-page-container">
      <header className="blogs-header">
        <div className="logo-container">
        <div className="logo">
  {/* <img src="/path/to/logo.png" alt="YourLogo" /> */}
</div>

          <h1 className="website-name">MINDCMS</h1>
        </div>
        <nav className="blogs-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/video-generating" className="nav-link">Video Generator</Link>
          <Link to="/captions" className="nav-link">Caption Generator</Link>
        </nav>
      </header>

      <main className="blogs-main-content">
        <div className="form-container">
          <div className="form-card">
            <h2 className="form-title">Generate Your Blog Post</h2>

            <div className="input-group">
              <label htmlFor="topic">Topic *</label>
              <input 
                type="text" 
                id="topic" 
                placeholder="Enter Topic" 
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                disabled={loading}
                required
              />
            </div>

            <div className="input-group">
              <label htmlFor="category">Category (Optional)</label>
              <input 
                type="text" 
                id="category" 
                placeholder="Enter Category" 
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                disabled={loading}
              />
            </div>

            <div className="button-group">
              <button 
                className="generate-button" 
                onClick={handleGenerateBlog} 
                disabled={!topic || loading}
              >
                {loading ? "Generating..." : "Generate Blog"}
              </button>
            </div>
          </div>

          {error && <p className="error-message">{error}</p>}

          {blogPost && (
            <div className="result-container">
              <h2 className="result-title">Generated Blog:</h2>
              <div className="blog-box">{blogPost}</div>

              {/* SEO Insights Section */}
              <div className="seo-container">
                <h3 className="seo-title">🔍 SEO Insights</h3>

                <div className="seo-item">
                  <span className="seo-label">Title:</span>
                  <span className="seo-value">{seoTitle}</span>
                </div>

                <div className="seo-item">
                  <span className="seo-label">Meta Description:</span>
                  <span className="seo-value">{seoDescription}</span>
                </div>

                <div className="seo-item">
                  <span className="seo-label">Keywords:</span>
                  <span className="seo-value">{seoKeywords}</span>
                </div>

                <div className="seo-score-container">
                  <span className="seo-score-label">SEO Score:</span>
                  <span 
                    className="seo-score-value"
                    style={{ backgroundColor: getSeoScoreColor(seoScore) }}>
                    {seoScore}/100
                  </span>
                </div>
              </div>

              <button className="download-button" onClick={handleDownloadPDF}>
                Download as PDF
              </button>
            </div>
          )}
        </div>
      </main>

      <footer className="blogs-footer">
        <p>&copy; 2025 MINDCMS.AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default BlogsPage;
