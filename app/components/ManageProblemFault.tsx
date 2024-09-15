"use client"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
interface Fault {
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

interface ECHandle {
    _id:string,
    title:string,
    date:string,
    priority:string,
    module:string,
    component:string,
    evidence:string,
    description:string,
    username:string,
    status:string
}
function ManageProblem({id}:({id:string})){



    const [item,setItem] = useState({})
    const [status,setStatus] = useState('')


    const handleStatus = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setStatus(e.target.value)
    }


    
    const modifyStatus = async () => {


        const obj = {
            ...item,
            id:id,
            status:status
        }
        try {
            
            const res = await fetch(`http://localhost:3000/api/faults`, {
                method:'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({obj})
            })

            if (!res.ok) {
                throw new Error("No post")
            }

            
        }
        catch(err) {
            console.log(err)
        }
    }



    useEffect(() => {


        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/faults`, {
                    method:'GET',
                    headers: {
                        'Content-Type':'application/json'
                    }
                })

                if (!res.ok) {
                    throw new Error()
                }

                const data = await res.json()

                
                setItem(data.users.filter((user:Fault) => user._id === id))
                
              
            }
            catch(err) {
                console.log(err)
            }
        }

        fetchData()
    },[])
    return (
        <>
        <div className="problem m-3 bg-white flex justify-center items-center flex-col">
            <h2 className="text-blue-950 text-2xl">Status Change</h2>
            <select name="" id="" onChange={handleStatus} value={status} className="border-b-2 border-blue-500 rounded focus:outline-none m-1 w-96">
                <option value="Good Service">Good Service</option>
                <option value="Pending Service">Pending Service</option>
                <option value="Bad Service">Bad Service</option>
            </select>

            <button onClick={modifyStatus}>Apply Status</button>





        </div>
        </>
    )
}

export default ManageProblem