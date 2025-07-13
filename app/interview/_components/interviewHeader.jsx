import React from 'react'

import Image from 'next/image'

const InterviewHeader = () => {
  return (
    <div className='p-4 shadow-sm'>
        <Image
        src={'/login.jpg'}
        alt='logo'
        width={200}
        height={100}
        className='w-[140px]'
        
        />
    </div>
  )
}

export default InterviewHeader