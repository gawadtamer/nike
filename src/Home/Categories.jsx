import React from 'react'
import { Link } from 'react-router-dom'


function Categories() {
  const categories = [
    {
      id: 1,
      title: "Air Max",
      subtitle: "Performance",
      image: "./img/category_img_01.jpg",
      color: "#ff6b6b",
      gradient: "linear-gradient(135deg, #ff6b6b, #ff8e8e)"
    },
    {
      id: 2,
      title: "Dunk Low",
      subtitle: "Streetwear",
      image: "./img/category_img_02.jpg",
      color: "#4ecdc4",
      gradient: "linear-gradient(135deg, #4ecdc4, #44d3cf)"
    },
    {
      id: 3,
      title: "React Infinity",
      subtitle: "Running",
      image: "./img/category_img_03.jpg",
      color: "#45b7d1",
      gradient: "linear-gradient(135deg, #45b7d1, #2196f3)"
    }
  ];

  return (
    <div id="categories" className="nike-categories-section">
      {/* Header */}
      <div className="container">
        <div className="section-header animate-fade-in">
          <div className="section-badge">EXPLORE</div>
          <h2 className="section-title">Featured Collections</h2>
          <p className="section-subtitle">
            Discover our latest drops. Engineered for champions.
          </p>
        </div>
      </div>

      {/* Categories Grid */}
      <div className="container">
        <div className="categories-grid">
          {categories.map((category, index) => (
            <div 
              key={category.id} 
              className={`category-card animate-slide-up delay-${index}`}
              style={{ '--card-color': category.color, '--card-gradient': category.gradient }}
            >
              <div className="card-overlay"></div>
              <div className="card-image-container">
                <img 
                  src={category.image} 
                  alt={category.title}
                  className="category-image"
                />
                <div className="image-overlay"></div>
                <div className="floating-elements">
                  <div className="float-circle circle-1"></div>
                  <div className="float-circle circle-2"></div>
                  <div className="float-circle circle-3"></div>
                </div>
              </div>
              
              <div className="card-content">
                <div className="category-badge">{category.subtitle}</div>
                <h3 className="category-title">{category.title}</h3>
                <div className="cta-wrapper">
                  <Link to="/Shop" className="cta-button">
                    <span>Shop Collection</span>
                    <i className="fa fa-arrow-right"></i>
                  </Link>

                </div>
              </div>

              {/* Hover Stats */}
              <div className="card-stats">
                <div className="stat-item">
                  <span className="stat-number">1,247</span>
                  <span className="stat-label">Products</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">4.9</span>
                  <span className="stat-label">Rating</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Background Particles */}
      <div className="section-particles">
        <div className="particle particle-a"></div>
        <div className="particle particle-b"></div>
        <div className="particle particle-c"></div>
      </div>
    </div>
  )
}

export default Categories