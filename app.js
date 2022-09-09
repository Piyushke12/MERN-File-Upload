const express = require('express');
const bodyParser = require('body-parser');
const mainRoute = require('./routes/mainRoutes');
const mongoose = require('mongoose');
const {env} = require('process');
const PORT = process.env.PORT || 5000;
const app = express();


require('dotenv').config();

const conn = mongoose.createConnection(env.MongoURI,()=>{
    console.log('Database Connected');
});

app.use(bodyParser.json());
app.use(express.urlencoded({
    extended:false
}));

//routes
app.use('/',mainRoute);

app.listen(PORT,()=>{
    console.log(`Listening to ${PORT}`);
});