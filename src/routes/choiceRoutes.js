import { Router } from "express";
import { postChoice, getChoices } from "../controllers/choicesControllers.js";
import { choiceSchemaValidation, getChoiceValidation } from "../middlewares/choiceValidationMiddleware.js";


const router = Router();

router.post("/choice", choiceSchemaValidation, postChoice)
router.get("/poll/:id/choice", getChoiceValidation, getChoices)

export default router;