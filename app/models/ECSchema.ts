import mongoose,{Schema} from "mongoose"

interface ECHandle {
    title:string,
    date:string,
    priority:string,
    module:string,
    component:string,
    evidence:string,
    description:string,
    username:string,
    status:string,
    type:string
}

const ECHandlerSchema = new mongoose.Schema<ECHandle>({
    title:String,
    date:String,
    priority:String,
    module:String,
    component:String,
    evidence:String,
    description:String,
    username:String,
    status:String,
    type:String
},{
    timestamps:true
})
const ECHandler = mongoose.models.ECHandlers || mongoose.model("ECHandlers",ECHandlerSchema)

export default ECHandler