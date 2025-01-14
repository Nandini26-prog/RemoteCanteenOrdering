import React from 'react'
import { useNavigate } from 'react-router-dom'
import {Button, TextField, Typography } from '@mui/material'
import {Field,Form, Formik} from 'formik'

const initialValues={
  fullName:"",
  email:"",
  password:"",
  role:"ROLE_CUSTOMER"
}

export default function RegisterForm() {
  const navigate=useNavigate()
  const handleSubmit=(values)=>{
      console.log("form values",values)
  };
  return (
    <div>
      <Typography variant='h5' className='text-center'>
        register
      </Typography>
      <Formik onSubmit={handleSubmit} initialValues={initialValues}>
        <Form >
        <Field as={TextField}
                    name="fullName"
                    label="fullName"
                    fullWidth
                    variant="outlined"
                    margin="normal"/>
            <Field as={TextField}
                    name="email"
                    label="email"
                    fullWidth
                    variant="outlined"
                    margin="normal"/>
            <Field as={TextField}
                    name="password"
                    label="password"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    type="password"/>

            
              <Field 
              fullWidth
              margin="normal"
              as={Select}
              labelId="role-simple-select-label"
              id="demo-simple-select"
              name="role"
              >
                <Menuitem value={"ROLE_CUSTOMER"}>Customer</Menuitem>
                <Menuitem value={"ROLE_Resturant_Owner"}>Resturant_Owner</Menuitem>
              </Field>
    
            <button sx={{mt:2, padding:"1rem"}} fullWidth type='submit' variant='contained'>Login</button>
            
        </Form>
      </Formik>
      <Typography variant='body2' align='center' sx={{mt:3}}>
        if have an account already?
        <Button size='small' onClick={()=>navigate("/account/login")}>register</Button>
      </Typography>
    </div>
  )
}

