const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { default: test } = require("node:test");

const examSchema = new mongoose.Schema({
    exam: String,
    time: {
        hour: String,
        minute: String
    },
    students: String,
    tch_email: String,
    testData: Array,

});

const userExam = new mongoose.model("userExam", examSchema);

const add_exams = async (exam, time, students, token) => {
    try {
        const secret_key = process.env.SECRET_KEY;
        jwt.verify(token, secret_key, async (err, decoded) => {
            if (err) {
                console.log("Error======", err);
            } else {
                try {
                    const data = await userExam({
                        exam: exam,
                        time: {
                            hour: time.hour,
                            minute: time.minute
                        },
                        students: students,
                        tch_email: decoded.email,
                        testData: []
                    });
                    await data.save();
                    return true;
                } catch (err) {
                    return false;
                }
            }
        });
        return true;
    } catch (error) {
        return false;
    }
};

const find_exams = async (token) => {
    try {
        const data = await userExam.find({ tch_email: token.email });
        return data;
    } catch (err) {
        return false;
    }
};

const delete_exams = async function (id) {
    try {
        await userExam.findOneAndDelete({ _id: id });
        return true;
    } catch (error) {
        console.log("Error While Fetching...");
    }
};

const update_exams = async function (id, exam, time, students) {
    try {
        await userExam.findOneAndUpdate(
            { _id: id },
            {
                exam: exam,
                time: {
                    hour: time.hour,
                    minute: time.minute
                },
                students: students,
            }
        );
        return true;
    } catch (error) {
        console.log("Error While Fetching...");
    }
};

const addExamData = async function (id, test) {
    try {
        await userExam.findOneAndUpdate(
            { _id: id },
            {
                testData: test
            }
        );
        return true;
    } catch (error) {
        console.log("Error While Fetching...");
    }
};

module.exports = { add_exams, find_exams, delete_exams, update_exams, addExamData, userExam };
