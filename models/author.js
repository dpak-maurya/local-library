const mongoose = require('mongoose');
const {DateTime}=require('luxon');
const Schema = mongoose.Schema;
const AuthorSchema = new Schema({
    first_name: {type: String, required: true, maxlength: 100},
    family_name: {type: String, required: true, maxlength: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});

//Virtual for author's full name
AuthorSchema
.virtual('name')
.get(function (){
    //to avoid error
    var fullname='';
    if(this.first_name&&this.family_name){
        fullname=this.family_name+','+this.first_name;
    }
    if(!this.first_name||!this.family_name){
        fullname='';
    }
    return fullname;
});

AuthorSchema
    .virtual('format_dob')
    .get(function (){
        return this.date_of_birth ? DateTime.fromJSDate(this.date_of_birth).toLocaleString(DateTime.DATE_MED) : '';
    })
AuthorSchema
    .virtual('format_dod')
    .get(function (){
        return this.date_of_death ? DateTime.fromJSDate(this.date_of_death).toLocaleString(DateTime.DATE_MED) : 'present';
    })
AuthorSchema
    .virtual('lifespan')
    .get(function (){
        return `${this.format_dob} - ${this.format_dod}`;
    });
AuthorSchema.virtual('date_of_birth_yyyy_mm_dd').get(function() {
    return DateTime.fromJSDate(this.date_of_birth).toISODate(); //format 'YYYY-MM-DD'
});

AuthorSchema.virtual('date_of_death_yyyy_mm_dd').get(function() {
    return DateTime.fromJSDate(this.date_of_death).toISODate(); //format 'YYYY-MM-DD'
});
AuthorSchema
    .virtual('url')
    .get(function (){
        return '/catalog/author/'+this._id;
    });

module.exports=mongoose.model('Author',AuthorSchema);
