import joi from 'joi';

const newRegisterSchema = joi.object({
    userId: joi.string().required(),
    type: joi.string().valid('positive', 'negative').required(),
    name: joi.string().trim().min(1).required(),
    value: joi.number().integer().required()
})

export { newRegisterSchema };