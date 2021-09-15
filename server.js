const express = require("express");

require('dotenv').config({ path: "./config/.env"});

const connectDB = require("./config/connectDB")
connectDB()

const app = express();

const PORT =process.env.PORt;
app.listen(PORT, ()=>{
    console.log(`App running on PORT : ${PORT}`)
});

const User = require("./models/User");
app.use(express.json())

// get all users
app.get('/users',(req,res)=>{
    User.find()
        .then((User)=> res.status(200).send(User)).catch((err)=>res.status(400).send({ msg: "ERROR GET USERS" }));
 
});

// add user
 app.post('/add_user',(req,res)=>{
    const{name,lastName,email,phone}=req.body;
    const newUser=new User({name,lastName,email,phone});
    newUser.save()
           .then((User)=>res.send(User)).then(()=>console.log('user added succesefully'))
           .catch((err)=>res.status(400).send({msg:"ERROR ADD"}))
});


// edit user by ID
app.put("/users/:userID",(req,res)=>{
    const id=req.params.userID;
    User.findByIdAndUpdate(id,req.body,{new:true})
        .then((User)=> {
            if (!User) {
              return  res.status(400).send({msg: "user not found"});
            }
            res.status(200).send(User);
        })
        .catch((err)=>res.status(400).send({msg:"ERROR"}));
});
 

// delete user by ID
app.delete("/users/:userID",(req,res)=>{
    const id=req.params.userID;
    console.log(id);
    User.findByIdAndDelete(id)
        .then(((User)=>{
            if (!User) {
                return res.status(404).send({ msg: "User Not Found " });
            }
            res.status(200).send({msg:"User was deleteed"})
        }))
        .catch((err)=>res.status(400).send({msg:"ERROR"}));
});




