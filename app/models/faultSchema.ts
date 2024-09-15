import mongoose,{Schema} from "mongoose"

interface Fault {
    title:string,
    date:string,
    priority:string,
    location:string,
    evidence:string,
    description:string,
    username:string,
    status:string,
    type:string,
}

const faultSchema = new mongoose.Schema<Fault>({
    title:String,
    date:String,
    priority:String,
    description:String,
    location:String,
    evidence:String,
    username:String,
    status:String,
    type:String
},{
    timestamps:true
})
const Faults = mongoose.models.Faults || mongoose.model("Faults",faultSchema)

export default Faults