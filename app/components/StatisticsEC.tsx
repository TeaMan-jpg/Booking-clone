"use client";
import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";



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

function StatisticsEC() {

  const [technicalFaults, setTechnicalFaults] = useState<ECHandle[]>([]);
  const [technicalFaults30, setTechnicalFaults30] = useState<ECHandle[]>([]);
  


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

    
            const faults = data.ecApps;

            console.log(data.ecApps)

            // Filter the data to get faults in the range from today to 7 days ago
            const today = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 30);

            // Filter the data using the date range
            const filteredFaults = faults.filter((fault: ECHandle) => {
          
              const faultDate = new Date(fault.createdAt);
              return faultDate >= sevenDaysAgo && faultDate <= today;
            });

            console.log(filteredFaults)

            setTechnicalFaults30(filteredFaults);

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

            console.log(data.ecApps)

    
            const faults = data.ecApps;

            // Filter the data to get faults in the range from today to 7 days ago
            const today = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 30);

            // Filter the data using the date range
            const filteredFaults = faults.filter((fault: ECHandle) => {
              console.log()
              const faultDate = new Date(fault.createdAt);
              return faultDate >= sevenDaysAgo && faultDate <= today;
            });

            console.log(filteredFaults)

            setTechnicalFaults(filteredFaults);

        }
        catch(err) {
            console.log(err)
        }

    }

    fetchUsers()

},[])
  const userActivity = [
    {
      date: "last 7 days",
      users: technicalFaults.length,
    },
    {
      date: "last 30 days",
      users: technicalFaults30.length,
    },
  ];

 

  return (
    <>
      <div className="flex flex-col justify-center items-center space-y-4">
        {/* First Chart */}
        <div className="flex flex-col items-center bg-white w-[1000px] my-3">
          <h2 className="text-2xl font-bold mb-4 text-blue-950">User Activity</h2>
          <ResponsiveContainer width="80%" height={400}>
            <BarChart data={userActivity}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" tick={{ fill: "#000" }} />
              <YAxis 
                tick={{ fill: "#000" }} 
                domain={[0, 'auto']}  // Automatically scale Y-axis
                allowDecimals={false} // Ensure no decimal ticks
              />
              <Tooltip />
              <Legend />
              <Bar dataKey="users" fill="#8874d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        
      </div>
    </>
  );
}

export default StatisticsEC;
