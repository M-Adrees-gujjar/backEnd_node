const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const stdSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  exam: Array,
  tch_email: String,
  friends: [String],
});

const std_user = new mongoose.model("std_user", stdSchema);

const add_std = async (name, email, password, token) => {
  try {
    const secret_key = process.env.SECRET_KEY;
    jwt.verify(token, secret_key, async (err, decoded) => {
      if (err) {
        console.log("Error======", err);
      } else {
        try {
          const data = await std_user({
            name: name,
            email: email,
            password: password,
            tch_email: decoded.email,
            friends: [],
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

const find_std = async (token) => {
  try {
    const data = await std_user.find({ tch_email: token.email });
    return data;
  } catch (err) {
    return false;
  }
};

const delete_std_data = async function (id) {
  try {
    await std_user.findOneAndDelete({ _id: id });
    return true;
  } catch (error) {
    console.log("Error While Fetching...");
  }
};

const update_std_data = async function (id, name, email, password, exam) {
  try {
    await std_user.findOneAndUpdate(
      { _id: id },
      {
        name: name,
        email: email,
        password: password,
        exam: exam,
      }
    );
    return true;
  } catch (error) {
    console.log("Error While Fetching...");
  }
};

const std_logIn = async (eml, passwd) => {
  let find_login = await std_user.find({ email: eml, password: passwd });
  if (find_login.length == 0) {
    return false;
  } else {
    let find_token = await std_user.findOne({ email: eml });
    const token = jwt.sign(
      {
        email: find_token.email,
      },
      "your-secret-key"
    );
    return token;
  }
};

const getExamAddition = async function (email, examData, test) {
  try {
    await std_user.updateMany(
      { tch_email: email },
      {
        $push: {
          exam: {
            test: test,
            examData: examData,
          },
        },
      }
    );
    const data = await std_user.find();
    return data;
  } catch (error) {
    console.error("Error While Updating:", error); // Log the actual error
    throw error; // Re-throw the error to handle it outside if needed
  }
};

async function stdGetExamModel(email) {
  try {
    let findStd = await std_user.findOne({ email: email });
    console.log("FindStd ---- ", findStd);
    return findStd;
  } catch (error) {
    return error;
  }
}

async function stdAddExamsModel(email, examId, submissionData) {
  try {
    let findStd = await std_user.findOne({ email: email });
    let exam = findStd.exam;

    const filterResult = exam.map(element => {
      if (element.test._id == examId) {
        element.test.testData = submissionData;
        return element
      } else {
        return element
      }
    })

    console.log("Filter Result ----- ", filterResult);
    let StdFinalResponse = await std_user.findOneAndUpdate(
      { email: email },
      {
        exam: filterResult
      }
    );
    return StdFinalResponse;
  } catch (error) {
    return error;
  }
}

module.exports = {
  add_std,
  find_std,
  delete_std_data,
  update_std_data,
  std_logIn,
  getExamAddition,
  stdGetExamModel,
  stdAddExamsModel
};
