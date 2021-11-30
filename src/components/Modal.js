import React from 'react'
import './Modal.css'
const Modal = ({ handleRestart, setShowModal }) => {
  const closeModal = () => {
    setShowModal(false)
  }
  return (
    <div className='modal'>
      <div className='modal-content'>
        <p>You won</p>
        <div>
          <p>Do you want to play again?</p>
          <button onClick={handleRestart}>Yes</button>
          <button onClick={closeModal}>No</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
