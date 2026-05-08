import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => { setIsSubscribed(false); setEmail(''); }, 2500);
    }
  };

  const socials = [
    { icon: 'fab fa-instagram', href: 'https://www.instagram.com/' },
    { icon: 'fab fa-twitter',   href: 'https://twitter.com/' },
    { icon: 'fab fa-facebook-f',href: 'http://facebook.com/' },
    { icon: 'fab fa-linkedin',  href: 'https://www.linkedin.com/' },
  ];

  const links = {
    Shop:  [{ label: 'Luxury',        to: '/Shop' }, { label: 'Sport Wear', to: '/Shop' }, { label: "Men's Shoes", to: '/Shop' }, { label: "Women's Shoes", to: '/Shop' }, { label: 'Accessories', to: '/Shop' }],
    Info:  [{ label: 'Home',          to: '/' }, { label: 'About Us', to: '/About' }, { label: 'Shop', to: '/Shop' }, { label: 'Contact', to: '/contact' }],
  };

  return (
    <footer className="ft-wrapper">
      <div className="ft-glow ft-glow-1" />
      <div className="ft-glow ft-glow-2" />

      <div className="container ft-container">

        {/* ── TOP GRID ── */}
        <motion.div className="ft-grid"
          initial="hidden" whileInView="visible" viewport={{ once: true }}
          variants={{ hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.12 } } }}>

          {/* Brand */}
          <motion.div className="ft-col" variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}>
            <Link to="/" className="ft-logo">NIKE</Link>
            <p className="ft-brand-desc">
              Engineered for speed.<br />Designed to dominate.
            </p>
            <ul className="ft-contact-list">
              <li><i className="fas fa-map-marker-alt" /><span>Cairo, Egypt</span></li>
              <li><i className="fas fa-phone" /><span>+20 100 000 0000</span></li>
              <li><i className="fas fa-envelope" /><a href="mailto:hello@nike.com">hello@nike.com</a></li>
            </ul>
          </motion.div>

          {/* Shop Links */}
          <motion.div className="ft-col" variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}>
            <h4 className="ft-col-title">Shop</h4>
            <ul className="ft-links">
              {links.Shop.map(l => (
                <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </motion.div>

          {/* Info Links */}
          <motion.div className="ft-col" variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}>
            <h4 className="ft-col-title">Company</h4>
            <ul className="ft-links">
              {links.Info.map(l => (
                <li key={l.label}><Link to={l.to}>{l.label}</Link></li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div className="ft-col" variants={{ hidden: { opacity: 0, y: 25 }, visible: { opacity: 1, y: 0 } }}>
            <h4 className="ft-col-title">Stay Updated</h4>
            <p className="ft-newsletter-desc">Get exclusive drops and early access.</p>
            <form onSubmit={handleSubscribe} className="ft-form">
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com" className="ft-input"
              />
              <motion.button type="submit" className={`ft-subscribe-btn ${isSubscribed ? 'done' : ''}`}
                whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
                {isSubscribed ? <><i className="fas fa-check" /> Done!</> : 'Subscribe'}
              </motion.button>
            </form>
            {/* Socials */}
            <div className="ft-socials">
              {socials.map(s => (
                <motion.a key={s.icon} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="ft-social-btn" whileHover={{ scale: 1.15, y: -3 }} whileTap={{ scale: 0.9 }}>
                  <i className={s.icon} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ── DIVIDER ── */}
        <div className="ft-divider" />

        {/* ── BOTTOM ── */}
        <div className="ft-bottom">
          <p className="ft-copy">© 2024 Nike. All rights reserved.</p>
          <div className="ft-bottom-links">
            <Link to="/contact">Privacy Policy</Link>
            <Link to="/contact">Terms of Use</Link>
          </div>
        </div>
      </div>

      <style>{`
        .ft-wrapper { background:#000; position:relative; overflow:hidden; border-top:1px solid rgba(255,255,255,0.06); color:#fff; font-family:'Roboto',sans-serif; padding:80px 0 0; }
        .ft-glow { position:absolute; border-radius:50%; filter:blur(140px); pointer-events:none; z-index:0; }
        .ft-glow-1 { width:400px; height:400px; top:-100px; right:-50px; background:rgba(0,242,255,0.06); }
        .ft-glow-2 { width:400px; height:400px; bottom:0; left:-50px; background:rgba(255,0,255,0.05); }
        .ft-container { position:relative; z-index:1; max-width:1300px !important; }

        .ft-grid { display:grid; grid-template-columns:1.6fr 1fr 1fr 1.4fr; gap:50px; margin-bottom:60px; }
        @media(max-width:1024px){ .ft-grid { grid-template-columns:1fr 1fr; gap:40px; } }
        @media(max-width:576px){ .ft-grid { grid-template-columns:1fr; gap:35px; } }

        /* Brand col */
        .ft-logo { font-size:2rem; font-weight:900; letter-spacing:-1px; text-decoration:none; background:linear-gradient(135deg,#00f2ff,#ff00ff); -webkit-background-clip:text; background-clip:text; color:transparent; display:inline-block; margin-bottom:16px; }
        .ft-brand-desc { font-size:0.9rem; color:rgba(255,255,255,0.4); line-height:1.7; margin-bottom:22px; }
        .ft-contact-list { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px; }
        .ft-contact-list li { display:flex; align-items:center; gap:12px; font-size:0.88rem; color:rgba(255,255,255,0.45); }
        .ft-contact-list i { color:#00f2ff; font-size:0.85rem; width:16px; }
        .ft-contact-list a { color:rgba(255,255,255,0.45); text-decoration:none; transition:color 0.3s; }
        .ft-contact-list a:hover { color:#00f2ff; }

        /* Link cols */
        .ft-col-title { font-size:0.75rem; font-weight:800; letter-spacing:3px; color:rgba(255,255,255,0.35); text-transform:uppercase; margin-bottom:22px; }
        .ft-links { list-style:none; padding:0; margin:0; display:flex; flex-direction:column; gap:12px; }
        .ft-links li a { color:rgba(255,255,255,0.5); text-decoration:none; font-size:0.9rem; font-weight:500; transition:all 0.3s ease; display:inline-flex; align-items:center; gap:6px; }
        .ft-links li a::before { content:''; width:0; height:1px; background:linear-gradient(90deg,#00f2ff,#ff00ff); transition:width 0.3s ease; display:inline-block; border-radius:2px; }
        .ft-links li a:hover { color:#fff; padding-left:6px; }
        .ft-links li a:hover::before { width:14px; }

        /* Newsletter */
        .ft-newsletter-desc { font-size:0.88rem; color:rgba(255,255,255,0.4); margin-bottom:18px; line-height:1.6; }
        .ft-form { display:flex; flex-direction:column; gap:10px; margin-bottom:25px; }
        .ft-input { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:12px; padding:12px 16px; color:#fff; font-size:0.9rem; outline:none; transition:all 0.3s ease; }
        .ft-input::placeholder { color:rgba(255,255,255,0.25); }
        .ft-input:focus { border-color:rgba(0,242,255,0.35); background:rgba(255,255,255,0.07); box-shadow:0 0 18px rgba(0,242,255,0.08); }
        .ft-subscribe-btn { padding:12px; background:linear-gradient(135deg,#00f2ff,#ff00ff); border:none; border-radius:12px; color:#000; font-weight:900; font-size:0.88rem; letter-spacing:1px; cursor:pointer; transition:all 0.3s ease; }
        .ft-subscribe-btn.done { background:rgba(0,242,128,0.15); border:1px solid rgba(0,242,128,0.3); color:#00f280; }

        /* Socials */
        .ft-socials { display:flex; gap:12px; }
        .ft-social-btn { width:42px; height:42px; border-radius:12px; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); color:rgba(255,255,255,0.5); display:flex; align-items:center; justify-content:center; text-decoration:none; transition:all 0.3s ease; font-size:0.95rem; }
        .ft-social-btn:hover { background:rgba(0,242,255,0.1); border-color:rgba(0,242,255,0.3); color:#00f2ff; }

        /* Bottom */
        .ft-divider { height:1px; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.07),transparent); margin-bottom:28px; }
        .ft-bottom { display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:15px; padding-bottom:35px; }
        .ft-copy { font-size:0.83rem; color:rgba(255,255,255,0.3); margin:0; }
        .ft-bottom-links { display:flex; gap:25px; }
        .ft-bottom-links a { font-size:0.83rem; color:rgba(255,255,255,0.3); text-decoration:none; transition:color 0.3s; }
        .ft-bottom-links a:hover { color:#00f2ff; }
      `}</style>
    </footer>
  );
}

export default Footer;