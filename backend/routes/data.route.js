const express = require("express");
require('dotenv').config();
const { Router } = require("express");
const { DataModel } = require("../models/data.model");
const dataRoute = Router();

dataRoute.get("/",async(req,res)=>{
    const posts = await DataModel.find()
    res.send(posts);
})

dataRoute.post("/create",async(req,res)=>{
    const payload = req.body;
    try{
        const post = await DataModel.insertMany(payload);
        // await post.save();
        res.send(post);
    }
    catch(err){
        console.log(err);
        res.send("err");
    }
})

dataRoute.patch("/update/:id",async(req,res)=>{
    const payload = req.body;
    const id = req.params.id;
    const note = await DataModel.findOne({"_id":id});
    console.log(note);
    const userID_in_note = note.userID;

    const userID_making_req = req.body.userID;
    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"you are not authorized"});
        }
        else{
            await DataModel.findByIdAndUpdate({"_id":id},payload);
            res.send("Updated the note")
        }
    }
    catch(err){
        console.log(err);
        res.status(404);
        res.send({error:"note doesn't exsist"})
    }
})

dataRoute.delete("/delete/:id",async(req,res)=>{
    const payload = req.body;
    const id = req.params.id;
    const note = await DataModel.findOne({"_id":id});
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID;
    try{
        if(userID_making_req!==userID_in_note){
            res.send({"msg":"you are not authorized"});
        }
        else{
            await DataModel.findByIdAndDelete({"_id":id});
            res.send("todo deleted");
        }
    }
    catch(err){
        console.log(err);
        res.status(404);
        res.send({error:"todo doesn't exsist"})
    }
})

module.exports={
    dataRoute
}