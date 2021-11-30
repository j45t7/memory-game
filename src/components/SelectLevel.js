import React from 'react'
import './SelectLevel.css'
const SelectLevel = ({ level, handleChange }) => {
  return (
    <form className='level'>
      <label htmlFor='' className='level__label'>
        <input
          className='level__input'
          type='radio'
          name='easy'
          value='4'
          checked={level === '4'}
          onChange={handleChange}
        />
        Easy
      </label>
      <label htmlFor='' className='level__label'>
        <input
          className='level__input'
          type='radio'
          name='medium'
          value='8'
          checked={level === '8'}
          onChange={handleChange}
        />
        Medium
      </label>
      <label htmlFor='' className='level__label'>
        <input
          className='level__input'
          type='radio'
          name='hard'
          value='10'
          checked={level === '10'}
          onChange={handleChange}
        />
        Hard
      </label>
    </form>
  )
}

export default SelectLevel
