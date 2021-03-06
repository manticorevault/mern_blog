const User = require("../models/user");
const Blog = require("../models/blog")
const _ = require("lodash")
const formidable = require("formidable")
const fs = require("fs")
const { errorHandler } = require('../helpers/dbErrorHandler');

exports.read = (req, res) => {
    req.profile.hashed_password = undefined;
    return res.json(req.profile);
};

exports.publicProfile = (req, res) => {
    let username = req.params.username
    let user
    let blogs

    User.findOne({ username }).exec((err, userFromDB) => {
        if (err || !userFromDB) {
            return res.status(400).json({
                error: "User not found"
            })
        }

        user = userFromDB
        let userId = user._id
        Blog.find({ postedBy: userId })
            .populate("categories", "_id name slug")
            .populate("tags", "_id name slug")
            .populate("postedBy", "_id name")
            .limit(10)
            .select("_id title slug excerpt categories tags postedBy createdAt updatedAt")
            .exec((err, data) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err)
                    })
                }

                user.photo = undefined
                user.hashed_password = undefined
                user.salt = undefined
                res.json({
                    user, blogs: data
                })
            })
    })
}

exports.update = (req, res) => {

    let form = new formidable.IncomingForm()
    form.keepExtensions = true

    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({
                error: "Nao foi possivel fazer o upload da imagem"
            })
        }

        let user = req.profile
        user = _.extend(user, fields)

        //TODO: Adicionar mais validacoes de senha com sinais e maiusculo/minusculo
        if (fields.password && fields.password.length < 8) {
            return res.status(400).json({
                error: "A senha deve ter ao menos 8 caracteres"
            })
        }

        if (files.photo) {
            if (files.photo.size > 50000000) {
                return res.status(400).json({
                    error: "Imagem deve ser menor do que 5MB"
                })
            }

            user.photo.data = fs.readFileSync(files.photo.path)
            user.photo.contentType = files.photo.type
        }

        user.save((err, result) => {
            if (err) {
                return res.status(400).json({
                    error: errorHandler(err)
                })
            }

            user.hashed_password = undefined
            user.salt = undefined
            user.photo = undefined

            res.json(user);
        })
    })
}

exports.photo = (req, res) => {
    const username = req.params.username
    User.findOne({ username }).exec((err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Usuario nao foi encontrado"
            })
        }

        if (user.photo.data) {
            res.set("Content-Type", user.photo.contentType)

            return res.send(user.photo.data)
        }
    })
}