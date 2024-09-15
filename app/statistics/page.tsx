"use client"
import React, { useState } from 'react'
import Statistics from '../components/Statistics'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Navbar2 from '../components/Navbar2'

const page = () => {
    const {getItem4} = useLocalStorage("email","password","isSignedIn","role")

    const [role,setRole] = useState<string>(getItem4())
  return (
    <>
    {role === "Admin" || role === "ECHandler" || role === "TechHead" ? <Navbar2/> : null}
    <Statistics/>
    </>
  )
}

export default page