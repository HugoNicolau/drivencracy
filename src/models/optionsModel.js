import joi from "joi";

export const optionsSchema = joi.object({
    title: joi.string().required().min(3),
    poolId: joi.object().required(),
})