const { Router } = require("express");
const router = Router();
const RoutFunc = require('./Controllers/rankcontroller')

//RANK BY USER
router.get('/:customer_id',async(req,res)=>{
    const { customer_id } = req.params;
    try {
        return res.status(200).json(await RoutFunc.getRankByCustomer(customer_id))
    } catch (error) {
        return res.status(400).send("Sorry there isn't information to show")
    }        
})

//LIST ALL RANKS OF PRODUCTS
router.get('/',async(req,res)=>{
    try {
        return res.status(200).json(await RoutFunc.getRankByProduct())
    } catch (error) {
        return res.status(400).send("Sorry there isn't information to show")
    }        
})

//SAVE RANK
router.post('/',async(req,res)=>{
    console.log(req.body)
    let {    
        customer_id,
        product_id,
        rank,
        comment
    }=req.body

    try {
        return res.status(200).json(await RoutFunc.createNewRank(
            customer_id,
            product_id,
            rank,
            comment
        ))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be save")
    }
})

//MODIFY RANK
router.put('/',async(req,res)=>{
    console.log(req.body)
    let { 
        id,   
        rank,
        comment
    }=req.body

    try {
        return res.status(200).json(await RoutFunc.ModifyRank(
            id,
            rank,
            comment
        ))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be update")
    }
})

//DELETE RANK
router.delete('/:id',async(req,res)=>{
    let {id}=req.params
    try {
        return res.status(200).json(await RoutFunc.DeleteRank (id))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be deleted")
    }
})

module.exports = router;