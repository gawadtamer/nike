import React, { useEffect } from "react";
import { motion } from "framer-motion";

function Details() {
  useEffect(() => {
    const loadMap = () => {
      if (window.L) {
        const map = window.L.map("mapid").setView([30.0444, 31.2357], 13);
        window.L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);
        window.L.marker([30.0444, 31.2357]).addTo(map).bindPopup("<b>Nike HQ</b><br>Cairo").openPopup();
        map.scrollWheelZoom.disable();
      }
    };
    if (!window.L) {
      const s = document.createElement("script");
      s.src = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.js";
      s.onload = loadMap;
      document.body.appendChild(s);
      const l = document.createElement("link");
      l.rel = "stylesheet";
      l.href = "https://unpkg.com/leaflet@1.7.1/dist/leaflet.css";
      document.head.appendChild(l);
    } else { loadMap(); }
  }, []);

  const handleSubmit = (e) => { e.preventDefault(); };

  const info = [
    { icon: "fa-map-marker-alt", label: "Address",  value: "Cairo, Egypt" },
    { icon: "fa-envelope",       label: "Email",    value: "hello@nike.com" },
    { icon: "fa-phone",          label: "Phone",    value: "+20 100 000 0000" },
  ];

  return (
    <div className="ct-wrapper">
      <div className="ct-glow ct-glow-1" />
      <div className="ct-glow ct-glow-2" />

      <div className="container ct-container">

        {/* ── HEADER ── */}
        <motion.div className="ct-header"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="ct-label">GET IN TOUCH</div>
          <h1 className="ct-title">
            <span className="ct-grad">CONTACT</span>
            <span className="ct-dim"> US</span>
          </h1>
          <p className="ct-sub">Let's build something legendary together.</p>
        </motion.div>

        {/* ── BODY ── */}
        <div className="ct-body">

          {/* Left — Info + Map */}
          <motion.div className="ct-left"
            initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.1 }}>
            <div className="ct-info-list">
              {info.map((item, i) => (
                <div key={i} className="ct-info-item">
                  <div className="ct-info-icon"><i className={`fas ${item.icon}`} /></div>
                  <div>
                    <div className="ct-info-label">{item.label}</div>
                    <div className="ct-info-value">{item.value}</div>
                  </div>
                </div>
              ))}
            </div>
            <div id="mapid" className="ct-map" />
          </motion.div>

          {/* Right — Form */}
          <motion.div className="ct-right"
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.2 }}>
            <form onSubmit={handleSubmit} className="ct-form">
              <div className="ct-form-title">Send a Message</div>

              <div className="ct-field-row">
                <div className="ct-field">
                  <label className="ct-field-label">Full Name</label>
                  <input type="text" placeholder="John Doe" className="ct-input" required />
                </div>
                <div className="ct-field">
                  <label className="ct-field-label">Email</label>
                  <input type="email" placeholder="you@example.com" className="ct-input" required />
                </div>
              </div>

              <div className="ct-field">
                <label className="ct-field-label">Subject</label>
                <input type="text" placeholder="How can we help?" className="ct-input" required />
              </div>

              <div className="ct-field">
                <label className="ct-field-label">Message</label>
                <textarea placeholder="Write your message..." className="ct-input ct-textarea" required />
              </div>

              <motion.button type="submit" className="ct-submit-btn"
                whileHover={{ scale: 1.03, boxShadow: '0 20px 50px rgba(0,242,255,0.4)' }}
                whileTap={{ scale: 0.97 }}>
                <i className="fas fa-paper-plane" style={{ marginRight: 10 }} />
                SEND MESSAGE
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>

      <style>{`
        .ct-wrapper { background:#000; min-height:100vh; padding:120px 0 80px; position:relative; overflow-x:hidden; color:#fff; font-family:'Roboto',sans-serif; }
        .ct-glow { position:absolute; border-radius:50%; filter:blur(130px); pointer-events:none; z-index:0; }
        .ct-glow-1 { width:500px; height:500px; top:-150px; right:-100px; background:rgba(0,242,255,0.07); }
        .ct-glow-2 { width:400px; height:400px; bottom:0; left:-100px; background:rgba(255,0,255,0.06); }
        .ct-container { position:relative; z-index:1; width: 100%; max-width:1200px !important; padding: 0 15px; margin: 0 auto; }

        .ct-header { text-align:center; margin-bottom:50px; }
        .ct-label { font-size:11px; font-weight:800; letter-spacing:4px; color:#00f2ff; margin-bottom:12px; }
        .ct-title { font-size:clamp(2.2rem,7vw,5rem); font-weight:900; letter-spacing:-2.5px; line-height:1; margin-bottom:15px; }
        .ct-grad { background:linear-gradient(135deg,#00f2ff,#ff00ff); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .ct-dim { color:rgba(255,255,255,0.15); }
        .ct-sub { font-size:1rem; color:rgba(255,255,255,0.45); }

        .ct-body { display:grid; grid-template-columns:1fr 1.4fr; gap:30px; }
        @media(max-width:992px){ .ct-body { grid-template-columns:1fr; } }

        .ct-left { display:flex; flex-direction:column; gap:25px; }
        .ct-info-list { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:24px; padding:30px; display:flex; flex-direction:column; gap:25px; }
        @media(max-width: 576px) { .ct-info-list { padding: 20px; } }
        
        .ct-info-item { display:flex; align-items:center; gap:18px; }
        .ct-info-icon { width:48px; height:48px; border-radius:14px; background:rgba(0,242,255,0.1); border:1px solid rgba(0,242,255,0.2); display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .ct-info-icon i { font-size:1.1rem; background:linear-gradient(135deg,#00f2ff,#ff00ff); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .ct-info-label { font-size:10px; font-weight:800; letter-spacing:2px; color:rgba(255,255,255,0.4); margin-bottom:4px; }
        .ct-info-value { font-size:0.95rem; font-weight:600; color:#fff; }
        .ct-map { height:220px; border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,0.07); }

        .ct-form { background:rgba(255,255,255,0.03); backdrop-filter:blur(30px); border:1px solid rgba(255,255,255,0.07); border-radius:28px; padding:40px; display:flex; flex-direction:column; gap:22px; box-shadow:0 30px 80px rgba(0,0,0,0.4); }
        @media(max-width: 768px) { .ct-form { padding: 25px; border-radius: 20px; } }
        
        .ct-form-title { font-size:1.2rem; font-weight:800; letter-spacing:-0.5px; margin-bottom:5px; }
        .ct-field-row { display:grid; grid-template-columns:1fr 1fr; gap:18px; }
        @media(max-width:600px){ .ct-field-row { grid-template-columns:1fr; } }
        .ct-field { display:flex; flex-direction:column; gap:8px; }
        .ct-field-label { font-size:10px; font-weight:800; letter-spacing:2px; color:rgba(255,255,255,0.4); }
        .ct-input { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:14px 18px; color:#fff; font-size:15px; outline:none; transition:all 0.3s ease; font-family:'Roboto',sans-serif; resize:none; }
        .ct-input::placeholder { color:rgba(255,255,255,0.25); }
        .ct-input:focus { border-color:rgba(0,242,255,0.4); background:rgba(255,255,255,0.07); box-shadow:0 0 20px rgba(0,242,255,0.1); }
        .ct-textarea { min-height:130px; }
        .ct-submit-btn { width:100%; padding:18px; background:linear-gradient(135deg,#00f2ff,#ff00ff); border:none; border-radius:14px; color:#000; font-size:0.95rem; font-weight:900; letter-spacing:2px; cursor:pointer; transition:all 0.3s ease; box-shadow:0 15px 40px rgba(0,242,255,0.25); display:flex; align-items:center; justify-content:center; }
        @media(max-width: 576px) { .ct-submit-btn { padding: 15px; font-size: 0.85rem; } }
      `}</style>
    </div>
  );
}

export default Details;
