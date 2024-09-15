import connectToDB from "@/app/libs1/mongodb";
import Users from "@/app/models/userSchema";
import { NextResponse } from "next/server";



export async function POST(req:Request){

    const {username,password,firstname,lastname,role} = await req.json()
    await connectToDB()
    await Users.create({username,password,firstname,lastname,role})
    return NextResponse.json({message:"complete",status:201})


} 


export async function GET() {
    await connectToDB()
    const users = await Users.find()
    return NextResponse.json({users})
}


export async function DELETE(req:Request) {

    const {id} = await req.json()
    await connectToDB()
    await Users.findByIdAndDelete(id)

    return NextResponse.json({ message: "Item deleted successfully", status: 200 });
}


export async function PUT(req: Request) {
    try {
        await connectToDB();
        // const { id, ...updatedData } = await req.json();

        const data = await req.json();

        console.log(data.obj.id)

        const obj = {
         
            username:data.obj.username,
            firstname:data.obj.firstname,
            lastname:data.obj.lastname,
            role:data.obj.role

        }
        const updatedUser = await Users.findByIdAndUpdate(data.obj.id, obj, { new: true });

        // if (!id) {
            
        //     return NextResponse.json({ message: "ID not provided", status: 400 });
        // }

        // const updatedUser = await Users.findByIdAndUpdate(id, updatedData, { new: true });

        // if (!updatedUser) {
        //     return NextResponse.json({ message: "User not found", status: 404 });
        // }

        return NextResponse.json({ message: "Update complete", updatedUser,  status: 200 });
    } catch (error) {
        console.error("Error updating user:", error);
        return NextResponse.json({ message: "Internal Server Error", status: 500 });
    }
}
