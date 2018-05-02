require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const pug = require('pug');
const fs = require('fs');
const formidable = require('formidable');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary');


//initialize the app
let app = express();

//configuring cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});
//connect to mongodb
mongoose.connect(process.env.DB_API);
mongoose.Promise = global.Promise;

// view engine setup
app.set('views', path.join(__dirname + "/public", 'views'));
app.set('view engine', 'pug');

//use middlewares
app.use(bodyParser.json());

//static setups
app.use(express.static(path.join(__dirname, 'public')));

//all the routers
app.get('/', function(req, res) {
    res.render('index');
});
app.post('/', (req, res) => {
    let form = new formidable.IncomingForm();
    /*form.uploadDir = __dirname + "/public/images";
    console.log(__dirname + "/public/images");

    form.keepExtensions = true;*/
    form.parse(req);
    //set the filename to the original
    form.on('fileBegin', function(name, file) {
        file.path = __dirname + "/public/images/" + file.name;
    });
    form.on('file', function(name, file) {
        console.log(file.path);
        cloudinary.uploader.upload(file.path, function(result) {
            console.log(result)
        });
        res.writeHead(200, {
            'Content-Type': 'text/plain'
        });
        res.end(file.name);
    });
});
app.listen(3000, () => {
    console.log('App listening on port 3000!');
});