const { Product , Category, Size, Color, Type } = require('../../db')
const {Op} = require('sequelize')

const getAllProducts = async function(){
    try {
        let products = await Product.findAll({
            where: {
                deleted: false 
            }, 
            attributes: ["name", "price", ]
        })

        return products 

    } catch (error) {
        console.log(error)
    }
}


const createNewProduct = async({name, price, descriptions, images, stock, color, size, type}) => {
    try{
        let newProduct = await Product.create({
            name, 
            price, 
            descriptions, 
            images, 
            stock
        })

        let colorProd = await Color.findOne({
            where: {
                color: {
                    [Op.iLike]: color
                }
            }
        })

        let sizeProd = await Size.findOne({
            where: {
                size: {
                    [Op.iLike]: size
                }
            }
        })
        
        let typeProd = await Size.findOne({
            where: {
                type: {
                    [Op.iLike]: type
                }
            }
        })

        newProduct.addColor(colorProd)
        newProduct.addSize(sizeProd)
        newProduct.addType(typeProd)

        return 'Product created succesfully'
    }
    catch(error){
        console.log(error)
    }
}


const getProductDetail = async(id) => {
    try {
        let productRes = await Product.findByPk(id, {
            where: {
                deleted: false 
            }, 
            include: [{
                model: Category, 
                attributes: ['category'], 
                /* where: {
                    deleted: false
                } */ 
            }, 

            {
                model: Size, 
                attributes: ['size'], 
                /*  where: {
                    deleted: false
                } */
            }, 

            {
                model: Color, 
                attributes: ['color'], 
                /* where: {
                    deleted: false
                } */
            }, 

            {
                model: Type, 
                attributes: ['type'], 
                /* where: {
                    deleted: false
                } */
            }, 
        ]
    })
    if(!productRes){
        return 'This product doesn\'t exist'
    }
    else{
        return productRes
    }

    } catch (error) {
        console.log(error)
    }
}

const modifyProd = async({id, name, price, descriptions, images, stock}) => {
    try {
        let ProductToUpdate = await Product.findByPk(id)

        if(!ProductToUpdate){
            throw new Error('Product Not Found')
        }

        else{
            
        await Product.update({
            name, 
            price, 
            descriptions, 
            images, 
            stock
            }, {
                where: {
                    product_id: id
            }
            })
            let producMod = Product.findOne({
            where: {
                product_id: id
        }})

        return producMod
        }

        
      } catch (error) {
        console.error({ error: error });
      }
}

const deleteProd = async (id) => {
    try{
        let prod = await Product.findByPk(id)
        if(prod.deleted === true){
            return 'This Product doesnt exist'
        }

        else{
            await Product.update({
                deleted: true
            }, { 
                where: {
                    product_id: id
                }
            })
            return 'Product deleted succesfully'
        }
    }
    catch(error){
        console.log(error)
    }
}


module.exports = {
    getAllProducts,
    createNewProduct, 
    getProductDetail, 
    modifyProd,
    deleteProd
}