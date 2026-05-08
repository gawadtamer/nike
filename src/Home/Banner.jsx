import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'



function Banner() {
  const [currentSlide, setCurrentSlide] = useState(0)


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 3)
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="nike-banner-wrapper">

      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
        <div className="particle particle-4"></div>
        <div className="particle particle-5"></div>
      </div>

      {/* Main Hero Carousel */}
      <div className="nike-hero-carousel carousel slide" data-bs-ride="carousel">
        <ol className="carousel-indicators nike-indicators">
          <li onClick={() => setCurrentSlide(0)} className={currentSlide === 0 ? "active" : ""}></li>
          <li onClick={() => setCurrentSlide(1)} className={currentSlide === 1 ? "active" : ""}></li>
          <li onClick={() => setCurrentSlide(2)} className={currentSlide === 2 ? "active" : ""}></li>
        </ol>

        <div className="carousel-inner">
          {/* Slide 1 */}
          <div className={`carousel-item ${currentSlide === 0 ? 'active' : ''}`}>
            <div className="nike-slide-bg slide-bg-1"></div>
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last nike-image-container">
                  <div className="nike-shoe-float">
                    <img className="img-fluid nike-shoe-img" src={process.env.PUBLIC_URL + "/img/banner_img_01.jpg"} alt="Nike Air" />
                    <div className="shoe-glow"></div>
                  </div>
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="nike-content">
                    <div className="nike-badge">NEW ARRIVAL</div>
                    <h1 className="nike-h1 animate-slide-up">
                      <span className="nike-text-stroke"><b>NIKE</b></span> 
                      <span className="nike-gradient-text">AIR MAX</span>
                    </h1>
                    <h3 className="nike-subtitle animate-slide-up delay-1">Just Do It</h3>
                    <p className="nike-desc animate-slide-up delay-2">
                      Experience the future of performance. Engineered for speed, style, and comfort.
                    </p>
                    <div className="nike-cta animate-slide-up delay-3">
                      <Link to="/Shop" className="btn-nike-primary">SHOP NOW</Link>
                      <button className="btn-nike-secondary">WATCH VIDEO</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 2 */}
          <div className={`carousel-item ${currentSlide === 1 ? 'active' : ''}`}>
            <div className="nike-slide-bg slide-bg-2"></div>
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last nike-image-container">
                  <div className="nike-shoe-float rotate">
                    <img className="img-fluid nike-shoe-img" src={process.env.PUBLIC_URL + "/img/banner_img_02.jpg"} alt="Nike Dunk" />
                    <div className="shoe-glow"></div>
                  </div>
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="nike-content">
                    <div className="nike-badge nike-badge-alt">LIMITED EDITION</div>
                    <h1 className="nike-h1 animate-slide-up">
                      <span className="nike-gradient-text-alt"><b>NIKE</b> DUNK</span>
                      <span className="nike-text-stroke">LOW</span>
                    </h1>
                    <h3 className="nike-subtitle animate-slide-up delay-1">Classic Reborn</h3>
                    <p className="nike-desc animate-slide-up delay-2">
                      Iconic style meets modern comfort. Limited drop - don't miss out.
                    </p>
                    <div className="nike-cta animate-slide-up delay-3">
                      <Link to="/Shop" className="btn-nike-primary">GRAB YOURS</Link>
                      <Link to="/Shop" className="btn-nike-secondary">VIEW ALL</Link>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Slide 3 */}
          <div className={`carousel-item ${currentSlide === 2 ? 'active' : ''}`}>
            <div className="nike-slide-bg slide-bg-3"></div>
            <div className="container">
              <div className="row p-5">
                <div className="mx-auto col-md-8 col-lg-6 order-lg-last nike-image-container">
                  <div className="nike-shoe-float float-reverse">
                    <img className="img-fluid nike-shoe-img" src={process.env.PUBLIC_URL + "/img/banner_img_03.jpg"} alt="Nike React" />
                    <div className="shoe-glow"></div>
                  </div>
                </div>
                <div className="col-lg-6 mb-0 d-flex align-items-center">
                  <div className="nike-content">
                    <div className="nike-badge">BEST SELLER</div>
                    <h1 className="nike-h1 animate-slide-up">
                      <span className="nike-text-stroke"><b>NIKE</b></span>
                      <span className="nike-gradient-text">REACT</span>
                    </h1>
                    <h3 className="nike-subtitle animate-slide-up delay-1">Unstoppable Energy</h3>
                    <p className="nike-desc animate-slide-up delay-2">
                      Feel the energy. React technology delivers unmatched responsiveness.
                    </p>
                    <div className="nike-cta animate-slide-up delay-3">
                      <Link to="/Shop" className="btn-nike-primary">SHOP COLLECTION</Link>
                      <button className="btn-nike-secondary">FIND STORE</button>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          type="button"
          className="carousel-control-prev nike-control-prev"
          onClick={() => setCurrentSlide((prev) => (prev + 2) % 3)}
          aria-label="Previous slide"
        >
          <i className="fas fa-chevron-left"></i>
        </button>
        <button
          type="button"
          className="carousel-control-next nike-control-next"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % 3)}
          aria-label="Next slide"
        >
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>

      {/* Scroll Indicator */}
      <button
        type="button"
        className="scroll-indicator"
        onClick={() => {
          const target = document.getElementById('categories');
          if (target) target.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <div className="scroll-line"></div>
        <p>SCROLL</p>
      </button>
    </div>
  )
}

export default Banner