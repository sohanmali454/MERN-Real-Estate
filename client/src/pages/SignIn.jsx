import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { signInStart ,signInSuccess,signInFailure} from '../redux/user/userSlice';

export default function SignIn() {
  const [formData,setformData]=useState({});
  const { error, loading } = useSelector((state) => state.user); 
  const navigate=useNavigate();
  const dispatch=useDispatch();

  const handleChange=(event)=>{
    setformData({
      ...formData,
      [event.target.id]:event.target.value,
    });
  };
  console.log(formData);
  
  const handleSubmit=async (event)=>{
    event.preventDefault();
  try{

    dispatch(signInStart())
    const res=await fetch('/api/auth/signIn',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(formData),
    });
    const data=await res.json();

    if(data.success===false){
      dispatch(signInFailure(data.message));
      return;
    }
     dispatch(signInSuccess(data));
    navigate('/')
  }
  catch(error){
  dispatch(signInFailure(error.message)) ;
 }
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>

        <input type='userNameOrEmail' placeholder='username/email'
        className='border rounded-lg p-3' id='userNameOrEmail'onChange={handleChange}/>

        <input type='password' placeholder='password'
        className='border rounded-lg p-3' id='password' onChange={handleChange}/>

        <button disabled={loading} 
        className='bg-slate-700 rounded-lg uppercase hover:opacity-90 p-3 disabled:opacity-80 text-white'>
         {loading? 'Loading...':'Sign In'}
          </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Dont have an account?</p>
        <Link to={"/sign-up"}>
        <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
};
