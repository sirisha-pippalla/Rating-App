const mongoose = require("mongoose");
const express = require("express");
const filmData = require('./model');

const app =  express();


app.use(express.json());

app.use((req, res, next)=>{
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods", "PUT, POST, GET,DELETE")

    next();
})

//route
app.get('/', (req, res)=>{
    res.send("<h1>its backend</h1>")
})

//create entry
app.post('/film', async(req, res)=>{
    console.log(typeof req.body)
    try{
        const addfilm = await filmData.create(req.body);
        res.status(200).json(addfilm)
    }
    catch(err){
        console.log(err);
        res.status(404).json({message:err.message})
    }
});

app.get('/filmslist', async(req, res)=>{
    // console.log('test')
    try{
        const filmlist = await filmData.find();
        
        res.status(200).json(filmlist)
    }catch(err){
        console.log(err.message);
        res.status(404).json({message:err.message})
    }
});

app.put('/updatelist', async(req, res)=>{
    try {
        const {id} = req.params;
        const data = await filmData.findByIdAndUpdate(id, req.body);
        if(!data){
            res.status(400).json({message:"film is not found"})
        };
        res.status(200).json({
            message:"film updated successfully",
            data
        })
    } catch (error) {
        console.log(err.message);
        res.status(404).json({message:error.message})
    }
})


mongoose.connect('mongodb+srv://sireesha:sireesha@cluster0.5htup6m.mongodb.net/?retryWrites=true&w=majority')
.then(()=>console.log("DB connected successfully"))
.catch(err => console.log(err))




app.listen(8080, ()=>console.log("App listen at 8080"))