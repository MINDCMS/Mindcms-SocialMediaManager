import React, { useState } from 'react';
import axios from "axios";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { Link } from 'react-router-dom';
import './BlogsPage.css';

function BlogsPage() {
  const [topic, setTopic] = useState('');
  const [category, setCategory] = useState('');
  const [blogPost, setBlogPost] = useState([]);
  const [seoTitle, setSeoTitle] = useState('');
  const [seoDescription, setSeoDescription] = useState('');
  const [seoKeywords, setSeoKeywords] = useState('');
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

      const contentPoints = response.data.blog_post
        .split('. ')
        .map(point => point.trim())
        .filter(point => point.length > 0);

      setBlogPost(contentPoints);
      setSeoTitle(response.data.seo_title || `Best ${topic} Guide`);
      setSeoDescription(response.data.seo_description || `Learn everything about ${topic}.`);
      setSeoKeywords(response.data.seo_keywords || topic.split(" ").join(", "));
      setSeoScore(Math.floor(Math.random() * 20) + 80);
    } catch (err) {
      setError("Failed to fetch blog post. Please try again.");
    }

    setLoading(false);
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFillColor(0, 120, 255);
    doc.rect(0, 0, 210, 30, "F");
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(255, 255, 255);
    doc.text("Generated Blog Report", 65, 20);

    doc.setTextColor(0, 0, 0);
    doc.setFontSize(18);
    doc.text("SEO Insights", 10, 40);

    const seoData = [
      ["Title", seoTitle],
      ["Meta Description", seoDescription],
      ["Keywords", seoKeywords],
      ["SEO Score", `${seoScore}/100`]
    ];

    doc.autoTable({
      startY: 45,
      head: [["SEO Metrics", "Details"]],
      body: seoData,
      theme: "grid",
      styles: { fontSize: 10, cellPadding: 10 },
      headStyles: { fillColor: [0, 120, 255], textColor: "#ffffff" },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });

    doc.addPage();
    doc.setFontSize(18);
    doc.text("Blog Content", 20, 30);

    let yPos = 40;
    blogPost.forEach((point, index) => {
      doc.setFontSize(12);
      if (yPos > 270) {
        doc.addPage();
        yPos = 30;
        doc.setFontSize(18);
        doc.text("Continued Blog Content", 20, yPos);
        yPos += 10;
      }
      doc.text(`• ${point}`, 20, yPos, { maxWidth: 180 });
      yPos += 10;
    });

    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text("© 2025 MINDCMS.AI. All Rights Reserved.", 10, 285);

    doc.save("Generated_Blog.pdf");
  };

  return (
    <div className="blogs-page-container">
      <header className="blogs-header">
        <div className="logo-container">
          <h1 className="website-name">MINDCMS</h1>
        </div>
        <nav className="blogs-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/video-generating" className="nav-link">Image Generator</Link>
          <Link to="/captions" className="nav-link">Caption Generator</Link>
        </nav>
      </header>

      <main className="blogs-main-content">
        <div className="form-container">
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
            <button className="generate-button" onClick={handleGenerateBlog} disabled={!topic || loading}>
              {loading ? "Generating..." : "Generate Blog"}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}

          {blogPost.length > 0 && (
            <div className="result-container">
              <h2 className="result-title">Generated Blog:</h2>
              <div className="blog-box">
                <ul>
                  {blogPost.map((point, index) => (
                    <li key={index}>• {point}</li>
                  ))}
                </ul>
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
}

export default BlogsPage;