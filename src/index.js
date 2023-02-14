import express from 'express';
import cors from 'cors';

import authRouter from './routers/auth.router.js';
import transactionRouter from './routers/transactions.router.js';

const app = express();

app
    .use(cors())
    .use(express.json())
    .get("/status", (_req, res) => {res.send("Ok")})
    .use(authRouter)
    .use(transactionRouter);

app.listen(process.env.PORT, () => console.log(`Listening on ${process.env.PORT}`))