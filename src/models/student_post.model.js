const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const stdPostSchema = new mongoose.Schema({
    std_email: String,
    caption: String,
    img_url: String,
    like_count: String,
    like_email: [String]
})

const std_post = new mongoose.model("std_post", stdPostSchema);

const student_post = async (token, caption, img_url) => {
    try {
        const secret_key = process.env.SECRET_KEY;
        return jwt.verify(token, secret_key, async (err, decoded) => {
            if (err) {
                console.log("Error======", err);
                return false
            } else {
                try {
                    const data = await std_post({
                        std_email: decoded.email,
                        caption: caption,
                        img_url: img_url,
                        like_count: 0,
                        like_email: []
                    });
                    await data.save();
                    return true;
                } catch (err) {
                    return false;
                }
            }
        });
    } catch (error) {
        console.log('catch---reerr---', error);
        return false
    }
};

async function student_display() {
    try {
        const data = await std_post.find();
        return data
    } catch (err) {
        return false;
    }
}

async function like_DB(token, like_id) {
    try {
        const secret_key = process.env.SECRET_KEY;
        let jst_res = jwt.verify(token, secret_key, async (err, decoded) => {
            if (err) {
                console.log("Error======", err);
            } else {
                try {
                    const like_data = await std_post.findOne({ "_id": like_id })
                    if (like_data.like_email.includes(decoded.email)) {
                        const like_data_count = --like_data.like_count;
                        const data = await std_post.findOneAndUpdate({ "_id": like_id }, {
                            $set: { "like_count": like_data_count },
                            $pull: { "like_email": decoded.email }
                        });
                        const data1 = await std_post.findOne({ "_id": like_id });
                        return data1;
                    } else {
                        const like_data_count = ++like_data.like_count;
                        const data = await std_post.findOneAndUpdate({ "_id": like_id }, {
                            $set: { "like_count": like_data_count },
                            $push: { "like_email": decoded.email }
                        });
                        const data1 = await std_post.findOne({ "_id": like_id });
                        return data1;
                    }
                } catch (err) {
                    return false;
                }
            }
        });

        if (jst_res) {
            return jst_res
        } else {
            return false
        }
    } catch (err) {
        return false;
    }
}

async function friend_DB(token, like_id) {
    try {
        const secret_key = process.env.SECRET_KEY;
        let jst_res = jwt.verify(token, secret_key, async (err, decoded) => {
            if (err) {
                console.log("Error======", err);
            } else {
                try {
                    console.log("jwt is valid");

                } catch (err) {
                    return false;
                }
            }
        });

        if (jst_res) {
            return jst_res
        } else {
            return false
        }
    } catch (err) {
        return false;
    }
}

module.exports = { student_post, student_display, like_DB, std_post, friend_DB };

