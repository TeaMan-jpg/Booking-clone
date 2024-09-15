"use client"

import React, { useState } from 'react'
import CreateUser from '../components/createUser'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Navbar from '../components/Navbar'
import Navbar2 from '../components/Navbar2'


const page = () => {

  const {getItem4} = useLocalStorage("email","password","isSignedIn","role")

  const [role,setRole] = useState<string>(getItem4())
  return (
      <>
          {role === "Admin" && <Navbar2/>}
          {role === "ECHandler" && <Navbar2/>}
          {role === "TechHead" && <Navbar2/>}
          {role === "Student" && <Navbar/>}

          <CreateUser />
      </>
  )
}

export default page