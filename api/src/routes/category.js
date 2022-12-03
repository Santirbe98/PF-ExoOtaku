const { Router } = require("express");
const router = Router();

// const data = require('../data')
const RoutFunc = require('./Controllers/categoriesController')
// getAllCategories, createNewCategory, getCategoryDetail, ModifyCategory, DeleteCategory 

//CATEGORY DETAIL
router.get('/:id',async(req,res)=>{
    try {
        return res.status(200).json(await RoutFunc.getCategoryDetail())
    } catch (error) {
        return res.status(400).send("Sorry there isn't information to show")
    }        
})

//LIST ALL CATEGORIES
router.get('/',async(req,res)=>{
    try {
        return res.status(200).json(await RoutFunc.getAllCategories())
    } catch (error) {
        return res.status(400).send("Sorry there isn't information to show")
    }        
})

//SAVE CATEGORIES
router.post('/',async(req,res)=>{
    let {category}=req.body
    try {
        return res.status(200).json(await RoutFunc.createNewCategory(category))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be save")
    }
})

//MODIFY CATEGORIES
router.put('/',async(req,res)=>{
    let {id,category}=req.body
    try {
        return res.status(200).json(await RoutFunc.ModifyCategory(id,category))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be update")
    }
})

//DELETE CATEGORIES
router.delete('/:id',async(req,res)=>{
    let {id}=req.params
    try {
        return res.status(200).json(await RoutFunc.DeleteCategory (id))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be update")
    }
})

module.exports = router;