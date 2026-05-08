import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CartContext } from '../Cart/CartContext';

function Details({ page = 1 }) {
  const { addToCart } = useContext(CartContext);
  const [wishlist, setWishlist] = useState([]);
  const [added, setAdded] = useState(null);

  const allProducts = [
    { img: "shop_01.jpg",           name: "Air Max Pulse",        price: 180, tag: "BESTSELLER" },
    { img: "shop_02.jpg",           name: "React Infinity Run",   price: 160, tag: "NEW DROP" },
    { img: "shop_03.jpg",           name: "ZoomX Vaporfly",       price: 250, tag: "LIMITED" },
    { img: "shop_04.jpg",           name: "Pegasus Trail 4",      price: 140, tag: "NEW DROP" },
    { img: "shop_05.jpg",           name: "Free Run Flyknit",     price: 120, tag: "SALE" },
    { img: "shop_06.jpg",           name: "Metcon 8 Training",    price: 130, tag: "NEW DROP" },
    { img: "shop_07.jpg",           name: "Air Jordan 1 Retro",   price: 190, tag: "LIMITED" },
    { img: "shop_08.jpg",           name: "Dunk Low Essential",   price: 110, tag: "BESTSELLER" },
    { img: "shop_09.jpg",           name: "Blazer Mid '77",       price: 100, tag: "SALE" },
    { img: "shop_10.jpg",           name: "Court Vision Low",     price: 90,  tag: "NEW DROP" },
    { img: "shop_11.jpg",           name: "Waffle Debut",         price: 85,  tag: "NEW DROP" },
    { img: "product_single_01.jpg", name: "React Element 55",     price: 210, tag: "LIMITED" },
    { img: "product_single_02.jpg", name: "Air Max 270",          price: 220, tag: "BESTSELLER" },
    { img: "product_single_03.jpg", name: "Zoom Freak 4",         price: 170, tag: "NEW DROP" },
    { img: "product_single_04.jpg", name: "Kyrie Flytrap 5",      price: 100, tag: "SALE" },
    { img: "product_single_05.jpg", name: "LeBron XX",            price: 200, tag: "LIMITED" },
    { img: "product_single_06.jpg", name: "KD Trey 5 X",         price: 130, tag: "NEW DROP" },
    { img: "product_single_07.jpg", name: "Cosmic Unity 3",       price: 150, tag: "BESTSELLER" },
  ];

  const tagColors = {
    "NEW DROP":   { bg: "rgba(0,242,255,0.12)",  border: "rgba(0,242,255,0.3)",  color: "#00f2ff" },
    "LIMITED":    { bg: "rgba(255,0,255,0.12)",  border: "rgba(255,0,255,0.3)",  color: "#ff00ff" },
    "BESTSELLER": { bg: "rgba(255,193,7,0.12)",  border: "rgba(255,193,7,0.3)",  color: "#ffc107" },
    "SALE":       { bg: "rgba(255,60,60,0.12)",  border: "rgba(255,60,60,0.3)",  color: "#ff4d4d" },
  };

  const productsPerPage = 6;
  const startIndex = (page - 1) * productsPerPage;
  const pageProducts = allProducts.slice(startIndex, startIndex + productsPerPage);

  const toggleWish = (id) => setWishlist(prev =>
    prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
  );

  const handleAdd = (product, id) => {
    addToCart(product);
    setAdded(id);
    setTimeout(() => setAdded(null), 1800);
  };

  return (
    <div className="sp-wrapper">
      <div className="sp-glow sp-glow-1" />
      <div className="sp-glow sp-glow-2" />

      <div className="container sp-container">

        {/* ── HEADER ── */}
        <motion.div className="sp-header"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div>
            <div className="sp-label">COLLECTION</div>
            <h1 className="sp-title">
              <span className="sp-grad">FUTURE</span>
              <span className="sp-dim"> SHOP</span>
            </h1>
            <p className="sp-sub">Engineered for speed. Designed to dominate.</p>
          </div>
          <div className="sp-search-wrap">
            <i className="fas fa-search sp-search-icon" />
            <input type="text" placeholder="Search drops..." className="sp-search" />
          </div>
        </motion.div>

        {/* ── GRID ── */}
        <div className="sp-grid">
          {pageProducts.map((product, i) => {
            const id = startIndex + i;
            const isWished = wishlist.includes(id);
            const isAdded  = added === id;
            const tc = tagColors[product.tag] || tagColors["NEW DROP"];

            return (
              <motion.div key={id} className="sp-card"
                initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.09, duration: 0.55 }}>

                {/* Image Area */}
                <div className="sp-img-wrap">
                  <img src={process.env.PUBLIC_URL + `/img/${product.img}`}
                    alt={product.name} className="sp-img" />

                  {/* Dark gradient bottom so text is readable */}
                  <div className="sp-img-fade" />

                  {/* Tag top-left */}
                  <div className="sp-tag" style={{
                    background: tc.bg, border: `1px solid ${tc.border}`, color: tc.color
                  }}>{product.tag}</div>

                  {/* Wishlist top-right */}
                  <motion.button className={`sp-wish-btn ${isWished ? 'wished' : ''}`}
                    onClick={() => toggleWish(id)}
                    whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }}>
                    <i className={isWished ? "fas fa-heart" : "far fa-heart"} />
                  </motion.button>

                  {/* Hover overlay with Add button */}
                  <div className="sp-overlay">
                    <motion.button className={`sp-add-btn ${isAdded ? 'added' : ''}`}
                      onClick={() => handleAdd({ ...product, id }, id)}
                      whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                      <AnimatePresence mode="wait">
                        {isAdded ? (
                          <motion.span key="done"
                            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <i className="fas fa-check" /> Added!
                          </motion.span>
                        ) : (
                          <motion.span key="add"
                            initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                            <i className="fas fa-shopping-bag" /> ADD TO BAG
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </div>
                </div>

                {/* Info Area */}
                <div className="sp-info">
                  <div className="sp-info-top">
                    <h4 className="sp-name">{product.name}</h4>
                    <div className="sp-rating">
                      <i className="fas fa-star" /> 4.9
                    </div>
                  </div>
                  <div className="sp-info-bottom">
                    <span className="sp-price">${product.price}.00</span>
                    <div className="sp-sizes">
                      {["40", "41", "42"].map(s => (
                        <span key={s} className="sp-size">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* ── PAGINATION ── */}
        <div className="sp-pages">
          {[1, 2, 3].map(p => (
            <Link key={p} to={p === 1 ? "/Shop" : `/Shop/page${p}`}
              className={`sp-page-btn ${page === p ? 'active' : ''}`}>{p}</Link>
          ))}
        </div>
      </div>

      <style>{`
        .sp-wrapper { background:#000; min-height:100vh; padding:100px 0 60px; position:relative; overflow-x:hidden; color:#fff; font-family:'Roboto',sans-serif; }
        .sp-glow { position:absolute; border-radius:50%; filter:blur(130px); pointer-events:none; z-index:0; }
        .sp-glow-1 { width:500px; height:500px; top:-150px; right:-100px; background:rgba(0,242,255,0.07); }
        .sp-glow-2 { width:400px; height:400px; bottom:0; left:-100px; background:rgba(255,0,255,0.06); }
        .sp-container { position:relative; z-index:1; width: 100%; max-width:1300px !important; margin: 0 auto; padding: 0 15px; }

        /* Header */
        .sp-header { 
          display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:25px; 
          background:rgba(255,255,255,0.03); backdrop-filter:blur(30px); border:1px solid rgba(255,255,255,0.07); 
          border-radius:28px; padding:35px 45px; margin-bottom:40px; box-shadow:0 30px 80px rgba(0,0,0,0.4); 
        }
        @media(max-width: 768px) {
          .sp-header { padding: 25px; border-radius: 20px; gap: 20px; }
          .sp-title { font-size: 2.2rem !important; }
        }
        
        .sp-label { font-size:11px; font-weight:800; letter-spacing:4px; color:#00f2ff; margin-bottom:8px; }
        .sp-title { font-size:clamp(2rem,5vw,3.5rem); font-weight:900; letter-spacing:-2px; line-height:1; margin:0 0 10px; }
        .sp-grad { background:linear-gradient(135deg,#00f2ff,#ff00ff); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .sp-dim { color:rgba(255,255,255,0.15); }
        .sp-sub { font-size:0.95rem; color:rgba(255,255,255,0.4); margin:0; }
        
        .sp-search-wrap { position:relative; width: 100%; max-width: 280px; }
        @media(max-width: 576px) { .sp-search-wrap { max-width: 100%; } }
        
        .sp-search-icon { position:absolute; left:18px; top:50%; transform:translateY(-50%); color:#00f2ff; font-size:14px; }
        .sp-search { background:rgba(255,255,255,0.04); border:1px solid rgba(0,242,255,0.2); border-radius:14px; padding:14px 20px 14px 45px; color:#fff; font-size:15px; width:100%; outline:none; transition:all 0.3s ease; }
        .sp-search:focus { border-color:rgba(0,242,255,0.5); background:rgba(255,255,255,0.07); box-shadow:0 0 20px rgba(0,242,255,0.1); }
        .sp-search::placeholder { color:rgba(255,255,255,0.3); }

        /* Grid */
        .sp-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; }
        @media(max-width:1024px){ .sp-grid{grid-template-columns:repeat(2,1fr);} }
        @media(max-width:650px){ .sp-grid{grid-template-columns:1fr;} }

        /* Card */
        .sp-card {
          background: rgba(12,12,14,1);
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 22px;
          overflow: hidden;
          transition: all 0.45s cubic-bezier(0.2,0.8,0.2,1);
        }
        @media(hover: hover) {
          .sp-card:hover {
            transform: translateY(-10px);
            border-color: rgba(0,242,255,0.2);
            box-shadow: 0 30px 70px rgba(0,0,0,0.6);
          }
        }

        /* Image */
        .sp-img-wrap { position:relative; height:240px; overflow:hidden; background:#0a0a0a; }
        @media(max-width: 480px) { .sp-img-wrap { height: 220px; } }
        
        .sp-img {
          width:100%; height:100%; object-fit:cover;
          mix-blend-mode: luminosity;
          transition: transform 0.6s cubic-bezier(0.2,0.8,0.2,1), mix-blend-mode 0.4s;
          filter: contrast(1.05);
        }
        .sp-card:hover .sp-img {
          transform: scale(1.08);
          mix-blend-mode: normal;
          filter: contrast(1);
        }
        .sp-img-fade {
          position:absolute; inset:0;
          background: linear-gradient(to top, rgba(5,5,5,0.95) 0%, rgba(0,0,0,0.2) 50%, transparent 100%);
          pointer-events:none;
        }

        /* Tag */
        .sp-tag {
          position:absolute; top:12px; left:12px;
          font-size:8px; font-weight:900; letter-spacing:1.5px;
          padding:4px 10px; border-radius:6px;
          backdrop-filter:blur(8px);
          text-transform:uppercase;
          z-index: 2;
        }

        /* Wishlist */
        .sp-wish-btn {
          position:absolute; top:12px; right:12px;
          width:34px; height:34px; border-radius:10px;
          background:rgba(0,0,0,0.4); backdrop-filter:blur(10px);
          border:1px solid rgba(255,255,255,0.1);
          color:rgba(255,255,255,0.6); font-size:13px;
          cursor:pointer; transition:all 0.3s ease;
          display:flex; align-items:center; justify-content:center;
          z-index: 2;
        }
        .sp-wish-btn.wished { color:#ff00ff; border-color:rgba(255,0,255,0.4); background:rgba(255,0,255,0.1); }

        /* Overlay */
        .sp-overlay {
          position:absolute; inset:0;
          display:flex; align-items:flex-end; justify-content:center;
          padding-bottom:15px;
          opacity:0; transition:opacity 0.3s ease;
          background: rgba(0,0,0,0.2);
        }
        .sp-card:hover .sp-overlay { opacity:1; }
        @media(max-width: 1024px) { .sp-overlay { opacity: 1; background: transparent; } }
        
        .sp-add-btn {
          background:linear-gradient(135deg,#00f2ff,#ff00ff);
          border:none; color:#000; font-weight:900;
          font-size:0.8rem; letter-spacing:1px;
          padding:12px 25px; border-radius:10px;
          cursor:pointer; width: 85%;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0,242,255,0.2);
        }
        .sp-add-btn.added { background: rgba(0,242,128,0.2); border: 1px solid #00f280; color: #00f280; box-shadow: none; }
        
        /* Info */
        .sp-info { padding:15px 18px 18px; }
        .sp-info-top { display:flex; justify-content:space-between; align-items:flex-start; margin-bottom:12px; }
        .sp-name { font-size:0.9rem; font-weight:800; letter-spacing:-0.2px; margin:0; color:#fff; line-height:1.2; flex:1; padding-right:8px; }
        .sp-rating { font-size:0.75rem; color:rgba(255,255,255,0.4); white-space:nowrap; }
        .sp-rating i { color:#ffc107; }
        .sp-info-bottom { display:flex; justify-content:space-between; align-items:center; }
        .sp-price { font-size:1.1rem; font-weight:900; background:linear-gradient(135deg,#00f2ff,#ff00ff); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .sp-sizes { display:flex; gap:4px; }
        .sp-size { font-size:9px; font-weight:700; color:rgba(255,255,255,0.35); border:1px solid rgba(255,255,255,0.1); border-radius:5px; padding:2px 6px; }

        /* Pagination */
        .sp-pages { display:flex; justify-content:center; gap:10px; margin-top:50px; }
        .sp-page-btn { width:45px; height:45px; border-radius:12px; display:flex; align-items:center; justify-content:center; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.5); text-decoration:none; font-weight:800; transition:all 0.3s ease; }
        .sp-page-btn.active { background:linear-gradient(135deg,#00f2ff,#ff00ff); border-color:transparent; color:#000; }
      `}</style>
    </div>
  );
}

export default Details;