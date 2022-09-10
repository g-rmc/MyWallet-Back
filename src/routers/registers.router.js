import express from "express";

import { getUserRegisters, createRegister } from "../controllers/register.controller.js";
import { userAuthorization } from "../middlewares/authorization.middleware.js";

const router = express.Router();

router.use(userAuthorization);

router.get('/register', getUserRegisters);
router.post('/register', createRegister);

export default router;