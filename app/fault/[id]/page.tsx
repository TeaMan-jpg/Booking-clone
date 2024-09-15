"use client"
import ManageProblemFault from '@/app/components/ManageProblemFault'
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

    <ManageProblemFault id={params.id}></ManageProblemFault>

    
    </>
  )
}

export default page