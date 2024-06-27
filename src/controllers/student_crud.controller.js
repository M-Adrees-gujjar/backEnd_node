const {
  add_std,
  find_std,
  delete_std_data,
  update_std_data,
  stdGetExamModel,
  stdAddExamsModel
} = require("../models/std_server.model");

const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const add_student = async function (req, res) {
  let std = req.body;
  let get_std = await add_std(
    std.name,
    std.email,
    std.password,
    std.token
  );
  if (get_std) {
    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "512brand786@gmail.com",
        pass: "ftaq kpbs gbxl wiav",
      },
    });

    var mailOptions = {
      from: "512brand786@gmail.com",
      to: std.email,
      subject: "This is Email from your Teacher",
      text: `Your Password is ${std.password}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Successfull!");
        console.log("Email sent: " + info.response);
      }
    });
    res.send({
      message: get_std,
    });
  } else {
    res.send({
      message: "Error while Added",
    });
  }
};

const find_student = async function (req, res) {
  const decoded = req.user;
  let get_std = await find_std(decoded);
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

async function delete_student(req, res) {
  let std = req.body;
  let del = await delete_std_data(std.element);
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

async function update_student(req, res) {
  let std = req.body;
  let del = await update_std_data(
    std.id,
    std.name,
    std.email,
    std.password,
    std.exam
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

async function stdGetExam(req, res) {
  let email = req.user.email;
  try {
    const data = await stdGetExamModel(email);
    if (data) {
      res.send({
        success : true,
        response : data
      })
    } else {
      res.send({
        success : false,
        response : "Did not Found"
      })
    }
  } catch (error) {
    console.log("Error while Fetching!!!");
  }
}

async function stdAddExams(req, res) {
  let email = req.user.email;
  let result = req.body;
  try {
    const data = await stdAddExamsModel(email,result.id,result.data);
    if (data) {
      res.send({
        success : true,
        response : data
      })
    } else {
      res.send({
        success : false,
        response : "Did not Found"
      })
    }
  } catch (error) {
    console.log("Error while Fetching!!!");
  }
}

module.exports = { add_student, find_student, delete_student, update_student, stdGetExam , stdAddExams};
