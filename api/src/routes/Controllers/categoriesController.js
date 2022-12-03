const axios = require("axios");
const { Category } = require("../../db");
const { Op } = require("sequelize");

module.exports = {

    getAllCategories: async function () {
        const categories_list= await Category.findAll({
            attributes:['id','category'],
            // include: {
            //     model: Images,
            //     attributes: ['url','description'],
            //     through: {
            //         attributes:[],
            //     }
            // }            
        })
        return categories_list
    },

    getCategoryDetail: async function(id){
        const category_detail=await Category.findByPk(id,{
            attributes:['id','category'],
            // include: {
            //     model: Images,
            //     attributes: ['url','description'],
            //     through: {
            //         attributes:[],
            //     }
            // }                       
        })
        return category_detail
    },

    createNewCategory: async function(category){//images
        const new_category= await Category.create({
            category:category,
        })
        // if (images.length) {
        //     for (let i = 0; i < images.length; i++) {
        //         var newImage = await Images.findOne({
        //             where: {
        //                 url: images[i]
        //             }
        //         })
        //         new_category.addImages(newImage.id)
        //     }            
        // } 
        return (new_category)
    },

    ModifyCategory: async function(id,category){//image
        const updtcategory= await Category.findByPk(id,{
            // include: {
            //     model: Images,
            //     attributes: ['urd','description'],
            //     through: {
            //       attributes:[],
            //     }
            // } 
        })
        await updtcategory.update({category})//images
        // await updtcategory.setImages([])
        // if (images.length) {
        //     for (let i = 0; i < images.length; i++) {
        //         var newImage = await Images.findOne({
        //             where: {
        //                 url: images[i]
        //             }
        //         })
        //         await updtcategory.addImages(newImage.id)
        //     }            
        // } 
        return ("The Information was successfully Updated")
    },

    DeleteCategory: async function(id){
        const dellcategory= await Category.findByPk(id,{})
        await dellcategory.update({deleted:true})//images
        return ("The Information was successfully Updated")
    },

}