import express from "express";

import { getUserRegisters, createRegister, getRegisterById, deleteRegister, editRegister } from "../controllers/transaction.controller.js";
import { userAuthorization } from "../middlewares/authorization.middleware.js";
import { auditRegister } from "../middlewares/auditTransaction.middleware.js";

const router = express.Router();

router.use(userAuthorization);

router.get('/register', getUserRegisters);
router.post('/register', createRegister);
router.get('/register/:ID_REGISTER', auditRegister, getRegisterById);
router.delete('/register/:ID_REGISTER', auditRegister, deleteRegister);
router.put('/register/:ID_REGISTER', auditRegister, editRegister);

export default router;