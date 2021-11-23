import React from 'react'
import './Card.css'

const cardBack = '/img/pokemon.png'
const Card = ({ poke, flipped, disabled, handleChoice }) => {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(poke)
    }
  }
  // flipped = true
  return (
    <div className={flipped ? 'flipped' : ''}>
      <div className='front'>
        <div className='card'>
          <img src={poke.image} alt='card front' />
          <p className='card-name'>{poke.name}</p>
          <p className='card-type'>{poke.type}</p>
        </div>
      </div>
      <div className='back'>
        <div className='card'>
          <img
            className='backImg'
            src={cardBack}
            alt='card back'
            onClick={handleClick}
          />
        </div>
      </div>
    </div>
  )
}

export default Card
