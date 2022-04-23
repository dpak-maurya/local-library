var express=require('express');
var router =express.Router();

//Require controller modules
var game_controller=require('../controllers/gameController');


///BOOK ROUTES ///

//GET catalog home page
router.get('/',game_controller.index);

module.exports = router;