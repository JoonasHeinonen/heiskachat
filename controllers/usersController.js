const User = require('../models/user');
const getUserParams = body => {
    return {
        username: body.username,
        password: body.password,
        email: body.email
    };
};