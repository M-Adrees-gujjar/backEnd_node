const mongoose = require("mongoose");
const { add_exams, find_exams, delete_exams, update_exams, addExamData , userExam} = require("../models/exam_crud.model");

const getExams = async () => {
  try {
    const exams = await userExam.find({}, { testData: 1, exam: 1, time: 1, students: 1 });
    return exams;
  } catch (error) {
    console.error("Error fetching exams:", error);
    return null;
  }
};

const examSchema = new mongoose.Schema({
    exam: Array 
});

const getExamModel = new mongoose.model("getExamModel", examSchema);

const findSavedExam = async (exam) => {
    try {
        const data = await getExamModel({
            exam: exam,
        });
        await data.save();
        return data;
    } catch (err) {
        return false;
    }
};

module.exports = {getExams,findSavedExam};
