const Express = require('express');
const router = Express.Router();
const validateJWT = require("../middleware/validate-jwt")
const {ListModel} = require('../models');


//Test
router.get('/testing', (req,res) =>{
    res.send('Testing')
});

// Create
router.post('/create', validateJWT, async (req, res) => {
    const {item, quantity, category} = req.body.list;
    const {id} = req.user;
    const itemEntry = {
        item,
        quantity,
        category,
        owner: id
    }
    try {
        const newList = await ListModel.create(itemEntry);
        res.status(200).json(newList);
    }
    catch(err){
        res.status(500).json({error:err})
    }
});

module.exports = router;