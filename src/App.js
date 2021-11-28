import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Card from './components/Card'
import Moves from './components/Moves'
import SelectLevel from './components/SelectLevel'
import Title from './components/Title'

const URL = 'https://pokeapi.co/api/v2/pokemon'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pokemons, setPokemons] = useState([])
  const [level, setLevel] = useState('8')
  const [moves, setMoves] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const getPokemonData = useCallback(async () => {
    try {
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
        if (!response.ok) {
          throw new Error('Something went wrong!')
        }

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

      setPokemons(pokeData)
    } catch (error) {
      setError(error.message)
    }
    setIsLoading(false)
  }, [level])

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

  //reset choices and increase turn counter
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setMoves((prevMove) => prevMove + 1)
    setDisabled(false)
  }

  const handleChange = (event) => {
    event.preventDefault()
    setLevel(event.target.value)
  }

  let content = (
    <div className={level === '10' ? 'deck--five' : 'deck--four'}>
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
  )
  if (error) {
    content = <p>{error}</p>
  }

  if (isLoading) {
    content = <p className='loading'>Catching them all...</p>
  }

  return (
    <div className='App'>
      <Title />
      <SelectLevel level={level} handleChange={handleChange} />
      {content}
      <Moves moves={moves} />
    </div>
  )
}

export default App
