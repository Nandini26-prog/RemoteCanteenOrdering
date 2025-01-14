import React from 'react'
import RegisterForm from './RegisterForm';

const Auth = () => {
    const location=useLocation();
    const navigate=useNavigate();
    const handleOnClose=()=>{
      navigate("/")
    }
  return (
    <>
    <Modal onClose={handleOnClose} open={
         location.pathname==="/account/register"
        || location.pathname==="/account/login"
    }>
        <Box sx={style}> //export style after cart.jsx
          {location.pathname==="/account/register"?<RegisterForm/>:<LoginForm/>}
        </Box>
    </Modal> 
    </>
  )
}

export default Auth
