import React from 'react'
import './Button.css'
const Button = ({ handleRestart }) => {
  return (
    <button className='btn' onClick={handleRestart}>
      New Game
    </button>
  )
}

export default Button
