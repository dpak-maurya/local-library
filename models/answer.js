const mongoose = require("mongoose");
// Schema Setup
const Schema= mongoose.Schema;
const ImageSchema = new Schema({
    url: String,
    filename: String
});
const answerSchema = new mongoose.Schema({
    images:[ImageSchema],
    question:{type: Schema.Types.ObjectId,ref:'Question',required: true},
});
const descriptionSchema = new mongoose.Schema({
    description:String,
    question:{type: Schema.Types.ObjectId,ref:'Question',required: true},
});

module.exports= {
    Answer:mongoose.model("Answer", answerSchema),
    Description:mongoose.model("Description", descriptionSchema)
}
