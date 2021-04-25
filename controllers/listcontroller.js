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

// My Lists
router.get('/view', validateJWT, async (req, res) => {
    let {id} = req.user;

    try{
        const userLists = await ListModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userLists)
    } catch(err){
        res.status(500).json({error:err})
    }
});


// Delete
router.delete("/delete/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const listId = req.params.id;
    try {
        const query = {
            where: {
                id: listId,
                owner: ownerId
            }
        };
        await ListModel.destroy(query);
        res.status(200).json({message: "List deleted"})
    } catch (err){
        res.status(500).json({error: err});
    }
})

// Update
router.put("/update/:entryId", validateJWT, async (req, res) => {
    const {item, quantity, category} = req.body.list;
    const listId = req.params.entryId;
    const userId = req.user.id;

    const query = {
        where: {
            id: listId,
            owner: userId
        }
    };
    const updatedList = {
        item: item,
        quantity: quantity,
        category: category,
    };
    try {
        const update = await ListModel.update(updatedList, query);
        res.status(200).json({update, message:("List Successfully Update")});
    } catch(err){
        res.status(500).json({error: err});
    }
});

module.exports = router;