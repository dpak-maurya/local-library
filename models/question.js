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
    answers:[{type: Schema.Types.ObjectId,ref:'Answer'}],
    references:[{type: Schema.Types.ObjectId,ref:'Description'}]
});
questionSchema
    .virtual('url')
    .get(function (){
        return ('/solutions/'+this._id);
    });
module.exports = mongoose.model("Question", questionSchema);