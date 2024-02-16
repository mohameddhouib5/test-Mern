var express=require("express");
var router= express.Router();
const categorie=require("../models/categorie");
//recuperer la categorie
router.get('/',async(req,res)=>{
    try {
        const cat = await categorie.find({}, null, {sort: {'_id': -1}})
        
        10
        res.status(200).json(cat);
        } catch (error) {
        res.status(404).json({ message: error.message });
        }
})
//ajouter une catégorie
router.post('/',async(req,res)=>{
    const{nomcategorie,imagecategorie}=req.body;
    const newCategorie=new categorie({nomcategorie:nomcategorie,
    imagecategorie:imagecategorie});
    try{
        await newCategorie.save();
        res.status(200).json(newCategorie);
    }catch(error){
       res.status(404).json({message:error.message})
    }

});
//recuperer les categories par id 
router.get('/:categorieID',async(req,res)=>{
try{
    const cat =await categorie.findById(req.params.categorieID);
    res.status(200).json(cat);

}catch(error){res.status(404).json({message:error.message})}
});
//modifier
router.put('/categorieId',async(req,res)=>{
    try{ 
        const cat=await categorie.findByIdandUpdate(req.params.categorieID,
            {$set:req.body},
            {new:true}
            );
            res.status(200).json(cat);

    }catch(error){
        res.status(404).json({message:error.message});
    }
        
})
//supprimer
router.delete('/categorieID',async(req,res)=>{
   try{
    const cat =await categorie.findbyIdAndDelete(req.params.categorieID,).execute();
    res.status(200).json("deleted with success");
   }catch(error){
    res.status(404).json("error",error)
   }

})
module.exports=router;