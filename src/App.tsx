import { useEffect, useState } from 'react'
import CartMovies from './components/CartMovies'
import NavBar from './components/NavBar'
import axios from 'axios'
import './App.css'
import { MovieConfig } from './types/movie.type'
const MOVIE_API = 'https://api.themoviedb.org/3/'
const API_KEY = 'api_key=66b0125714beeef00566c60f07155ae0'

function App() {
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [statusMovie, setStatusMovie] = useState('/now_playing')

  const fetchMovies = async () => {
    const { data } = await axios.get(
      `${MOVIE_API}movie${statusMovie}/?${API_KEY}`
    )
    setMovies(data.results)
  }

  useEffect(() => {
    fetchMovies()
  }, [statusMovie])

  const renderMovies = () =>
    movies.map((movie) => {
      if (!movie) return null
      return <CartMovies movie={movie} />
    })

  const selectStatusMovie = (status: string) => {
    setStatusMovie(status)
  }
  console.log('movies', movies)

  return (
    <div className='App'>
      <header className='center-max-size header'>
        <NavBar selectStatusMovie={selectStatusMovie} />
        <form className='form' onSubmit={fetchMovies}>
          <input
            className='search'
            type='text'
            id='search'
            onInput={(event: any) => setSearchKey(event.target.value)}
          />
          <button className='submit-search' type='submit'>
            <i className='fa fa-search'></i>
          </button>
        </form>
      </header>
      <div className={'center-max-size container'}>{renderMovies()}</div>
    </div>
  )
}

export default App
