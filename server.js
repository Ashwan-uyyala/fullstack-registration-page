const express=require("express");
const mongoose=require("mongoose");
const path= require("path");

const port =3000
const app=express();
app.use(express.static(__dirname))
app.use(express.urlencoded({extended:true}))


const mongoURI = "#give mongodb connection code";

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Connected to MongoDB Cloud!");
}).catch(err => {
    console.error("MongoDB Connection Error:", err);
});

const userSchema=new mongoose.Schema({
    name:String,
    age:String,
    branch:String,
    college:String
})

const Users=mongoose.model("data",userSchema)




app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,'index.html'))
});

app.post("/post", async(req,res)=>{
    const {name, age, branch,college}=req.body
    const user=new Users({
        name,
        age,
        branch,
        college
    })
    await user.save()
    console.log(user)
    res.send("form submitted successfully!!")
})

app.listen(port,()=>{
    console.log("Server Running!");
})
