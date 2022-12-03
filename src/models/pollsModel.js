import joi from "joi";

export const pollsSchema = joi.object({
    title: joi.string().required().allow(null).allow(''),
    expireAt: joi.string().allow(null).allow('')
})