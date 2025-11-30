import { Router } from "express";
import * as ac from "./apply.controller.js";
import { multerCloudFunction } from "../../services/multerCloud.js";
import { allowedExtensions } from "../../utilities/allowedExtensions.js";

const applyRouter = Router()

applyRouter.post('/send/:id',multerCloudFunction(allowedExtensions.Files).single("pdf"),ac.applyJob)

export default applyRouter;