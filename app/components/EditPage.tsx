"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
interface User {
    _id:string,
    username:string,
    password:string,
    firstname:string,
    lastname:string,
    role:string
}
function EditPage({id}:({id:string})) {

    const [item,setItem] = useState({})
    // const {id} = useParams()
    const [username,setUsername] = useState<string>('')

    const [firstname,setFirstname] = useState<string>('')

    const [lastname,setLastname] = useState<string>('')

    const [role,setRole] = useState<string>('')

    const handleUsername = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handleFirstname = (e:React.ChangeEvent<HTMLInputElement>) => {
        setFirstname(e.target.value)
    }

    const handleLastname = (e:React.ChangeEvent<HTMLInputElement>) => {
        setLastname(e.target.value)
    }   

    const handleRole = (e:React.ChangeEvent<HTMLSelectElement>) => {
        setRole(e.target.value)
    }


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() 

        console.log("eer")

       
        const obj = {
            
            ...item,
            id:id,
          
            username:username,
            firstname:firstname,
            lastname:lastname,
            role:role
            
        }
        try {
            
            const res = await fetch(`http://localhost:3000/api/users`, {
                method:'PUT',
                headers: {
                    'Content-Type':'application/json'
                },
                body: JSON.stringify({obj})
            })
            

            if (!res.ok) {
                throw new Error("No post")
            }

            if (res.ok) {
                console.log("James - put works");
            } 

            
        }
        catch(err) {
            console.log(err)
        }

    }

    


    useEffect(() => {


        const fetchData = async () => {
            try {
                const res = await fetch(`http://localhost:3000/api/users`, {
                    method:'GET',
                    headers: {
                        'Content-Type':'application/json'
                    }
                })

                if (!res.ok) {
                    throw new Error()
                }

                const data = await res.json()

             
                setItem(data.users.filter((user:User) => user._id === id))
                
                
            }
            catch(err) {
                console.log(err)
            }
        }

        fetchData()
    },[])
    
    return (
        <div>
            <h1 className="text-center text-3xl font-bold text-blue-950 m-3">Enter Details</h1>
            <div className="forms flex justify-center">
                <form action="" onSubmit={handleSubmit} className="flex flex-col bg-white p-5 m-5 rounded text-blue-950 font-bold w-1200px h-full justify-center ">
                    <label htmlFor="" className="p-2 ">First Name</label>
                    <input type="text" name="" id="" className="m-2 focus:outline-none border-b-2 border-blue-500 w-96" onChange={handleFirstname} value={firstname}/>
                    <label htmlFor="" className="p-2">Last Name</label>
                    <input type="text" name="" id="" className="m-2 focus:outline-none border-b-2 border-blue-500 w-96" onChange={handleLastname} value={lastname} />
                    <label htmlFor="" className="p-2">Username</label>
                    <input type="text" name="" id=""  className="m-2 focus:outline-none border-b-2 border-blue-500 w-96"onChange={handleUsername} value={username} />
                    <label htmlFor="" className="p-2">Acccount type</label>
                    <select name="" id="" onChange={handleRole} className="m-2 rounded focus:outline-none border-b-2 border-blue-500 w-96" value={role}>
                        <option value="">-</option>
                        <option value="Student">Student</option>
                        <option value="Admin">Admin</option>
                        <option value="ECHandler">EC Handler</option>
                        <option value="TechHead">Technical Head</option>
                    </select>
                   
                    <button type="submit" className="bg-blue-950 w-32 flex justify-center ml-10 m-3 p-2 text-white">Submit</button>
                </form>
                <div className="infos bg-white p-4 w-96 text-blue-950 flex justify-center rounded">
                    <div className="text-center">
                        <h1 className="font-bold underline">Requirements</h1>
                        <hr className="bg-blue-950 "/>
                        <h2 className="font-bold">First Name: </h2>
                        <ul>
                            <li>Min Length: 2 characters</li>
                            <li>Max Length: 25 characters</li>
                        </ul>
                        <h2 className="font-bold">Last Name: </h2>
                        <ul>
                        
                            <li>Max Length: 25 characters</li>
                        </ul>

                        <h2 className="font-bold">Username: </h2>
                        <ul>
                            <li>Min Length: 7 characters</li>
                            <li>Max Length: 10 characters</li>
                        </ul>
                        <h2 className="font-bold">Password: </h2>
                        <ul>
                            <li>Min Length: 8 characters</li>
                            <li>1 capital letter</li>
                            <li>1 number</li>
                        </ul>
                    </div>
                    


                </div>
            </div>
        </div>
    )
}   

export default EditPage