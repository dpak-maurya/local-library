const mongoose = require("mongoose");
// Schema Setup
const Schema= mongoose.Schema;
const ImageSchema = new Schema({
    url: String,
    filename: String
});

const questionSchema = new mongoose.Schema({
    name: String,
    images: [ImageSchema],
    description: String,
});
questionSchema
    .virtual('url')
    .get(function (){
        return ('/solutions/'+this._id);
    });
module.exports = mongoose.model("Question", questionSchema);