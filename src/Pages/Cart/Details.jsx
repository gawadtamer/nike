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
          overflow: hidden;
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
          max-width: 1300px !important;
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
        .cart-subtitle {
          font-size: 1rem;
          color: rgba(255,255,255,0.45);
          margin: 0;
        }
        .cart-count-circle {
          width: 90px; height: 90px;
          border-radius: 50%;
          background: rgba(0, 242, 255, 0.08);
          border: 2px solid rgba(0, 242, 255, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          box-shadow: 0 0 30px rgba(0, 242, 255, 0.15);
        }
        .cart-count-num {
          font-size: 2rem;
          font-weight: 900;
          color: #00f2ff;
          line-height: 1;
        }
        .cart-count-label {
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 2px;
          color: rgba(255,255,255,0.4);
        }

        /* ── BODY LAYOUT ── */
        .cart-body {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: 30px;
          align-items: start;
        }

        /* ── ITEM CARD ── */
        .cart-item-card {
          display: flex;
          align-items: center;
          gap: 0;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 24px;
          overflow: hidden;
          margin-bottom: 20px;
          transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
        }
        .cart-item-card:hover {
          border-color: rgba(0, 242, 255, 0.25);
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,242,255,0.1);
          transform: translateY(-3px);
        }
        .cart-item-img-wrap {
          width: 200px;
          min-width: 200px;
          height: 170px;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
        }
        .cart-item-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }
        .cart-item-card:hover .cart-item-img { transform: scale(1.08); }
        .cart-item-img-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(90deg, transparent 60%, rgba(0,0,0,0.7));
        }
        .cart-item-info {
          flex: 1;
          padding: 28px 25px;
        }
        .cart-item-tag {
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 3px;
          color: #00f2ff;
        }
        .cart-item-name {
          font-size: 1.4rem;
          font-weight: 900;
          margin: 8px 0 15px;
          letter-spacing: -0.5px;
        }
        .cart-item-meta {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .cart-item-rating {
          font-size: 0.85rem;
          color: rgba(255,255,255,0.5);
        }
        .cart-item-rating i { color: #ffc107; }
        .cart-item-size {
          font-size: 0.8rem;
          font-weight: 700;
          letter-spacing: 1px;
          color: rgba(255,255,255,0.35);
          padding: 4px 12px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
        }
        .cart-item-right {
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          gap: 20px;
          padding: 28px 30px;
          min-width: 160px;
        }
        .cart-item-price {
          font-size: 1.6rem;
          font-weight: 900;
          letter-spacing: -1px;
          background: linear-gradient(135deg, #fff, rgba(255,255,255,0.7));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        .cart-remove-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 60, 60, 0.07);
          border: 1px solid rgba(255, 60, 60, 0.18);
          color: #ff4d4d;
          padding: 10px 20px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.78rem;
          letter-spacing: 1px;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .cart-remove-btn:hover {
          background: rgba(255, 60, 60, 0.15);
          border-color: rgba(255, 60, 60, 0.4);
          box-shadow: 0 8px 20px rgba(255,60,60,0.2);
        }

        /* ── SUMMARY CARD ── */
        .cart-summary-col { position: sticky; top: 110px; }
        .cart-summary-card {
          background: rgba(255,255,255,0.03);
          backdrop-filter: blur(30px);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 28px;
          padding: 40px;
          box-shadow: 0 30px 80px rgba(0,0,0,0.4);
        }
        .cart-summary-title {
          font-size: 1rem;
          font-weight: 800;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.5);
          margin-bottom: 30px;
          text-transform: uppercase;
        }
        .cart-summary-rows { display: flex; flex-direction: column; gap: 18px; }
        .cart-summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.95rem;
          color: rgba(255,255,255,0.6);
        }
        .cart-summary-row .text-success { color: #00f2a0 !important; font-weight: 700; }
        .cart-summary-divider {
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
          margin: 25px 0;
        }
        .cart-summary-total {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 1.4rem;
          font-weight: 900;
          margin-bottom: 30px;
          letter-spacing: -0.5px;
        }
        .cart-summary-total span:first-child {
          font-size: 0.9rem;
          letter-spacing: 3px;
          color: rgba(255,255,255,0.5);
          font-weight: 700;
        }
        .cart-checkout-btn {
          width: 100%;
          padding: 20px;
          background: linear-gradient(135deg, #00f2ff, #ff00ff);
          border: none;
          border-radius: 16px;
          color: #000;
          font-size: 0.95rem;
          font-weight: 900;
          letter-spacing: 2px;
          cursor: pointer;
          transition: all 0.4s ease;
          box-shadow: 0 15px 40px rgba(0, 242, 255, 0.25);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .cart-continue-link {
          display: block;
          text-align: center;
          margin-top: 18px;
          font-size: 0.85rem;
          font-weight: 600;
          color: rgba(255,255,255,0.4);
          text-decoration: none;
          letter-spacing: 0.5px;
          transition: color 0.3s;
        }
        .cart-continue-link:hover { color: #00f2ff; }
        .cart-trust-badges {
          display: flex;
          justify-content: space-between;
          margin-top: 30px;
          padding-top: 25px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .trust-badge {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          font-size: 0.7rem;
          color: rgba(255,255,255,0.35);
          text-align: center;
          font-weight: 600;
          letter-spacing: 0.5px;
        }
        .trust-badge i { font-size: 1.2rem; color: rgba(0, 242, 255, 0.5); }

        /* ── EMPTY STATE ── */
        .cart-empty {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 100px 40px;
          background: rgba(255,255,255,0.02);
          border: 1px dashed rgba(255,255,255,0.08);
          border-radius: 28px;
        }
        .cart-empty-icon-wrap {
          position: relative;
          width: 120px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 30px;
        }
        .cart-empty-icon {
          font-size: 4rem;
          background: linear-gradient(135deg, #00f2ff, #ff00ff);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          position: relative;
          z-index: 1;
        }
        .cart-empty-icon-ring {
          position: absolute;
          inset: 0;
          border-radius: 50%;
          border: 2px solid rgba(0, 242, 255, 0.15);
          animation: ringPulse 2.5s ease-in-out infinite;
        }
        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.15); opacity: 1; }
        }
        .cart-empty-title {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 12px;
          letter-spacing: -0.5px;
        }
        .cart-empty-sub {
          font-size: 1rem;
          color: rgba(255,255,255,0.4);
          line-height: 1.7;
          margin-bottom: 40px;
        }
        .cart-empty-btn {
          display: inline-flex;
          align-items: center;
          background: linear-gradient(135deg, #00f2ff, #ff00ff);
          color: #000;
          font-weight: 900;
          font-size: 0.9rem;
          letter-spacing: 2px;
          padding: 18px 45px;
          border-radius: 14px;
          text-decoration: none;
          transition: all 0.4s ease;
          box-shadow: 0 15px 40px rgba(0, 242, 255, 0.25);
        }
        .cart-empty-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 25px 60px rgba(0, 242, 255, 0.45);
          color: #000;
        }

        /* ── RESPONSIVE ── */
        @media (max-width: 1100px) {
          .cart-body { grid-template-columns: 1fr; }
          .cart-summary-col { position: static; }
        }
        @media (max-width: 768px) {
          .cart-header-card { flex-direction: column; align-items: flex-start; gap: 20px; padding: 30px; }
          .cart-item-card { flex-direction: column; }
          .cart-item-img-wrap { width: 100%; min-width: unset; height: 220px; }
          .cart-item-img-overlay { background: linear-gradient(0deg, rgba(0,0,0,0.7) 0%, transparent 50%); }
          .cart-item-right { flex-direction: row; align-items: center; justify-content: space-between; padding: 20px 25px; width: 100%; }
          .cart-summary-card { padding: 30px; }
        }
      `}</style>
    </div>
  );
}

export default Details;