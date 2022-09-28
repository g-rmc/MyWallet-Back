import joi from 'joi';

const updateRegisterSchema = joi.object({
    name: joi.string().trim().min(1).required(),
    value: joi.number().integer().required()
})

export { updateRegisterSchema };