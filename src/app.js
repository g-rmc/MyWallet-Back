import express from 'express';
import cors from 'cors';
import { Db, MongoClient, ObjectId } from 'mongodb';
import dotenv from 'dotenv';
import joi from 'joi';
import { stripHtml } from 'string-strip-html';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//const mongoClient = new MongoClient(process.env.MONGO_URI);
//let db;
//mongoClient.connect(() => { db = mongoClient.db("my-wallet")})

//const nameSchema = joi.object({ parâmetro: requisitos() })

//const hashPassword = bcrypt.hashSync(password, 10);
//const validate = bcrypt.compareSync(password, hash);

//const token = uuidv4();

app.post('/login'), async (req, res) => {
    const { email, password } = req.body;

    //const user = await db.collection('users').findOne({ email });

    //if (user && bcrypt.compareSync(password, user.password)) {

        const token = uuid();

        //await db.collection('sessions').insertOne({
            //userId: user._id,
            //token
        //})

        res.send(token);
    //} else {
        //res.sendStatus(401);
    //}
}

app.listen('5000', () => console.log('Listening on 5000'))