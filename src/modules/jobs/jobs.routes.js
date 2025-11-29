import { Router } from "express"
import * as careerCon from "./jobs.controller.js";

const careerRouter = Router();

careerRouter.post("/",  careerCon.createCareer);
careerRouter.get("/",  careerCon.getCareers);
careerRouter.get("/:id",  careerCon.getCareerById);
careerRouter.put("/:id",  careerCon.updateCareer);
careerRouter.delete("/:id",  careerCon.deleteCareer);
careerRouter.post("/multy",  careerCon.multyDeleteCareer);

export default careerRouter;
