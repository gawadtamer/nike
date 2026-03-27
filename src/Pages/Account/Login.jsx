import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext';
import Navbar from '../../Home/Navbar';
import Footer from '../../Home/Footer';
import AnimatedBackground from '../../Home/AnimatedBackground';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      login({ name: 'User', email: formData.email });
    } else {
      signup({ name: formData.name, email: formData.email });
    }
    navigate('/Account');
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <AnimatedBackground />
      <Navbar />
      
      <div style={{ padding: '120px 20px', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative', zIndex: 1 }}>
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(30px)',
            padding: '60px',
            borderRadius: '40px',
            width: '100%',
            maxWidth: '500px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            boxShadow: '0 50px 100px -20px rgba(0, 0, 0, 0.5)'
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '900', marginBottom: '10px', letterSpacing: '-1px' }}>
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.5)', fontSize: '15px' }}>
              {isLogin ? 'Enter your details to access your account' : 'Join the Nike community today'}
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <label style={labelStyle}>Full Name</label>
                  <input 
                    type="text" 
                    name="name" 
                    placeholder="Enter your name" 
                    className="login-input"
                    style={inputStyle} 
                    onChange={handleChange}
                    required={!isLogin}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div>
              <label style={labelStyle}>Email Address</label>
              <input 
                type="email" 
                name="email" 
                placeholder="nike@example.com" 
                className="login-input"
                style={inputStyle} 
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label style={labelStyle}>Password</label>
              <input 
                type="password" 
                name="password" 
                placeholder="••••••••" 
                className="login-input"
                style={inputStyle} 
                onChange={handleChange}
                required
              />
            </div>

            <motion.button 
              whileHover={{ scale: 1.02, backgroundColor: '#fff', color: '#000' }}
              whileTap={{ scale: 0.98 }}
              style={submitBtnStyle} 
              type="submit"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </motion.button>
          </form>

          <div style={{ marginTop: '30px', textAlign: 'center' }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '14px' }}>
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <button 
                onClick={() => setIsLogin(!isLogin)}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  color: '#fff', 
                  fontWeight: '700', 
                  marginLeft: '8px', 
                  cursor: 'pointer',
                  textDecoration: 'underline'
                }}
              >
                {isLogin ? 'Sign Up' : 'Log In'}
              </button>
            </p>
          </div>
        </motion.div>
      </div>

      <Footer />
      <style>{`
        .login-input {
          width: 100%;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: '16px';
          color: '#fff';
          font-size: '16px';
          outline: none;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-sizing: border-box;
        }
        .login-input:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(255, 255, 255, 0.2);
        }
        .login-input:focus {
          background: rgba(255, 255, 255, 0.1);
          border-color: #fff;
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.1);
        }
      `}</style>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: '11px',
  textTransform: 'uppercase',
  color: 'rgba(255, 255, 255, 0.4)',
  marginBottom: '8px',
  letterSpacing: '2px',
  fontWeight: '700'
};

const inputStyle = {
  width: '100%',
  padding: '16px 24px',
  background: 'rgba(255, 255, 255, 0.03)',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  borderRadius: '16px',
  color: '#fff',
  fontSize: '16px',
  outline: 'none',
  boxSizing: 'border-box'
};

const submitBtnStyle = {
  width: '100%',
  padding: '18px',
  background: 'rgba(255, 255, 255, 0.1)',
  color: '#fff',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  fontSize: '16px',
  fontWeight: '800',
  cursor: 'pointer',
  marginTop: '10px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  transition: 'all 0.3s ease'
};

export default Login;
