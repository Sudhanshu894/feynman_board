const AsyncErrorHandler = require('./asyncHandler');
const JWT = require('jsonwebtoken');
const User = require('../models/User.model');
const ErrorHandler = require('../middlewares/Errors');

exports.IsAuthenticated = AsyncErrorHandler(async (req, res, next) => {
    const { user_token } = req.cookies;
    if (!user_token) {
        return next(new ErrorHandler("Please Login to Access the resources", 404));
    };

    // Verify User via JWT token created at the time of user registeration and login
    const DecodedUserData = JWT.verify(user_token, process.env.JWT_SECRET_KEY);

    req.user = await User.findById(DecodedUserData.id);
    next();
})
