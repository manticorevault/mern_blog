const User = require("../models/user");
const shortId = require("shortid");
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const { errorHandler } = require('../helpers/dbErrorHandler');
const Blog = require("../models/blog");
const { OAuth2Client } = require("google-auth-library");
const { response } = require("express");

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
        if (err || !user) {
            return res.status(400).json({
                error: "This e-mail is not related to any user. Please, register to access the platform!"
            });
        };

        // Authenticate e-mail and password
        if (!user.authenticate(password)) {
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
    const authUserId = req.auth._id;
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

exports.canManageBlogs = (req, res, next) => {
    const slug = req.params.slug.toLowerCase()

    Blog.findOne({ slug }).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: errorHandler(err)
            })
        }

        let authorizedUser = data.postedBy._id.toString() === req.profile._id.toString();

        if (!authorizedUser) {
            return res.status(400).json({
                error: "Voce nao tem autorizacao a acessar essa pagina"
            })
        }

        next();
    })
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

exports.googleLogin = (req, res) => {
    const idToken = req.body.tokenId
    client.verifyIdToken({ idToken, audience: process.env.GOOGLE_CLIENT_ID }).then(response => {
        const { email_verified, name, email, jti } = response.payload

        if (email_verified) {
            User.findOne({ email }).exec((err, user) => {
                if (user) {

                    // User or Auth
                    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
                    res.cookie("token", token, { expiresIn: "1d" })
                    const { _id, email, name, role, username } = user;
                    return res.json({ token, user: { _id, email, name, role, username } })
                } else {
                    let username = shortId.generate()
                    let profile = `${process.env.CLIENT_URL}/profile/${username}`
                    let password = jti + process.env.JWT_SECRET

                    user = new User({ name, email, profile, username, password })
                    user.save((err, data) => {
                        if (err) {
                            return res.status(400).json({
                                error: errorHandler(err)
                            })
                        }

                        const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET, { expiresIn: "1d" })
                        res.cookie("token", token, { expiresIn: "1d" })
                        const { _id, email, name, role, username } = user;
                        return res.json({ token, user: { _id, email, name, role, username } })
                    })
                }
            })
        } else {
            return res.status(400).json({
                error: "Houve um erro com o Login do Google. Por favor, tente novamente"
            })
        }
    })
}