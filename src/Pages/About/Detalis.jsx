import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

function Detalis() {
  useEffect(() => {
    document.body.style.background = '#000';
    return () => { document.body.style.background = ''; };
  }, []);

  const services = [
    { icon: "fa-bolt",       title: "Instant Access",  desc: "Get early access to exclusive drops and limited editions." },
    { icon: "fa-globe",      title: "Global Reach",    desc: "Seamless shipping across 150+ countries with real-time tracking." },
    { icon: "fa-shield-alt", title: "Authenticity",    desc: "Guaranteed 100% original products verified by experts." },
    { icon: "fa-infinity",   title: "24/7 Support",    desc: "We're here whenever you need us, day or night." }
  ];

  return (
    <div className="ab-wrapper">
      {/* Glows */}
      <div className="ab-glow ab-glow-1" />
      <div className="ab-glow ab-glow-2" />

      {/* ── HERO ── */}
      <section className="ab-hero">
        <div className="container">
          <div className="row align-items-center">
            <motion.div className="col-lg-6"
              initial={{ opacity: 0, x: -60 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.9 }}>
              <div className="ab-label">OUR STORY</div>
              <h1 className="ab-hero-title">
                <span className="ab-stroke">NIKE</span><br />
                FUTURE <span className="ab-grad">REACT</span>
              </h1>
              <p className="ab-hero-desc">
                We don't just sell shoes — we deliver the future of movement.
                Experience the perfect blend of innovation, comfort, and street style.
              </p>
              <motion.a href="#services" className="ab-cta-btn"
                whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(0,242,255,0.4)' }}
                whileTap={{ scale: 0.96 }}>
                Explore More
              </motion.a>
            </motion.div>

            <motion.div className="col-lg-6 mt-5 mt-lg-0"
              initial={{ opacity: 0, scale: 0.85 }} animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.2 }}>
              <div className="ab-hero-img-wrap">
                <img src={process.env.PUBLIC_URL + "/img/banner_img_01.jpg"} alt="Nike" className="ab-hero-img" />
                <div className="ab-hero-img-glow" />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" className="ab-services">
        <div className="container">
          <div className="ab-section-head">
            <div className="ab-label">WHY US</div>
            <h2 className="ab-section-title">Our <span className="ab-grad">Ecosystem</span></h2>
          </div>
          <div className="ab-services-grid">
            {services.map((s, i) => (
              <motion.div key={i} className="ab-service-card"
                initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}>
                <div className="ab-service-icon-wrap">
                  <i className={`fas ${s.icon}`} />
                </div>
                <h4 className="ab-service-title">{s.title}</h4>
                <p className="ab-service-desc">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="ab-cta-section">
        <div className="container">
          <motion.div className="ab-cta-card"
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="ab-cta-title">Ready to <span className="ab-grad">Step Up?</span></h2>
            <p className="ab-cta-sub">Join millions of athletes who trust Nike every day.</p>
            <motion.a href="/Shop" className="ab-cta-btn"
              whileHover={{ scale: 1.04, boxShadow: '0 20px 50px rgba(0,242,255,0.4)' }}
              whileTap={{ scale: 0.96 }}>
              Start Your Journey
            </motion.a>
          </motion.div>
        </div>
      </section>

      <style>{`
        .ab-wrapper { background:#000; min-height:100vh; color:#fff; font-family:'Roboto',sans-serif; overflow:hidden; position:relative; }
        .ab-glow { position:absolute; border-radius:50%; filter:blur(140px); pointer-events:none; z-index:0; }
        .ab-glow-1 { width:600px; height:600px; top:-200px; right:-150px; background:rgba(0,242,255,0.07); }
        .ab-glow-2 { width:500px; height:500px; bottom:-150px; left:-150px; background:rgba(255,0,255,0.06); }

        /* HERO */
        .ab-hero { padding:140px 0 100px; position:relative; z-index:1; }
        .ab-label { font-size:11px; font-weight:800; letter-spacing:4px; color:#00f2ff; margin-bottom:16px; }
        .ab-hero-title { font-size:clamp(3rem,8vw,6rem); font-weight:900; line-height:0.9; letter-spacing:-3px; margin-bottom:30px; text-transform:uppercase; }
        .ab-stroke { -webkit-text-stroke:1.5px rgba(255,255,255,0.3); color:transparent; }
        .ab-grad { background:linear-gradient(135deg,#00f2ff,#ff00ff); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .ab-hero-desc { font-size:1.1rem; color:rgba(255,255,255,0.5); line-height:1.8; margin-bottom:40px; max-width:500px; }
        .ab-cta-btn { display:inline-flex; align-items:center; background:linear-gradient(135deg,#00f2ff,#ff00ff); color:#000; font-weight:900; font-size:0.95rem; letter-spacing:2px; padding:18px 45px; border-radius:14px; text-decoration:none; transition:all 0.3s ease; box-shadow:0 15px 40px rgba(0,242,255,0.25); cursor:pointer; border:none; }
        .ab-hero-img-wrap { position:relative; border-radius:30px; overflow:hidden; box-shadow:0 40px 100px rgba(0,0,0,0.6); border:1px solid rgba(255,255,255,0.06); }
        .ab-hero-img { width:100%; height:420px; object-fit:cover; display:block; }
        .ab-hero-img-glow { position:absolute; inset:0; background:linear-gradient(135deg,rgba(0,242,255,0.1),rgba(255,0,255,0.1)); pointer-events:none; }

        /* SERVICES */
        .ab-services { padding:80px 0; position:relative; z-index:1; }
        .ab-section-head { text-align:center; margin-bottom:60px; }
        .ab-section-title { font-size:clamp(2rem,5vw,3.5rem); font-weight:900; letter-spacing:-2px; margin-top:10px; }
        .ab-services-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:25px; }
        @media(max-width:992px){ .ab-services-grid { grid-template-columns:repeat(2,1fr); } }
        @media(max-width:576px){ .ab-services-grid { grid-template-columns:1fr; } }
        .ab-service-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:24px; padding:35px 28px; transition:all 0.4s ease; }
        .ab-service-card:hover { transform:translateY(-10px); border-color:rgba(0,242,255,0.25); box-shadow:0 25px 60px rgba(0,0,0,0.4); }
        .ab-service-icon-wrap { width:55px; height:55px; border-radius:16px; background:rgba(0,242,255,0.1); border:1px solid rgba(0,242,255,0.2); display:flex; align-items:center; justify-content:center; margin-bottom:20px; }
        .ab-service-icon-wrap i { font-size:1.3rem; background:linear-gradient(135deg,#00f2ff,#ff00ff); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .ab-service-title { font-size:1.1rem; font-weight:800; margin-bottom:10px; }
        .ab-service-desc { font-size:0.9rem; color:rgba(255,255,255,0.45); line-height:1.7; margin:0; }

        /* CTA */
        .ab-cta-section { padding:60px 0 100px; position:relative; z-index:1; }
        .ab-cta-card { background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); border-radius:28px; padding:70px 50px; text-align:center; box-shadow:0 30px 80px rgba(0,0,0,0.4); }
        .ab-cta-title { font-size:clamp(2rem,5vw,3.5rem); font-weight:900; letter-spacing:-2px; margin-bottom:15px; }
        .ab-cta-sub { font-size:1rem; color:rgba(255,255,255,0.45); margin-bottom:40px; }
      `}</style>
    </div>
  );
}

export default Detalis;
