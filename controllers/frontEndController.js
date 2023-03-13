const express = require('express');
const router = express.Router();
const {Post,User} = require('../models');

router.get("/",(req,res)=>{
    Post.findAll({
        include:[User]
    }).then(postData=>{
        console.log(postData)
        const hbsPosts = postData.map(post=>post.toJSON())
        console.log('==============================')
        console.log(hbsPosts)
        res.render("home",{
            allPosts:hbsPosts
        })
    })
})
router.get("/login",(req,res)=>{
    res.render("login")
})
router.get("/signup",(req,res)=>{
    res.render("signup")
})
router.get("/profile",(req,res)=>{
    res.render("profile")
})
module.exports = router;