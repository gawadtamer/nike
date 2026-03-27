import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';

function Details({ page = 1 }) {
  const { addToCart } = useContext(CartContext);
  // تحديد المنتجات حسب الصفحة
  const allProducts = [
    "shop_01.jpg", "shop_02.jpg", "shop_03.jpg",
    "shop_04.jpg", "shop_05.jpg", "shop_06.jpg",
    "shop_07.jpg", "shop_08.jpg", "shop_09.jpg",
    "shop_10.jpg", "shop_11.jpg", "product_single_01.jpg",
    "product_single_02.jpg", "product_single_03.jpg", "product_single_04.jpg",
    "product_single_05.jpg", "product_single_06.jpg", "product_single_07.jpg"
  ];

  const productsPerPage = 6;
  const startIndex = (page - 1) * productsPerPage;
  const pageProducts = allProducts.slice(startIndex, startIndex + productsPerPage).map((img, i) => ({
    id: startIndex + i,
    name: "NIKE FUTURE REACT V2",
    price: 250,
    img: img
  }));

  return (
    <div className="shop-page-wrapper" style={{ 
      background: "linear-gradient(135deg, #001f1a, #000000, #0a0a0a)",
      minHeight: "100vh",
      color: "white",
      paddingTop: "60px"
    }}>
      {/* Background Glows */}
      <div className="bg-glow bg-glow-1"></div>
      <div className="bg-glow bg-glow-2"></div>

      <div className="container py-5">
        <div className="row">
          <div className="col-12">
            {/* Header */}
            <div className="shop-header mb-5 p-4 rounded-4" style={{
              background: "rgba(255, 255, 255, 0.03)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.08)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
            }}>
              <motion.h2 
                className="section-title m-0"
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                style={{ fontSize: "2.5rem", fontWeight: "800", background: "linear-gradient(135deg, #00ffae, #fff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
              >
                FUTURE <span className="text-white">SHOP</span>
              </motion.h2>

              <motion.div 
                className="shop-controls d-flex align-items-center gap-3"
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <div className="search-wrapper position-relative">
                  <input 
                    type="text" 
                    placeholder="Search drops..." 
                    className="form-control shop-input" 
                    style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(0,255,174,0.3)", color: "white", borderRadius: "50px", padding: "10px 25px 10px 45px", transition: "all 0.3s ease" }}
                  />
                  <i className="fas fa-search position-absolute" style={{ left: "18px", top: "50%", transform: "translateY(-50%)", color: "#00ffae" }}></i>
                </div>
              </motion.div>
            </div>

            {/* Products Grid */}
            <div className="row g-4 mt-2">
              {pageProducts.map((product, index) => (
                <motion.div 
                  className="col-md-6 col-lg-4" 
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                >
                  <div className="shop-product-card">
                    <div className="product-image-wrapper">
                      <img src={`/img/${product.img}`} alt="Product" className="product-img" />
                      <div className="product-overlay-new">
                        <div className="overlay-actions">
                          <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="action-btn"><i className="far fa-heart"></i></motion.button>
                          <motion.button 
                            whileHover={{ scale: 1.1 }} 
                            whileTap={{ scale: 0.9 }} 
                            className="action-btn primary"
                            onClick={() => addToCart(product)}
                          >
                            <i className="fas fa-shopping-cart"></i> ADD TO CART
                          </motion.button>
                        </div>
                      </div>
                      <div className="price-tag">${product.price}.00</div>
                    </div>
                    <div className="product-details p-4">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="badge-new">NEW DROP</span>
                        <div className="rating">
                          <i className="fas fa-star text-warning"></i> 4.9
                        </div>
                      </div>
                      <h4 className="product-name">{product.name}</h4>
                      <p className="product-desc-short text-muted small">Experience gravity-defying comfort with the next gen React technology.</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="pagination-wrapper mt-5 pt-5 text-center">
              <div className="d-inline-flex gap-2 p-2 rounded-5" style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link to="/Shop" className={`page-btn ${page === 1 ? 'active' : ''}`}>1</Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link to="/Shop/page2" className={`page-btn ${page === 2 ? 'active' : ''}`}>2</Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.1 }}>
                  <Link to="/Shop/page3" className={`page-btn ${page === 3 ? 'active' : ''}`}>3</Link>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Brands Section */}
      <section className="brands-section mt-5">
        <div className="container text-center">
          <motion.h2 
            className="section-title mb-5"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ fontSize: "2rem", color: "#00ffae" }}
          >
            Trusted All Over The <span className="text-white">World</span>
          </motion.h2>

          <div className="brands-slider mt-5">
            <motion.div 
              className="brands-track"
              animate={{ x: [0, -1000] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
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

      {/* Styles */}
      <style>{`
        .shop-page-wrapper { position: relative; overflow: hidden; }
        .bg-glow { position: absolute; width: 500px; height: 500px; border-radius: 50%; filter: blur(100px); z-index: 0; opacity: 0.15; pointer-events: none; }
        .bg-glow-1 { top: -100px; right: -100px; background: #00ffae; }
        .bg-glow-2 { bottom: -100px; left: -100px; background: #00ffae; }
        .shop-product-card { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 25px; overflow: hidden; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); backdrop-filter: blur(10px); }
        .shop-product-card:hover { transform: translateY(-15px); border-color: rgba(0, 255, 174, 0.4); box-shadow: 0 25px 50px rgba(0,0,0,0.5); }
        .product-image-wrapper { position: relative; height: 320px; overflow: hidden; }
        .product-img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.6s ease; }
        .shop-product-card:hover .product-img { transform: scale(1.1); }
        .product-overlay-new { position: absolute; inset: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; opacity: 0; transition: all 0.4s ease; }
        .shop-product-card:hover .product-overlay-new { opacity: 1; }
        .overlay-actions { display: flex; flex-direction: column; gap: 15px; transform: translateY(20px); transition: all 0.4s ease; }
        .shop-product-card:hover .overlay-actions { transform: translateY(0); }
        .action-btn { border: none; padding: 12px 25px; border-radius: 50px; font-weight: 700; font-size: 0.9rem; cursor: pointer; background: rgba(255,255,255,0.1); color: white; backdrop-filter: blur(5px); border: 1px solid rgba(255,255,255,0.2); }
        .action-btn.primary { background: #00ffae; color: #000; border: none; }
        .price-tag { position: absolute; top: 20px; right: 20px; background: #00ffae; color: #000; padding: 5px 15px; border-radius: 50px; font-weight: 800; font-size: 0.9rem; box-shadow: 0 5px 15px rgba(0,255,174,0.3); }
        .badge-new { background: rgba(255,255,255,0.1); padding: 4px 12px; border-radius: 4px; font-size: 10px; font-weight: 700; letter-spacing: 1px; }
        .product-name { font-size: 1.2rem; font-weight: 700; margin: 10px 0; }
        .page-btn { width: 45px; height: 45px; border-radius: 50%; border: 1px solid rgba(255,255,255,0.1); background: transparent; color: white; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s ease; text-decoration: none; }
        .page-btn:hover, .page-btn.active { background: #00ffae; color: #000; border-color: #00ffae; }
        .shop-input:focus { background: rgba(255,255,255,0.1) !important; border-color: #00ffae !important; box-shadow: 0 0 15px rgba(0,255,174,0.2) !important; color: white !important; }
      `}</style>
    </div>
  )
}

export default Details;