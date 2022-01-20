const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const bycrpt = require("bcryptjs");

Router.post("/login", async (req, res) => {
  const { email } = req.body;
  const { pwd } = req.body;

  //check if user exists
  const user = await db.User.findOne({ where: { user_email: email } });
  if (!user)
    return res.status(201).json({
      message: "email incorrect",
    });

  //Passwor incorrect
  const validpassword = await bycrpt.compare(pwd, user.pwd);
  if (!validpassword)
    return res.status(201).json({
      message: "password incorrect",
    });

  //create Token
  const Token = jwt.sign(
    { id: user.id, user_level: user.user_level },
    process.env.SECRET_CODE
  );
  res.status(200).json({
    token: Token,
    user,
  });
});


module.exports = Router;