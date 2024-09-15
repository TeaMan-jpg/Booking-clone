"use client"

import { useEffect, useState } from "react"

function CreateUser() {
    const [username,setUsername] = useState<string>('')

    const [password,setPassword] = useState<string>('')

    const [firstname,setFirstname] = useState<string>('')

    const [validationErrors, setValidationErrors] = useState({
        firstname: '',
        lastname: '',
        username: '',
        password: '',
        accountType:''
       
   
    });




    const [lastname,setLastname] = useState<string>('')

    const [role,setRole] = useState<string>('')

    const handleUsername = (e:React.ChangeEvent<HTMLInputElement>) => {
        setUsername(e.target.value)
    }

    const handlePassword = (e:React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value)
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

    function checks(s:string):boolean {

        const hasUpper = Array.from(s).some(char => char >= 'A' && char <= 'Z');
        const hasDigit = Array.from(s).some(char => char >= '0' && char <= '9');


        return hasUpper && hasDigit;

    } 

   


    function handleValidation() {
        const errors:any = {}
        if (firstname === '' || firstname.length < 2 || firstname.length > 25) {
            errors.firstname = "true"
        }
        if (lastname === '' || lastname.length < 2 || lastname.length > 25){
            errors.lastname = "true"
        }
        if (username === '' || username.length < 7 || username.length > 10) {
            errors.username = "true"
        }

        if (password.length < 8 || !checks(password)) {
            errors.password = "true"
        }

        if (role === '-' || role === '') {
            errors.accountType = "true"
        }

        setValidationErrors(errors)

        return Object.keys(errors).length === 0;
    }


    const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() 


        if (!handleValidation()) {
            return;
        }
        

        const obj = {
            username:username,
            password:password,
            firstname:firstname,
            lastname:lastname,
            role:role
        }
        try {
            const res = await fetch("http://localhost:3000/api/users",{
                method:'POST',
                headers : {
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(obj)
                
            })

            if (!res.ok) {
                throw new Error("Nothing to add")
            }
            
        }
        catch(err) {
            console.log(err)
        }

    }
    
    return (
        <div>
            <h1 className="text-center text-3xl font-bold text-blue-950 m-3">Enter Details</h1>
            <div className="forms flex justify-center">
                <form action="" onSubmit={handleSubmit} className="flex flex-col bg-white p-5 m-5 rounded text-blue-950 font-bold w-1200px h-full justify-center ">
                    <label htmlFor="" className="p-2 first ">First Name</label>
                    <input type="text" name="" id="first" className="m-2 focus:outline-none border-b-2 border-blue-500 w-96" onChange={handleFirstname} value={firstname}/>
                    {
                    (firstname === '' || firstname.length < 2 || firstname.length > 25) && validationErrors.firstname === 'true' ? <div>
                        <h5 className="text-red-700">Firstname does not fit criteria</h5>
                    </div>:null
                    }
                    <label htmlFor="" className="p-2 second">Last Name</label>
                    <input type="text" name="" id="last" className="m-2 focus:outline-none border-b-2 border-blue-500 w-96" onChange={handleLastname} value={lastname} />
                    {
                    (lastname === '' || lastname.length < 2 || lastname.length > 25) && validationErrors.lastname === 'true' ? <div>
                        <h5 className="text-red-700">Lastname does not fit criteria</h5>
                    </div>:null
                    }
                    <label htmlFor="" className="p-2">Username</label>
                    <input type="text" name="" id="user"  className="user m-2 focus:outline-none border-b-2 border-blue-500 w-96"onChange={handleUsername} value={username} />
                    {
                    (username === '' || username.length < 7 || username.length > 10) && validationErrors.username === 'true' ? <div>
                        <h5 className="text-red-700">Username does not fit criteria</h5>
                    </div>:null
                    }
                    
                    <label htmlFor="" className="p-2">Password</label>
                    <input type="password" name="" id="pass" className="pass m-2 focus:outline-none border-b-2 border-blue-500 w-96" onChange={handlePassword} value={password} />
                    {
                    (password.length < 8 || !checks(password)) && validationErrors.password === 'true' ? <div>
                        <h5 className="text-red-700">Username does not fit criteria</h5>
                    </div>:null
                    }
                    <label htmlFor="" className="p-2">Acccount type</label>
                    <select name="" id="select" onChange={handleRole} className="m-2 rounded focus:outline-none border-b-2 border-blue-500 w-96" value={role}>
                        <option value="">-</option>
                        <option value="Student">Student</option>
                        <option value="Admin">Admin</option>
                        <option value="ECHandler">EC Handler</option>
                        <option value="TechHead">Technical Head</option>
                    </select>


                    {
                        (role === '' || role === '-') && validationErrors.accountType === 'true' ? <div>
                        <h5 className="text-red-700">Account Type needed</h5>
                    </div>:null
                    }



                   
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
                            <li>Min Length: 2 characters</li>
                        
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

export default CreateUser