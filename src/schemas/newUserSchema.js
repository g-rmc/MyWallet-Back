import joi from 'joi';

const newUserSchema = joi.object({
    name: joi.string().trim().min(3).required(),
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(6).required(),
    passwordConfirmation: joi.string().trim().valid(joi.ref('password')).required()
})

export { newUserSchema };