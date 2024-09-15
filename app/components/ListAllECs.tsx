"use client"
import { useEffect, useState } from "react";
import ManageComponent from "./ManageComponent";
import { useRouter } from "next/navigation";

interface ECHandle {
    type: any;
    _id:string,
    title:string,
    createdAt:string,
    priority:string,
    module:string,
    component:string,
    evidence:string,
    description:string,
    username:string,
    status:string
}

interface Filters {
    status: {
      resolved: boolean;
      rejected: boolean;
      pending: boolean;
    };
    priority: {
      normal: boolean;
      high: boolean;
      urgent: boolean;
    };
  }
function ListAllECs() {

    const [ecs, setEcs] = useState<ECHandle[]>([]);


    const Router = useRouter()
    const [category, setCategory] = useState([{value : "Good Service", isChecked: false},{value : "Pending", isChecked: false},{value : "Bad Service", isChecked: false},{value : "Normal", isChecked: false},{value : "High", isChecked: false},{value : "Low", isChecked: false}]);


    const handleNavigation = () => {
        Router.push("/statisticsEC")
    }

    

  let [newProducts, setNewProducts] = useState<ECHandle[]>([]);


  const filterProducts = (e:React.ChangeEvent<HTMLInputElement>) => {
    const categories = [...category];
    const cat = categories.filter((cat)=>cat.value ===  e.target.value);
    cat[0].isChecked = e.target.checked;
    setCategory([...categories]);

    console.log(category)

    console.log(newProducts)

  
  }

  const filterTrigger = () => {
    const categories = [...category];
    const tempProduct:ECHandle[] = [];
    for(let c of categories){
        if(c.isChecked){
          console.log("ggregr")
          tempProduct.push(...ecs.filter((a) => a.status === c.value));
        }
      }

      
  
      setNewProducts([...tempProduct]);
}

  

    
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
                    setEcs(data.ecApps)
                }
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
                            <input type="checkbox" name="" id="" value="Bad Service" onChange={filterProducts} className="mr-3" />
                            <label htmlFor="" className="text-white">Bad Service</label>
                        </div>
                        <div className="pending flex p-3">
                            <input type="checkbox" name="" id="" value="pending" onChange={filterProducts}  className="mr-3" />
                            <label htmlFor="" className="text-white">Pending</label>
                        </div>
                    </div>
                    <div className="filterPriority text-blue-950">
                    <h5 className="text-white p-3">Priority: </h5>
                        <div className="resolved flex p-3">
                            <input type="checkbox" name="" id=""  className="mr-3" onChange={filterProducts} value="Normal" />
                            <label htmlFor="" className="text-white" >Normal</label>
                        </div>
                        <div className="rejected flex p-3">
                            <input type="checkbox" name="" id=""  className="mr-3" onChange={filterProducts} value="High" />
                            <label htmlFor="" className="text-white">High</label>
                        </div>
                        <div className="pending flex p-3">
                            <input type="checkbox" name="" id=""  className="mr-3" onChange={filterProducts} value="Low"/>
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
                    <h2 className="text-blue-950 p-3 m-3 underline">ECs</h2>
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
                     (newProducts.length === 0 ? ecs : newProducts).map((ec, index) => (
                        <ManageComponent id={ec._id} type={ec.type} key={index} username={ec.username} title={ec.title} date={ec.createdAt} status={ec.status} ></ManageComponent>
                    )) 
                }

            </div>
      
        </div>
        
    </div>
    )
}

export default ListAllECs