const express = require ('express');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

const { User, Post } = require('./models');

app.get("/",(req,res)=>{
    res.send("hello welcome to tech blog")
})
sequelize.sync({ force: true }).then(function(){
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
})