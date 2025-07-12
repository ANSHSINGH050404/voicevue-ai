import React from 'react'

const OuestionList = ({formData}) => {

    useEffect(() => {
     if (formData) {
        GenerateOuestionList();
     }
    }, [formData])
    

    const GenerateOuestionList=()=>{
        
    }
  return (
    <div>OuestionList</div>
  )
}

export default OuestionList