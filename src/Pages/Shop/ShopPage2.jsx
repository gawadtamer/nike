import React from 'react'
import Navbar from '../../Home/Navbar'
import Footer from '../../Home/Footer'
import Details from './Details'

function ShopPage2() {
  return (
    <div>
      <Navbar />
      <Details page={2} />
      <Footer />
    </div>
  )
}

export default ShopPage2