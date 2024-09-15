"use client"
import React, { useState } from 'react'
import TechnicalCreate from '../components/TechnicalCreate'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Navbar from '../components/Navbar'

const page = () => {
  const {getItem4} = useLocalStorage("email","password","isSignedIn","role")

  const [role,setRole] = useState<string>(getItem4())
return (
  <>
 <div>
  <Navbar></Navbar>
    {role === "Admin" || role === "ECHandler" || role === "TechHead" ? <TechnicalCreate/> : null}

    <TechnicalCreate/> 
 </div>
  </>
)
}

export default page