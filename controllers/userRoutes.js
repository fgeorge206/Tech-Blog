const express = require('express');
const router = express.Router();
const { User,Post } = require("../models");
const bcrypt = require("bcrypt")

router.get("/",(req,res)=>{
    User.findAll().then(userData=>{
        res.json(userData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
})

router.get("/logout",(req,res)=>{
    req.session.destroy();
    res.send("logged out")
})

router.get("/:id",(req,res)=>{
    User.findByPk(req.params.id,{
        include:[Post]
    }).then(userData=>{
        res.json(userData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
})

router.post("/",(req,res)=>{
    console.log(req.body);
    User.create({
        username:req.body.username,
        password:req.body.password
    }).then(userData=>{
        res.json(userData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
})

router.post("/login",(req,res)=>{
    User.findOne({
        where:{
            username:req.body.username
        }
    }).then(userData=>{
        if(!userData){
            return res.status(401).json({msg:"incorrect username or password"})
        } else {
            if(bcrypt.compareSync(req.body.password,userData.password)){
                req.session.userId = userData.id;
                req.session.userUsername = userData.username;
                return res.json (userData)
            } else {
                return res.status(401).json({msg:"incorrect username or password"})
            }
        }
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
})

module.exports = router;