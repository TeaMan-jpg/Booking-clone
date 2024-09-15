"use client"
import Link from "next/link";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { useRouter } from "next/navigation";


function Navbar2() {

  const {removeItem,removeItem2,removeItem3,removeItem4} = useLocalStorage("email","password","isSignedIn","role")

  const Router = useRouter()


  const handleSignOut = () => {

    removeItem()
    removeItem2()
    removeItem3()
    removeItem4()
    Router.push("/Login")


  }
  return (
    <nav className="bg-blue-950">
      <ul className="flex">
        <li className="text-white m-5">
            <Link href="/status">View Service Status</Link>
        </li>
        <li className="text-white m-5">
            <Link href="/FAQs">FAQs</Link>
        </li>
        <li className="text-white m-5">
            <Link href="/createUser">Create New User</Link>
        </li>
        <li className="text-white m-5">
            <Link href="/ListAllECs">List All ECs</Link>
        </li>
       
        <li className="text-white m-5">
          <Link href="/ListAllUsers">List all Users</Link>
        </li>
        <li className="text-white m-5">
            <Link href={"/ListAllTechs"}>List all Technical Faults</Link>
        </li>
        <li className="text-white m-5 cursor-pointer" onClick={handleSignOut}>
          <p>Sign Out</p>
        </li>
      </ul>
    </nav>
  );
}


export default Navbar2