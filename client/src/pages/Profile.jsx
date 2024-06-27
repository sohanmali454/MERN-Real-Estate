import React from 'react'
import {useSelector} from 'react-redux'

export default function Profile() {
  const {currentUser}=useSelector ((state)=>state.user )

  return (
    <div className='max-w-lg mx-auto p-3'>
     <h1 className='text3xl font-semibold text-center my-7'>Profile</h1>
     <form className='flex flex-col gap-4'>
      <img src={currentUser.profile} alt="profile"
      className='w-24 h-24 object-cover cursor-pointer self-center mt-2 rounded-full'/>
      
      <input type="text"  placeholder='userName' id='userName'
      className='border p-3 rounded-lg'/>

      <input type="email"  placeholder='email' id='email'
      className='border p-3 rounded-lg'/>

      <input type="password"  placeholder='password' id='password'
      className='border p-3 rounded-lg'/>
      <button className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'>UPDATE</button>
     </form>
     <div className='flex justify-between mt-5'>
      <span className='text-red-700 cursor-pointer '>Delete Account</span>
      <span className='text-red-700 cursor-pointer '>Sign Out</span>
  </div>
    </div>
  )
}
