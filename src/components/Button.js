import React from 'react'
import './Button.css'
const Button = ({ getPokemonData }) => {
  return (
    <button className='btn' onClick={getPokemonData}>
      New Game
    </button>
  )
}

export default Button
