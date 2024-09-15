"use client"
import { useEffect, useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { useRouter } from "next/navigation"

interface Users {
    username:String,
    password:String,
    role:String
}

function Login() {

    const [username, setUsername] = useState<string>('')

    const [password, setPassword] = useState<string>('')

    const [users,setUsers] = useState<Users[]>([])


    const Router = useRouter()

    const {setItem,setItem2,setItem3} = useLocalStorage("email","password","isSignedIn","role")

    const handleUsername = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
    }


    const handleSubmit = async (e:React.FormEvent) => {
        e.preventDefault()

        try {
            const res = await fetch('http://localhost:3000/api/users', {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                      
                    })

            if (!res.ok) {
                throw new Error('No users found')
            }

            const data = await res.json()

            console.log(data.users)

            console.log(username)

            data.users.forEach((item: Users) => {
                if (item.username === username) {
                    setItem2(true)
                    setItem(item.username,item.password)
                    setItem3(item.role)
                    if (item.role === "Student") {
                        Router.push("/ECForms")
                    }
                    else {
                        Router.push("/createUser")
                    }
                 
                }
                
            });
        }
        catch(err) {
            console.log(err)
        }
    }


    // useEffect(() => {

    //     const fetchUsers = async () => {

    //         try {
    //             const res = await fetch('http://localhost:3000/api/users', {
    //                         method: 'GET',
    //                         headers: {
    //                             'Content-Type': 'application/json'
    //                         }
                          
    //                     })

    //             if (!res.ok) {
    //                 throw new Error('No users found')
    //             }

    //             const data = await res.json()

    //             setUsers(data.users)
    //         }
    //         catch(err) {
    //             console.log(err)
    //         }

    //     }

    //     fetchUsers()

    // },[])


    return (
        <>
       <div className="h-full">
            <div className="flex justify-center items-center max-h-screen">
                <div className="Login w-96 h-96 bg-white max-h-screen mt-28 rounded-xl">
                    <h1 className="text-blue-950 text-center font-bold p-2">Login</h1>
                    <hr className="bg-blue-950" />
                    <form action="" onSubmit={handleSubmit} className="flex flex-col w-96 h-96 p-4 rounded justify-center items-center ">
                        <label className="text-blue-700 font-bold p-2 my-5" htmlFor="">Username</label>
                        <input className="w-80" type="text" name="" id="" onChange={handleUsername} value={username} />
                        <label className="text-blue-700 font-bold p-2 my-5" htmlFor="">Password</label>
                        <input className="w-80" type="password" name="" id="" onChange={handlePassword} value={password} />

                        <button type="submit" className="bg-blue-700 text-white rounded my-12 p-4 w-52">Login</button>
                    </form>
                </div>

            
            </div>
       </div>
        </>
    )
}

export default Login