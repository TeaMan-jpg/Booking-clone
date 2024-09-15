"use client"
import { useEffect, useState } from "react";
import ECComponent from "./ECComponent";
import { useLocalStorage } from "../hooks/useLocalStorage";
import FaultComponent from "./FaultComponent";

interface ECHandle {
    _id:string,
    title:string,
    createdAt:string,
    priority:string,
    module:string,
    component:string,
    evidence:string,
    description:string
}

interface User {
    _id:string,
    username:string,
    password:string,
    firstname:string,
    lastname:string,
    role?:string
}
interface Fault {
    _id:string,
    title:string,
    createdAt:string,
    priority:string,
    location:string,
    evidence:string,
    description:string
}

function FindPersonalTickets() {

    const [ECs, setECs] = useState<ECHandle[]>([]);

    const [faults,setFaults] = useState<Fault[]>([])


    const {getItem} = useLocalStorage("email","password","isSignedIn","role")

    const [username,setUsername] = useState<string>(getItem())


    useEffect(() => {
        const fetchECs = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/ECs', {
                    method:'GET',
                    headers: {
                        'Content-Type':'application/json'
                    }
                })

                if (!res.ok) {
                    throw new Error("No faults")
                }

                const data = await res.json()

                if (data && data.ecApps) {
                    setECs(data.ecApps.filter((user:User) => user.username === username))
                }
            }
            catch(err) {
                console.log(err)
            }
        }

        const fetchFaults = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/faults', {
                    method:'GET',
                    headers: {
                        'Content-Type':'application/json'
                    }
                })

                if (!res.ok) {
                    throw new Error("No faults")
                }

                const data = await res.json()

                if (data && data.users) {
                    
                    setFaults(data.users.filter((user:User) => user.username === username))
                }
            }
            catch(err) {
                console.log(err)
            }
        }

        fetchECs()
        fetchFaults()
    },[])


    return (
        <div>
            <h1 className="underline text-blue-950 text-center my-5">Welcome {username}</h1>
            <div className="filters ">
                <div className="flex justify-center items-center">
                    <div className="filterBox flex bg-blue-950 justify-center items-center w-80 ml-">
                        <div className="filterStatus text-blue-950">
                            <h5 className="text-white p-3">Status: </h5>
                            <div className="resolved flex p-3">
                                <input type="checkbox" name="" id="" className="mr-3" />
                                <label htmlFor="" className="text-white">Resolved</label>
                            </div>
                            <div className="rejected flex p-3">
                                <input type="checkbox" name="" id=""  className="mr-3" />
                                <label htmlFor="" className="text-white">Rejected</label>
                            </div>
                            <div className="pending flex p-3">
                                <input type="checkbox" name="" id=""  className="mr-3" />
                                <label htmlFor="" className="text-white">Pending</label>
                            </div>
                        </div>
                        <div className="filterPriority text-blue-950">
                        <h5 className="text-white p-3">Priority: </h5>
                            <div className="resolved flex p-3">
                                <input type="checkbox" name="" id=""  className="mr-3" />
                                <label htmlFor="" className="text-white">Normal</label>
                            </div>
                            <div className="rejected flex p-3">
                                <input type="checkbox" name="" id=""  className="mr-3" />
                                <label htmlFor="" className="text-white">High</label>
                            </div>
                            <div className="pending flex p-3">
                                <input type="checkbox" name="" id=""  className="mr-3" />
                                <label htmlFor="" className="text-white">Urgent</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center items-center">
                    <button className="text-white bg-blue-950 p-2 w-24 rounded m-3">Filter</button>
                </div>
                <h1 className="text-blue-950 text-center my-5 text-lg">My ECs</h1>

                <div className=" bg-white flex ">
                    <h4 className="mr-96 pr-20 m-5 text-blue-950">Title</h4>
                    <h4 className="mr-96 m-5 text-blue-950">Date</h4>
                    <h4 className="mr-96 m-5 text-blue-950">Status</h4>
                </div>

                <div className="tickets">
                {ECs.map((ec, index) => (
                            <div className="ticket" key={index}>
                                <ECComponent id={ec._id} status={ec.priority} title={ec.title} date={ec.createdAt}></ECComponent>

                            </div>
                        ))}

                <h1 className="text-blue-950 text-center my-5 text-lg">My Faults</h1>

                {faults.map((fault, index) => (
                            <div className="ticket" key={index}>
                                <FaultComponent id={fault._id} status={fault.priority} title={fault.title} date={fault.createdAt}></FaultComponent>

                            </div>
                        ))}
                </div>

            </div>
        </div>
    );
}

export default FindPersonalTickets