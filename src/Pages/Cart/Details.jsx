import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from './CartContext';

function Details() {
  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div className="cart-page-wrapper" style={{ 
      background: "linear-gradient(135deg, #001f1a, #000000, #0a1010)",
      minHeight: "100vh",
      color: "white",
      paddingTop: "100px",
      paddingBottom: "120px",
      position: 'relative'
    }}>
      {/* Background Animated Glows */}
      <motion.div 
        className="bg-glow bg-glow-1"
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 8, repeat: Infinity }}
      ></motion.div>
      <motion.div 
        className="bg-glow bg-glow-2"
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity }}
      ></motion.div>

      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-10">
            {/* Header */}
            <div className="cart-header mb-5 p-5 rounded-4" style={{
              background: "rgba(255, 255, 255, 0.02)",
              backdropFilter: "blur(30px)",
              border: "1px solid rgba(255, 255, 255, 0.05)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 40px 100px rgba(0,0,0,0.5)"
            }}>
              <div>
                <motion.h2 
                  className="section-title m-0"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  style={{ fontSize: "3rem", fontWeight: "900", letterSpacing: '-1px', background: "linear-gradient(135deg, #00ff8c, #00d4ff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
                >
                  CART <span className="text-white" style={{ opacity: 0.3 }}>DROP</span>
                </motion.h2>
                <p className="m-0 text-muted mt-2">Check your selections before the drop sells out.</p>
              </div>
              <div className="cart-stats text-end">
                <span style={{ fontSize: '1.2rem', color: '#00ffae', fontWeight: '800' }}>{cartItems.length}</span>
                <span className="text-muted d-block small uppercase" style={{ letterSpacing: '2px' }}>ITEMS TOTAL</span>
              </div>
            </div>

            {/* Cart Items List */}
            <AnimatePresence mode="popLayout">
              {cartItems.length > 0 ? (
                <div className="cart-items-list d-flex flex-column gap-4">
                  {cartItems.map((product, index) => (
                    <motion.div 
                      key={product.cartId}
                      layout
                      initial={{ opacity: 0, x: -50 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 50, scale: 0.9 }}
                      transition={{ duration: 0.5, ease: "circOut" }}
                      className="cart-item-card"
                    >
                      <div className="row g-0 align-items-center">
                        <div className="col-md-3">
                          <div className="cart-img-container">
                            <img src={`/img/${product.img}`} alt={product.name} />
                          </div>
                        </div>
                        <div className="col-md-6 p-4">
                          <div className="item-details">
                            <span className="item-tag">EXCLUSIVE DROP</span>
                            <h3 className="item-title mt-2">{product.name}</h3>
                            <div className="item-meta d-flex gap-3 align-items-center mt-3">
                              <span className="item-price">${product.price}.00</span>
                              <div className="item-rating"><i className="fas fa-star text-warning"></i> 4.9</div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-3 p-4 text-end">
                          <motion.button 
                            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 77, 77, 0.15)' }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => removeFromCart(product.cartId)}
                            className="remove-btn"
                          >
                            <i className="fas fa-trash-alt me-2"></i>
                            REMOVE
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="empty-state text-center py-5 rounded-5"
                  style={{ background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.1)' }}
                >
                  <i className="fas fa-shopping-cart mb-4" style={{ fontSize: '5rem', color: 'rgba(0, 255, 174, 0.1)' }}></i>
                  <h3 className="text-white-50">Storage Empty</h3>
                  <p className="text-muted">You haven't added any products to your cart yet.</p>
                  <motion.a 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="/Shop" 
                    className="btn mt-4"
                    style={{ background: '#00ffae', color: '#000', fontWeight: '900', borderRadius: '50px', padding: '15px 40px', letterSpacing: '1px' }}
                  >
                    BACK TO SHOP
                  </motion.a>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <style>{`
        .cart-item-card { 
          background: rgba(255, 255, 255, 0.02); 
          border: 1px solid rgba(255, 255, 255, 0.04); 
          border-radius: 30px; 
          overflow: hidden; 
          backdrop-filter: blur(20px);
          transition: border-color 0.3s ease;
        }
        .cart-item-card:hover { border-color: rgba(0, 255, 174, 0.2); }
        
        .cart-img-container { height: 180px; width: 100%; overflow: hidden; }
        .cart-img-container img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
        .cart-item-card:hover .cart-img-container img { transform: scale(1.1); }
        
        .item-tag { font-size: 10px; font-weight: 800; color: #00ffae; letter-spacing: 2px; }
        .item-title { font-size: 1.4rem; font-weight: 800; margin: 0; }
        .item-price { font-size: 1.2rem; font-weight: 900; color: #fff; }
        .item-rating { font-size: 0.9rem; opacity: 0.6; }
        
        .remove-btn { 
          background: rgba(255, 77, 77, 0.08); 
          border: 1px solid rgba(255, 77, 77, 0.2); 
          color: #ff4d4d; 
          padding: 12px 25px; 
          border-radius: 50px; 
          font-weight: 800; 
          font-size: 0.8rem; 
          cursor: pointer; 
          transition: all 0.3s ease;
        }
        
        .bg-glow { position: absolute; width: 600px; height: 600px; border-radius: 50%; filter: blur(120px); z-index: 0; pointer-events: none; }
        .bg-glow-1 { top: -200px; right: -100px; background: #00ffae; }
        .bg-glow-2 { bottom: -200px; left: -100px; background: #00d4ff; }
      `}</style>
    </div>
  )
}

export default Details