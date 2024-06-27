const { sign_up, logIn, find_email, change_password } = require('../models/sever.model');
const nodemailer = require('nodemailer');

let number = null;

const signUp_save = async function (req, res) {
    let post_result = req.body;
    let sign_up_return = await sign_up(post_result.Name, post_result.Email, post_result.Password);
    if (sign_up_return) {
        res.send({
            token: sign_up_return
        });
    } else {
        res.send({ token: false });
    }
};

const logIn_save = async function (req, res) {
    let logIn_result = req.body;
    let log_in_return = await logIn(logIn_result.Email, logIn_result.Password);
    if (log_in_return) {
        res.send({
            token: log_in_return
        });
    } else {
        res.send({ token: false });
    }
};

const forGet_password = async function (req, res) {
    let email = req.body;
    let get_std = await find_email(email.Email);
    if (get_std) {
        let number1 = Math.floor(Math.random() * 4) + 1;
        let number2 = Math.floor(Math.random() * 4) + 1;
        let number3 = Math.floor(Math.random() * 4) + 1;
        let number4 = Math.floor(Math.random() * 4) + 1;
        number = number1 + '' + number2 + '' + number3 + '' + number4 + '';
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: '512brand786@gmail.com',
                pass: 'ftaq kpbs gbxl wiav'
            }
        });

        var mailOptions = {
            from: '512brand786@gmail.com',
            to: email.Email,
            subject: 'This is Email from your Teacher',
            text: `Your OTP is ${number}`
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
                res.send({
                    message: false
                });
            } else {
                console.log("Successfull!");
                console.log('Email sent: ' + info.response);
                res.send({
                    message: true
                });
            }
        });
    } else {
        res.send({
            message: "Error while Finding"
        })
    }
};

const otp_check = async function (req, res) {
    let check = req.body;
    let log_in_return = (() => {
        if (check.Num == number) {
            res.send({
                message: true
            });
        } else {
            res.send({ message: false });
        }
    })();
};

const change_pass = async function (req, res) {
    let password = req.body;
    let log_in_return = await change_password(password.Email, password.Pass);
    if (log_in_return) {
        res.send({
            message: true
        });
    } else {
        res.send({ message: false });
    }
};

module.exports = { signUp_save, logIn_save, forGet_password, otp_check, change_pass };
