const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please Enter your Username'],
        maxLength: [30,'Name Should not exceeds 30 characters'],
        minLength: [3, "Name should be equal or greater than 3 characters"],
    },
    avatar: {
        public_id: {
            type: String,
            // required: true,
        },
        url: {
            type: String,
            // required: true,
        }
    },
    createdAt: {
        type: Date,
        default: Date.now(),
    }
});

UserSchema.methods.GetToken = function() {
    return jwt.sign({id: this._id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRE_DURATION,
    });
}

module.exports = mongoose.model('users',UserSchema);