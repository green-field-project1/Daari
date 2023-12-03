const express = require('express')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const userRouter = require('./routes/user.route.js')
const authRouter = require('./routes/auth.route.js')
dotenv.config()

mongoose.connect(process.env.MONGO)
.then(()=>{
    console.log('connected to the database');
})
.catch((err)=>{
    console.log(err);
})

const app = express()

app.use(express.json())

app.listen(3000,()=>{
    console.log('Server running on port 3000');
})


// app.use('/api/user',userRouter)

app.use('/api/auth',authRouter)