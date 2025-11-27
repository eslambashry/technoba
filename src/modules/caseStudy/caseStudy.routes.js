import { Router } from "express";
import * as caseStudyCon from "./caseStudy.controller.js";
import { multerCloudFunction } from "../../services/multerCloud.js";
import { allowedExtensions } from "../../utilities/allowedExtensions.js";

const caseStudyRouter = Router();

caseStudyRouter.post('/add',multerCloudFunction(allowedExtensions.Image).array("images", 5),caseStudyCon.createCaseStudy)
caseStudyRouter.get('/', caseStudyCon.getAllCaseStudies)
caseStudyRouter.get('/:id', caseStudyCon.getCaseStudyById)
caseStudyRouter.put('/:id',multerCloudFunction(allowedExtensions.Image).array("images", 5),
caseStudyCon.updateCaseStudy)
caseStudyRouter.delete('/:id', caseStudyCon.deleteCaseStudy)

caseStudyRouter.get('/ar', caseStudyCon.getAllArabicCaseStudies)
caseStudyRouter.get('/en', caseStudyCon.getAllEnglishCaseStudies)

export default caseStudyRouter;
