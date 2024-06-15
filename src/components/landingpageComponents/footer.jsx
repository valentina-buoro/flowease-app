import React from 'react'
import logo from '../../assets/svgs/landingpageSvg/footerLogo.svg'

const Footer = () => {
  return (
    <div className='bg-primaryBlue text-white text-xl flex items-center justify-evenly py-5'>
      <div><img src= {logo} alt='logo'/></div>
      <div className='flex flex-col items-start'>
        <p className='font-medium'>Subscribe to our newsletters</p>
        <div className='flex gap-2 w-full'><input className='w-9/12 rounded-lg py-2 px-4 border-none outline-none'/> <button className='bg-white text-primaryBlue rounded-[18px] py-2 px-3'>Submit</button> </div>
        <p className='mt-4'>Copyright © 2023 FlowEase. All rights reserved.</p>
      </div>
      <div><p>Terms & Conditions  |  Privacy Policy  |  Cookie Policy</p></div>
    </div>
  )
}

export default Footer