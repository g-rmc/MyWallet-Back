import { stripHtml } from 'string-strip-html';
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';

import { db } from '../db/db.js';
import { newUserSchema } from '../schemas/newUserSchema.js';
import { userLoginSchema } from '../schemas/userLoginSchema.js';

async function createNewUser (req, res) {

    const { name, email, password, passwordConfirmation } = req.body;

    const validation = newUserSchema.validate({ name, email, password, passwordConfirmation});

    if (validation.error) {
        return res.status(422).send(validation.error.details.map(err => err.message));
    }

    const newUser = {
        name: stripHtml(name).result,
        email: stripHtml(email).result,
        hashPassword: bcrypt.hashSync(password, 10)
    }

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
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function userLogin (req, res) {
    let { email, password } = req.body;

    const validation = userLoginSchema.validate({email, password});

    if (validation.error) {
        return res.status(422).send(validation.error.details.map(err => err.message));
    }

    email = stripHtml(email).result;
    password = stripHtml(password).result;

    try {
        const user = await db.collection('users').findOne({ email });

        if (user && bcrypt.compareSync(password, user.hashPassword)) {
    
            const token = uuid();
    
            await db.collection('sessions').insertOne({
                userId: user._id,
                token
            })

            const userInfo = {
                id: user._id,
                name: user.name,
                email: user.email,
                token
            }
    
            return res.send(userInfo);
        } else {
            return res.sendStatus(401);
        }
    } catch (error) {
        return res.status(500).send(error);
    }
}

export { createNewUser, userLogin };