const { response } = require("express");
const mongoose = require("mongoose");
// const jwt = require('jsonwebtoken');

const examSchema = new mongoose.Schema({
  subjectName: String,
  teacherEmail: String,
  exam: Array,
});

const examModal = new mongoose.model("examModal", examSchema);

async function examSubmit(subjectName, teacherEmail, exam) {
  try {
    const data = await examModal({
      subjectName: subjectName,
      teacherEmail: teacherEmail,
      exam: exam,
    });
    let resData = await data.save();
    return {
      success: true,
      response: resData,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
}

async function examDisplay(teacherEmail) {
  try {
    const data = await examModal.find({
      teacherEmail: teacherEmail
    })
    return {
      success: true,
      response: data,
    };
  } catch (err) {
    return {
      success: false,
    };
  }
}

module.exports = { examSubmit, examDisplay };
