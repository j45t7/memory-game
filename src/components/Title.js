import React from 'react'
import pokemonIMG from './img/pokemon.png'
const Title = () => {
  return (
    <span>
      <img src={pokemonIMG} className='title__image' alt='pokemon' />
      <h1 className='title'>Memory Game</h1>
    </span>
  )
}

export default Title
