var express 	= require('express');
var router 		= express.Router();
var Response  = require('./helper/responseHelper.js');
var UserController    = require('./controllers/UserController');
var QuestController    = require('./controllers/QuestController');
var GroupController    = require('./controllers/GroupController');
var AchievementController    = require('./controllers/AchievementController');

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
  .get(QuestController.getAllQuests)
  .post(QuestController.createQuest);

router.route('/quests/:id')
  .get(QuestController.getQuest)
  .delete(QuestController.deleteQuest);

//Groups
router.route('/groups')
  .get(GroupController.getAllGroups)
  .post(GroupController.createGroup);

router.route('/groups/:id')
  .get(GroupController.getGroup)
  .put(GroupController.updateGroup)
  .delete(GroupController.deleteGroup);

//Achievements
router.route('/achievements')
  .get(AchievementController.getAllAchievements);

router.route('/achievements/:id')
  .get(AchievementController.getAchievement);


// Finally export the router
module.exports = router;