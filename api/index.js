const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
require('dotenv').config();
const app = express();

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
app.post('/register', (req,res)=>{
    const {name,email,password} = req.body;
    res.json({name,email,password});
    
})

app.listen(4000);


//mongo atlas password - HhvqpVJyTgM0Xb1a