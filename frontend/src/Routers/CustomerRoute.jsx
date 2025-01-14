import React from 'react'
import Profile from '../components/Navbar/Profile/Profile'
import Auth from '../components/Auth/Auth'

const CustomerRoute = () => {
  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/account/:register' element={<Home/>}/>
        <Route path='/resturant/:city/:title/:id' element={<ResturantDetails/>}/>
        <Route path='/cart' element={<Cart/>}/>
        <Route path='/my-profile/*' element={<Profile/>}/>
      </Routes>
      <Auth/>
    </div>
  )
}

export default CustomerRoute
