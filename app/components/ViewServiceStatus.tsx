"use client"
import { useEffect, useState } from "react";

interface Fault {
  type: string;
  _id:string,
  title:string,
  date:string,
  priority:string,
  location:string,
  evidence:string,
  description:string,
  username:string,
  status:string
}

function ViewServiceStatus() {

  const [faults,setFaults] = useState<Fault[]>([])


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/faults",{
          method:"GET",
          headers: {
            'Content-Type':"application/users"
          }
        })

        if (!res.ok){
          throw new Error("No faults found")
        }


        const data = await res.json()


        setFaults(data.users)



      }
      catch(err) {
        console.log(err)
      }
    }

    fetchUsers()
  },[])

  return (
    <div className="flex justify-center items-center rounded">
        <div className="bg-white p-4 my-3">
        <h2 className="underline text-blue-950 text-4xl m-4 mx-24 my-12">Current EECS Service Status</h2>
        

        {
          faults.map((fault,index) => (
            <>
              
              
              {
                    fault.location === "ITL" ? <div>
                      <hr className="bg-blue-950 h-1 rounded" />
                      <div className="first" key={index}>
                    <h4 className="underline text-blue-950 text-2xl my-3">{fault.location}</h4>
                    <p className="text-yellow-400 text-xl my-3">Current Status: {fault.status}</p>
                    <p className="text-blue-950 text-xl my-3">Description: {fault.description}</p>
                </div>
                <hr className="bg-blue-950 h-1 rounded" />
                    </div>:null
              }

              {
                fault.location === "Lab" ? <div>
                  <hr className="bg-blue-950 h-1 rounded" />
                  <div className="first" key={index}>
                <h4 className="underline text-blue-950 text-2xl my-3">{fault.location}</h4>
                <p className="text-yellow-400 text-xl my-3">Current Status: {fault.status}</p>
                <p className="text-blue-950 text-xl my-3">Description: {fault.description}</p>
            </div>
            <hr className="bg-blue-950 h-1 rounded" />
                </div>:null

              }
              {
                fault.location === "Library" ? <div>
                  <hr className="bg-blue-950 h-1 rounded" />
                  <div className="first" key={index}>
                <h4 className="underline text-blue-950 text-2xl my-3">{fault.location}</h4>
                <p className="text-yellow-400 text-xl my-3">Current Status: {fault.status}</p>
                <p className="text-blue-950 text-xl my-3">Description: {fault.description}</p>
            </div>
            <hr className="bg-blue-950 h-1 rounded" />
                </div>:null

              }
              
            
            </>
          ))
        }
        
        
    
      </div>
    </div>
  );
}

export default ViewServiceStatus