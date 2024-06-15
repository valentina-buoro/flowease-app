import React from 'react'
import Hero from '../components/landingpageComponents/hero'
import Navbar from '../components/landingpageComponents/navbar'
import Features from '../components/landingpageComponents/features'
import Trust from '../components/landingpageComponents/trust'
import Footer from '../components/landingpageComponents/footer'
import Contact from '../components/landingpageComponents/contact'
import Pricing from '../components/landingpageComponents/pricing'

const LandingPage = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Features/>
        <Pricing/>
        <Trust/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default LandingPage