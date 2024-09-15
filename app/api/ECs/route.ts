import connectToDB from "@/app/libs1/mongodb";
import ECHandler from "@/app/models/ECSchema";
import { NextResponse } from "next/server";



export async function POST(req:Request){

    const {title,date,description,module,priority,component,evidence,username,status,type} = await req.json()
    await connectToDB()
    await ECHandler.create({title,date,description,module,priority,component,evidence,username,status,type})
    return NextResponse.json({message:"complete",status:201})


} 


export async function GET() {
    await connectToDB()
    const ecApps = await ECHandler.find()
    return NextResponse.json({ecApps})
}

export async function DELETE(req:Request) {

    const {id} = await req.json()
    await connectToDB()
    await ECHandler.findByIdAndDelete(id)

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
    await ECHandler.findByIdAndUpdate(data.obj.id, obj, { new: true }); // Update item by ID
    return NextResponse.json({ message: "complete", status: 200 });
}