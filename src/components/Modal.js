import React from 'react'
import './Modal.css'
const Modal = ({ handleRestart, visible }) => {
  return (
    <div className={visible ? 'modal visible' : 'modal'}>
      <div className='modal-content'>
        <p>You won</p>
        <div>
          <p>Do you want to play again?</p>
          <button onClick={handleRestart}>Yes</button>
          <button>No</button>
        </div>
      </div>
    </div>
  )
}

export default Modal
