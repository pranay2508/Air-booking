const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const bcrypt = require('bcryptjs') // to dycrypte the password of user
const User = require('./models/User');
require('dotenv').config(); // MongoURL to connect with database
const app = express();
const bcryptSalt = bcrypt.genSaltSync(10);
app.use(express.json());
app.use(cors({
    credentials:true,
    origin: 'http://localhost:5173',
}));

// console.log(process.env.MONGO_URL) ==> to check if the mongodb is connected or not.

mongoose.connect(process.env.MONGO_URL);
app.get('/test' , (req,res) => {
    res.json('test ok');
});
app.post('/register', async (req,res)=>{
    const {name,email,password} = req.body;
  const userDoc= await User.create({
        name,
        email,
        password:bcrypt.hashSync(password, bcryptSalt),
    })
    res.json(userDoc);
})

app.listen(4000);


//mongo atlas password - HhvqpVJyTgM0Xb1a