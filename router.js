var express 	= require('express');
var router 		= express.Router();
var Response  = require('./helper/responseHelper.js');
var UserController    = require('./controllers/UserController');
var QuestController    = require('./controllers/QuestController');


router.route('/*')
  .trace(function(req, res, next) {
    res.send(Response.successfull(200, req.body, null, null));
  })
  .options(function(req, res, next) {
    res.send(Response.successfull(100));
  });

// Users
router.route('/users')
	.get(UserController.getAllUser)
	.post(UserController.createUser);

router.route('/users/:id')
	.get(UserController.getUser)
  .put(UserController.updateUser)
  .delete(UserController.deleteUser);

//Quests
router.route('/quests')
  .get(QuestController.getAllQuests);

/*router.route('/quests/:id')
  .get(QuestController.getQuest)
  .delete(QuestController.deleteQuest);

router.route('/users/:id/quests')
  .get(QuestController.getNewQuests);
*/

// Finally export the router
module.exports = router;