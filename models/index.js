const User = require("./User");
const Post = require("./Post");

Post.belongsTo(User,{
    onDelete:"CASCADE"
})
User.hasMany(Post,{
    onDelete:"CASCADE"
})


module.exports = {
    User,
    Post
}