import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from './AuthContext'
import Navbar from '../../Home/Navbar'
import Footer from '../../Home/Footer'
import Details from './Details'
function AllAccount() {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!isLoggedIn) {
      navigate('/Login');
    }
  }, [isLoggedIn, navigate]);

  if (!isLoggedIn) return null;

  return (
     <div className="account-page" style={{ backgroundColor: '#000', minHeight: '100vh', color: '#fff' }}>
<Navbar/>

<Details/>
<Footer/>
     </div>
   )
 }
 
 export default AllAccount