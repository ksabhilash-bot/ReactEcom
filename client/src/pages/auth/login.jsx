import CommonForm from '@/components/ui/common/form'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import registerformControls from '../../formconfig/Loginformindex'
import { loginUser } from '@/store/auth-slice'
import { useDispatch } from 'react-redux'
import { Toaster,toast } from 'sonner'
const initialState={
  email:"",
  password:"",
}
const AuthLogin = () => {
  const [formData,setFormData]=useState(initialState)
  const dispatch=useDispatch();
  function onSubmit(event){
    event.preventDefault();
    dispatch(loginUser(formData)).then((data)=>{
      if(data?.payload?.success){
        toast("Login Successfull")
      }
      else{
        toast(data?.payload?.message);
      }
    })

  }
  return (
    <div className='mx-auto w-full max-w-md space-y-6'>
      <h1 className='text-3xl font-bold tracking-tight text-foreground'>Log In</h1>
      <p className='text-2xl'>Don't have an account <Link className="text-gray-800 hover:underline"to='/register'>Sign Up</Link></p>
      <CommonForm 
      formControls={registerformControls}
      buttonText={"Log In"}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthLogin