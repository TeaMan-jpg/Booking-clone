"use client"
import React, { useState } from 'react'

import { useLocalStorage } from '../hooks/useLocalStorage'
import Navbar2 from '../components/Navbar2'
import StatisticsEC from '../components/StatisticsEC'

const page = () => {
    const {getItem4} = useLocalStorage("email","password","isSignedIn","role")

    const [role,setRole] = useState<string>(getItem4())
  return (
    <>
    {role === "Admin" || role === "ECHandler" || role === "TechHead" ? <Navbar2/> : null}
    <StatisticsEC/>
    </>
  )
}

export default page