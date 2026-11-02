import React, { useState } from 'react'
import Test from './Test'
import { UserContext } from '../../context/UserContext'

const PracticeContext = () => {
  const [name,setName]=useState("nidhiiiii")
  return (
    <>
    <UserContext.Provider value={name}>

      <Test/>


    </UserContext.Provider>
    </>
  )
}

export default PracticeContext
