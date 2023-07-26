const express=require('express');
const mongoose=require('mongoose');
const router=express.Router();

mongoose.connect('mongodb+srv://lemon10swargiary:paranlemon@cluster0.c0ofab5.mongodb.net/lumos?retryWrites=true&w=majority', {useNewUrlParser: true}, {useUnifiedTopology:true});
const db =mongoose.connection;
db.on('error', (error)=>console.log(error));
db.once('open', ()=>console.log('Connected to the Database from router'));

const Quote =require('../models/quote');

router.get('/', async(req, res)=>{
    // const quotes= await Quote.find();
    // res.status(200).json(quotes);
    res.send('Hello world from the router server');
})

router.post('/', async (req,res)=>{

    const quote=new Quote({
        author:req.body.author,
        quote:req.body.quote
    })
    try{
        const newQuote=await quote.save().then(()=>{
            res.status(201).json({message:"quote uploaded sucessfully"});
        });
        // res.status(201).json(newQuote);
    }catch(err){
        res.status(400).json({message:err.message})
    }
})

module.exports=router;