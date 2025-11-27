import { model, Schema } from "mongoose";


const caseStudySchema = new Schema({
    title_ar: { type: String, required: true },
    title_en: { type: String, required: true },
    institute_ar: { type: String, required: true },
    institute_en: { type: String, required: true },
    description_ar: { type: String, required: true },
    description_en: { type: String, required: true },
    category_ar: { type: String, required: true },
    category_en: { type: String, required: true },
    status: [
    {
        value : { type: String, required: true },
        label_ar: { type: String, required: true },
        label_en: { type: String, required: true }
    }
    ],
    images: [{
        imageLink:{type: String, required: true},
        public_id:{type: String, required: true},
    }],
    customId: { type: String},

},{ timestamps: true })

export const caseStudyModel = model("caseStudy", caseStudySchema);