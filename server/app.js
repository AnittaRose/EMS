const express = require('express');
const mongoConnect = require('./db/connect');
const userrouter = require('./router/userRouter');
const authrouter = require ('./router/authRouter')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();


require('dotenv').config();


app.use(express.static('../client'));
app.use(cors());

// Connect to MongoDB
mongoConnect();


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(userrouter);
app.use(authrouter);


app.listen(process.env.PORT, () =>{
    console.log(`server running at http://localhost:${process.env.PORT}`)
});