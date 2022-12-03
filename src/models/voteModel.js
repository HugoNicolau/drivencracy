import joi from "joi";

export const votesSchema = joi.object({
    createdAt: joi.string().required(),
    chiceId: joi.object().required(),
})