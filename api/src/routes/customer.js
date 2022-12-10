const { Router } = require("express");
const router = Router();
const RoutFunc = require('./Controllers/customerController')

//CUSTOMER DETAIL
router.get('/:id',async(req,res)=>{
    const { id } = req.params;
    try {
        return res.status(200).json(await RoutFunc.getCustomerDetail(id))
    } catch (error) {
        return res.status(400).send("Sorry there isn't information to show")
    }        
})

//LIST ALL CUSTOMERS
router.get('/',async(req,res)=>{
    try {
        return res.status(200).json(await RoutFunc.getAllCustomer())
    } catch (error) {
        return res.status(400).send("Sorry there isn't information to show")
    }        
})

//SAVE CUSTOMER
router.post('/',async(req,res)=>{
    let {name,token,email,country,provincia,departamento,comuna,shipping_address,billing_address,isadmin}=req.body
    try {
        return res.status(200).json(await RoutFunc.createNewCustomer(name,token,email,country,provincia,departamento,comuna,shipping_address,billing_address,isadmin))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be save")
    }
})

//MODIFY CUSTOMER
router.put('/',async(req,res)=>{
    console.log(req.body)
    let {id,name,token,email,country,provincia,departamento,comuna,shipping_address,billing_address,isadmin}=req.body
    try {
        return res.status(200).json(await RoutFunc.ModifyCustomer(id,name,token,email,country,provincia,departamento,comuna,shipping_address,billing_address,isadmin))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be update")
    }
})

//DELETE CUSTOMER
router.delete('/:id',async(req,res)=>{
    let {id}=req.params
    try {
        return res.status(200).json(await RoutFunc.DeleteCustomer (id))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be deleted")
    }
})

module.exports = router;