import React from 'react';
import Navbar from './Home/Navbar';
import Model from './Home/Model';
import Banner from './Home/Banner';
import Categories from './Home/Categories';
import Featured from './Home/Featured';
import Footer from './Home/Footer';

function App() {
  return (


    
    <div style={{ minHeight: '100vh', backgroundColor: '#000', color: '#fff' }}>
      <Navbar />
      <Model />
      <Banner />
      <Categories />
      <Featured />
      <Footer />  
    </div>
  );
}

export default App;
