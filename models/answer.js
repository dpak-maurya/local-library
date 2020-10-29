const mongoose = require("mongoose");
// Schema Setup
const Schema= mongoose.Schema;
const ImageSchema = new Schema({
    url: String,
    filename: String
});
const answerSchema = new mongoose.Schema({
    name: String,
    image:[ImageSchema],
});
const descriptionSchema = new mongoose.Schema({
    description:String
});

module.exports = mongoose.model("Answer", answerSchema);
module.exports = mongoose.model("Description", descriptionSchema);
