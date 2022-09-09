import express from 'express';
import cors from 'cors';

import joi from 'joi';
import { stripHtml } from 'string-strip-html';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { db } from './database/db.js';

const app = express();
app.use(cors());
app.use(express.json());

const newUserSchema = joi.object({
    name: joi.string().trim().min(3).required(),
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(6).required(),
    passwordConfirmation: joi.string().trim().valid(joi.ref('password')).required(),
    hashPassword: joi.any()
})

const userLoginSchema = joi.object({
    email: joi.string().trim().email().required(),
    password: joi.string().trim().min(5).required()
})

//const validate = bcrypt.compareSync(password, hash);

app.post('/sign-up', async (req, res) => {

    const { name, email, password, passwordConfirmation } = req.body;

    const newUser = { name, email, password, passwordConfirmation, hashPassword: ''};
    const validation = newUserSchema.validate(newUser);

    if (validation.error) {
        return res.status(422).send(validation.error.details.map(err => err.message));
    }

    newUser.name = stripHtml(name).result;
    newUser.email = stripHtml(email).result;
    newUser.hashPassword = bcrypt.hashSync(password, 10);
    delete newUser.password;
    delete newUser.passwordConfirmation;

    try {
        const isValidEmail = await db.collection('users').findOne({email});
        if (isValidEmail) {
            return res.status(422).send('E-mail já cadastrado!');
        }
    } catch (error) {
        return res.status(500).send(error);
    }

    try {
        await db.collection('users').insertOne(newUser);
        res.sendStatus(201);
    } catch (error) {
        res.status(500).send(error);
    }
})

app.post('/sign-in', async (req, res) => {
    let { email, password } = req.body;

    email = stripHtml(email).result;
    password = stripHtml(password).result;

    try {
        const user = await db.collection('users').findOne({ email });

        if (user && bcrypt.compareSync(password, user.password)) {
    
            const token = uuid();
    
            await db.collection('sessions').insertOne({
                userId: user._id,
                token
            })
    
            res.send(token);
        } else {
            res.sendStatus(401);
        }
    } catch (error) {
        return res.status(500).send(error);
    }
})

app.listen('5000', () => console.log('Listening on 5000'))