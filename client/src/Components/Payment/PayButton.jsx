import React from 'react'
import { payment } from '../../Redux/Actions'
import { useDispatch } from 'react-redux'
// localhost:3001


export const PayButton = ({cartItems, userId}) => {

  const dispatch = useDispatch() 
  const handleCheckOut = async () =>{
        dispatch(payment({cartItems, userId}))

  }

  return (
    <>
      <button onClick={handleCheckOut}>
        check Out 
      </button>
    </>

  )
}

