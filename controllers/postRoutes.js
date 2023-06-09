const express = require('express');
const router = express.Router();
const { User,Post } = require("../models");

router.get("/",(req,res)=>{
    Post.findAll().then(postData=>{
        res.json(postData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
})
router.get("/:id",(req,res)=>{
    Post.findByPk(req.params.id,{
        include:[User]
    }).then(postData=>{
        res.json(postData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
})
router.post("/",(req,res)=>{
    if(!req.session.userId){
        return res.status(403).json({msg:"login first post"})
    }
    console.log(req.body);
    Post.create({
        title:req.body.title,
        post:req.body.post,
        UserId:req.session.userId
    }).then(postData=>{
        res.json(postData)
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh noes!",err})
    })
})

router.delete("/:id",(req,res)=>{
    if(!req.session.userId){
        return res.status(403).json({msg:"login first post"})
    }
    console.log(req.body);
    Chirp.findByPk(req.params.id).then(postData=>{
        if(!postData){
            return res.status(404).json({msg:"no such chirp"})
        } else if(postData.UserId!== req.session.userId){
            return res.status(403).json({msg:"not your chirp!"})
        }
        Chirp.destroy({
            where:{
            id:req.params.id,
        }
        }).then(postData=>{
            res.json(postData)
        }).catch(err=>{
            console.log(err);
            res.status(500).json({msg:"oh noes!",err})
        })
    }).catch(err=>{
            console.log(err);
            res.status(500).json({msg:"oh noes!",err})
    })
})

module.exports = router;