const Express = require('express');
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt")
const {SearchModel} = require('../models');

// Save Search
router.post('/create', validateJWT, async (req, res) => {
    const {label, ingredients} = req.body.search;
    const {id} = req.user;
    const itemEntry = {
        label,
        ingredients,
        owner: id
    }
    try {
        const newSearch = await SearchModel.create(itemEntry);
        res.status(200).json(newSearch);
    }
    catch(err){
        res.status(500).json({error:err})
    }
});

// Saved Lists
router.get('/view', validateJWT, async (req, res) => {
    let {id} = req.user;

    try{
        const userSearch = await SearchModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userSearch)
    } catch(err){
        res.status(500).json({error:err})
    }
});

// Delete Saved Item
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const searchId = req.params.id;
    try {
        const query = {
            where: {
                id: searchId,
                owner: ownerId
            }
        };
        await SearchModel.destroy(query);
        res.status(200).json({message: "Saved search deleted"})
    } catch (err){
        res.status(500).json({error: err});
    }
});



module.exports = router;