var Question=require('../models/question');
var {Answer,Description}=require('../models/answer');
var async=require('async');
const {body,validationResult}=require('express-validator');

exports.index = function(req, res) {
    Question.find({})
        .populate('answers')
        .populate('descriptions')
        .exec(function (err,list_questions){
            if(err) return next(err);
            res.render('question_list',{title:'All Questions',question_list:list_questions});
        })
};

// Display book create form on GET.
exports.question_get = function(req, res, next) {
    res.render('question_form',{title:'Add a Question'});
};

// Handle book create on POST.
exports.question_post = [

    //Validate and sanitise fields.
    body('title','Title must not be empty.').trim().isLength({min:1}).escape(),
    body('description','Author must not be empty.').trim().isLength({min:1}).escape(),


    // Process request after validation and sanitization.
    (req,res,next)=>{
        // Extract the validation errors from a request.
        const errors=validationResult(req);
        console.log(req.body);
        console.log(req.files);

        // Create a Question object with escaped and trimmed data.
        var question=new Question(
            {
                name:req.body.title,
                images:req.files.map(f => ({ url: f.path, filename: f.filename })),
                description:req.body.description
            });
        if(!errors.isEmpty()){
            res.render('book_form',{title:'Add a Question',errors:errors.array()});
        }
        else{
            //Data from form is valid. Save book.
            question.save(function (err){
                if(err){return next(err);}
                //successful - redirect to new book record.
                res.redirect(question.url);
            });
        }
    }
];
exports.question_detail=function (req,res,next){
    Question.findById(req.params.id)
        .populate('answers')
        .populate('descriptions')
        .exec(function (err,question){
            if(err) return next(err);
            res.render('question_details',{title:'Question',que:question});
        })
}
// Display book create form on GET.
exports.answer_get = function(req, res, next) {

    // Get all authors and genres, which we can use for adding to our book.
    async.parallel({
        authors: function(callback) {
            Author.find(callback);
        },
        genres: function(callback) {
            Genre.find(callback);
        },
    }, function(err, results) {
        if (err) { return next(err); }
        res.render('book_form', { title: 'Create Book', authors: results.authors, genres: results.genres });
    });

};

// Handle book create on POST.
exports.answer_post = [
    // Convert the genre to an array.
    (req,res,next)=>{
        if(!(req.body.genre instanceof Array)){
            if(typeof req.body.genre ==='undefined')
                req.body.genre=[];
            else
                req.body.genre=new Array(req.body.genre);
        }
        next();
    },

    //Validate and sanitise fields.
    body('title','Title must not be empty.').trim().isLength({min:1}).escape(),
    body('author','Author must not be empty.').trim().isLength({min:1}).escape(),
    body('summary','Summary must not be empty.').trim().isLength({min:1}).escape(),
    body('isbn','ISBN must not be empty').trim().isLength({min:1}).escape(),
    body('genre.*').escape(),

    // Process request after validation and sanitization.
    (req,res,next)=>{
        // Extract the validation errors from a request.
        const errors=validationResult(req);

        // Create a Book object with escaped and trimmed data.
        var book=new Book(
            {
                title:req.body.title,
                author:req.body.author,
                summary:req.body.summary,
                isbn:req.body.isbn,
                genre:req.body.genre
            });
        if(!errors.isEmpty()){
            // There are errors. Render form again with sanitized values/error messages.

            // Get all authors and genres for form.
            async.parallel({
                authors:function (callback){
                    Author.find(callback);
                },
                genres:function (callback){
                    Genre.find(callback);
                },
            },function (err,results){
                if (err) { return next(err); }

                // Mark our selected genres as checked.
                for (let i = 0; i < results.genres.length; i++) {
                    if(book.genre.indexOf(results.genres[i]._id)>-1){
                        results.genres[i].checked='true';
                    }
                }

                res.render('book_form',{title:'Create Book',authors:results.authors,genres:results.genres,book:book,errors:errors.array()});
            });
            return ;
        }
        else{
            // Data from form is valid. Save book.
            book.save(function (err){
                if(err){return next(err);}
                //successful - redirect to new book record.
                res.redirect(book.url);
            });
        }
    }
];