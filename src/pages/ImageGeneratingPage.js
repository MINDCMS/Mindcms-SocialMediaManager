// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './ImageGeneratingPage.css';

// function ImageGeneratingPage() {
//   const [description, setDescription] = useState('');
//   const [imageData, setImageData] = useState(null);
//   const [isGenerating, setIsGenerating] = useState(false);

//   const handleGenerateImage = async () => {
//     if (!description || description.length < 10) return;

//     setIsGenerating(true);
//     try {
//       const response = await fetch('http://127.0.0.1:8000/generate-image/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ prompt: description }),
//       });

//       if (!response.ok) throw new Error('Failed to generate image');

//       const data = await response.json();

//       setImageData({
//         imageUrl: `data:image/png;base64,${data.image_base64}`,
//         description: description,
//       });

//     } catch (error) {
//       alert('Error generating image: ' + error.message);
//     } finally {
//       setIsGenerating(false);
//     }
//   };

//   const handleReset = () => {
//     setDescription('');
//     setImageData(null);
//   };

//   return (
//     <div className="image-generating-page">
//       <header className="image-header">
//         <div className="logo-container">
//           <h1 className="website-name">Image Creator Pro</h1>
//         </div>
//         <nav className="image-nav">
//           <Link to="/" className="nav-link">Home</Link>
//           <Link to="/blogs" className="nav-link">Blog Generator</Link>
//           <Link to="/captions" className="nav-link">Caption Generator</Link>
//         </nav>
//       </header>

//       <div className="hero-section">
//         <h1 className="hero-title">AI-Powered Image Creation Studio</h1>
//         <p className="hero-subtitle">Transform text descriptions into high-quality images</p>
//       </div>

//       <main className="image-main-content">
//         <div className="form-container">
//           <div className="form-card">
//             <h2 className="form-title">Create Your Image</h2>
//             <p className="form-description">Describe your image concept below (minimum 10 characters)</p>

//             <div className="input-group">
//               <label htmlFor="description">Image Description *</label>
//               <textarea
//                 id="description"
//                 placeholder="E.g., 'A beautiful sunset over a mountain range'"
//                 value={description}
//                 onChange={(e) => setDescription(e.target.value)}
//                 disabled={isGenerating || !!imageData}
//                 required
//                 minLength="10"
//               />
//             </div>

//             <div className="button-group">
//               {!imageData ? (
//                 <button
//                   className={`generate-button ${!description || description.length < 10 ? 'disabled' : ''}`}
//                   onClick={handleGenerateImage}
//                   disabled={!description || description.length < 10 || isGenerating}
//                 >
//                   {isGenerating ? (
//                     <><span className="spinner"></span> Generating Image...</>
//                   ) : (
//                     'Generate Image'
//                   )}
//                 </button>
//               ) : (
//                 <button className="reset-button" onClick={handleReset}>
//                   Create New Image
//                 </button>
//               )}
//             </div>
//           </div>

//           {imageData && (
//             <div className="result-container">
//               <div className="image-preview">
//                 <h2 className="image-title">Generated Image</h2>
//                 <div className="image-wrapper">
//                   <img
//                     src={imageData.imageUrl}
//                     alt="Generated"
//                     className="generated-image"
//                   />
//                 </div>
//               </div>

//               <div className="production-details">
//                 <h3 className="details-title">Image Description</h3>
//                 <div className="script-content">
//                   <p>{imageData.description}</p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </main>

//       <footer className="image-footer">
//         {/* Add your footer content here */}
//       </footer>
//     </div>
//   );
// }

// export default ImageGeneratingPage;





import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './ImageGeneratingPage.css';

function ImageGeneratingPage() {
  const [description, setDescription] = useState('');
  const [imageData, setImageData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateImage = async () => {
    if (!description || description.length < 10) return;

    setIsGenerating(true);
    try {
      const response = await fetch('http://127.0.0.1:8000/generate-image/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: description }),
      });

      if (!response.ok) throw new Error('Failed to generate image');

      const data = await response.json();

      setImageData({
        imageUrl: `data:image/png;base64,${data.image_base64}`,
        description: description,
      });

    } catch (error) {
      alert('Error generating image: ' + error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setDescription('');
    setImageData(null);
  };

  const handleDownloadImage = () => {
    const link = document.createElement('a');
    link.href = imageData.imageUrl;
    link.download = 'generated_image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="image-generating-page">
      <header className="image-header">
        <div className="logo-container">
          <h1 className="website-name">Image Creator Pro</h1>
        </div>
        <nav className="image-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/blogs" className="nav-link">Blog Generator</Link>
          <Link to="/captions" className="nav-link">Caption Generator</Link>
        </nav>
      </header>

      <div className="hero-section">
        <h1 className="hero-title">AI-Powered Image Creation Studio</h1>
        <p className="hero-subtitle">Transform text descriptions into high-quality images</p>
      </div>

      <main className="image-main-content">
        <div className="form-container">
          <div className="form-card">
            <h2 className="form-title">Create Your Image</h2>
            <p className="form-description">Describe your image concept below (minimum 10 characters)</p>

            <div className="input-group">
              <label htmlFor="description">Image Description *</label>
              <textarea
                id="description"
                placeholder="E.g., 'A beautiful sunset over a mountain range'"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={isGenerating || !!imageData}
                required
                minLength="10"
              />
            </div>

            <div className="button-group">
              {!imageData ? (
                <button
                  className={`generate-button ${!description || description.length < 10 ? 'disabled' : ''}`}
                  onClick={handleGenerateImage}
                  disabled={!description || description.length < 10 || isGenerating}
                >
                  {isGenerating ? (
                    <><span className="spinner"></span> Generating Image...</>
                  ) : (
                    'Generate Image'
                  )}
                </button>
              ) : (
                <button className="reset-button" onClick={handleReset}>
                  Create New Image
                </button>
              )}
            </div>
          </div>

          {imageData && (
            <div className="result-container">
              <div className="image-preview">
                <h2 className="image-title">Generated Image</h2>
                <div className="image-wrapper">
                  <img
                    src={imageData.imageUrl}
                    alt="Generated"
                    className="generated-image"
                  />
                </div>
                <div className="download-button-container">
                  <button className="download-button" onClick={handleDownloadImage}>
                    Download Image
                  </button>
                </div>
              </div>

              <div className="production-details">
                <h3 className="details-title">Image Description</h3>
                <div className="script-content">
                  <p>{imageData.description}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      <footer className="image-footer">
        {/* Add your footer content here */}
      </footer>
    </div>
  );
}

export default ImageGeneratingPage;
