import express from "express";

import { getUserRegisters, createRegister, deleteRegister, editRegister } from "../controllers/register.controller.js";
import { userAuthorization } from "../middlewares/authorization.middleware.js";
import { auditRegister } from "../middlewares/auditRegister.middleware.js";

const router = express.Router();

router.use(userAuthorization);

router.get('/register', getUserRegisters);
router.post('/register', createRegister);
router.delete('/register/:ID_REGISTER', auditRegister, deleteRegister);
router.put('/register/:ID_REGISTER', auditRegister, editRegister);

export default router;