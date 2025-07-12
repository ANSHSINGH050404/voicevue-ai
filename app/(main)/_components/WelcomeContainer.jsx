'use client'
import { useUser } from '@/app/provider'
import Image from 'next/image';
import React from 'react'

const WelcomeContainer = () => {

    const {user}=useUser();
  return (
        <div className='bg-white p-3 rounded-3xl flex justify-between items-center rounded-3xl mt-10 mx-10'>
    <div>
            <h2>Welcome Back,{user?.name}</h2>
            <h2>AI-Driven Interview</h2>
        </div>
        
        {user &&<Image src={user?.picture} alt='userAvatar'
        width={50}
        height={50}
        className='rounded-full'
        />}
    </div>
  )
}

export default WelcomeContainer