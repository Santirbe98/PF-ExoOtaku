const { Router } = require("express"); 
const express = require('express')
const router = Router()
const Stripe = require('stripe')
require('dotenv').config()
const stripe = Stripe(process.env.STRIPE_KEY)

router.post('/create-checkout-session', async (req, res) => {

    const customer= await stripe.customers.create({
        metadata:{
            userId: req.body.userId,
            cart: req.body.cartItems.toString()
        }
    })

    const line_items = req.body.cartItems.map(item => {
        return {
            price_data: {
                currency: 'USD', 
                product_data: {
                    name: item.name,
                    brand: item.brand,
                    images: [item.image.toString()],
                    description: item.description,
                    metadata: {
                        id: item.id
                    }
                },
                unit_amount: item.price * 100
            }, 
            quantity: item.cartQuantity
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

// This is your Stripe CLI webhook secret for testing your endpoint locally.

//!-------------------
//! Creación de orden 
//!-------------------

/* let endpointSecret  */
/* endpointSecret = "whsec_7cd024bed26019729f51e1fd0f77690d92576caa6bbdc6332738e77a99944308"; */

/* router.post('/webhook', express.raw({type: 'application/json'}), (req, res) => {
    const sig = req.headers['stripe-signature'];
    let data 
    let eventType

    if(endpointSecret){
        let event;

        try {
            event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
            console.log('Webhook verified')

        } catch (err) {
            console.log(`Webhook Error: ${err.message}`)
            res.status(400).send(`Webhook Error: ${err.message}`);
            return;
        }
        data = event.data.object
        eventType = req.body.type
    }
    else{
        data = req.body.data.object
        eventType = req.body.type
    }
    if(eventType === 'checkout.session.completed'){
        stripe.customers.retrieve(data.customer)
        .then((customer) => {
            console.log(customer)
            console.log("data: ", data)
        })
        .catch((error) => console.log(error.message))

    }
  // Return a 200 res to acknowledge receipt of the event
  res.send().end();
}); */


module.exports = router