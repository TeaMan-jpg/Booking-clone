"use client"
import { useState } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"

function ECCreate() {

    const [title, setTitle] = useState('')

    const [description, setDescription] = useState('')
    const [module, setModule] = useState('')
    const [component, setComponent] = useState('')
    const [priority, setPriority] = useState('')
    const [evidence, setEvidence] = useState('')

    const {getItem} = useLocalStorage("email","password","isSignedIn","role")

    const [username] = useState<string>(getItem())


    
    const [validationErrors, setValidationErrors] = useState({
            title: '',
            description: '',
            module: '',
            component: '',
            priority: '',
            evidence: '',
        });
    
    

    const handleTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value)
    }

    const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDescription(e.target.value)
    }

    const handleModule = (e: React.ChangeEvent<HTMLInputElement>) => {
        setModule(e.target.value)
    }

    const handleComponent = (e: React.ChangeEvent<HTMLInputElement>) => {
        setComponent(e.target.value)
    }   

    const handlePriority = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value)
    }

    const handleEvidence = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEvidence(e.target.value)

    }

    // useEffect(() => {

    //     const inputElement = document.getElementById('first') as HTMLInputElement;
    //     const inputElementLast = document.getElementById('last') as HTMLInputElement;
    //     const inputElementUser = document.getElementById('user') as HTMLInputElement;
       
    
        

    //     const handleClick = () => {
    //         setFirstClick("clicked")
    //     };
    //     const handleClickLast = () => {
    //         setLastClick("clicked")
    //     };
    //     const handleClickUser = () => {
    //         setUserClick("clicked")
    //     };
       
        
    //     inputElement.addEventListener('click',handleClick)
    //     inputElementLast.addEventListener('click',handleClickLast)
    //     inputElementUser.addEventListener('click',handleClickUser)
     

    //     return () => {
    //         inputElement.removeEventListener('click',handleClick)
    //         inputElementLast.removeEventListener('click',handleClickLast)
    //         inputElementUser.removeEventListener('click',handleClickUser)
            
    //     }
    // },[])


    const handleValidation = () => {
        const errors:any = {}

        if (priority === "-" || priority === '' ) {
            errors.priority = "Priority needed"
            
        }

        if (evidence === '') {
            errors.evidence = "Evidence needed"
            
        }

        if (title === '' || title.length > 100) {
            errors.title = "Title needed"

            
        }

        if (module === '' || module.length > 100) {
            errors.module = "Module needed"
            
        }

        if (component === '' || component.length > 100) {
            errors.component = "Component needed"
        }

        if (description === '') {
            errors.description = "Description needed"
            
        }
        

        setValidationErrors(errors)


        return Object.keys(errors).length === 0;
    }



    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()

        if (!handleValidation()) {
            return;
        }

        console.log(validationErrors.title)

        const obj =  {
            title:title,
            description:description,
            module:module,
            component:component,
            priority:priority,
            evidence:evidence,
            username:username,
            status:"Pending",
            type:"EC"
        }

        try {
            const res = await fetch("http://localhost:3000/api/ECs", {
                method:'POST',
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify(obj)

            })

            if (!res.ok) {
                throw new Error('Nope')
            }


        }

        catch(err) {
            console.log(err)
        }

    }
    return (
        <div className="flex justify-center gap-4 mt-4 mb-4">
            <form action="" onSubmit={handleSubmit} className="flex flex-col bg-white p-3 text-blue-950 w-full" >
                <label htmlFor="" className="p-1 font-medium">Title</label>
                <input type="text" onChange={handleTitle} value={title} className="border-b-2 border-blue-500 focus:outline-none m-1 w-[900px]"/>
               
                {
                    validationErrors.title != '' ? <div>
                        <h5 className="text-red-700">{validationErrors.title}</h5>
                    </div>:null
                }
                <label htmlFor="" className="p-1 font-medium">Description</label>
                
                <textarea className="border-4 border-blue-500 focus:outline-none rounded m-1 w-96" onChange={handleDescription} value={description} name="" id="" rows={10} cols={10}></textarea>
                {
                    description === '' && validationErrors.description? <div>
                        <h5 className="text-red-700">Description needed</h5>
                    </div>:null
                }
                

                <label htmlFor="" className="p-1 font-medium">Module</label>
                <input type="text" onChange={handleModule} value={module} className="border-b-2 border-blue-500 focus:outline-none m-1 w-[900px]" />
                
                {
                    (module.length > 100 || module === '') && validationErrors.module ? <div>
                        <h5 className="text-red-700">Module needed</h5>
                    </div>:null
                }
                <label htmlFor="" className="p-1 font-medium">Component</label>
                <input type="text" onChange={handleComponent} value={component} className="border-b-2 border-blue-500 focus:outline-none m-1 w-[900px]" />
                

                {
                    (component.length > 100 || component === '') && validationErrors.component ? <div>
                        <h5 className="text-red-700">Component needed</h5>
                    </div>:null
                }
                <label htmlFor="" className="p-1 font-medium">Priority</label>
                <select name="" id="" onChange={handlePriority} value={priority} className="border-b-2 border-blue-500 focus:outline-none m-1 w-[900px]">
                    <option value="-">-</option>
                    <option value="High">High</option>
                    <option value="Normal">Normal</option>
                    <option value="Low">Low</option>
                </select>
                {
                    (priority === '-' || priority === '') && validationErrors.priority ? <div>
                        <h5 className="text-red-700">Priority needed</h5>
                    </div>:null
                }
                <label htmlFor="" className="p-1 font-medium">Upload Evidence</label>
                <input type="file" onChange={handleEvidence} value={evidence} className="border-b-2 border-blue-500 focus:outline-none m-1 w-[900px]" />

                {
                    evidence === '' && validationErrors.evidence ? <div>
                        <h5 className="text-red-700">Evidence needed</h5>
                    </div>:null
                }
                <button type="submit" className="bg-blue-950 text-white float-end my-4 rounded p-1 w-96">Create</button>
            </form>
            <div className="infos text-blue-950 bg-white p-5 w-96 text-center font-bold">
                <h2>Length Limit</h2>
                <h4>Title: </h4>
                <p className="ml-5">Max Length: 100 Characters</p>
                <h4>Module: </h4>
                <p className="ml-5">Max Length: 100 Characters</p>
                <h4>Component: </h4>
                <p className="ml-5">Max Length: 100 Characters</p>
            </div>
        </div>
    )
}

export default ECCreate