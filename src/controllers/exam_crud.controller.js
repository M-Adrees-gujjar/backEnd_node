const { add_exams, find_exams, delete_exams, update_exams, addExamData } = require("../models/exam_crud.model");
const {getExamAddition} = require("../models/std_server.model");
const jwt = require("jsonwebtoken");

const add_exam = async function (req, res) {
  let std = req.body;
  let get_std = await add_exams(std.exam, std.time, std.students, std.token);
  if (get_std) {
    res.send({
      message: get_std,
    });
  } else {
    res.send({
      message: "Error while Added",
    });
  }
};

const find_exam = async function (req, res) {
  const decoded = req.user;
  let get_std = await find_exams(decoded);
  if (get_std) {
    res.send({
      success: true,
      response: get_std,
    });
  } else {
    res.send({
      message: "Error while Finding",
    });
  }
};

async function delete_exam(req, res) {
  let std = req.body;
  let del = await delete_exams(std.element);
  if (del) {
    res.send({
      success: del,
      message: "SuccessFully Deleted",
    });
  } else {
    res.send({
      success: del,
      message: "Error Deleted",
    });
  }
}

async function update_exam(req, res) {
  let std = req.body;
  let del = await update_exams(
    std.id,
    std.exam,
    std.time,
    std.students
  );
  if (del) {
    res.send({
      message: "SuccessFully Updated",
    });
  } else {
    res.send({
      message: "Error Updated",
    });
  }
}

async function addTestData(req, res) {
  const email = req.user.email;
  let std = req.body;
  let del = await addExamData(
    std.id,
    std.testData
  );
  let del1 = await getExamAddition(email,std.testData,std.test);
  if (del1) {
    res.send({
      success : true,
      message: "SuccessFully Updated",
      response1 : del1,
      response2 : del
    });
  } else {
    res.send({
      message: "Error Updated",
    });
  }
}

module.exports = { add_exam, find_exam, delete_exam, update_exam ,addTestData };
