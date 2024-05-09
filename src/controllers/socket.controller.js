const { student_post, student_display, like_DB, std_post, friend_DB } = require('../models/student_post.model');
const { commit_add, commit_post } = require('../models/commit.model');

function handle_like(socket, io) {
    socket.on('like', async ({ token, value }) => {
        let like_res = await like_DB(token, value);
        io.emit('like', {
            like_count: like_res.like_count,
            like_id: like_res._id
        });
    });
}

function handle_commit(socket, io) {
    socket.on('commit', async ({ element, commit }) => {
        let data = await commit_add(element, commit);
        io.emit('commit_response', data);
    });
}

function handle_friend(socket, io) {
    socket.on('add_friend', async ({ token, value }) => {
        console.log("token---", token);
        let like_res = await friend_DB(token, value);
        // io.emit('add_friend', {
        //     like_count: like_res.like_count,
        //     like_id: like_res._id
        // });
    });
}

module.exports = { handle_like, handle_commit, handle_friend };