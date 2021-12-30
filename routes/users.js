import express from 'express';
import Open from '../config.js'

const router = express.Router();

/* GET users listing. */
router.get('/', async function (req, res) {

  try {

    let sql = "SELECT * FROM DBA_USERS ORDER BY created DESC";

    const result = await Open(sql, [], false);

    if (result) {
      let Users = [];

      result.rows.map(user => {
        let userSchema = {
          "id": user[1],
          "username": user[0],
          "expiryDate": user[5],
          "status": user[3]
        }

        Users.push(userSchema);
      });

      // res.json(Users);
      res.render('home', { users: Users });
      // res.send(result)
    }

  } catch (err) {
    //send error message
    console.log(err)
    res.render('home', { users: null, error: err })

  }
  // res.send('respond with a resource');
});

export const users = router;
