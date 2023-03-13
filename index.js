const express = require ('express');
const allRoutes = require('./controllers');

const sequelize = require('./config/connection');

const app = express();
const PORT = process.env.PORT || 3000;

const { User, Post } = require('./models');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(allRoutes);
app.get("/",(req,res)=>{
    res.send("hello welcome to tech blog")
})
sequelize.sync({ force: false }).then(function(){
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
})