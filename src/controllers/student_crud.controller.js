const { add_std, find_std, delete_std_data, update_std_data } = require('../models/std_server.model');

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const add_student = async function (req, res) {
    let std = req.body;
    let get_std = await add_std(std.name, std.email, std.password, std.exam, std.token);
    if (get_std) {
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '512brand786@gmail.com',
                pass: 'ftaq kpbs gbxl wiav'
            }
        });

        var mailOptions = {
            from: '512brand786@gmail.com',
            to: std.email,
            subject: 'This is Email from your Teacher',
            text: `Your Password is ${std.password}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log("Successfull!");
                console.log('Email sent: ' + info.response);
            }
        });
        res.send({
            message: get_std
        })
    } else {
        res.send({
            message: "Error while Added"
        })
    }
};

const find_student = async function (req, res) {

    const decoded = req.user;
    let get_std = await find_std(decoded);
            if (get_std) {
                res.send(get_std);
            } else {
                res.send({
                    message: "Error while Finding"
                })
            }
};



async function delete_student(req, res) {
    let std = req.body;
    let del = await delete_std_data(std.element);
    if (del) {
        res.send({
            message: "SuccessFully Deleted"
        })
    } else {
        res.send({
            message: "Error Deleted"
        })
    }
}

async function update_student(req, res) {
    let std = req.body;

    let del = await update_std_data(std.id, std.name, std.email, std.password, std.exam);
    if (del) {
        res.send({
            message: "SuccessFully Updated"
        })
    } else {
        res.send({
            message: "Error Updated"
        })
    }
}



module.exports = { add_student, find_student, delete_student, update_student };
