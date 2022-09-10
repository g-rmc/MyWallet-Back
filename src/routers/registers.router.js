import express from "express";

import { getUserRegisters, createRegister } from "../controller/register.controller.js";
import { userAuthorization } from "../middleware/authorization.middleware.js";

const router = express.Router();

router.use(userAuthorization);

router.get('/register', getUserRegisters);
router.post('/register', createRegister);

export default router;