import express from 'express';
import { userController } from '../controller/user.controller.js';
import { isAuthIsAdmin } from '../controller/auth.controller.js';

const router = express.Router();

/* GET users listing. */
router.get('/', userController.getAllUsers);

router.get('/privileges', isAuthIsAdmin, userController.getAllPrivileges);
router.get('/quotas', isAuthIsAdmin, userController.getAllQuotas);
router.get('/roles', isAuthIsAdmin, userController.getAllRoles);
router.get('/profiles', isAuthIsAdmin, userController.getAllProfiles);
router.get('/userProfile', isAuthIsAdmin, userController.getUserProfile);
router.get('/addUser', isAuthIsAdmin, userController.loadDataCreateUser);


export const users = router;
