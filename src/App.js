import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Card from './components/Card'

const URL = 'https://pokeapi.co/api/v2/pokemon'

function App() {
  const [pokemons, setPokemons] = useState([])
  const [level, setLevel] = useState(8)
  const [moves, setMoves] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const getPokemonData = useCallback(async () => {
    const allPokemonData = new Array(200)
      .fill(null)
      .map((id, idx) => idx + 1)
      .sort(() => Math.random() - 0.5)
    const setOfPokemons = allPokemonData.slice(0, level)
    const finalSetPokemons = [...setOfPokemons, ...setOfPokemons].sort(
      () => Math.random() - 0.5
    )
    const pokeData = []
    for (let pokeId of finalSetPokemons) {
      const response = await fetch(`${URL}/${pokeId}`)
      if (response.ok) {
        const data = await response.json()
        const transformedPokemon = {
          id: data.id,
          name: data.species.name,
          image: `${data.sprites.front_default}`,
          type: data.types[0].type.name,
          pokeId: Math.random(),
          matched: false,
        }
        pokeData.push(transformedPokemon)
      }
    }
    setPokemons(pokeData)
  }, [level])

  console.log(pokemons)
  useEffect(() => {
    getPokemonData()
  }, [getPokemonData])

  const handleChoice = (pokemon) => {
    choiceOne ? setChoiceTwo(pokemon) : setChoiceOne(pokemon)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.image === choiceTwo.image) {
        console.log('cards match')
        setPokemons((prevCards) => {
          return prevCards.map((pokemon) => {
            if (pokemon.image === choiceOne.image) {
              return { ...pokemon, matched: true }
            } else {
              return pokemon
            }
          })
        })
        resetTurn()
      } else {
        console.log("cards don't match")
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  //reset choces and increase turn counter
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setMoves((prevMove) => prevMove + 1)
    setDisabled(false)
  }

  const handleChange = (event) => {
    // event.preventDefault()
    console.log(event.target.value)
    setLevel(event.target.value)
  }

  return (
    <div className='App'>
      <span>
        <img src='img/pokemon.png' className='title__image' alt='pokemon' />
        <h1 className='title'>Memory Game</h1>
      </span>
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
      <div className={level === '10' ? 'deck deck--five' : 'deck deck--four'}>
        {pokemons.map((pokemon) => (
          <Card
            key={pokemon.pokeId}
            pokemon={pokemon}
            handleChoice={handleChoice}
            flipped={
              pokemon === choiceOne || pokemon === choiceTwo || pokemon.matched
            }
            disabled={disabled}
          />
        ))}
      </div>
      <p className='moves'>Moves: {moves}</p>
    </div>
  )
}

export default App
