const express = require('express');
const { createTopic, getAllTopics, getTopic, UpdateTopic, DeleteTopic } = require('../controllers/Topic.controller');
const { IsAuthenticated } = require('../middlewares/Auth');

const router = express.Router();

router.route('/createpost').post(IsAuthenticated, createTopic);
router.route('/user/alltopics').get(IsAuthenticated, getAllTopics)
router.route('/user/topic/:id').get(getTopic).patch(IsAuthenticated, UpdateTopic).delete(IsAuthenticated, DeleteTopic);

module.exports = router;