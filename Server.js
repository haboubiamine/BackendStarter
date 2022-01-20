const express = require('express');
const morgan = require('morgan');
const cors = require('cors')
const app = express()
const Port = process.env.PORT || 3000
const dotenv = require("dotenv");
app.use(express.static('uploads/'));


// midellware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('dev'))
dotenv.config();
app.use(cors())




//Router 
const authRouter = require('./Route/authRoute')
const TestRouter = require('./Route/TestRoute')



app.use('/Test',TestRouter)
app.use('/auth',authRouter)


app.listen(Port , ()=>{
    console.log(`server is running on ${Port}`)
})