const User = require("../Models/User");
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcrypt');
const SALT_ROUND = 11;
const {
    SUCCESS,
    FAILURE,
    STATUS
} = require('../api_response');
const SESSION_SECRET = config.get("SESSION_SECRET");
const hash_password = async password => {
    return bcrypt.hashSync(password, SALT_ROUND);
}
module.exports.jwt_token_encrypt = async (data, min) => jwt.sign({
    data
}, SESSION_SECRET, {
    expiresIn: min * 60
}); // for 30 days
const signup = async req => {
    let data = {
        name,
        email,
        password,
        sex,
        date_of_birth,
        phone,
    } = req.body;
    data.password = await hash_password(data.password);
    try {
        let user = await new User(data).save();
        const token = await jwt_token_encrypt({
            uid: user._id
        }, 30 * 24 * 60);
        return {
            token: token,
        };
    } catch (error) {
        return{
            failed : true,
            status : STATUS.BAD_REQUEST,
            msg : error.message
        }
    }
}


module.exports.login = async req => {
    let data = {
        email,
        password
    }=req.body;
    try {
        let user = await User.findOne({
            email: email
        });
        if (!user) {
            throw Error ("No User found with this email address");
        }
        if (!bcrypt.compareSync(password, user.password)) {
            throw Error ( "incorrect password.");
        };
        const token = await jwt_token_encrypt({
            uid: user._id
        }, 30 * 24 * 60);
        return {
            token: token,
        };
    } catch (error) {
        return {
            failed: true,
            status: STATUS.BAD_REQUEST,
            msg: error.message
        }
    }
}