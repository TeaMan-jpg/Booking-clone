import { useEffect, useState } from "react"
import ECComponent from "./ECComponent"
import FaultComponent from "./FaultComponent"

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
function UserProfile({username,role}:({username:string,role:string})) {

    
    const [ECs,setECs] = useState<ECHandle[]>([])

    const [faults,setFaults] = useState<Fault[]>([])

    
    useEffect(() => {

        const fetchUsers = async () => {

           
            try {
                const res = await fetch('http://localhost:3000/api/ECs', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                          
                        })

                if (!res.ok) {
                    throw new Error('No users found')
                }

                const data = await res.json()

                if (data && data.ecApps) {
                    setECs(data.ecApps.filter((ec:ECHandle) => ec.username === username))
                }
            }
            catch(err) {
                console.log(err)
            }

        }

        fetchUsers()

    },[])


    
    useEffect(() => {

        const fetchUsers = async () => {

            try {
                const res = await fetch('http://localhost:3000/api/faults', {
                            method: 'GET',
                            headers: {
                                'Content-Type': 'application/json'
                            }
                          
                        })

                if (!res.ok) {
                    throw new Error('No users found')
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
        <>
        <div className="profile flex justify-center items-center">
            <h1 className="text-blue-950">Username: {username}</h1>
            {
                role === "Admin" ? <div className="role bg-white">
                    <h2 className="text-blue-950">Role:{role}</h2>
                </div>:<div className="info flex bg-white m-12">
                <div className="ECs">
                    <h2 className="text-blue-950">ECs</h2>
                    <div className="ECList">
                        <ul>
                            {
                                ECs.length > 0 ? ECs.map((ec,index) => (
                                    <>
                                    <li key={index}>
                                        <ECComponent id={ec._id} status={ec.status} title={ec.title} date={ec.date} ></ECComponent>
                                    </li>

                                    </>
                                )):null
                            }
                        </ul>
                    </div>
                
                </div>
                <div className="Faults">
                    <h2 className="text-blue-950">Faults</h2>
                    <div className="FaultsList"> 

                            <ul>
                                {
                                    faults.length > 0 ? faults.map((fault,index) => (
                                        <>
                                        <li key={index}>
                                            <FaultComponent id={fault._id} status={fault.status} title={fault.title} date={fault.date} ></FaultComponent>
                                        </li>

                                        </>
                                    )):null
                                }
                            </ul>

                    </div>
                </div>
            </div>
            }

        </div>
        </>
    )
}

export default UserProfile