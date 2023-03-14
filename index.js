const express = require ('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const allRoutes = require('./controllers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3000;

const { User, Post } = require('./models');

const sess = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static('public'));

const hbs = exphbs.create({});
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use('/',allRoutes);


app.get("/sessions",(req,res)=>{
    res.json(req.session)
})
app.get("/secretclub",(req,res)=>{
    if(req.session.userId){
        return res.send(`welcome to the secret club, ${req.session.userUsername}`)
    } else {
        res.status(403).json({msg:"login first to join the club!"})
    }
})

sequelize.sync({ force: false }).then(function(){
    app.listen(PORT, function() {
        console.log('App listening on PORT ' + PORT);
    });
})