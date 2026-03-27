import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CartContext } from '../Pages/Cart/CartContext';
import { useAuth } from '../Pages/Account/AuthContext';

function Navbar() {
  const { cartItems } = useContext(CartContext);
  const { isLoggedIn, logout, user } = useAuth();
  const [scroll, setScroll] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [showCategoriesSidebar, setShowCategoriesSidebar] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);
  const [openCategory, setOpenCategory] = useState('Product');
  const cartCount = cartItems.length;


  const categories = [
    { name: 'Gender', subItems: ['Men', 'Women', 'Kids'] },
    { name: 'Sale', subItems: ['Shoes', 'Clothing', 'Accessories'] },
    { name: 'Product', subItems: ['Bag', 'Sweather', 'Sunglass'] },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScroll(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = window.location.pathname;

  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };

  return (
    <div className="header-container">
      {/* Main Nike Navbar */}
      <nav className={`nike-navbar ${scroll ? "navbar-scrolled" : ""}`}>
        <div className="container">
          {/* Logo */}
          <Link className="nike-logo" to="/">
            <span className="logo-text">NIKE</span>
            <div className="logo-glow"></div>
          </Link>

          {/* Desktop Menu */}
          <ul className="nike-nav-links">
            <li className={`nav-item ${pathname === '/' ? 'active' : ''}`}>
              <Link className="nav-link" to="/">Home</Link>
            </li>
            <li className={`nav-item ${pathname === '/about' ? 'active' : ''}`}>
              <Link className="nav-link" to="/About">About</Link>
            </li>
            <li className={`nav-item ${pathname === '/shop' ? 'active' : ''}`}>
              <Link className="nav-link" to="/Shop">Shop</Link>
            </li>
            <li className={`nav-item ${pathname === '/contact' ? 'active' : ''}`}>
              <Link className="nav-link" to="/contact">Contact</Link>
            </li>
          </ul>

          {/* Desktop Icons */}
          <div className="nike-actions">
            <a href="/#" className="action-icon search-icon">
              <i className="fa fa-search"></i>
              <span className="icon-tooltip">Search</span>
            </a>
            <a href="#categories" onClick={(e) => { e.preventDefault(); setShowCategoriesSidebar(true); }} className="action-icon category-icon">
              <i className="fa fa-th-large"></i>
              <span className="icon-tooltip">Categories</span>
            </a>
            <Link to="/Cart" className="action-icon cart-icon">
              <i className="fa fa-shopping-bag"></i>
              <span className="cart-count">{cartCount}</span>
              <span className="icon-tooltip">Cart</span>
            </Link>
<div className="action-icon user-relative-container">
  <button 
    onClick={() => setShowAccountDropdown(!showAccountDropdown)} 
    className="action-icon user-icon"
    style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}
  >
    <i className="fa fa-user"></i>
    <span className="icon-tooltip">Account</span>
  </button>
  
  <AnimatePresence>
    {showAccountDropdown && (
      <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.95 }}
        className="account-dropdown"
        style={{
          position: 'absolute',
          top: '100%',
          right: 0,
          background: 'rgba(20, 20, 20, 0.95)',
          backdropFilter: 'blur(10px)',
          borderRadius: '15px',
          padding: '10px',
          minWidth: '200px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
          zIndex: 1000,
          marginTop: '10px'
        }}
      >
        {!isLoggedIn ? (
          <>
            <Link to="/Login" onClick={() => setShowAccountDropdown(false)} style={dropdownItemStyle}>
              <i className="fas fa-sign-in-alt"></i> Log In
            </Link>
            <Link to="/Login" onClick={() => setShowAccountDropdown(false)} style={dropdownItemStyle}>
              <i className="fas fa-user-plus"></i> Sign Up
            </Link>
          </>
        ) : (
          <>
            <div style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '5px' }}>
              <p style={{ margin: 0, fontSize: '14px', fontWeight: 'bold' }}>{user?.name}</p>
              <p style={{ margin: 0, fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>{user?.email}</p>
            </div>
            <Link to="/Account" onClick={() => setShowAccountDropdown(false)} style={dropdownItemStyle}>
              <i className="fas fa-user-circle"></i> My Account
            </Link>
            <button onClick={() => { logout(); setShowAccountDropdown(false); }} style={{...dropdownItemStyle, background: 'none', border: 'none', width: '100%', textAlign: 'left', color: '#ff4444'}}>
              <i className="fas fa-sign-out-alt"></i> Logout
            </button>
          </>
        )}
      </motion.div>
    )}
  </AnimatePresence>
</div>

          </div>

          {/* Mobile Menu Button */}
          <button className={`mobile-menu-btn ${openMenu ? 'active' : ''}`} onClick={toggleMenu}>
            <span className="hamburger-line line-1"></span>
            <span className="hamburger-line line-2"></span>
            <span className="hamburger-line line-3"></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${openMenu ? 'open' : ''}`}>
          <ul className="mobile-nav-links">
            <li><Link to="/" className={`mobile-link ${pathname === '/' ? 'active' : ''}`}>Home</Link></li>
            <li><Link to="/About" className={`mobile-link ${pathname === '/about' ? 'active' : ''}`}>About</Link></li>
            <li><Link to="/Shop" className={`mobile-link ${pathname === '/shop' ? 'active' : ''}`}>Shop</Link></li>
            <li><Link to="/contact" className={`mobile-link ${pathname === '/contact' ? 'active' : ''}`}>Contact</Link></li>
          </ul>
          <div className="mobile-actions">
            <a href="/#" className="mobile-action">Search</a>
            <Link to="/Cart" className="mobile-action cart-mobile">Cart ({cartCount})</Link>
            <Link to={isLoggedIn ? "/Account" : "/Login"} className="mobile-action">
              {isLoggedIn ? "Account" : "Login / Signup"}
            </Link>
          </div>
        </div>
      </nav>

      {/* Off-canvas Categories Sidebar */}
      <AnimatePresence>
        {showCategoriesSidebar && (
          <>
            <motion.div 
              className="sidebar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowCategoriesSidebar(false)}
            />
            <motion.div 
              className="banner-sidebar right-sidebar"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
            >
              <div className="sidebar-close-btn" onClick={() => setShowCategoriesSidebar(false)}>
                <i className="fas fa-times"></i>
              </div>
              <h2 className="sidebar-title">Categories</h2>
              <ul className="sidebar-menu">
                {categories.map((cat) => (
                  <li key={cat.name} className="sidebar-item">
                    <div 
                       className="sidebar-header" 
                       onClick={() => setOpenCategory(openCategory === cat.name ? null : cat.name)}
                    >
                      <span>{cat.name}</span>
                      <i className={`fas fa-chevron-circle-down ${openCategory === cat.name ? 'rotate' : ''}`}></i>
                    </div>
                    <AnimatePresence>
                      {openCategory === cat.name && (
                        <motion.ul 
                          className="sidebar-sublist"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {cat.subItems.map(subItem => (
                            <li key={subItem} className="sublist-item">{subItem}</li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

const dropdownItemStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  padding: '12px 15px',
  color: '#fff',
  textDecoration: 'none',
  fontSize: '14px',
  borderRadius: '10px',
  transition: 'background 0.3s ease',
  cursor: 'pointer',
  whiteSpace: 'nowrap'
};

export default Navbar;