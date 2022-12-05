import { Router } from "express";
import { getResult } from "../controllers/resultControllers.js";
import { resultValidation } from "../middlewares/resultValidationMiddleware.js";
const router = Router();

router.get("/poll/:id/result", resultValidation, getResult);

export default router;
