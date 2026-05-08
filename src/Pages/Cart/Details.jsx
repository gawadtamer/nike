import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CartContext } from './CartContext';
import { Link } from 'react-router-dom';

function Details() {
  const { cartItems, removeFromCart } = useContext(CartContext);
  const totalPrice = cartItems.reduce((sum, item) => sum + Number(item.price), 0);

  return (
    <div className="cart-page-wrapper">
      {/* Ambient Glows */}
      <div className="cart-glow cart-glow-1" />
      <div className="cart-glow cart-glow-2" />
      <div className="cart-glow cart-glow-3" />

      <div className="container cart-container">

        {/* ── HEADER ── */}
        <motion.div
          className="cart-header-card"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <div className="cart-header-left">
            <div className="cart-label">YOUR BAG</div>
            <h1 className="cart-title">
              <span className="cart-title-gradient">CART</span>
              <span className="cart-title-dim"> DROP</span>
            </h1>
            <p className="cart-subtitle">Check your selections before the drop sells out.</p>
          </div>
          <div className="cart-header-right">
            <div className="cart-count-circle">
              <span className="cart-count-num">{cartItems.length}</span>
              <span className="cart-count-label">ITEMS</span>
            </div>
          </div>
        </motion.div>

        {/* ── BODY ── */}
        <div className="cart-body">

          {/* LEFT — Items List */}
          <div className="cart-items-col">
            <AnimatePresence mode="popLayout">
              {cartItems.length > 0 ? (
                cartItems.map((product, index) => (
                  <motion.div
                    key={product.cartId}
                    layout
                    initial={{ opacity: 0, x: -60 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 60, scale: 0.92 }}
                    transition={{ duration: 0.45, delay: index * 0.07, ease: 'easeOut' }}
                    className="cart-item-card"
                  >
                    {/* Image */}
                    <div className="cart-item-img-wrap">
                      <img
                        src={process.env.PUBLIC_URL + `/img/${product.img}`}
                        alt={product.name}
                        className="cart-item-img"
                      />
                      <div className="cart-item-img-overlay" />
                    </div>

                    {/* Info */}
                    <div className="cart-item-info">
                      <span className="cart-item-tag">EXCLUSIVE DROP</span>
                      <h3 className="cart-item-name">{product.name}</h3>
                      <div className="cart-item-meta">
                        <div className="cart-item-rating">
                          <i className="fas fa-star" /> 4.9
                        </div>
                        <div className="cart-item-size">SIZE: US 10</div>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="cart-item-right">
                      <div className="cart-item-price">${product.price}.00</div>
                      <motion.button
                        whileHover={{ scale: 1.06 }}
                        whileTap={{ scale: 0.94 }}
                        onClick={() => removeFromCart(product.cartId)}
                        className="cart-remove-btn"
                      >
                        <i className="fas fa-trash-alt" />
                        <span>REMOVE</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ))
              ) : (
                /* Empty State */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="cart-empty"
                >
                  <div className="cart-empty-icon-wrap">
                    <i className="fas fa-shopping-bag cart-empty-icon" />
                    <div className="cart-empty-icon-ring" />
                  </div>
                  <h3 className="cart-empty-title">Your Bag is Empty</h3>
                  <p className="cart-empty-sub">You haven't added any products yet.<br />Explore our latest drops below.</p>
                  <Link to="/Shop" className="cart-empty-btn">
                    <i className="fas fa-arrow-left me-2" />
                    BACK TO SHOP
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT — Order Summary */}
          {cartItems.length > 0 && (
            <motion.div
              className="cart-summary-col"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="cart-summary-card">
                <div className="cart-summary-title">Order Summary</div>

                <div className="cart-summary-rows">
                  <div className="cart-summary-row">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>${totalPrice}.00</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Shipping</span>
                    <span className="text-success">FREE</span>
                  </div>
                  <div className="cart-summary-row">
                    <span>Estimated Tax</span>
                    <span>${Math.round(totalPrice * 0.08)}.00</span>
                  </div>
                </div>

                <div className="cart-summary-divider" />

                <div className="cart-summary-total">
                  <span>TOTAL</span>
                  <span>${totalPrice + Math.round(totalPrice * 0.08)}.00</span>
                </div>

                <motion.button
                  whileHover={{ scale: 1.03, boxShadow: '0 20px 50px rgba(0,242,255,0.4)' }}
                  whileTap={{ scale: 0.97 }}
                  className="cart-checkout-btn"
                >
                  PROCEED TO CHECKOUT
                  <i className="fas fa-arrow-right ms-2" />
                </motion.button>

                <Link to="/Shop" className="cart-continue-link">
                  <i className="fas fa-chevron-left me-1" />
                  Continue Shopping
                </Link>

                {/* Trust Badges */}
                <div className="cart-trust-badges">
                  <div className="trust-badge"><i className="fas fa-shield-alt" /><span>Secure Payment</span></div>
                  <div className="trust-badge"><i className="fas fa-undo" /><span>Free Returns</span></div>
                  <div className="trust-badge"><i className="fas fa-truck" /><span>Fast Shipping</span></div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      <style>{`
        /* ── WRAPPER ── */
        .cart-page-wrapper {
          background: #000;
          min-height: 100vh;
          padding: 120px 0 100px;
          position: relative;
          overflow-x: hidden;
          color: #fff;
          font-family: 'Roboto', sans-serif;
        }

        /* ── GLOWS ── */
        .cart-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(130px);
          pointer-events: none;
          z-index: 0;
        }
        .cart-glow-1 {
          width: 500px; height: 500px;
          top: -150px; right: -100px;
          background: rgba(0, 242, 255, 0.08);
          animation: glowPulse 8s ease-in-out infinite;
        }
        .cart-glow-2 {
          width: 400px; height: 400px;
          bottom: 0; left: -100px;
          background: rgba(255, 0, 255, 0.07);
          animation: glowPulse 10s ease-in-out infinite 2s;
        }
        .cart-glow-3 {
          width: 300px; height: 300px;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          background: rgba(0, 242, 255, 0.04);
          animation: glowPulse 12s ease-in-out infinite 4s;
        }
        @keyframes glowPulse {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.15); }
        }

        /* ── CONTAINER ── */
        .cart-container {
          position: relative;
          z-index: 1;
          width: 100%;
          max-width: 1300px !important;
          margin: 0 auto;
          padding: 0 15px;
        }

        /* ── HEADER CARD ── */
        .cart-header-card {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 28px;
          padding: 40px 50px;
          margin-bottom: 40px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.4);
        }
        @media (max-width: 768px) {
          .cart-header-card { flex-direction: column; align-items: flex-start; gap: 20px; padding: 30px 25px; }
          .cart-title { font-size: 2.2rem !important; }
        }
        
        .cart-label {
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 4px;
          color: var(--nike-cyan, #00f2ff);
          margin-bottom: 10px;
        }
        .cart-title {
          font-size: clamp(2.5rem, 6vw, 4.5rem);
          font-weight: 900;
          letter-spacing: -2px;
          line-height: 1;
          margin: 0 0 12px;
          text-transform: uppercase;
        }
        .cart-title-gradient {
          background: linear-gradient(135deg, #00f2ff, #ff00ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .cart-title-dim { color: rgba(255,255,255,0.15); }
        .cart-subtitle { font-size: 1rem; color: rgba(255,255,255,0.45); margin: 0; }
        
        .cart-count-circle {
          width: 80px; height: 80px;
          border-radius: 50%;
          background: rgba(0, 242, 255, 0.08);
          border: 1px solid rgba(0, 242, 255, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* ── BODY LAYOUT ── */
        .cart-body {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 30px;
          align-items: start;
        }
        @media (max-width: 1100px) {
          .cart-body { grid-template-columns: 1fr; }
        }

        /* ── ITEM CARD ── */
        .cart-item-card {
          display: flex;
          align-items: center;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 20px;
          transition: all 0.3s ease;
        }
        @media (max-width: 768px) {
          .cart-item-card { flex-direction: column; }
        }
        
        .cart-item-img-wrap {
          width: 180px; height: 160px;
          position: relative; overflow: hidden; flex-shrink: 0;
        }
        @media (max-width: 768px) {
          .cart-item-img-wrap { width: 100%; height: 200px; }
        }
        
        .cart-item-img { width: 100%; height: 100%; object-fit: cover; }
        .cart-item-info { flex: 1; padding: 25px; }
        .cart-item-tag { font-size: 9px; font-weight: 800; letter-spacing: 2px; color: #00f2ff; }
        .cart-item-name { font-size: 1.3rem; font-weight: 900; margin: 8px 0 12px; }
        .cart-item-meta { display: flex; align-items: center; gap: 15px; }
        .cart-item-size { font-size: 0.75rem; font-weight: 700; color: rgba(255,255,255,0.4); padding: 4px 10px; border: 1px solid rgba(255,255,255,0.1); border-radius: 20px; }

        .cart-item-right {
          display: flex; flex-direction: column; align-items: flex-end; gap: 15px; padding: 25px 30px; min-width: 150px;
        }
        @media (max-width: 768px) {
          .cart-item-right { flex-direction: row; width: 100%; justify-content: space-between; align-items: center; border-top: 1px solid rgba(255,255,255,0.05); padding: 15px 25px; }
        }
        .cart-item-price { font-size: 1.5rem; font-weight: 900; color: #fff; }
        .cart-remove-btn {
          background: rgba(255, 60, 60, 0.1); border: 1px solid rgba(255, 60, 60, 0.2); color: #ff4d4d;
          padding: 8px 18px; border-radius: 10px; font-weight: 800; font-size: 0.75rem; cursor: pointer;
        }

        /* ── SUMMARY CARD ── */
        .cart-summary-card {
          background: rgba(255,255,255,0.03); backdrop-filter: blur(30px); border: 1px solid rgba(255,255,255,0.07);
          border-radius: 28px; padding: 35px; box-shadow: 0 30px 80px rgba(0,0,0,0.4);
        }
        @media (max-width: 768px) { .cart-summary-card { padding: 25px; } }
        
        .cart-summary-title { font-size: 0.9rem; font-weight: 800; letter-spacing: 2px; color: rgba(255,255,255,0.5); margin-bottom: 25px; text-transform: uppercase; }
        .cart-summary-row { display: flex; justify-content: space-between; font-size: 0.9rem; color: rgba(255,255,255,0.6); margin-bottom: 15px; }
        .cart-summary-divider { height: 1px; background: rgba(255,255,255,0.08); margin: 20px 0; }
        .cart-summary-total { display: flex; justify-content: space-between; align-items: center; font-size: 1.3rem; font-weight: 900; margin-bottom: 25px; }
        .cart-checkout-btn {
          width: 100%; padding: 18px; background: linear-gradient(135deg, #00f2ff, #ff00ff); border: none; border-radius: 14px;
          color: #000; font-size: 0.9rem; font-weight: 900; letter-spacing: 1.5px; cursor: pointer; box-shadow: 0 10px 30px rgba(0, 242, 255, 0.2);
        }

        /* ── EMPTY STATE ── */
        .cart-empty { padding: 80px 30px; text-align: center; background: rgba(255,255,255,0.02); border: 1px dashed rgba(255,255,255,0.1); border-radius: 28px; }
        .cart-empty-title { font-size: 1.8rem; font-weight: 900; margin-bottom: 10px; }
        .cart-empty-btn { display: inline-flex; background: linear-gradient(135deg, #00f2ff, #ff00ff); color: #000; font-weight: 900; padding: 15px 35px; border-radius: 12px; text-decoration: none; }
      `}</style>
    </div>
  );
}

export default Details;