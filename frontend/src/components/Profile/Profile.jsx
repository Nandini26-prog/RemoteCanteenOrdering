import React, { useState } from 'react'
import ProfileNavigation from './ProfileNavigation'
import UserProfile from './UserProfile';
import Orders from './Orders';
import Address from './Address';
import Favourites from './Favourites';
import Events from './Events';

const Profile = () => {
    const [openSideBar,setOpenSideBar]=useState(false);
  return (
    <div className='lg:flex justify-between'>
        <div className='sticky h-[80vh0 lg:w-[20%]'>
            <ProfileNavigation open={openSideBar}/>
        </div>
        <div className='lg:w-[80%]'>
        <routes>
          <route path='/' element={<UserProfile/>}/>
          <route path='/orders' element={<Orders/>}/>
          <route path='/address' element={<Address/>}/>
          <route path='/favourites' element={<Favourites/>}/>
          <route path='/events' element={<Events/>}/>


        </routes>
        </div>
    </div>
  )
}

export default Profile
