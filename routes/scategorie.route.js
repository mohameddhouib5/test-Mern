const express=require("express");
const  router=express.Router();
const scategorie=require("../models/scategories");
//get all categories
router.get('/',async(req,res)=>{
    try{
    const cat = await scategorie.find({},null,{$sort:{"_id":-1}}).populate("categorieId");
    res.status(200).json(cat);
    }catch(error){
        res.status(404).json({message:"Error in fetching data"});
    }
})
//add a new category
router.post('/', async (req, res) => {
    const { nomscategorie, imagescat,categorieID} = req.body;
    const newSCategorie = new SCategorie({nomscategorie:nomscategorie,
    imagescat:imagescat,categorieID:categorieID })
    try {
    await newSCategorie.save();
    res.status(200).json(newSCategorie );
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
// chercher une sous catégorie
router.get('/:scategorieId',async(req, res)=>{
    try {
    const scat = await SCategorie.findById(req.params.scategorieId);
    res.status(200).json(scat);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    // modifier une s/catégorie
    router.put('/:scategorieId', async (req, res)=> {
    try {
    const scat1 = await SCategorie.findByIdAndUpdate(
    req.params.scategorieId,
    { $set: req.body },
    { new: true }
    );
    res.status(200).json(scat1);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    // Supprimer une s/catégorie
    router.delete('/:scategorieId', async (req, res)=> {
    const id = req.params.scategorieId;
    await SCategorie.findByIdAndDelete(id);
    res.json({ message: "sous categorie deleted successfully." });
    });
    // chercher une sous catégorie par cat
    router.get('/cat/:categorieID',async(req, res)=>{
    try {
    const scat = await SCategorie.find({ categorieID:
    req.params.categorieID}).exec();
    res.status(200).json(scat);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    // chercher un article par cat
router.get('/cat/:categorieID', async (req, res) => {
    try {
    // Recherche des sous-catégories correspondant à la catégorie donnée
    const sousCategories = await scategorie.find({ categorieID:
    req.params.categorieID }).exec();
    
    // Initialiser un tableau pour stocker les identifiants des sous-catégories trouvées
    
    const sousCategorieIDs = sousCategories.map(scategorie => scategorie._id);
    // Recherche des articles correspondant aux sous-catégories trouvées
    const articles = await article.find({ scategorieID: { $in:
    sousCategorieIDs } }).exec();
    res.status(200).json(articles);
    } catch (error) {
    res.status(404).json({ message: error.message });
    }
    });
    
    module.exports = router;