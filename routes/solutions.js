var express = require('express');
var router = express.Router();
const multer=require('multer');
const {storage}=require('../cloudinary');
const upload=multer({storage});

//Require controller modules
var solution_controller=require('../controllers/solutionController');

//GET catalog home page
router.get('/',solution_controller.index);

//GET request for creating a question
router.get('/question/add',solution_controller.question_get);

//POST request for creating a question
router.post('/question/add',upload.array('image'),solution_controller.question_post);
// GET request for one question detail.
router.get('/:id', solution_controller.question_detail);
//GET request for adding a solution
router.get('/answer/add',solution_controller.answer_get);

//POST request for adding a solution
router.post('/answer/add',solution_controller.answer_post);


module.exports = router;