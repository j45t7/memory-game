import React from 'react'
import './Card.css'
import pokemonIMG from './img/pokemon.png'

const Card = ({ pokemon, flipped, disabled, handleChoice }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(pokemon)
    }
  }

  return (
    <div className={flipped ? 'flipped' : ''}>
      <div className='front'>
        <div className='card'>
          <img className='front__image' src={pokemon.image} alt='card front' />
          <p className='card__name'>{pokemon.name}</p>
          <p className='card__type'>{pokemon.type}</p>
        </div>
      </div>
      <div className='back'>
        <div className='card'>
          <img
            className='back__image'
            src={pokemonIMG}
            alt='card back'
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}

export default Card
