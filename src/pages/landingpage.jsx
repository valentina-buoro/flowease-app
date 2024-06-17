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

    <>
    <div className=" text-primaryBlue font-bold text-2xl flex items-center justify-center bg-[#E9EDFF] h-screen  md:hidden"> <p className='px-7 py-10'>Hi there 👋🏼, access to flowease is currently limited to laptops and desktops. Please view the application on any of the aforementioned devices. <br/> <br/> Thank you, <br/><span className='italic'>The Flowease Team.</span></p>
    
    </div>
    <div className='hidden md:block'>
        <Navbar/>
        <Hero/>
        <Features/>
        <Pricing/>
        <Trust/>
        <Contact/>
        <Footer/>
    </div>
    </>
    
  )
}

export default LandingPage