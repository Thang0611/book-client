import React from 'react'
import { useState } from 'react'
import loginImg from '../assets/login.jpg'
export default function Login() {
    const [input,setInput]=useState()
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
        <div className='hidden sm:block w-full h-full object-cover'>
            <img  className='w-full h-full object-cover' src={loginImg} alt="img" />
        </div>
        <div className='bg-gray-100 flex flex-col justify-center'>
            <form  className='max-w-[400px] w-full mx-auto bg-white p-3'>
                <h2 className='text-4xl font-bold text-center py-6'>Login</h2>
                <div className="flex flex-col py-2">
                    <label htmlFor="">Username</label>
                    <input className='border p-2 rounded-xl' type="text"/>
                </div>
                <div className="flex flex-col py-2">
                    <label htmlFor="password">Password</label>
                    <input className='border rounded-xl p-2 ' type="password" id='password' />
                </div>
                <button className='w-full my-5 p-2 rounded-xl bg-blue-600 hover:bg-blue-400 text-white'>Login</button>
                <div id='exeption'></div>
                <div className='flex justify-between'>
                    <p className='flex items-center'>
                        <input className='mr-2'type="checkbox" /> Remember Me
                    </p>
                    <button>Create Account</button>
                </div>
            </form>
        </div>
    </div>
  )
}
