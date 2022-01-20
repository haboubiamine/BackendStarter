const Router = require("express").Router();
const bycrpt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require('uuid');

// add user
Router.post('/',async (req,res)=>{


    const {email} = req.body
    const {pwd} = req.body
    const {level} = req.body

  //check if user exists
  const emailexist = await db.User.findOne({ where: {user_email : email}});
  if (emailexist) return res.status(201).json({
    message : "Email exists try another one"
  })


  //Hash password
const salt = await bycrpt.genSalt(10);
const hashpassword = await bycrpt.hash(pwd,salt);

  // Create new user
  const NewUser = {
     user_email : email,
     pwd : hashpassword,
     user_level:level,
    //  activation_code : uuidv4()
     }

   // saving the new user
   try {
  const newuser =   await  db.User.create(NewUser)
  .then((user)=>{
    // Mailer()
    res.status(200).json({
      message : "user added",
      user,
    })
  })
   } catch (error) {
   console.log(error)
   }

})
