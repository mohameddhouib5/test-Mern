const mongoose=require("mongoose");
const Scategorie=require("./scategories");
const articleSchema=mongoose.Schema({
    reference:{type:String,required:true},
    designation:{type:String, required:true},
    prix:{type: String , required : true },
    marque:{type:String,required:true},
    qtestock:{type:Number,required:false},
    imageart:{ type: String, required: false },
scategorieID: {type:mongoose.Schema.Types.ObjectId,
ref:Scategorie}
})
module.exports=mongoose.model('article',articleSchema);