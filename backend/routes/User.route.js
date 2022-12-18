const express = require('express');
const {RegisterAndLoginUser,LogoutUser,getUser, DeleteUser} = require('../controllers/User.controller');
const {IsAuthenticated} = require('../middlewares/Auth');

const router = express.Router();

router.route('/enteruser').post(RegisterAndLoginUser);
router.route('/getuser').get(IsAuthenticated,getUser);
router.route('/logoutuser').get(LogoutUser);
router.route('/deleteuser/:name').delete(DeleteUser);

module.exports = router;