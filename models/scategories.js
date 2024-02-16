const mongoose=require('mongoose');
const categorie=require("./categorie");
const scategorieSchema=mongoose.Schema({
    nomscategorie:{type:String,required:true},
    imagescat:{type:String,required:true},
    categorieID:{type:mongoose.Schema.Types.ObjectID,ref:categorie}
})
module.exports=mongoose.model("scategorie",scategorieSchema);