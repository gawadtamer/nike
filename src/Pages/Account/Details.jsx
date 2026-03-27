import React, { useState, useRef, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from './AuthContext';
import { CartContext } from '../Cart/CartContext';
import AnimatedBackground from '../../Home/AnimatedBackground';

function Details() {
  const { user, updateUser, logout } = useAuth();
  const { cartItems } = useContext(CartContext);
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(user?.name || '');
  const fileInputRef = useRef(null);

  if (!user) {
    return (
      <div style={{ backgroundColor: '#000', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
        <AnimatedBackground />
        <h2 style={{ color: '#fff', position: 'relative', zIndex: 1 }}>Please Log In</h2>
      </div>
    );
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateUser({ profileImage: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    updateUser({ name: tempName });
    setIsEditing(false);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff', position: 'relative', overflow: 'hidden' }}>
      <AnimatedBackground />
      <div className="details-container" style={{ padding: '60px 20px 80px', maxWidth: '1000px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="profile-card"
          style={{
            background: 'rgba(255, 255, 255, 0.02)',
            backdropFilter: 'blur(30px)',
            borderRadius: '40px',
            padding: '60px',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 40px 100px -30px rgba(0, 0, 0, 0.7)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Background Decorative Gradient */}
          <div style={{
            position: 'absolute',
            top: '-50%',
            right: '-10%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
            pointerEvents: 'none'
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', marginBottom: '60px' }}>
            {/* Avatar Section */}
            <div style={{ position: 'relative', marginBottom: '25px' }}>
              <motion.div 
                whileHover={{ scale: 1.05 }}
                onClick={() => fileInputRef.current.click()}
                style={{
                  width: '140px',
                  height: '140px',
                  borderRadius: '50%',
                  background: user.profileImage ? `url(${user.profileImage})` : 'linear-gradient(135deg, #333, #111)',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '56px',
                  color: '#fff',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  border: '4px solid rgba(255, 255, 255, 0.1)',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
                  overflow: 'hidden'
                }}
              >
                {!user.profileImage && user.name?.[0]}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'rgba(0,0,0,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: 0,
                  transition: 'opacity 0.3s ease',
                  fontSize: '14px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }} className="avatar-overlay">
                  Change
                </div>
              </motion.div>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleImageUpload} 
                accept="image/*" 
                style={{ display: 'none' }} 
              />
            </div>

            <AnimatePresence mode="wait">
              {isEditing ? (
                <motion.div 
                  key="edit"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  style={{ width: '100%', maxWidth: '300px' }}
                >
                  <input 
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    style={{
                      width: '100%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      padding: '12px 20px',
                      borderRadius: '12px',
                      color: '#fff',
                      fontSize: '24px',
                      textAlign: 'center',
                      fontWeight: '800',
                      outline: 'none'
                    }}
                    autoFocus
                  />
                  <div style={{ marginTop: '15px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                    <button onClick={handleSave} style={smallPrimaryBtnStyle}>Save</button>
                    <button onClick={() => setIsEditing(false)} style={smallSecondaryBtnStyle}>Cancel</button>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="view"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                >
                  <motion.h1 variants={itemVariants} style={{ fontSize: '42px', margin: 0, fontWeight: '900', color: '#fff', letterSpacing: '-1px' }}>
                    {user.name}
                  </motion.h1>
                  <motion.p variants={itemVariants} style={{ color: 'rgba(255, 255, 255, 0.5)', margin: '10px 0', fontSize: '16px', letterSpacing: '1px', textTransform: 'uppercase' }}>
                    Elite Member
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '25px', marginBottom: '60px' }}>
            <motion.div variants={itemVariants} className="info-box" style={infoBoxStyle}>
              <span style={labelStyle}>Email Address</span>
              <span style={valueStyle}>{user.email}</span>
            </motion.div>
            <motion.div variants={itemVariants} className="info-box" style={infoBoxStyle}>
              <span style={labelStyle}>Member Since</span>
              <span style={valueStyle}>March 2024</span>
            </motion.div>
            <motion.div variants={itemVariants} className="info-box" style={infoBoxStyle}>
              <span style={labelStyle}>Active Items</span>
              <span style={valueStyle}>{cartItems.length} Products</span>
            </motion.div>
          </div>

          <motion.div 
            variants={itemVariants}
            style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}
          >
            <motion.button 
              whileHover={{ scale: 1.05, backgroundColor: '#fff', color: '#000' }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(true)}
              style={primaryBtnStyle}
            >
              Edit Profile
            </motion.button>
            <motion.button 
                whileHover={{ scale: 1.05, borderColor: '#fff' }}
                whileTap={{ scale: 0.95 }}
                onClick={logout}
                style={secondaryBtnStyle}
            >
              Sign Out
            </motion.button>
          </motion.div>
        </motion.div>
      </div>

      <style>{`
        .profile-card:hover .avatar-overlay { opacity: 1; }
        .info-box { transition: all 0.3s ease; border: 1px solid rgba(255,255,255,0.05); }
        .info-box:hover { background: rgba(255,255,255,0.08) !important; transform: translateY(-5px); border-color: rgba(255,255,255,0.15); }
      `}</style>
    </div>
  );
}

const infoBoxStyle = {
  padding: '30px',
  background: 'rgba(255, 255, 255, 0.03)',
  borderRadius: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px'
};

const labelStyle = {
  fontSize: '11px',
  textTransform: 'uppercase',
  color: 'rgba(255, 255, 255, 0.4)',
  letterSpacing: '2px',
  fontWeight: '700'
};

const valueStyle = {
  fontSize: '20px',
  fontWeight: '600',
  color: '#fff'
};

const primaryBtnStyle = {
  padding: '18px 40px',
  borderRadius: '16px',
  border: 'none',
  background: 'rgba(255,255,255,0.1)',
  color: '#fff',
  fontWeight: '800',
  cursor: 'pointer',
  fontSize: '16px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  transition: 'all 0.3s ease'
};

const secondaryBtnStyle = {
  padding: '18px 40px',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  background: 'transparent',
  color: 'rgba(255, 255, 255, 0.6)',
  fontWeight: '800',
  cursor: 'pointer',
  fontSize: '16px',
  textTransform: 'uppercase',
  letterSpacing: '1px',
  transition: 'all 0.3s ease'
};

const smallPrimaryBtnStyle = {
    padding: '8px 20px',
    borderRadius: '8px',
    border: 'none',
    background: '#fff',
    color: '#000',
    fontWeight: 'bold',
    cursor: 'pointer'
};

const smallSecondaryBtnStyle = {
    padding: '8px 20px',
    borderRadius: '8px',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    background: 'transparent',
    color: '#fff',
    fontWeight: 'bold',
    cursor: 'pointer'
};

export default Details;
