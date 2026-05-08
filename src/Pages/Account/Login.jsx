import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Navbar from '../../Home/Navbar';
import Footer from '../../Home/Footer';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) { login({ name: 'User', email: formData.email }); }
    else { signup({ name: formData.name, email: formData.email }); }
    navigate('/Account');
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <div className="lg-wrapper">
      <div className="lg-glow lg-glow-1" />
      <div className="lg-glow lg-glow-2" />
      <Navbar />

      <div className="lg-center">
        <motion.div className="lg-card"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>

          {/* Logo Mark */}
          <div className="lg-logo-mark">N</div>

          {/* Title */}
          <div className="lg-card-title">
            {isLogin ? 'Welcome Back' : 'Join Nike'}
          </div>
          <p className="lg-card-sub">
            {isLogin ? 'Sign in to access your account' : 'Create your Nike account today'}
          </p>

          {/* Toggle Tabs */}
          <div className="lg-tabs">
            <button className={`lg-tab ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>Sign In</button>
            <button className={`lg-tab ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>Sign Up</button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="lg-form">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div key="name"
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
                  className="lg-field">
                  <label className="lg-label">Full Name</label>
                  <input type="text" name="name" placeholder="Enter your name"
                    className="lg-input" onChange={handleChange} required={!isLogin} />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="lg-field">
              <label className="lg-label">Email Address</label>
              <input type="email" name="email" placeholder="nike@example.com"
                className="lg-input" onChange={handleChange} required />
            </div>

            <div className="lg-field">
              <label className="lg-label">Password</label>
              <input type="password" name="password" placeholder="••••••••"
                className="lg-input" onChange={handleChange} required />
            </div>

            <motion.button type="submit" className="lg-submit-btn"
              whileHover={{ scale: 1.03, boxShadow: '0 20px 50px rgba(0,242,255,0.4)' }}
              whileTap={{ scale: 0.97 }}>
              {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </motion.button>
          </form>

          <p className="lg-switch">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button className="lg-switch-btn" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? ' Sign Up' : ' Log In'}
            </button>
          </p>
        </motion.div>
      </div>

      <Footer />

      <style>{`
        .lg-wrapper { background:#000; min-height:100vh; position:relative; overflow:hidden; color:#fff; font-family:'Roboto',sans-serif; display:flex; flex-direction:column; }
        .lg-glow { position:absolute; border-radius:50%; filter:blur(140px); pointer-events:none; z-index:0; }
        .lg-glow-1 { width:600px; height:600px; top:-200px; right:-150px; background:rgba(0,242,255,0.08); }
        .lg-glow-2 { width:500px; height:500px; bottom:-150px; left:-150px; background:rgba(255,0,255,0.07); }
        .lg-center { flex:1; display:flex; align-items:center; justify-content:center; padding:60px 20px; position:relative; z-index:1; }
        .lg-card { width:100%; max-width:480px; background:rgba(255,255,255,0.03); backdrop-filter:blur(30px); border:1px solid rgba(255,255,255,0.08); border-radius:32px; padding:50px 45px; box-shadow:0 50px 100px rgba(0,0,0,0.5); }
        .lg-logo-mark { width:56px; height:56px; border-radius:16px; background:linear-gradient(135deg,#00f2ff,#ff00ff); color:#000; font-size:1.8rem; font-weight:900; display:flex; align-items:center; justify-content:center; margin:0 auto 25px; }
        .lg-card-title { font-size:1.9rem; font-weight:900; text-align:center; letter-spacing:-1px; margin-bottom:8px; }
        .lg-card-sub { font-size:0.9rem; color:rgba(255,255,255,0.4); text-align:center; margin-bottom:30px; }
        .lg-tabs { display:flex; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.07); border-radius:14px; padding:5px; margin-bottom:30px; }
        .lg-tab { flex:1; padding:10px; border:none; border-radius:10px; background:transparent; color:rgba(255,255,255,0.4); font-weight:700; font-size:0.9rem; cursor:pointer; transition:all 0.3s ease; }
        .lg-tab.active { background:linear-gradient(135deg,#00f2ff,#ff00ff); color:#000; }
        .lg-form { display:flex; flex-direction:column; gap:20px; }
        .lg-field { display:flex; flex-direction:column; gap:8px; overflow:hidden; }
        .lg-label { font-size:10px; font-weight:800; letter-spacing:2px; color:rgba(255,255,255,0.4); text-transform:uppercase; }
        .lg-input { background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.08); border-radius:14px; padding:15px 20px; color:#fff; font-size:15px; outline:none; transition:all 0.3s ease; font-family:'Roboto',sans-serif; }
        .lg-input::placeholder { color:rgba(255,255,255,0.25); }
        .lg-input:focus { border-color:rgba(0,242,255,0.4); background:rgba(255,255,255,0.07); box-shadow:0 0 20px rgba(0,242,255,0.1); }
        .lg-submit-btn { width:100%; padding:18px; background:linear-gradient(135deg,#00f2ff,#ff00ff); border:none; border-radius:14px; color:#000; font-size:0.95rem; font-weight:900; letter-spacing:2px; cursor:pointer; margin-top:5px; box-shadow:0 15px 40px rgba(0,242,255,0.25); transition:all 0.3s ease; }
        .lg-switch { text-align:center; margin-top:25px; font-size:0.88rem; color:rgba(255,255,255,0.4); }
        .lg-switch-btn { background:none; border:none; color:#00f2ff; font-weight:700; cursor:pointer; padding:0 4px; }
      `}</style>
    </div>
  );
}

export default Login;
