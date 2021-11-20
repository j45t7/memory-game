import { useState, useEffect, useCallback } from 'react'
import './App.css'

const URL = 'https://pokeapi.co/api/v2/pokemon'

function App() {
  // console.log(getPokemonData())
  const [pokemons, setPokemons] = useState([])

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

  return (
    <div className='App'>
      <h1>Pokemon Memory Game</h1>
      <div className='deck'>
        {pokemons.map((poke) => (
          <div className='card' key={poke.pokeId}>
            <img src={poke.image} alt='' />
            <p className='card-name'>{poke.name}</p>
            <p className='card-type'>{poke.type}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
