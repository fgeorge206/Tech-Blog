const express = require('express');
const router = express.Router();
const { User,Post } = require("../models");

router.get("/",(req,res)=>{
    User.findAll().then(userData=>{
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

module.exports = router;