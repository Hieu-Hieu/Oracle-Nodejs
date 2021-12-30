import express from 'express';

/* GET home page. */
// router.get('/', function (req, res, next) {
//   try {
//     // const { data } = axios.get('http://localhost:3000/')
//     console.log(data)
//     res.render('home', { users: data });
//   } catch (error) {
//     res.render('news', { users: null })
//     console.error('Error', error)
//   }
// });

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
