const express = require("express");
require('dotenv').config();
const { Router } = require("express");
const { CartModel } = require("../models/cart.model");
const cartRoute = Router();

cartRoute.get("/",async(req,res)=>{
    const posts = await CartModel.find()
    res.send(posts);
})

cartRoute.get("/get/:id",async(req,res)=>{
    const id = req.params.id;
    const posts = await CartModel.find({"userID":id});
    res.send(posts);
})

cartRoute.post("/create",async(req,res)=>{
    const payload = req.body;
    try{
        const post = await CartModel.insertMany(payload);
        // await post.save();
        res.send(post);
    }
    catch(err){
        console.log(err);
        res.send("err");
    }
})

cartRoute.patch("/update/:id",async(req,res)=>{
    const payload = req.body;
    const id = req.params.id;
    const note = await CartModel.findOne({"_id":id});
    console.log(note);
    const userID_in_note = note.userID;

    const userID_making_req = req.body.userID;
    try{
        if(userID_making_req!==userID_in_note){
            // res.send({"msg":"you are not authorized"});
            await CartModel.findByIdAndUpdate({"_id":id},payload);
            res.send("Updated the product")
    
        }
        else{
            await CartModel.findByIdAndUpdate({"_id":id},payload);
            res.send("Updated the product")
        }
    }
    catch(err){
        console.log(err);
        res.status(404);
        res.send({error:"note doesn't exsist"})
    }
})

cartRoute.delete("/delete/:id",async(req,res)=>{
    const payload = req.body;
    const id = req.params.id;
    const note = await CartModel.findOne({"_id":id});
    const userID_in_note = note.userID;
    const userID_making_req = req.body.userID;
    try{
        if(userID_making_req!==userID_in_note){
            // res.send({"msg":"you are not authorized"});
            await CartModel.findByIdAndDelete({"_id":id});
            res.send("product removed");
        }
        else{
            await CartModel.findByIdAndDelete({"_id":id});
            res.send("product removed");
        }
    }
    catch(err){
        console.log(err);
        res.status(404);
        res.send({error:"product doesn't exsist"})
    }
})

module.exports={
    cartRoute
}