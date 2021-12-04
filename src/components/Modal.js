import React from 'react'
import './Modal.css'
const Modal = ({ handleRestart, setShowModal, pokemons }) => {
  const closeModal = () => {
    setShowModal(false)
  }
  return (
    <div className='modal'>
      <div className='modal__content'>
        <h1 className='modal__title'>You win!</h1>
        <img src={pokemons[0].image} alt='pokemon' />
        <div>
          <h3>Do you want to play again?</h3>
          <button className='btn big' onClick={handleRestart}>
            Yes
          </button>
          <button className='btn big' onClick={closeModal}>
            No
          </button>
        </div>
      </div>
    </div>
  )
}

export default Modal
