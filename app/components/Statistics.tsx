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

interface Fault {
  type: string;
  _id:string,
  title:string,
  createdAt:string,
  priority:string,
  location:string,
  evidence:string,
  description:string,
  username:string,
  status:string
}

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

function Statistics() {

  const [technicalFaults, setTechnicalFaults] = useState<Fault[]>([]);
  const [technicalFaults30, setTechnicalFaults30] = useState<Fault[]>([]);
  


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

    
            const faults = data.users;

            // Filter the data to get faults in the range from today to 7 days ago
            const today = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 30);

            // Filter the data using the date range
            const filteredFaults = faults.filter((fault: Fault) => {
          
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

    
            const faults = data.users;

            // Filter the data to get faults in the range from today to 7 days ago
            const today = new Date();
            const sevenDaysAgo = new Date();
            sevenDaysAgo.setDate(today.getDate() - 1);

            // Filter the data using the date range
            const filteredFaults = faults.filter((fault: Fault) => {
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

  const usersActivity = [
    {
      date: "last 7 days",
      users: 0,
    },
    {
      date: "last 30 days",
      users: 30,
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

export default Statistics;
