//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW
// RUTAS DEL BACKEND
//MWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMWMW
const { Router } = require('express');
const RoutFunc = require('../Function/Function');
const router = Router();

//==================================== PRODUCTS ===============================================

//LISTA DE TODOS LOS PRODUTOS & PRODUCTOS FILTRADOS POR NOMBRE
router.get('/products',async(req,res)=>{
    let { name }=req.query;
    if (name) {
        try {//FILTRO POR NOMBRE 
            return res.status(200).json(await RoutFunc.getproductbyname(name))
        } catch (error) {
            return res.status(400).send("Sorry there isn't information to show by this product")
        }        
    } else {
        try {//TODOS LOS PRODUCTOS
            return res.status(200).json(await RoutFunc.getallproducts())
        } catch (error) {
            return res.status(400).send("Sorry there isn't information to show")
        }        
    }
})
//DETALLE DE PRODUCTO
router.get('/product/:id',async(req,res)=>{
    let {id}=req.params
    try {
        return res.status(200).json(await RoutFunc.getproductbyid(id))
    } catch (error) {
        return res.status(400).send("Sorry there isn't information to show")
    }
})

//==================================== ADMIN PRODUCTS ===============================================

//GUARDA PRODUCTO 
router.post('/master/product',async(req,res)=>{
    let {name,idescription, prices,created_date,images, categories, types,colors, sizes}=req.body
    try {
        return res.status(200).json(await RoutFunc.saveproduct(name,idescription, prices,created_date,images, categories, types,colors, sizes))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be save")
    }
})

//ACTUALIZA / BORA PRODUCTO
router.put('/master/product',async(req,res)=>{
    let {product_id,name,idescription, prices,created_date,images, categories, types,colors, sizes,delete_l}=req.body
    try {
        return res.status(200).json(await RoutFunc.updateproduct(product_id,name,idescription, prices,created_date,images, categories, types,colors, sizes, delete_l))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be update")
    }
})

//==================================== ADMIN CATEGORIES ===============================================

//LISTA DE TODAS LAS CATEGORIES
router.get('/category',async(req,res)=>{
    try {
        return res.status(200).json(await RoutFunc.getallcategories())
    } catch (error) {
        return res.status(400).send("Sorry there isn't information to show")
    }        
})

//GUARDA CATEGORIES
router.post('/category',async(req,res)=>{
    let {name, description}=req.body
    try {
        return res.status(200).json(await RoutFunc.savecategory(name,description))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be save")
    }
})

//ACTUALIZA / BORRA CATEGORIES
router.put('/category',async(req,res)=>{
    let {id,name,description,delete_l}=req.body
    try {
        return res.status(200).json(await RoutFunc.updatecategory(id,name,description,delete_l))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be update")
    }
})

//==================================== ADMIN TYPES ===============================================

//LISTA DE TODAS LOS TYPES
router.get('/types',async(req,res)=>{
    try {
        return res.status(200).json(await RoutFunc.getalltypes())
    } catch (error) {
        return res.status(400).send("Sorry there isn't information to show")
    }        
})

//GUARDA TYPES
router.post('/types',async(req,res)=>{
    let {type}=req.body
    try {
        return res.status(200).json(await RoutFunc.savetype(type))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be save")
    }
})

//ACTUALIZA / BORRA TYPES
router.put('/types',async(req,res)=>{
    let {id,type,delete_l}=req.body
    try {
        return res.status(200).json(await RoutFunc.updatetypes(id,type,delete_l))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be update")
    }
})

//==================================== ADMIN IMAGES ===============================================

//LISTA DE TODAS LAS IMAGES
router.get('/images',async(req,res)=>{
    try {
        return res.status(200).json(await RoutFunc.getallimages())
    } catch (error) {
        return res.status(400).send("Sorry there isn't information to show")
    }        
})

//GUARDA IMAGES
router.post('/images',async(req,res)=>{
    let {url}=req.body
    try {
        return res.status(200).json(await RoutFunc.saveimages(url))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be save")
    }
})

//ACTUALIZA / BORRA IMAGES
router.put('/images',async(req,res)=>{
    let {id,urd,delete_l}=req.body
    try {
        return res.status(200).json(await RoutFunc.updateimages(id,url,delete_l))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be update")
    }
})

//==================================== ADMIN COLORS ===============================================

//LISTA DE TODOS LOS COLORES 
router.get('/colors',async(req,res)=>{
    try {
        return res.status(200).json(await RoutFunc.getallcolors())
    } catch (error) {
        return res.status(400).send("Sorry there isn't information to show")
    }        
})

//GUARDA COLOR
router.post('/color',async(req,res)=>{
    let {color}=req.body
    try {
        return res.status(200).json(await RoutFunc.savecolor(color))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be save")
    }
})

//ACTUALIZA / BORRA COLOR
router.put('/color',async(req,res)=>{
    let {id,color,delete_l}=req.body
    try {
        return res.status(200).json(await RoutFunc.updatecolor(id,color,delete_l))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be update")
    }
})

//==================================== ADMIN SIZES ===============================================

//LISTA DE TODOS LOS SIZES
router.get('/sizes',async(req,res)=>{
    try {
        return res.status(200).json(await RoutFunc.getallsizes())
    } catch (error) {
        return res.status(400).send("Sorry there isn't information to show")
    }        
})

//GUARDA SIZE 
router.post('/size',async(req,res)=>{
    let {size}=req.body
    try {
        return res.status(200).json(await RoutFunc.savesize(size))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be save")
    }
})

//ACTUALIZA / BORRA SIZE
router.put('/size',async(req,res)=>{
    let {id,size,delete_l}=req.body
    try {
        return res.status(200).json(await RoutFunc.updatesize(id,color,delete_l))
    } catch (error) {
        return res.status(400).send("Sorry the information couldn't be update")
    }
})








//CARGA TEMPERAMENTO A LA DB -----------------------------------------------------------
router.get('/tempe',async(req,res)=>{
    try {
        return res.status(200).json(await RoutFunc.listemp())
    } catch (error) {
        return res.status(400).send("There Was a Failure to Exporting List of Temperament to the Data Base")
    }
})

//LISTA TEMPERAMENTO  
router.get('/listempe',async(req,res)=>{
    try {
        return res.status(200).json(await RoutFunc.temperlist())
    } catch (error) {
        return res.status(400).send("There Was a Failure to Import List of Temperament")
    }
})

module.exports = router;
