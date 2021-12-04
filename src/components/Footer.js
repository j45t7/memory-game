import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div className='footer'>
      <p>
        Made with <img className='heart' src='img/pixel-heart.png' alt='' /> by
        <a
          className='link'
          href='https://github.com/j45t7'
          target='_blank'
          rel='noreferrer'
        >
          j45t7
        </a>
      </p>
    </div>
  )
}

export default Footer
