const User = require('../models/user');
const getUserParams = body => {
    return {
        username: body.username,
        password: body.password,
        email: body.email
    };
};

module.exports = {
    users: (req, res, next) => {
        User.find()
            .then(users => {
                res.locals.users = users;
                next();
            })
            .catch(error => {
                console.log(`Error fetching users: ${error.message}`);
                next(error);
            });
    },

    login: (req, res) => {
        res.render('login');
    },

    new: (req, res) => {
        res.render('signup');
    },

    create: (req, res, next) => {
        let userParams = getUserParams(req.body);

        User.create(userParams)
            .then(user => {
                req.flash('success', `${user.username}'s account created successfully!`);
                res.locals.redirect = '/users';
                res.locals.user = user;
                console.log('Saving user...');
                next();
            })
            .catch(error => {
                req.flash('error', `Failed to create user account because: ${error.message}.`);
                console.log(`Error saving user: ${error.message}`);
                res.locals.redirect = '/users/signup';
                next(error);
            });
    },

    redirectView: (req, res, next) => {
        let redirectPath = res.locals.redirect;
        if (redirectPath !== undefined) {
            redirect(redirectPath);
        } else {
            next();
        }
    }
};