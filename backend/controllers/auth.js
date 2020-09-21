const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");

exports.register = (req, res) => {
    User.findOne({ email: req.body.email }).exec((err, user) => {
        if (user) {
            return res.status(400).json({
                error: "This e-mail is already in use"
            });
        }

        const { name, email, password } = req.body;
        let username = shortId.generate();
        let profile = `${process.env.CLIENT_URL}/profile/${username}`;

        let newUser = new User({ name, email, password, profile, username });
        newUser.save((err, success) => {
            if (err) {
                return res.status(400).json({
                    error: err
                });
            }
            res.json({
                message: "Successfully signed in! Now you can log in!"
            });
        });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body

    // Checks if user exists
    User.findOne({ email }).exec((err, user) => {
        if(err || !user) {
            return res.status(400).json({
                error: "This e-mail is not related to any user. Please, register to access the platform!"
            });
        };

        // Authenticate e-mail and password
        if(!user.authenticate(password)) {
            return res.status(400).json({
                error: "E-mail and password does not match!"
            });
        };

        // Generate a JWT and send it to the client
        const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });

        res.cookie("token", token, { expiresIn: "1d" });
        const { _id, username, name, email, role } = user;
        return res.json({
            token,
            user: { _id, username, name, email, role } 
        });
    });
};

exports.logout = (req, res) => {
    res.clearCookie("token")
    res.json({
        message: "Successfully logged out!"
    });
};

exports.requireLogin = expressJWT({
    secret: process.env.JWT_SECRET,
    algorithms: ["HS256"],
    userProperty: "auth",
});

exports.authMiddleware = (req, res, next) => {
    const authUserId = req.user._id;
    User.findById({ _id: authUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }
        req.profile = user;
        next();
    });
};

exports.adminMiddleware = (req, res, next) => {
    const adminUserId = req.auth._id;
    User.findById({ _id: adminUserId }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: 'User not found'
            });
        }

        if (user.role !== 1) {
            return res.status(400).json({
                error: 'You are not allowed in this page'
            });
        }

        req.profile = user;
        next();
    });
};