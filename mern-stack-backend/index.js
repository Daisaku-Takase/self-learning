// index.js

const express = require("express")
//import express from 'express'
const app = express()
app.use(express.urlencoded({ extended: true}))
app.use(express.json())
const jwt = require("jsonwebtoken")
const auth = require("./utils/auth")
const connectDB = require("./utils/database")
const { ItemModel, UserModel } = require("./utils/schemaModels")

// ITEM functions
// Create Item
app.post("/item/create", auth, async(req, res) => {
    try{
        await connectDB()
        ItemModel.create(req.body)
        return res.status(200).json({message: "Create item Success!"})
    }catch(err){
        return res.status(400).json({message: "Create item Failed."})
    }
})

// Read All Items
app.get("/", async(req, res) => {
    try{
        await connectDB()
        const allItems = await ItemModel.find()
        return res.status(200).json({message: "Read All Items Success!", allItems: allItems})
    }catch(err){
        return res.status(400).json({message: "Read All Items Failed."})
    }
})

// Read Single Item
app.get("/item/:id", async(req, res) => {
    try{
        await connectDB()
        const singleItem = await ItemModel.findById(req.params.id)
        return res.status(200).json({message: "Read Single Item Success!", singleItem:singleItem})
    }catch(err){
        return res.status(400).json({message: "Read Single Item Failed."})
    }
})

// Update Item
app.put("/item/update/:id", auth, async(req, res) => {
    try{
        await connectDB()
        const singleItem = await ItemModel.findById(req.params.id)
        if(singleItem.email === req.body.email){
            await ItemModel.updateOne({_id: req.params.id}, req.body)
            return res.status(200).json({message: "Update Item Success!"})
        }else{
            //throw new Error()
        }        
    }catch(err){
        return res.status(400).json({message: "Update Item Failed."})
    }
})

// Delete Item
app.delete("/item/delete/:id", auth, async(req, res) => {
    try{
        await connectDB()
        const singleItem = await ItemModel.findById(req.params.id)
        if(singleItem.email === req,body.email){
            await ItemModel.deleteOne({_id: req.params.id})
            return res.status(200).json({message: "Delete Item Success!"})
        }else{
            //throw new Error()
        }
    }catch(err){
        return res.status(400).json({message: "Delete Item Failed."})
    }
})

// USER functions
// Register User
app.post("/user/register", async(req, res) => {
    try{
        await connectDB()
        await UserModel.create(req.body)
        return res.status(200).json({message: "Register User Success!"})
    }catch(err){
        return res.status(400).json({message: "Register User Failed."})
    }
})

// Login User
const secret_key = "mern-market"

app.post("/user/login", async(req, res) => {
    try{
        await connectDB()
        const savedUserData = await UserModel.findOne({email: req.body.email})
        if(savedUserData){
            // userData exist
            if(req.body.password === savedUserData.password){
                // password correct
                const payload = {
                    email: req.body.email,
                }
                const token = jwt.sign(payload, secret_key, {expiresIn: "23h"})
                console.log(token)
                return res.status(200).json({message: "Login Success!", token: token})
            }else{
                // password incorrect
                return res.status(400).json({message: "Login Failed: Password is wrong."})
            }
        }else{
            // userData does not exist
            return res.status(400).json({message: "Login Failed: Please register user."})
        }
    }catch(err){
        return res.status(400).json({message: "Login Failed."})
    }
    })

app.listen(5050, () => {
    console.log("Listening on localhost port 5050")
})

// mongodb+srv://yarimasuka:<password>@cluster0.2jwlpgw.mongodb.net/?retryWrites=true&w=majority
