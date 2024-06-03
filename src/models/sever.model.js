const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const signUpSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    password: String,
    confirm_password: String,
    img_path: String
})

const user = new mongoose.model("user", signUpSchema);

const sign_up = async (name, phone, email, password, confirm_password) => {
    if (password == confirm_password) {
        let val = await user.findOne({ email: email });
        if (val) {
            return false;

        } else {
            const data = await user({
                name: name,
                phone: phone,
                email: email,
                password: password,
                confirm_password: confirm_password
            });
            await data.save();
            return true;
        }
    } else {
        return false;
    }
};

const logIn = async (eml, passwd) => {
    let find_login = await user.find({ email: eml, password: passwd });
    if (find_login.length == 0) {
        return false
    } else {
        let find_token = await user.findOne({ email: eml });
        const token = jwt.sign(
            {
                email: find_token.email
            },
            process.env.SECRET_KEY,
            {
                expiresIn: '1h',
            }
        );

        return token;
    }
};

const find_email = async (eml) => {
    let find_login = await user.find({ email: eml, });
    if (find_login.length == 0) {
        return false
    } else {
        return true;
    }
};

const change_password = async (eml, pass) => {
    let find_login = await user.findOneAndUpdate({ email: eml }, { password: pass });
    if (find_login.length == 0) {
        return false
    } else {
        return true;
    }
};


module.exports = { sign_up, logIn, find_email, change_password };
