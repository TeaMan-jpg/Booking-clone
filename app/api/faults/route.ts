import connectToDB from "@/app/libs1/mongodb";
import Faults from "@/app/models/faultSchema";
import { NextResponse } from "next/server";



export async function POST(req:Request){

    const {title,date,priority,description,location,evidence,username,status,type} = await req.json()
    await connectToDB()
    await Faults.create({title,date,priority,description,location,evidence,username,status,type})
    return NextResponse.json({message:"complete",status:201})


} 


export async function GET() {
    await connectToDB()
    const users = await Faults.find()
    return NextResponse.json({users})
}

export async function DELETE(req:Request) {

    const {id} = await req.json()
    await connectToDB()
    await Faults.findByIdAndDelete(id)

    return NextResponse.json({ message: "Item deleted successfully", status: 200 });
}

export async function PUT(req:Request) {
    await connectToDB();
    const data = await req.json();

    console.log(data)
    const status = data.obj.status

    const obj = {
        status:data.obj.status
    }
    
    // const { id,...updatedData } = await req.json();
    await Faults.findByIdAndUpdate(data.obj.id, obj, { new: true }); // Update item by ID
    return NextResponse.json({ message: "complete", status: 200 });
}