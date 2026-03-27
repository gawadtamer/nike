import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';



function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 2000);
    }
  };

  const socialLinks = [
    { icon: 'fab fa-facebook-f', href: 'http://facebook.com/', color: '#1877F2' },
    { icon: 'fab fa-instagram', href: 'https://www.instagram.com/', color: '#E4405F' },
    { icon: 'fab fa-twitter', href: 'https://twitter.com/', color: '#1DA1F2' },
    { icon: 'fab fa-linkedin', href: 'https://www.linkedin.com/', color: '#0077B5' }
  ];

  const footerData = {
    company: {
      name: "Zay Shop",
      address: "123 Consectetur at ligula 10660",
      phone: "010-020-0340",
      email: "info@company.com"
    },
    products: [
      "Luxury", "Sport Wear", "Men's Shoes", "Women's Shoes",
      "Popular Dress", "Gym Accessories", "Sport Shoes"
    ],
    info: [
      "Home", "About Us", "Shop Locations", "FAQs", "Contact"
    ]
  };

  return (
    <footer className="footer-section">
      <div className="container">
        <motion.div 
          className="footer-content"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Company Info */}
          <motion.div className="footer-column" variants={itemVariants}>
            <motion.h2 
              className="footer-logo"
              whileHover={{ scale: 1.02, rotate: 2 }}
            >
              Zay Shop
            </motion.h2>
            <ul className="contact-list">
              <li className="contact-item">
                <i className="fas fa-map-marker-alt"></i>
                <span>{footerData.company.address}</span>
              </li>
              <li className="contact-item">
                <i className="fas fa-phone"></i>
                <a href={`tel:${footerData.company.phone}`}>{footerData.company.phone}</a>
              </li>
              <li className="contact-item">
                <i className="fas fa-envelope"></i>
                <a href={`mailto:${footerData.company.email}`}>{footerData.company.email}</a>
              </li>
            </ul>
          </motion.div>

          {/* Products */}
          <motion.div className="footer-column" variants={itemVariants}>
            <motion.h3 
              className="footer-title"
              whileHover={{ x: 5 }}
            >
              Products
            </motion.h3>
            <ul className="footer-links">
              {footerData.products.map((item, index) => (
                <motion.li 
                  key={item}
                  className="footer-link"
                  initial={{ opacity: 0, x: -20 }}
                  whileHover={{ x: 5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to="/Shop">{item}</Link>

                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Further Info */}
          <motion.div className="footer-column" variants={itemVariants}>
            <motion.h3 
              className="footer-title"
              whileHover={{ x: 5 }}
            >
              Further Info
            </motion.h3>
            <ul className="footer-links">
              {footerData.info.map((item, index) => (
                <motion.li 
                  key={item}
                  className="footer-link"
                  initial={{ opacity: 0, x: -20 }}
                  whileHover={{ x: 5 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link to={
                    item === "Home" ? "/" : 
                    item === "About Us" ? "/About" : 
                    item === "Contact" ? "/contact" : "/Shop"
                  }>
                    {item}
                  </Link>

                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div 
          className="footer-bottom"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          <div className="divider"></div>
          
          <div className="bottom-content">
            <div className="social-section">
              <ul className="social-icons">
                {socialLinks.map((social, index) => (
                  <motion.li 
                    key={social.icon}
                    className="social-icon"
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: 360,
                      boxShadow: `0 0 25px ${social.color}40`
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                  >
                    <a href={social.href} target="_blank" rel="noopener noreferrer">
                      <i className={social.icon}></i>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="subscribe-section">
              <form onSubmit={handleSubscribe} className="subscribe-form">
                <div className="input-wrapper">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="subscribe-input"
                  />
                  <motion.button
                    type="submit"
                    className={`subscribe-btn ${isSubscribed ? 'subscribed' : ''}`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>

          <div className="copyright">
            <p>
              Copyright © 2024 Zay Shop | Designed by{' '}
              <a href="https://templatemo.com" target="_blank" rel="noopener noreferrer">
                TemplateMo
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;