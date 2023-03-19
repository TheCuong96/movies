import { useEffect, useState } from 'react'
import CartMovies from './components/CartMovies'
import NavBar from './components/NavBar'
import axios from 'axios'
import './App.css'
import { useLocation, useNavigate } from 'react-router-dom'
import useQueryParams from './hooks/useQueryParams'
const MOVIE_API = 'https://api.themoviedb.org/3/'
const API_KEY = 'api_key=66b0125714beeef00566c60f07155ae0'

function App() {
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [statusMovie, setStatusMovie] = useState('/now_playing')
  const navigate = useNavigate()
  const location = useLocation()
  const queryParam = useQueryParams()

  const fetchMovies = async () => {
    try {
      const { data } = await axios.get(
        `${MOVIE_API}movie${location.pathname}?${API_KEY}`
      )
      setMovies(data.results)
    } catch (error) {
      console.log(`sorry, can't get the movie:`, error)
    }
  }

  const searchMovies = async () => {
    try {
      const { data } = await axios.get(
        `${MOVIE_API}/search/movie?${API_KEY}&query=${searchKey}`
      )
      setMovies(data.results)
    } catch (error) {
      console.log(`sorry, can't get the movie:`, error)
    }
  }

  useEffect(() => {
    if (queryParam.keywords !== '') {
      setSearchKey(queryParam.keywords)
    }
  }, [queryParam.keywords])

  useEffect(() => {
    if (searchKey !== '') {
      searchMovies()
    } else {
      fetchMovies()
    }
  }, [statusMovie, searchKey])

  const renderMovies = () =>
    //render movies card
    movies.map((movie) => {
      if (!movie) return null
      return <CartMovies movie={movie} />
    })

  const selectStatusMovie = (status: string) => {
    setStatusMovie(status)
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    //handle search api and url
    const keywords = event.target.value
    setSearchKey(keywords)
    if (keywords.length > 0) {
      navigate(`/search?keywords=${keywords.trim()}`)
    } else {
      navigate('/now_playing')
    }
  }

  return (
    <div className='App'>
      <header className='center-max-size header'>
        <NavBar selectStatusMovie={selectStatusMovie} />
        <form className='form' onSubmit={fetchMovies}>
          <input
            className='search'
            type='text'
            id='search'
            onInput={handleChangeInput}
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
