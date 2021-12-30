import express from 'express';

const router = express.Router();

/* GET login page. */
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express' });
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



export const api = router;
