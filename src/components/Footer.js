import React from 'react'
import './Footer.css'
import heartIMG from './img/pixel-heart.png'
const Footer = () => {
  return (
    <div className='footer'>
      <p>
        Made with <img className='heart' src={heartIMG} alt='pixel-heart' /> by
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
