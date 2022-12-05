import { Router } from "express";
import { getResult } from "../controllers/resultControllers.js";
const router = Router();

router.get("/poll/:id/result", getResult)

export default router;