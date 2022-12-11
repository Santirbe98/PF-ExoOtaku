
import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { getCheckout } from '../../Redux/Actions'
import { NavBar } from '../NavBar/NavBar'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import Button from '@mui/material/Button';
import { Box } from '@mui/system'
import { Typography } from '@mui/material'
import { useState } from 'react'


export const CheckOutSuccess =  () => {
  const dispatch = useDispatch()
  const {search} = useLocation()
  const [Order, setOrder] = useState('')
  const [loading, setLoading] = useState(true)
  let session_id = search.substring(12, search.length)

  useEffect(() => {

    dispatch(getCheckout(session_id))
    .then(data => {
      setOrder(data.payload.payment_intent)
      setLoading(false)
    })
  }, [dispatch])

  return (
    <div>
      <NavBar/>
      <Box>
        <Typography sx={{padding: '2%'}} variant='h2'>
          Thank you for your shopping! 
        </Typography>
      </Box>
      <Box sx={{padding: '2%'}}>
        <Typography variant='h5'>
          Your order id is 
          {
            loading === false && (<Typography> {Order} </Typography>)
          }
        </Typography>
      </Box>

      <Box>
        <Link to='/home'>
          <Button variant="contained" color="success" 
          >
            Back to Home
          </Button>
        </Link>
      </Box>
    </div>
  )
}
