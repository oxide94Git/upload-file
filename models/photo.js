//space to store photos
const mongoose = require('mongoose');

//variable to store our schema
const Schema = mongoose.Schema;

//create photo Schema & model
const PhotoSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required']
    },
    url: {
        type: String,
        required: [true, 'url is required to retrive photos']
    }
});

//create a model
const Photo = mongoose.model('photo', PhotoSchema);

//export this model
module.exports = Photo;