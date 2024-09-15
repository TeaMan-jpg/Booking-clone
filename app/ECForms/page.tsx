"use client"
import React, { useState } from 'react'
import ECCreate from '../components/ECCreate'
import Navbar from '../components/Navbar'
import { useLocalStorage } from '../hooks/useLocalStorage'

const page = () => {

    const {getItem4} = useLocalStorage("email","password","isSignedIn","role")

    const [role,setRole] = useState<string>(getItem4())
  return (

  
          <>
          {role === "Student" && <Navbar/>}
          <ECCreate></ECCreate>
          </>
  )
}

export default page