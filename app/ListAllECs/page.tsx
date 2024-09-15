
import React, { useState } from 'react'
import ListAllECs from '../components/ListAllECs'
import { useLocalStorage } from '../hooks/useLocalStorage'
import Navbar2 from '../components/Navbar2'

const page = () => {

    // const {getItem4} = useLocalStorage("email","password","isSignedIn","role")

    // const [role,setRole] = useState<string>()
  return (
    <>
    <Navbar2/> 

    <ListAllECs/>
    </>
  )
}

export default page