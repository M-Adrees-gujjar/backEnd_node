const {getExamAddition} = require("../models/std_server.model");

async function getExam(req, res) {
  const email = req.user;
  const result = req.body;
  console.log("Exm --- ",result , "---eml ---",email);
  // try {
  //   const data = await getExamAddition()
  //   res.send({
  //     success: true,
  //     message: "SuccessFully Add",
  //   });
  // } catch (error) {
  //   console.log("getExam ERROR --- ", error);
  // }
}

module.exports = getExam
