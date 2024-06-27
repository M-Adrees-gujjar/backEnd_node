const mongoose = require('mongoose');

const commitSchema = new mongoose.Schema({
    commit_id: String,
    commit: String
})

const commit_post = new mongoose.model("commit_post", commitSchema);

async function commit_add(id, cmmt) {
    let data = await commit_post({
        commit_id: id,
        commit: cmmt
    });
    await data.save();
    let data1 = await commit_post.find({ 'commit_id': id });
    return data1;
}

async function allCommits(id) {
    let data1 = await commit_post.find({ 'commit_id': id });
    return data1;
}

module.exports = { commit_add, commit_post , allCommits};
