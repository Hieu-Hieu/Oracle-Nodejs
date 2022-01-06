import express from 'express';
import { userController } from '../controller/user.controller.js';

const router = express.Router();

/* GET users listing. */
router.get('/', userController.getAllUsers);

router.get('/privileges', userController.getAllPrivileges);
router.get('/quotas', userController.getAllQuotas);
router.get('/roles', userController.getAllRoles);
// router.get('/profiles', userController.get);

export const users = router;
