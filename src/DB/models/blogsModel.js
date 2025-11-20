import { Schema,model } from "mongoose";

const blogsSchema = new Schema({
    title: {
        ar:{ type: String, required: true },
        en:{ type: String, required: true }
    },
    content: {
        ar:{ type: String, required: true },
        en:{ type: String, required: true }
    },
    image: [{
        imageLink:{type: String, required: true},
        public_id:{type: String, required: true},
    }],
    customId: { type: String, required: true, unique: true },
},{ timestamps: true })

export const BlogsModel = model("Blogs", blogsSchema);