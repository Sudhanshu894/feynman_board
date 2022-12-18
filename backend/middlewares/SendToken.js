module.exports.sendToken = (user, statuscode, res) => {
    const token = user.GetToken();
    const options = {
        expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
        httpOnly: true,
    };
    res.status(statuscode).cookie('user_token', token, { ...options }).send({
        success: true,
        user,
        token,
    });
};