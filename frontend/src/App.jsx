import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Profile from './components/Navbar/Profile/Profile'
import CustomerRoute from './Routers/CustomerRoute'

const App = () => {
  return (
    <div className='app'>
      <Navbar/>
      <Profile/>
      <CustomerRoute/>
    </div>
  )
}

export default App
