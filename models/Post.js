const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Post extends Model {}

Post.init({
    post: {
        type: DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[1,240]
        }
    }
},{
    sequelize
});

module.exports=Post