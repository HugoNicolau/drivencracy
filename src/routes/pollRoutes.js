import { Router } from "express";
import { postPoll } from "../controllers/pollsControllers.js";





const router = Router();

router.post("/poll", postPoll);
// router.get("pool", validation, function);

export default router;