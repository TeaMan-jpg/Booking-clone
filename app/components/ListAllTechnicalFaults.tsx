"use client"

import { useEffect, useState } from "react";
import ManageComponent from "./ManageComponent";
import { useRouter } from "next/navigation";
import ManageComponentFault from "./ManageComponentFault";

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

function ListAllTechnicalFaults() {

    const [technicalFaults, setTechnicalFaults] = useState<Fault[]>([]);

    const Router = useRouter()

    const handleNavigation = () => {
        Router.push("/statistics")
    }
    const [category, setCategory] = useState([{value : "Good Service", isChecked: false},{value : "Pending", isChecked: false},{value : "Bad Service", isChecked: false},{value : "Normal", isChecked: false},{value : "High", isChecked: false},{value : "Low", isChecked: false}]);

    let [newProducts, setNewProducts] = useState<Fault[]>([]);

    const filterProducts = (e:React.ChangeEvent<HTMLInputElement>) => {
        const categories = [...category];
        const cat = categories.filter((cat)=>cat.value ===  e.target.value);
        cat[0].isChecked = e.target.checked;
        setCategory([...categories]);
    
        console.log(category)
    
       
    
      
    

      }


    const filterTrigger = () => {
        const categories = [...category];
        const tempProduct:Fault[] = [];
        for(let c of categories){
            if(c.isChecked){
              console.log("ggregr")
              tempProduct.push(...technicalFaults.filter((a) => a.status === c.value || a.priority === c.value));
            }
          }
  
          
      
          setNewProducts([...tempProduct]);
    }

    
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

                setTechnicalFaults(data.users)
            }
            catch(err) {
                console.log(err)
            }

        }

        fetchUsers()

    },[])
    return (
        <div>
        <div className="filter">
        <div className="flex justify-center items-center">
                <div className="filterBox flex bg-blue-950 justify-center items-center w-80 mt-4">
                    <div className="filterStatus text-blue-950">
                        <h5 className="text-white p-3">Status: </h5>
                        <div className="resolved flex p-3">
                            <input type="checkbox" name="" id="" value="Good Service" onChange={filterProducts} className="mr-3" />
                            <label htmlFor="" className="text-white">Good Service</label>
                        </div>
                        <div className="rejected flex p-3">
                            <input type="checkbox" name="" id="" value="Bad Service" onChange={filterProducts}  className="mr-3" />
                            <label htmlFor="" className="text-white">Bad Service</label>
                        </div>
                        <div className="pending flex p-3">
                            <input type="checkbox" name="" id="" value="Pending" onChange={filterProducts} className="mr-3" />
                            <label htmlFor="" className="text-white">Pending</label>
                        </div>
                    </div>
                    <div className="filterPriority text-blue-950">
                    <h5 className="text-white p-3">Priority: </h5>
                        <div className="resolved flex p-3">
                            <input type="checkbox" name="" id="" value="Normal" onChange={filterProducts} className="mr-3" />
                            <label htmlFor="" className="text-white">Normal</label>
                        </div>
                        <div className="rejected flex p-3">
                            <input type="checkbox" name="" id="" value="High" onChange={filterProducts} className="mr-3" />
                            <label htmlFor="" className="text-white">High</label>
                        </div>
                        <div className="pending flex p-3">
                            <input type="checkbox" name="" id="" value="Low" onChange={filterProducts} className="mr-3" />
                            <label htmlFor="" className="text-white">Low</label>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center">
                <button className="text-white bg-blue-950 p-2 w-24 rounded m-3" onClick={filterTrigger}>Filter</button>
            </div>
        
            <div className="users bg-white">
                <div className="blocks flex flex-grow justify-between">
                    <h2 className="text-blue-950 p-3 m-3 underline">Faults</h2>
                    <button className="bg-blue-950 p-3 m-3 rounded" onClick={handleNavigation}>View Statistics</button>
                </div>

                <div className=" bg-slate-200 flex ">
                    <h4 className="mr-56 m-5 text-blue-950">Username</h4>
                    <h4 className="mr-64 pr-20 m-5 text-blue-950">Title</h4>
                    <h4 className="mr-64 m-5 text-blue-950">Date</h4>
                    <h4 className="mr-64 m-5 text-blue-950">Status</h4>
                    <h4 className="mr-64 m-5 text-blue-950">Manage</h4>
            </div>
                
                {
                     (newProducts.length === 0 ? technicalFaults : newProducts).map((fault, index) => (
                        <ManageComponentFault key={index}  type={fault.type} id={fault._id} username={fault.username} title={fault.title} date={fault.date} status={fault.status} ></ManageComponentFault>
                    )) 
                }

            </div>

         
      
        </div>
        
    </div>
)
}

export default ListAllTechnicalFaults