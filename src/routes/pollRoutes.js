import { Router } from "express";
import { getPoll, postPoll } from "../controllers/pollsControllers.js";
import { pollsSchemaValidation } from "../middlewares/pollValidationMiddleware.js";





const router = Router();

router.post("/poll", pollsSchemaValidation, postPoll);
router.get("/poll", getPoll);

export default router;