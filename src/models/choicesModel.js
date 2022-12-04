import joi from "joi";

export const choicesSchema = joi.object({
    title: joi.string().required().allow(null).allow(''),
    pollId: joi.string().required().allow(null).allow(''),
})