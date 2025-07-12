import React from 'react'
import WelcomeContainer from '../_components/WelcomeContainer'
import CreateOption from '../_components/CreateOption'
import LatestInterviewList from '../_components/LatestInterviewList'

const page = () => {
  return (
    <div>
      {/* <WelcomeContainer/> */}
      <h2 className='font-bold text-2xl py-3'>Dashboard</h2>
      <CreateOption/>

      <LatestInterviewList/>

    </div>
  )
}

export default page