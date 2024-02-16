const express=require("express");
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');
const categorieRouter=require("./routes/categorie.route")
const scategorieRouter=require("./routes/scategorie.route");
const articleRouter=require("./routes/article.route")
const app=express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use('/api/categorie',categorieRouter);
app.use('/api/scategorie',scategorieRouter)
app.use("/api/article",articleRouter);
mongoose.connect(process.env.DATABASE)
.then(()=>{console.log("Database Successfully Connected");})
.catch((error)=>{console.log("Error Connecting to Database : ", error);
process.exit();
});
app.get("/",(req,res)=>{
    res.send("bonjour");
});
app.listen(process.env.PORT,()=>{
    console.log(`Server is listening on port${process.env.PORT}`);

})
module.exports=app; 