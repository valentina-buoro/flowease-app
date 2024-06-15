import React from 'react'
import Hero from '../components/landingpageComponents/hero'
import Navbar from '../components/landingpageComponents/navbar'
import Features from '../components/landingpageComponents/features'
import Trust from '../components/landingpageComponents/trust'
import Footer from '../components/landingpageComponents/footer'
import Contact from '../components/landingpageComponents/contact'

const LandingPage = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Features/>
        <Trust/>
        <Contact/>
        <Footer/>
     <div >Testing</div>
     <div className='bg-[red]'>Testing ttteee</div>
    </div>
  )
}

export default LandingPage