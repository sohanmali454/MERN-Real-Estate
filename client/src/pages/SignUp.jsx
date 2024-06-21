import React, { useState } from 'react'
import { Link,Navigate,useNavigate } from 'react-router-dom'

export default function SignUp() {
  const [formData,setformData]=useState({});
  const[error,setError]=useState(null);
  const[loading,setLoading]=useState(false);
  const navigate=useNavigate();

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
    setLoading(true);
    const res=await fetch('/api/auth/signUp',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(formData),
    });
    const data=await res.json();
    if(data.success===false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(false);
    navigate('/sign-In')
  }catch{
    setError(error.message);
    setLoading(false);
  }
    
  }
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type='text' placeholder='username'
        className='border rounded-lg p-3' id='userName' onChange={handleChange}/>
        <input type='email' placeholder='email'
        className='border rounded-lg p-3' id='email'onChange={handleChange}/>
        <input type='password' placeholder='password'
        className='border rounded-lg p-3' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 rounded-lg uppercase hover:opacity-90 p-3 disabled:opacity-80'>
         {loading? 'Loading...':'Sign Up'}
          </button>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Have an account?</p>
        <Link to={"/sign-in"}>
        <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
