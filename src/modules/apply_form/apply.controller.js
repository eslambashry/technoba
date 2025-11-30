import { customAlphabet } from "nanoid"
import { applyFormModel } from "../../DB/models/applyModel.js"
import CustomError from "../../utilities/customError.js"
import imagekit from "../../utilities/imagekitConfigration.js"
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 5)




export const applyJob = async(req,res,next) => {

    const JobId = req.params.id
    
    const {fullName,phone,email,cover_letter} = req.body

    if(!fullName || !phone|| !email|| !cover_letter){
        return new newt(new CustomError("All Fileds Are required",400))
    }
 
  if (!req.file) {
    return next(new CustomError("PDF file is required", 400));
  }

    const pdf = req.file;
    const customId = nanoid();

    const uploadResult = await imagekit.upload({
    file: pdf.buffer,               // buffer of the pdf
    fileName: pdf.originalname,     // example: myfile.pdf
    folder: `${process.env.PROJECT_FOLDER}/CVs/${customId}`,
    useUniqueFileName: true,         // optional
    tags: ["job-file"],              // optional
  });

  const formObject = new applyFormModel({
    fullName,
    phone,
    email,
    cover_letter,
     pdf:{
        PDF_link:uploadResult.url,
        PDF_publicId:uploadResult.fileId 
    },
    JobId,
    customId
  })

  await formObject.save();

  res.status(200).json({success:true, message:"Form Submitted successfully",formObject})
}