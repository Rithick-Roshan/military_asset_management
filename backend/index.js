const express = require('express');
const db =require('./src/util/db');
const application= require('./src/app');

const app=express();

app.use(express.json());
app.use(application);


app.get('/',(req,res)=>{
    res.send("hello world");
});

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});