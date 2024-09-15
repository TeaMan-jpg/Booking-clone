"use client"
import ManageProblem from '@/app/components/ManageProblem'
import Navbar from '@/app/components/Navbar'
import Navbar2 from '@/app/components/Navbar2'
import { useLocalStorage } from '@/app/hooks/useLocalStorage'
import React, { useState } from 'react'

const page = ({params}: ({
    params: {
        id:string
    }
})) => {

    const {getItem4} = useLocalStorage("email","password","isSignedIn","role")

    const [role,setRole] = useState<string>(getItem4())
  return (
    <>

    {
        role === "Admin" ? <Navbar2/> : null
    }

    <ManageProblem id={params.id}></ManageProblem>

    
    </>
  )
}

export default page