import React, { useContext } from 'react'
import { UserContext } from '../../context/UserContext'

const Test3 = ({}) => {
    const userName =useContext(UserContext)
    // console.log(userName)
  return (
    <div>
      <h1 className='text-4xl text-red-600'>{userName}</h1>
    </div>
  )
}

export default Test3
