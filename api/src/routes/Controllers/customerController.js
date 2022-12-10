const axios = require("axios");
const { Customer } = require("../../db");
const { Op } = require("sequelize");

module.exports = {

    getCustomerDetail: async function(id){
        const Customer_detail=await Customer.findByPk(id,{
            attributes:['id','name','token','email','country','provincia','departamento','comuna','shipping_address','billing_address','isadmin'],                  
        })
        return Customer_detail
    },


    getAllCustomer: async function () {
        const Customer_list= await Customer.findAll({
            attributes:['id','name','token','email','shipping_address','billing_address','isadmin'],
            where:{
                deleted:false
            }
        })
        return Customer_list
    },

    createNewCustomer: async function(name,token,email,country,provincia,departamento,comuna,shipping_address,billing_address,isadmin){
        const new_Customer= await Customer.create({
            name:name,
            token:token,
            email:email,
            country:country,
            provincia:provincia,
            departamento:departamento,
            comuna:comuna,
            shipping_address:shipping_address,
            billing_address:billing_address,
            isadmin:isadmin,
            deleted:false
        }) 
        return new_Customer
    },

    ModifyCustomer: async function(id,name,token,email,country,provincia,departamento,comuna,shipping_address,billing_address,isadmin){
        const updtCustomer= await Customer.findByPk(id,{})
        await updtCustomer.update({name,token,email,country,provincia,departamento,comuna,shipping_address,billing_address,isadmin})           
        return ("The Information was successfully Updated")
    },

    DeleteCustomer: async function(id){
        const dellCustomer= await Customer.findByPk(id,{})
        await dellCustomer.update({deleted:true})                 
        return ("The Information was successfully Deleted")
    },

}