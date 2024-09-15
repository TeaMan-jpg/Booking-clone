
"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLocalStorage } from "../hooks/useLocalStorage";


function Navbar() {

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
    <nav className="bg-blue-950 p-3">
      <ul  className="flex">
        <li className="text-white m-5">
            <Link href="/status">View Service Status</Link>
        </li>
        <li className="text-white m-5">
            <Link href="/FAQs">FAQs</Link>
        </li>
        <li className="text-white m-5">
            <Link href="/ECForms">Create EC</Link>
        </li>
        <li className="text-white m-5">
            <Link href="/Technical">Create Technical Fault</Link>
        </li>
    
        <li className="text-white m-5">
          <Link href="/tickets">Find Personal Tickets</Link>
        </li>
        <li className="text-white m-5" onClick={handleSignOut}>
          <p>Sign Out</p>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar