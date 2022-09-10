import express from "express";

import { createNewUser, userLogin } from '../controllers/auth.controller.js';

const router = express.Router();

//Colocar os Schemas separadamente com middleware
router.post('/auth/sign-up', createNewUser);
router.post('/auth/sign-in', userLogin); 

export default router;