const { add_std, find_std, delete_std_data, update_std_data, std_logIn } = require('../models/std_server.model');

const std_lgIn = async function (req, res) {
    let logIn_result = req.body;
    let log_in_return = await std_logIn(logIn_result.Email, logIn_result.Password);
    if (log_in_return) {
        res.send({
            token: log_in_return
        });
    } else {
        res.send({ token: false });
    }
};

module.exports = std_lgIn;