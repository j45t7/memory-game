import { useState, useEffect, useCallback } from 'react'
import './App.css'
import Card from './components/Card'

const URL = 'https://pokeapi.co/api/v2/pokemon'

function App() {
  // console.log(getPokemonData())
  const [pokemons, setPokemons] = useState([])
  // const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  const getPokemonData = useCallback(async () => {
    const allPokemonData = new Array(200)
      .fill(null)
      .map((id, idx) => idx + 1)
      .sort(() => Math.random() - 0.5)
    const setOfPokemons = allPokemonData.slice(0, 8)
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
  }, [])

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
    setTurns((prevTurn) => prevTurn + 1)
    setDisabled(false)
  }

  //shuffle cards
  // const shuffleCards = () => {
  //   const shuffledCards = [...cardImages, ...cardImages]
  //     .sort(() => Math.random() - 0.5)
  //     .map((card) => ({ ...card, id: Math.random() }))
  //   setChoiceOne(null)
  //   setChoiceTwo(null)
  //   setTurns(0)
  //   setCards(shuffledCards)
  // }

  // useEffect(() => {
  //   shuffleCards()
  // }, [])
  return (
    <div className='App'>
      <h1>Pokemon Memory Game</h1>
      <div className='deck'>
        {pokemons.map((poke) => (
          <Card
            key={poke.pokeId}
            poke={poke}
            handleChoice={handleChoice}
            flipped={poke === choiceOne || poke === choiceTwo || poke.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}

export default App
