import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'

import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Pages générales
import Home from './pages/Home'
import AllRooms from './pages/AllRooms'
import RoomDetails from './pages/RoomDetails'
import MyBookings from './pages/MyBookings'

// Pages propriétaire hôtel
import HotelReg from './components/HotelReg'
import Layout from './pages/hotelOwner/Layout'
import Dashboard from './pages/hotelOwner/Dashboard'
import AddRoom from './pages/hotelOwner/AddRoom'
import ListRoom from './pages/hotelOwner/ListRoom'

export default function App() {
  const location = useLocation()
  const isOwnerPath = /^\/owner(\/|$)/.test(location.pathname)

  return (
    <div className='flex flex-col min-h-screen'>
      {!isOwnerPath && <Navbar />}

      {/* Routes */}
      <main className='flex-grow overflow-auto'>
        <Routes>
          {/* Routes publiques */}
          <Route path='/' element={<Home />} />
          <Route path='/rooms' element={<AllRooms />} />
          <Route path='/rooms/:id' element={<RoomDetails />} />
          <Route path='/my-bookings' element={<MyBookings />} />

          {/* Route pour formulaire d'enregistrement hôtel */}
          {/* <Route path="/hotel-reg" element={<HotelReg />} /> */}

          {/* Routes propriétaire (avec layout commun) */}
          <Route path='/owner' element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path='add-room' element={<AddRoom />} />
            <Route path='list-room' element={<ListRoom />} />
          </Route>
        </Routes>
      </main>

      <Footer />
    </div>
  )
}
