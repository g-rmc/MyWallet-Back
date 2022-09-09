import express from 'express';
import cors from 'cors';

import authRouter from './routers/auth.router.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRouter);

app.listen('5000', () => console.log('Listening on 5000'))