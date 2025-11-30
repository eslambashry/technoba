import { model, Schema } from "mongoose";

const applyFormSchema = new Schema({
    fullName:{type:String,required:true},
    phone:{type:Number,required:true},
    email:{type:String,required:true},
    pdf:{
        PDF_link:{type:String,required:true},
        PDF_publicId:{type:String,required:true}
    },
    cover_letter:{type:String},
    JobId:{
        type:Schema.Types.ObjectId,
        ref:"Career",
        required:true
    },
    customId:String
})

export const applyFormModel = model("applyForm",applyFormSchema)