"use client"
import { useEffect, useState } from "react";
import UserComponent from "./userComponent";
import { useRouter } from "next/navigation";

interface User {
    _id:string,
    username:string,
    password:string,
    firstname:string,
    lastname:string,
    role?:string
}

function ListAllUsers() {

    const [students, setStudents] = useState<User[]>([]);
    const [admins, setAdmins] = useState<User[]>([]);
    const [ECs, setECs] = useState<User[]>([]);
    const [techs, setTechs] = useState<User[]>([]);

    const Router = useRouter()


    const handleNavigation = () => {
        Router.push("/statistcs")
    }
    

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch('http://localhost:3000/api/users', {
                    method:'GET',
                    headers: {
                        'Content-type':'application/users'
                    }
                    
                })

                if (!res.ok) {
                    throw new Error('No users')
                }

                const data = await res.json()


                setStudents(data.users.filter((user:User) => user.role === "Student"))
                setAdmins(data.users.filter((user:User) => user.role === "Admin"))
                setECs(data.users.filter((user:User) => user.role === "ECHandler"))
                setTechs(data.users.filter((user:User) => user.role === "TechHead"))

            }
            catch(err) {
                console.log(err)
            }
        }

        fetchUsers()
    },[])
    return (
        <div className="flex justify-center items-center">
            <div className="bg-white m-4 text-blue-950">
                <h1 className="text-center underline text-3xl mx-64 m-4">List of all users</h1>
             
                <hr />
                <div className="users">

                    <h3 className="underline m-4 text-xl">Students</h3>
                    {
                       students.length > 0 ?  students.map((student, index) => (
                        <UserComponent id={student._id} role={"Student"} username={student.username}></UserComponent>
                    )):<div>
                    <h5 className="m-4 text-xl">No Students</h5>
                </div>
                    }

                </div>
                <div className="admins">

                    <h3 className="underline m-4 text-xl">Admins</h3>
                    {
                       admins.length > 0 ?  admins.map((admin, index) => (
                        <UserComponent id={admin._id} role={"Admin"} username={admin.username}></UserComponent>
                    )):<div>
                    <h5 className="m-4 text-xl">No Admins</h5>
                </div>
                    }

                </div>
                <div className="echandlers">
                    <h3 className="underline m-4 text-xl">EC Handlers</h3>

                    {
                        ECs.length > 0 ? ECs.map((ec, index) => (
                            <UserComponent id={ec._id} role={"EC Handler"} username={ec.username}></UserComponent>
                        )):
                        <div>
                            <h5 className="m-4 text-xl">No EC Handlers</h5>
                        </div>
                    }

                </div>
                <div className="technicalheads">

                    <h3 className="underline m-4 text-xl">Technical Heads</h3>
                    {
                        techs.length > 0 ? techs.map((tech, index) => (
                            <UserComponent id={tech._id} role={"Technical Head Handler"} username={tech.username}></UserComponent>
                        )):
                        <div>
                            <h5 className="m-4 text-xl">No Technical Heads</h5>
                        </div>
                    }

                </div>
            </div>
        </div>
    )
}

export default ListAllUsers