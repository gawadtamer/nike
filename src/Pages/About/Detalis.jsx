import React, { useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'

function Detalis() {
  // Activate dark theme for this page
  useEffect(() => {
    document.body.classList.add('about-page-active');
    return () => document.body.classList.remove('about-page-active');
  }, []);



  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <div className="about-page">


      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <div className="row align-items-center">
            <motion.div 
              className="col-lg-6"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              <h1 className="hero-title">
                <span className="outline">NIKE</span>
                FUTURE <span className="text-primary-glow">REACT</span>
              </h1>
              <p className="hero-desc">
                We don't just sell shoes; we deliver the future of movement. Experience the perfect blend of innovation, comfort, and street style.
              </p>
              <div className="hero-actions">
                <motion.button 
                  className="btn-main me-4"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Join the Future
                </motion.button>
              </div>
            </motion.div>

            <motion.div 
              className="col-lg-6 hero-img-wrapper"
              initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              style={{ y }}
            >
              <img src="/img/about-hero.svg" alt="Nike Future" className="hero-img" />
              <div className="hero-glow"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="services-section">
        <div className="container text-center">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Our Ecosystem
          </motion.h2>

          <div className="row mt-5 pt-5">
            {[
              { icon: "fa-bolt", title: "Instant Access", desc: "Get early access to exclusive drops and limited editions." },
              { icon: "fa-globe", title: "Global Reach", desc: "Seamless shipping across 150+ countries with real-time tracking." },
              { icon: "fa-shield-alt", title: "Authenticity", desc: "Guaranteed 100% original products verified by experts." },
              { icon: "fa-infinity", title: "24/7 Energy", desc: "Support that never sleeps. We're here whenever you need us." }
            ].map((item, i) => (
              <motion.div 
                className="col-md-6 col-lg-3 mb-5"
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="service-card">
                  <i className={`fas ${item.icon}`}></i>
                  <h4>{item.title}</h4>
                  <p className="text-muted small">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brands Section */}
      <section className="brands-section">
        <div className="container text-center">
          <motion.h2 
            className="section-title"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Powering Partnerships
          </motion.h2>

          <div className="brands-slider mt-5 pt-5">
            <motion.div 
              className="brands-track"
              animate={{ x: [0, -1000] }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
            >
              {[1, 2, 3, 4, 1, 2, 3, 4, 1, 2, 3, 4].map((item, i) => (
                <div className="brand-item" key={i}>
                  <img src={`/img/brand_0${item}.png`} alt={`Brand ${item}`} />
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer Teaser */}
      <section className="py-5 text-center" style={{ background: '#000' }}>
        <motion.div
           initial={{ opacity: 0 }}
           whileInView={{ opacity: 1 }}
           className="container py-5"
        >
          <h3 className="mb-4">Ready to step up?</h3>
          <button className="btn-main">Start Your Journey</button>
        </motion.div>
      </section>
    </div>
  )
}

export default Detalis
