const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors');
const PORT = 4000;
const Router = require('./Route/mail.route.js');
const config = "mongodb+srv://naveen05patidar:naveen05patidar@cluster0.3a0xxwr.mongodb.net/?retryWrites=true&w=majority";
const FileRouter = require("./Route/file.route.js")
const mongoose = require('mongoose');


mongoose.Promise = global.Promise;
mongoose.connect(config,({useNewUrlParser:true})).then(()=>{
    console.log(`database is connected on ${config}`);
}).catch((err)=>{
    console.log(`database is not connected due to err: ${err}`);
})

app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.json());

app.use('/file', FileRouter);
app.use('/api', Router);

app.listen(PORT,(()=>{
    console.log(`Server is connected on port no. ${PORT}`);
}));



