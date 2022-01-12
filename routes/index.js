import express from 'express';
import { userController } from '../controller/user.controller.js';

const router = express.Router();

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Đăng nhập', message: '' });
});

/* GET profile page. */
router.get('/profile', function (req, res, next) {
  res.render('profile', { title: 'Express' });
});

/* GET profile page. */
router.get('/role', function (req, res, next) {
  res.render('role', { title: 'Express' });
});

/* GET profile page. */
router.get('/new-user', function (req, res, next) {
  res.render('newuser', { title: 'Express' });
});

/* GET profile page. */
router.get('/user', function (req, res, next) {
  res.render('user', { title: 'Express' });
});

router.post('/login', userController.login);
router.post('/addProfile', userController.addProfile);
router.post('/deleteProfile', userController.removeProfile);

router.post('/addrole', userController.addRole);
router.post('/dropRole', userController.dropRole);
router.post('/alterRole', userController.alterRole);

router.post('/addPrivToUser', userController.grantPrivilegeToUser);
router.get('/priv/:username', userController.getPrv);
router.post('/addUser', userController.createUser);
router.post('/dropUser', userController.dropUser);

export const api = router;
