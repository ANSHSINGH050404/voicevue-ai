'use client'

import { Button } from '@/components/ui/button'
import { Camera, Video } from 'lucide-react'
import React, { useState } from 'react'

const LatestInterviewList = () => {

    const [interviewList, setInterviewList] = useState([])
  return (
    <div className='my-5'>
        <h2 className='font-bold text-2xl'> Previosly Created Interview</h2>
       {interviewList?.length==0 && 
       <div className='p-5 flex flex-col p-5 gap-3 items-center '>
  <Video className='h-10 w-10 '/>
  <h2>You don't have any interview created</h2>
  <Button>Create New Interview</Button>
       </div>
}
    </div>
  )
}

export default LatestInterviewList