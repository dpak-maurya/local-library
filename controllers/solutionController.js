var Question=require('../models/question');
var {Answer,Description}=require('../models/answer');
var async=require('async');
const {body,validationResult}=require('express-validator');

exports.index = function(req, res) {

    Question.find({})
        .populate('Description')
        .populate('Answer')
        .exec(function (err,list_questions){
            var allque=[];
            // if(err) return next(err);
            // list_questions.forEach((question)=>{
            //     async.parallel({
            //         answers:function (callback) {
            //             Answer.countDocuments({'question':question._id}, callback);
            //         },
            //         refers:function (callback) {
            //             Description.countDocuments({'question':question._id}, callback);
            //         },
            //     },function (err,results){
            //         //console.log(question);
            //         var q={
            //             _id:question._id,
            //             name: question.name,
            //             images:question.images,
            //             description: question.description,
            //             answers:results.answers,
            //             refers: results.refers
            //         }
            //         allque.push(q);
            //     })
            // })
            // console.log(allque)
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
    async.parallel({
        question:function (callback){
            Question.findById(req.params.id)
                .exec(callback);
        },
        answers:function (callback){
            Answer.find({'question': req.params.id})
                .exec(callback);
        },
        refers:function (callback){
            Description.find({'question': req.params.id})
                .exec(callback);
        }
    },function (err,results){
        if(err) return next(err);
        if(results.question==null){
            var err=new Error('question not found');
            err.status=404;
            return next(err);
        }
        var que={
            _id:results.question._id,
            name: results.question.name,
            images: results.question.images,
            description: results.question.description,
            answers:results.answers,
            refers:results.refers
        };

        res.render('question_details',{title:'Question',que:que});
    })
}
// Handle book create on POST.
exports.reference_post = (req,res,next)=>{
    console.log(req.body);
    var desc=new Description(
        {
            description:req.body.description,
            question:req.body.question,
        });
    desc.save(function (err){
        if(err){return next(err);}
        //successful - redirect to new book record.
        res.redirect('back');
    });
}
// Handle book create on POST.
exports.answer_post=(req,res,next)=>{
        var ans=new Answer(
            {
                images:req.files.map(f => ({ url: f.path, filename: f.filename })),
                question:req.body.question
            });

            //Data from form is valid. Save book.
            ans.save(function (err){
                if(err){return next(err);}
                //successful - redirect to new book record.
                res.redirect('back');
            });
    }
