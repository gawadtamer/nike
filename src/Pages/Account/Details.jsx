import React, { useState, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthContext';
import { CartContext } from '../Cart/CartContext';
import { Link } from 'react-router-dom';

function Details() {
  const { user, updateUser, logout } = useAuth();
  const { cartItems } = useContext(CartContext);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user?.name || '');
  const fileInputRef = useRef(null);

  if (!user) {
    return (
      <div className="acc-not-logged">
        <div className="acc-glow acc-glow-1" />
        <div className="acc-glow acc-glow-2" />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <div style={{ fontSize: '4rem', marginBottom: 20, opacity: 0.3 }}>🔒</div>
          <h2 style={{ fontWeight: 900, marginBottom: 15 }}>Please Log In</h2>
          <p style={{ color: 'rgba(255,255,255,0.4)', marginBottom: 35 }}>You need to sign in to view your account.</p>
          <Link to="/Login" className="acc-primary-btn">Go to Login</Link>
        </div>
      </div>
    );
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => updateUser({ profileImage: reader.result });
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => { updateUser({ name: tempName }); setIsEditing(false); };

  const stats = [
    { label: "Email",        value: user.email,                  icon: "fa-envelope" },
    { label: "Member Since", value: "March 2024",                icon: "fa-calendar" },
    { label: "Bag Items",    value: `${cartItems.length} items`, icon: "fa-shopping-bag" },
  ];

  return (
    <div className="acc-wrapper">
      <div className="acc-glow acc-glow-1" />
      <div className="acc-glow acc-glow-2" />

      <div className="container acc-container">

        {/* ── PROFILE CARD ── */}
        <motion.div className="acc-card"
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>

          {/* Avatar */}
          <div className="acc-avatar-section">
            <motion.div className="acc-avatar" whileHover={{ scale: 1.05 }}
              onClick={() => fileInputRef.current.click()}
              style={{ background: user.profileImage ? `url(${user.profileImage}) center/cover` : 'linear-gradient(135deg,#00f2ff,#ff00ff)' }}>
              {!user.profileImage && <span>{user.name?.[0]}</span>}
              <div className="acc-avatar-overlay">
                <i className="fas fa-camera" /><span>Change</span>
              </div>
            </motion.div>
            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" style={{ display: 'none' }} />

            <div className="acc-badge-pill">ELITE MEMBER</div>

            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="acc-edit-wrap">
                  <input value={tempName} onChange={e => setTempName(e.target.value)}
                    className="acc-name-input" autoFocus />
                  <div className="acc-edit-actions">
                    <button className="acc-save-btn" onClick={handleSave}>Save</button>
                    <button className="acc-cancel-btn" onClick={() => setIsEditing(false)}>Cancel</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="view" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} style={{ textAlign: 'center' }}>
                  <h1 className="acc-name">{user.name}</h1>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stats Grid */}
          <div className="acc-stats-grid">
            {stats.map((s, i) => (
              <motion.div key={i} className="acc-stat-card"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <div className="acc-stat-icon"><i className={`fas ${s.icon}`} /></div>
                <div className="acc-stat-label">{s.label}</div>
                <div className="acc-stat-value">{s.value}</div>
              </motion.div>
            ))}
          </div>

          {/* Actions */}
          <div className="acc-actions">
            <motion.button className="acc-primary-btn" onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(0,242,255,0.4)' }} whileTap={{ scale: 0.96 }}>
              <i className="fas fa-pen" style={{ marginRight: 10 }} />Edit Profile
            </motion.button>
            <motion.button className="acc-secondary-btn" onClick={logout}
              whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
              <i className="fas fa-sign-out-alt" style={{ marginRight: 10 }} />Sign Out
            </motion.button>
          </div>

          {/* Quick Links */}
          <div className="acc-quick-links">
            <Link to="/Shop" className="acc-quick-link"><i className="fas fa-store" /> Shop</Link>
            <Link to="/Cart" className="acc-quick-link"><i className="fas fa-shopping-bag" /> Cart</Link>
            <Link to="/contact" className="acc-quick-link"><i className="fas fa-headset" /> Support</Link>
          </div>
        </motion.div>
      </div>

      <style>{`
        .acc-wrapper { background:#000; min-height:100vh; padding:120px 0 80px; position:relative; overflow:hidden; color:#fff; font-family:'Roboto',sans-serif; }
        .acc-not-logged { background:#000; min-height:100vh; display:flex; align-items:center; justify-content:center; position:relative; overflow:hidden; color:#fff; font-family:'Roboto',sans-serif; }
        .acc-glow { position:absolute; border-radius:50%; filter:blur(140px); pointer-events:none; z-index:0; }
        .acc-glow-1 { width:600px; height:600px; top:-200px; right:-150px; background:rgba(0,242,255,0.07); }
        .acc-glow-2 { width:500px; height:500px; bottom:-150px; left:-150px; background:rgba(255,0,255,0.06); }
        .acc-container { position:relative; z-index:1; max-width:900px !important; }

        .acc-card { background:rgba(255,255,255,0.03); backdrop-filter:blur(30px); border:1px solid rgba(255,255,255,0.07); border-radius:32px; padding:60px 50px; box-shadow:0 40px 100px rgba(0,0,0,0.5); }

        /* Avatar */
        .acc-avatar-section { display:flex; flex-direction:column; align-items:center; margin-bottom:50px; }
        .acc-avatar { width:130px; height:130px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:3rem; font-weight:900; color:#000; cursor:pointer; border:3px solid rgba(0,242,255,0.3); box-shadow:0 0 40px rgba(0,242,255,0.2); margin-bottom:18px; position:relative; overflow:hidden; transition:box-shadow 0.3s ease; }
        .acc-avatar:hover { box-shadow:0 0 60px rgba(0,242,255,0.35); }
        .acc-avatar-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.6); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; opacity:0; transition:opacity 0.3s; font-size:0.75rem; letter-spacing:1px; font-weight:700; }
        .acc-avatar:hover .acc-avatar-overlay { opacity:1; }
        .acc-badge-pill { background:rgba(0,242,255,0.1); border:1px solid rgba(0,242,255,0.25); color:#00f2ff; font-size:10px; font-weight:800; letter-spacing:3px; padding:6px 18px; border-radius:50px; margin-bottom:18px; }
        .acc-name { font-size:2.5rem; font-weight:900; letter-spacing:-1px; text-align:center; margin:0; }

        /* Edit */
        .acc-edit-wrap { display:flex; flex-direction:column; align-items:center; gap:14px; width:100%; max-width:320px; }
        .acc-name-input { width:100%; background:rgba(255,255,255,0.06); border:1px solid rgba(0,242,255,0.3); border-radius:14px; padding:12px 20px; color:#fff; font-size:1.4rem; font-weight:800; text-align:center; outline:none; }
        .acc-edit-actions { display:flex; gap:12px; }
        .acc-save-btn { padding:9px 24px; border-radius:10px; background:linear-gradient(135deg,#00f2ff,#ff00ff); border:none; color:#000; font-weight:800; cursor:pointer; font-size:0.85rem; }
        .acc-cancel-btn { padding:9px 24px; border-radius:10px; background:transparent; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.6); font-weight:800; cursor:pointer; font-size:0.85rem; }

        /* Stats */
        .acc-stats-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; margin-bottom:40px; }
        @media(max-width:650px){ .acc-stats-grid { grid-template-columns:1fr; } }
        .acc-stat-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:20px; padding:25px 22px; transition:all 0.3s ease; }
        .acc-stat-card:hover { transform:translateY(-6px); border-color:rgba(0,242,255,0.2); box-shadow:0 20px 50px rgba(0,0,0,0.3); }
        .acc-stat-icon { width:40px; height:40px; border-radius:12px; background:rgba(0,242,255,0.1); border:1px solid rgba(0,242,255,0.2); display:flex; align-items:center; justify-content:center; margin-bottom:14px; }
        .acc-stat-icon i { background:linear-gradient(135deg,#00f2ff,#ff00ff); -webkit-background-clip:text; background-clip:text; color:transparent; font-size:1rem; }
        .acc-stat-label { font-size:10px; font-weight:800; letter-spacing:2px; color:rgba(255,255,255,0.4); margin-bottom:6px; text-transform:uppercase; }
        .acc-stat-value { font-size:1.05rem; font-weight:700; color:#fff; word-break:break-all; }

        /* Actions */
        .acc-actions { display:flex; gap:15px; justify-content:center; flex-wrap:wrap; margin-bottom:35px; }
        .acc-primary-btn { display:inline-flex; align-items:center; background:linear-gradient(135deg,#00f2ff,#ff00ff); border:none; border-radius:14px; color:#000; font-size:0.95rem; font-weight:900; letter-spacing:1px; padding:16px 38px; cursor:pointer; text-decoration:none; transition:all 0.3s ease; box-shadow:0 15px 40px rgba(0,242,255,0.25); }
        .acc-secondary-btn { display:inline-flex; align-items:center; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:14px; color:rgba(255,255,255,0.7); font-size:0.95rem; font-weight:800; letter-spacing:1px; padding:16px 38px; cursor:pointer; transition:all 0.3s ease; }
        .acc-secondary-btn:hover { background:rgba(255,60,60,0.08); border-color:rgba(255,60,60,0.2); color:#ff4d4d; }

        /* Quick Links */
        .acc-quick-links { display:flex; justify-content:center; gap:10px; padding-top:30px; border-top:1px solid rgba(255,255,255,0.05); flex-wrap:wrap; }
        .acc-quick-link { display:flex; align-items:center; gap:8px; padding:10px 22px; border-radius:12px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); color:rgba(255,255,255,0.5); text-decoration:none; font-size:0.85rem; font-weight:700; transition:all 0.3s ease; }
        .acc-quick-link:hover { color:#00f2ff; border-color:rgba(0,242,255,0.25); background:rgba(0,242,255,0.05); }

        @media(max-width:600px){ .acc-card { padding:40px 25px; } }
      `}</style>
    </div>
  );
}

export default Details;
