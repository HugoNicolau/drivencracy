import { Router } from "express";
import { voteValidation } from "../middlewares/voteValidationMiddleware.js";
import { postVote } from "../controllers/voteControllers.js";


const router = Router();

router.post("/choice/:id/vote", voteValidation, postVote);
export default router;