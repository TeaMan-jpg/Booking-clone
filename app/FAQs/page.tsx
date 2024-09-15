"use client"

import React, { useState } from 'react'
import FAQs from '../components/FAQs'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Navbar2 from '../components/Navbar2'
import Navbar from '../components/Navbar'

const page = () => {

  const {getItem4} = useLocalStorage("email","password","isSignedIn","role")

  const [role] = useState<string>(getItem4())
  return (

    <div>
      {role === "Admin" || role === "ECHandler" || role === "TechHead" ? <Navbar2/> : null}
      {
        role === "Student" ? <Navbar/>:null
      }
      <FAQs></FAQs>
    </div>
  )
}

export default page