import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const accessToken = req.header("token");
  try {

    const decode = jwt.verify(accessToken, "abcd");
    if (decode) {

      req.user = decode;
      return next();
    } else {
      res.status(401).send({ message: "Unauthorized!" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
};

const authorize = (req, res, next) => {
  const { user } = req;
  if (["ADMIN", "SUPER_ADMIN"].findIndex((ele) => ele === user.type) !== -1) {
    next();
  } else {
    res.status(403).send({ message: "Forbidden!" });
  }
};


module.exports = { authenticate };