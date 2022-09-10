import joi from 'joi';

const userLoginSchema = joi.object({
    email: joi.string().trim().required(),
    password: joi.string().trim().required()
});

export { userLoginSchema };