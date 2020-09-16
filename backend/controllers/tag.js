const Tag = require("../models/tag");
const slugify = require("slugify");
const { errorHandler } = require("../helpers/dbErrorHandler");
const tag = require("../models/tag");

exports.create = (req, res) => {
    const { name } = req.body;
    let slug = slugify(name).toLowerCase();

    let tag = new Tag({ name, slug });

    tag.save((err, data) => {
        if (err) {
            console.log(err);
            return res.status(400).json({
                error: errorHandler(err);
            });
        }

        res.json(data);
    });
};

exports.list = (req, res) => {
    Tag.find({}).exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err);
            });
        }

        res.json(data);
    });
};

exports.read = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    tag.findOne({ slug }).exec((err, tag) => {
        if(err) {
            return res.status(400).json({
                error: "Tag not found"
            });
        }

        res.json(data);
    });
};

exports.remove = (req, res) => {
    const slug = req.params.slug.toLowerCase();

    tag.findByIdAndRemove({ slug }).exec((err, data) => {
        if(err) {
            return res.status(400).json({
                error: errorHandler(err)
            });
        }

        res.json({
            message: "Tag deleted successfully!"
        });
    });
};