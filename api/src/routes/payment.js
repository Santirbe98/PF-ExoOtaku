const { Router } = require("express"); 
const express = require('express')
const router = Router()
const Stripe = require('stripe')
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY)

router.post('/create-checkout-session', async (req, res) => {

    const customer= await stripe.customers.create({
        metadata:{
            userId: req.body.userId.toString(),
            cart: JSON.stringify(req.body.cartItems.toString())
        }
    })

    const line_items = req.body.cartItems.map(item => {
        return {
            price_data: {
                currency: 'USD', 
                product_data: {
                    name: item.name,
                    brand: item.brand,
                    images: item.images,
                    description: item.description,
                    metadata: {
                        id: item.id
                    }
                },
                unit_amount: item.price * 100
            }, 
            quantity: item.amount
        }
    })

    const session = await stripe.checkout.sessions.create({
        /* payment_method_types: ['card'], */
        /* shipping_address_collection: {allowed_countries: ['AR']}, */
        /* shipping_options: [
            {
            shipping_rate_data: {
                type: 'fixed_amount',
                fixed_amount: {amount: 0, currency: 'usd'},
                display_name: 'Free shipping',
                    delivery_estimate: {
                    minimum: {unit: 'business_day', value: 5},
                    maximum: {unit: 'business_day', value: 7},
                    },
                },
            },
        ], */

        line_items: line_items,
        customer: customer.id,
        phone_number_collection:{
            enabled: true
        },
        mode: 'payment',
        success_url: `${process.env.CLIENT_URL}/checkout-success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}/home`,
        });
    res.send({url: session.url});
  });


//!-------------------
//! Creación de orden 
//!-------------------



router.get('/checkout-success', async (req, res) => {
    const {session_id} = req.query
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const customer = await stripe.customers.retrieve(session.customer);
    /* console.log(session) */
    /* console.log(customer) */
    res.send(session)
  });


module.exports = router

