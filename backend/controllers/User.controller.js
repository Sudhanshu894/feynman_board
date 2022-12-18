const AsyncErrorHandler = require('../middlewares/asyncHandler');
const { sendToken } = require('../middlewares/SendToken');
const User = require('../models/User.model');
const ErrorHandler = require('../middlewares/Errors');


// Register and Login user module
exports.RegisterAndLoginUser = AsyncErrorHandler(async (req, res, next) => {
    const { username } = req.body;

    const user = await User.findOne({ name: username });

    //user present then login
    if (user) {
        // send token to login
        return sendToken(user, 201, res);
    }

    // if user not exist then create and then login
    const cruser = await User.create({
        name: username,
    });
    return sendToken(user = cruser, 201, res);
});

// logout User module
exports.LogoutUser = AsyncErrorHandler(async (req, res, next) => {
    res.cookie('user_token', null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });

    res.status(201).send({
        success: true,
        message: 'User Logout Successfully',
    });
});

// get loggedin User module
exports.getUser = AsyncErrorHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);
    return res.status(201).send({
        success: true, user
    });
});

// Delete User module
exports.DeleteUser = AsyncErrorHandler(async (req, res, next) => {
    let user = await User.findOne({ name: req.params.name });
    if (!user) {
        return next(new ErrorHandler("User Not found", 404));
    }
    await User.findByIdAndDelete(user._id);
    return res.status(300).send({ success: true, message: "User Deleted Successfully" });
});