import React from 'react'
import { Link } from 'react-router-dom'

export const CheckOutSuccess = () => {
  return (
    <div>
        CheckOutSuccess
        <Link to='/home'>
            <button>
                back to home
            </button>
        </Link>
    </div>
  )
}
