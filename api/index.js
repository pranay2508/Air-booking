const express = require("express");
const cors = require("cors");
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs"); // to dycrypte the password of user
const jwt = require('jsonwebtoken');//JSON Web Tokens are most commonly used to identify an authenticated user. They are issued by an authentication server
const User = require("./models/User");
require("dotenv").config(); // MongoURL to connect with database
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret ='whollllaaawhoareyouwhooollalaaaaa';
app.use(express.json());
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// console.log(process.env.MONGO_URL) ==> to check if the mongodb is connected or not.
//mongo atlas password - HhvqpVJyTgM0Xb1a
mongoose.connect(process.env.MONGO_URL);
app.get("/test", (req, res) => {
  res.json("test ok");
});
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcryptSalt),
    });
    res.json(userDoc);
  } catch (e) {
    res.status(422).json(e);
  }
});
// this is the /login api for the login page 
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (userDoc) {
    // res.json("found");
    const passOk = bcrypt.compareSync(password,userDoc.password) // this will check if the password is ok 
  if (passOk){
    jwt.sign({email:userDoc.email, id:userDoc._id} , jwtSecret, {}, (err,token)=>{
      if(err) throw err;
      res.cookie('token', token).json('pass ok');
    }) // _id is used in mongoose database
  }
  else{
    res.status(422).json('pass not ok ')
  }
} else {
    res.json("not found");
  }
});

app.listen(4000);
