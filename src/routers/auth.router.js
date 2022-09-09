import express from "express";

import { createNewUser, userLogin } from '../controller/auth.controller.js';

const router = express.Router();

app.post('/auth/sign-up', createNewUser);
app.post('/auth/sign-in', userLogin);

export default router;