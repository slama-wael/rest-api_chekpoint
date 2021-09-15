  
const mongoose =require("mongoose");


function connectDB() {
    const opts={
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    mongoose.connect(process.env.MONGO_URL,opts).then(()=>console.log("Database Connected succesfully"))
        .catch((err)=>console.error('Database can not connect succesfully'));
}



module.exports=connectDB;