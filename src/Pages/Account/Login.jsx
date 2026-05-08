import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ email: '', password: '', name: '' });
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login({ email: formData.email, name: formData.name || 'Athlete' });
    navigate('/Account');
  };

  return (
    <div className="lg-wrapper">
      <div className="lg-glow lg-glow-1" />
      <div className="lg-glow lg-glow-2" />

      <div className="container lg-container">
        <motion.div className="lg-card"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6 }}>
          
          <div className="lg-header">
            <h1 className="lg-title">{isLogin ? 'WELCOME BACK' : 'JOIN THE TEAM'}</h1>
            <p className="lg-sub">{isLogin ? 'Sign in to access your custom gear.' : 'Create your athlete profile today.'}</p>
          </div>

          {/* Toggle */}
          <div className="lg-toggle-wrap">
            <div className={`lg-toggle-bg ${!isLogin ? 'right' : ''}`} />
            <button className={`lg-toggle-btn ${isLogin ? 'active' : ''}`} onClick={() => setIsLogin(true)}>LOGIN</button>
            <button className={`lg-toggle-btn ${!isLogin ? 'active' : ''}`} onClick={() => setIsLogin(false)}>JOIN</button>
          </div>

          <form onSubmit={handleSubmit} className="lg-form">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div key="name" initial={{ opacity: 0, h: 0 }} animate={{ opacity: 1, h: 'auto' }} exit={{ opacity: 0, h: 0 }} className="lg-field">
                  <label>FULL NAME</label>
                  <input type="text" placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="lg-field">
              <label>EMAIL ADDRESS</label>
              <input type="email" placeholder="athlete@nike.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} required />
            </div>

            <div className="lg-field">
              <label>PASSWORD</label>
              <input type="password" placeholder="••••••••" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} required />
            </div>

            <motion.button type="submit" className="lg-submit-btn"
              whileHover={{ scale: 1.02, boxShadow: '0 15px 40px rgba(0,242,255,0.3)' }} whileTap={{ scale: 0.98 }}>
              {isLogin ? 'SIGN IN' : 'CREATE ACCOUNT'}
            </motion.button>
          </form>

          <div className="lg-footer">
            <p>By signing in, you agree to our <span>Terms of Use</span> and <span>Privacy Policy</span>.</p>
          </div>
        </motion.div>
      </div>

      <style>{`
        .lg-wrapper { background:#000; min-height:100vh; padding:120px 0 80px; display:flex; align-items:center; justify-content:center; position:relative; overflow-x:hidden; color:#fff; font-family:'Roboto',sans-serif; }
        .lg-glow { position:absolute; border-radius:50%; filter:blur(140px); pointer-events:none; z-index:0; }
        .lg-glow-1 { width:500px; height:500px; top:-150px; right:-100px; background:rgba(0,242,255,0.08); }
        .lg-glow-2 { width:400px; height:400px; bottom:-100px; left:-100px; background:rgba(255,0,255,0.07); }
        .lg-container { position:relative; z-index:1; width: 100%; max-width:550px !important; padding: 0 15px; margin: 0 auto; }

        .lg-card { background:rgba(255,255,255,0.03); backdrop-filter:blur(30px); border:1px solid rgba(255,255,255,0.08); border-radius:32px; padding:60px 50px; box-shadow:0 40px 100px rgba(0,0,0,0.5); }
        @media(max-width: 576px) { .lg-card { padding: 40px 25px; border-radius: 24px; } }
        
        .lg-header { text-align:center; margin-bottom:40px; }
        .lg-title { font-size:2rem; font-weight:950; letter-spacing:-1px; margin-bottom:10px; }
        .lg-sub { font-size:0.9rem; color:rgba(255,255,255,0.4); }

        .lg-toggle-wrap { background:rgba(255,255,255,0.05); border-radius:16px; padding:6px; display:flex; position:relative; margin-bottom:40px; }
        .lg-toggle-bg { position:absolute; top:6px; left:6px; width:calc(50% - 6px); height:calc(100% - 12px); background:rgba(255,255,255,0.1); border-radius:12px; transition:transform 0.3s cubic-bezier(0.4,0,0.2,1); }
        .lg-toggle-bg.right { transform:translateX(100%); }
        .lg-toggle-btn { flex:1; background:none; border:none; color:rgba(255,255,255,0.4); padding:12px; font-weight:800; font-size:0.85rem; cursor:pointer; position:relative; z-index:1; transition:color 0.3s; }
        .lg-toggle-btn.active { color:#fff; }

        .lg-form { display:flex; flex-direction:column; gap:24px; }
        .lg-field { display:flex; flex-direction:column; gap:10px; }
        .lg-field label { font-size:10px; font-weight:800; letter-spacing:2px; color:rgba(255,255,255,0.4); }
        .lg-field input { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:14px; padding:15px 20px; color:#fff; font-size:1rem; outline:none; transition:all 0.3s; }
        .lg-field input:focus { border-color:rgba(0,242,255,0.4); background:rgba(255,255,255,0.08); }

        .lg-submit-btn { margin-top:15px; padding:18px; background:linear-gradient(135deg,#00f2ff,#ff00ff); border:none; border-radius:16px; color:#000; font-weight:950; font-size:0.95rem; letter-spacing:1px; cursor:pointer; box-shadow:0 10px 30px rgba(0,242,255,0.2); }
        
        .lg-footer { margin-top:40px; text-align:center; }
        .lg-footer p { font-size:0.75rem; color:rgba(255,255,255,0.3); line-height:1.6; }
        .lg-footer span { color:rgba(255,255,255,0.6); font-weight:700; cursor:pointer; }
        .lg-footer span:hover { color:#00f2ff; }
      `}</style>
    </div>
  );
}

export default Login;
