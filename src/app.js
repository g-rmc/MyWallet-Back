import express from 'express';
import cors from 'cors';

import { createNewUser, userLogin } from './controller/auth.controller.js';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/auth/sign-up', createNewUser)
app.post('/auth/sign-in', userLogin)

app.listen('5000', () => console.log('Listening on 5000'))