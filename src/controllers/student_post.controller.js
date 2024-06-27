const { student_post, student_display, like_DB } = require('../models/student_post.model');

const cloudinary = require("cloudinary").v2;
let image1;
const multer = require('multer');
let file_name;
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        {
            cb(null, '../images');
        }
    },
    filename: function (req, file, cb) {
        file_name = file.originalname;
        cb(null, file.originalname);
    }
});

const upload = multer({ storage });
async function post_image(req, res) {
    let result = req.body;
    cloudinary.config({
        cloud_name: "dkzca4hyd",
        api_key: "895241838259938",
        api_secret: "Nq5YfWfqVuuEjUbJBz-IKOVyxDQ",
    });
    await cloudinary.uploader.upload(`../images/${file_name}`).then(res => {
        image1 = res.url;
    });

    let response = await student_post(result.std_token, result.caption, image1);
    if (response) {
        res.send(response);
    } else {
        res.send(response);
    }
}

async function std_display(req, res) {
    let result = req.body;
    let response = await student_display();
    res.send({
        response: response
    })
}

module.exports = { post_image, upload, std_display };
