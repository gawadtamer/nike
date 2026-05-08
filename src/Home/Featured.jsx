import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';


function Featured() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    },
    hover: {
      y: -15,
      scale: 1.03,
      zIndex: 10,
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    }
  };

  const products = [
    {
      id: 1,
      img: process.env.PUBLIC_URL + "/img/feature_prod_01.jpg",
      title: "Gym Weight",
      price: "$240.00",
      rating: 3,
      reviews: 24
    },
    {
      id: 2,
      img: process.env.PUBLIC_URL + "/img/feature_prod_02.jpg",
      title: "Cloud Nike Shoes",
      price: "$480.00",
      rating: 3,
      reviews: 48
    },
    {
      id: 3,
      img: process.env.PUBLIC_URL + "/img/feature_prod_03.jpg",
      title: "Summer Adidas Shoes",
      price: "$360.00",
      rating: 5,
      reviews: 74
    }
  ];

  return (
    <section className="featured-section">
      <div className="container featured-layout">

        {/* LEFT SIDE */}
        <motion.div 
          className="featured-left"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h1 className="left-title">Upgrade Your Workout</h1>
          <p className="left-desc">
            Discover premium gym equipment and stylish sportswear to boost your performance.
          </p>
          <Link to="/Shop" className="shop-btn">Shop Now</Link>

        </motion.div>

        {/* RIGHT SIDE */}
        <div className="featured-right">

          {/* Header */}
          <motion.div 
            className="header-section"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="section-title">Featured Product</h1>
            <p className="section-desc">
              Reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            </p>
          </motion.div>

          {/* Products */}
          <motion.div 
            className="products-container"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="products-grid">
              {products.map((product) => (
                <motion.div
                  key={product.id}
                  className="product-card-wrapper"
                  variants={cardVariants}
                  whileHover="hover"
                  onHoverStart={() => setHoveredCard(product.id)}
                  onHoverEnd={() => setHoveredCard(null)}
                >
                  <motion.div 
                    className="product-card"
                    whileTap={{ scale: 0.98 }}
                    layout
                  >
                    {/* IMAGE */}
                    <div className="product-image-container">
                      <motion.img
                        src={product.img}
                        alt={product.title}
                        className="product-image"
                        whileHover={{ 
                          scale: 1.08,
                          rotateY: hoveredCard === product.id ? 5 : 0
                        }}
                        transition={{ duration: 0.5 }}
                      />

                      <motion.div 
                        className="image-overlay"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Link
                          to="/Shop"
                          className="view-btn text-decoration-none"
                        >
                          View Details
                        </Link>

                      </motion.div>
                    </div>

                    {/* INFO */}
                    <div className="product-info">
                      <div className="rating-price">
                        <div className="stars">
                          {[...Array(5)].map((_, i) => (
                            <i
                              key={i}
                              className={`star ${i < product.rating ? 'filled' : ''}`}
                            >
                              ★
                            </i>
                          ))}
                        </div>
                        <span className="price">{product.price}</span>
                      </div>
                      
                      <Link to="/Shop" className="text-decoration-none">
                        <motion.h3 
                          className="product-title"
                          whileHover={{ x: 8 }}
                        >
                          {product.title}
                        </motion.h3>
                      </Link>

                      
                      <p className="product-desc">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                      </p>
                      
                      <div className="reviews">
                        <span>{product.reviews} Reviews</span>
                      </div>
                    </div>

                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

export default Featured;