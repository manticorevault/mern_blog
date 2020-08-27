const { check } = require("express-validator");

exports.userSignupValidator = [
    check("name")
        .not()
        .isEmpty()
        .withMessage("Name is required"),
    check("email")
        .isEmail()
        .withMessage("Must be a valid e-mail address"),
    check("password")
        .isLength({ min: 6 })
        .withMessage("Password have at least 6 characters")
];