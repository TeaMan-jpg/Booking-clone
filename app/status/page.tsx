"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { useLocalStorage } from '../hooks/useLocalStorage'
import ViewServiceStatus from '../components/ViewServiceStatus'
import Navbar3 from '../components/Navbar3'
import Navbar2 from '../components/Navbar2'

const page = () => {
    const {getItem4} = useLocalStorage("email","password","isSignedIn","role")

    const [role,setRole] = useState<string>(getItem4())
  return (
    <>
    {role === "Admin" || role === "ECHandler" || role === "TechHead"  ? <Navbar2/> : null}

    {
      role === "Student" ? <Navbar/>:null
    }
    {
        role === "" ? <Navbar3/> :null
    }

    <ViewServiceStatus/>
    </>
  )
}

export default page