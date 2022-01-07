import jwt from "jsonwebtoken";

export const isAuthIsAdmin = (req, res, next) => {
  try {
    let { token } = req.cookies;

    if (token !== undefined) {
      token = token.slice(7, token.length); // Bearer XXXXXX

      const decoded = jwt.verify(token, 'hieu@123')

      if (decoded.username === 'supper') {
        next()
      } else {
        res.redirect('/login')
      }
      // next()

    } else {
      res.redirect('/login')
    }
  } catch (error) {

    res.redirect('/login')
  }

};


const login = async (req, res) => {
  const { username, password } = req.body;
  if (username && password) {
    global.USERNAME = username;
    global.PASSWORD = password;
  }
}