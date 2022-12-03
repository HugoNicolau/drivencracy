import joi from "joi";

export const pollsSchema = joi.object({
    title: joi.string().required().min(3),
    expireAt: joi.string().required(),
})