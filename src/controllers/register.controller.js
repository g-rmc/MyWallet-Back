import { ObjectId } from 'mongodb';
import { stripHtml } from 'string-strip-html';

import { db } from "../db/db.js";
import { newRegisterSchema } from '../schemas/newRegisterSchema.js'

async function getUserRegisters(req,res) {

    const userId = res.locals.userId.toString();

    try {
        const registers = await db.collection('register').find({userId}).toArray();
        return res.send(registers);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function createRegister(req,res) {

    const { userId, type, name, value } = req.body;

    const validation = newRegisterSchema.validate({userId, type, name, value});
    if (validation.error){
        return res.status(422).send(validation.error.details.map(err => err.message));
    }

    const newRegister = {
        userId,
        type,
        name: stripHtml(name).result,
        value: Number(value).toFixed(2),
        date: new Date()
    }

    try {
        await db.collection('register').insertOne(newRegister);
        return res.sendStatus(201);
    } catch (error) {
        return res.status(500).send(error);
    }
}

async function deleteRegister(req,res) {

    const userId = res.locals.userId.toString();
    const registerId = stripHtml(req.params.ID_REGISTER).result;

    try {
        ObjectId(registerId)
    } catch (error) {
        return res.status(422).send('id inválido')
    }

    try {
        const register = await db.collection('register').findOne({$and: [{userId: userId},{_id: ObjectId(registerId)}]});
        if (!register){
            return res.sendStatus(404);
        }
        await db.collection('register').deleteOne({$and: [{userId: userId},{_id: ObjectId(registerId)}]});
        return res.sendStatus(200);
    } catch (error) {
        return res.status(500).send(error);
    }
}

export { getUserRegisters, createRegister, deleteRegister };