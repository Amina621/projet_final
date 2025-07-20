import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo1.png';
import { UserButton } from '@clerk/clerk-react'

const Navbar = () => {
  return (
    <div className='flex items-center justify-between 
    px-4 md:px-8 boredr-b border-gray-300 py-3 bg-white 
    transition-all duration-300'>
        <Link to='/'>
        <img src={logo} alt="logo1" />
        </Link>
        <UserButton/>
      
    </div>
  )
}

export default Navbar
