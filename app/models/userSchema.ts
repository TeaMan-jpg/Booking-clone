import mongoose,{mongo, Schema} from "mongoose";



interface User {
    username:string,
    password:string,
    firstname:string,
    lastname:string,
    role:string
}

const userSchema = new Schema<User>({
    
    username:String,
    password:String,
    firstname:String,
    lastname:String,
    role:String
    
}
,{
    timestamps:true
})


const Users = mongoose.models.Users || mongoose.model("Users",userSchema)

export default Users