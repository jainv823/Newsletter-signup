const express = require("express");
const dotenv = require("dotenv").config();
const bodyParser = require("body-parser");
const port = process.env.PORT

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){
    res.send("Hello World");
});

app.post("/",function(req,res){

})

app.listen(port,function() {console.log(`Server is running on port ${port}`)});
