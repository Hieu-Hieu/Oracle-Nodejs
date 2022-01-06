const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ where: { email } });

  const userNotPassword = { ...user.dataValues };
  delete userNotPassword.password;
  if (user) {
    //giải mã password nếu đúng trả về true
    const isAuth = bcryptjs.compareSync(password, user.password); // true
    if (isAuth) {
      //tạo token( chuỗi mã hóa, key mã hóa, thời lượng tồn tại của token)
      const accessToken = jwt.sign(
        { email: user.email, type: user.type },
        "hoangquyen8599",
        { expiresIn: "1h" }
      );
      res.status(200).send({
        message: "Success",
        data: { ...userNotPassword, accessToken },
      });
    } else {
      res.status(400).send({ message: "Fail" });
    }
  } else {
    res.status(404).send({ message: "Not Found Account" });
  }
};