import joi from "joi";

export const optionsSchema = joi.object({
    title: joi.string().required().allow(null).allow(''),
    poolId: joi.object().required().allow(null).allow(''),
})