import React from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

const UserProfile = () => {
    const handleLogout=()=>{

    }
  return (
    <div className='min-h-[80vh] flex flex-col justify-center items-center text-center'>
      <div className='flex flex-col items-center justify-center'>
<AccountCircleIcon sx={{fontSize:"9rem"}}/>
<h1 className='py-5 text-2xl font-semibold'>Code With <Me></Me></h1>
<p>Email:rahwanibhumika21@gmail.com</p>
<button variant="contained" onClick={handleLogout} sx={{margin:"2rem 0rem"}}>Logout</button>

      </div>
    </div>
  )
}

export default UserProfile
