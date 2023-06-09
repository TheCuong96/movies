import { useEffect, useState } from 'react'
import CartMovies from './components/CartMovies'
import NavBar from './components/NavBar'
import axios from 'axios'
import './App.css'
import { useLocation, useNavigate } from 'react-router-dom'
import useQueryParams from './hooks/useQueryParams'
import useDebounce from './hooks/useDebounce'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Detail from './components/Detail'
import { MovieDetail } from './types/movie.type'
import classNames from 'classnames'
const MOVIE_API = 'https://api.themoviedb.org/3/'
const API_KEY = 'api_key=66b0125714beeef00566c60f07155ae0'
const now_playing = '/now_playing'

function App() {
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey] = useState('')
  const [statusMovie, setStatusMovie] = useState(now_playing)
  const [loading, setLoading] = useState(false)
  const [movieDisplay, setMovieDisplay] = useState<MovieDetail | null>(null)
  const [listAndGrid, setListAndGrid] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const queryParam = useQueryParams()
  const debounceValue = useDebounce({ value: searchKey, delay: 500 })

  const fetchMovies = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(
        `${MOVIE_API}movie${statusMovie}?${API_KEY}`
      )
      setMovies(data.results)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return toast.error(`sorry, can't get the movie: ${error.message}`, {
          position: 'top-center'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const searchMovies = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(
        `${MOVIE_API}/search/movie?${API_KEY}&query=${debounceValue}`
      )
      setMovies(data.results)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return toast.error(`sorry, can't get the movie: ${error.message}`, {
          position: 'top-center'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (queryParam.keywords !== '' && queryParam.keywords !== undefined) {
      setSearchKey(queryParam.keywords)
    }
  }, [queryParam.keywords])

  useEffect(() => {
    if (debounceValue !== '') {
      searchMovies()
    } else {
      fetchMovies()
    }
  }, [statusMovie, debounceValue])

  const renderMovies = () =>
    //render movies card
    movies.map((movie) => {
      if (!movie) return null
      return (
        <CartMovies
          movie={movie}
          selectMovie={selectMovie}
          listAndGrid={listAndGrid}
        />
      )
    })

  const selectStatusMovie = (status: string) => {
    setStatusMovie(status)
  }

  const handleChangeInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    //handle search api and url
    // event.preventDefault()
    const keywords = event.target.value
    setSearchKey(keywords)
    if (keywords.length > 0) {
      navigate(`/search?keywords=${keywords.trim()}`)
    } else {
      navigate('/now_playing')
    }
  }

  const selectMovie = async (id: number) => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${MOVIE_API}movie/${id}?${API_KEY}`)
      setMovieDisplay(data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return toast.error(`sorry, can't get the movie: ${error.message}`, {
          position: 'top-center'
        })
      }
    } finally {
      setLoading(false)
    }
  }

  const hideDetail = () => {
    setMovieDisplay(null)
  }

  return (
    <div className='app'>
      <div className='main'>
        <header className='center-max-size header'>
          <NavBar selectStatusMovie={selectStatusMovie} />
          <div className='flex flex-row justify-between gap-x-8'>
            <div
              className={classNames(
                'flex cursor-pointer items-center capitalize transition-colors',
                {
                  'text-skyblue': listAndGrid,
                  'text-gray-600': !listAndGrid
                }
              )}
              onClick={() => setListAndGrid(true)}
            >
              list
            </div>
            <div
              className={classNames(
                'flex cursor-pointer items-center capitalize transition-colors',
                {
                  'text-skyblue': !listAndGrid,
                  'text-gray-600': listAndGrid
                }
              )}
              onClick={() => setListAndGrid(false)}
            >
              grid
            </div>
          </div>
          <div className='form'>
            <input
              className='search'
              type='text'
              id='search'
              onInput={handleChangeInput}
              value={searchKey}
            />
            <button className='submit-search' type='submit'>
              <i className='fa fa-search'></i>
            </button>
          </div>
        </header>

        {loading ? (
          <div className={'groupLoading'}>
            <svg
              aria-hidden='true'
              className='mr-2 h-4 w-4 animate-spin fill-white text-gray-200'
              viewBox='0 0 100 101'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
                fill='currentColor'
              />
              <path
                d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
                fill='currentFill'
              />
            </svg>
          </div>
        ) : (
          <div className={' -mx-1 flex flex-wrap lg:-mx-4'}>
            {renderMovies()}
          </div>
        )}
        <ToastContainer />
        <Detail cancel={hideDetail} inforMovie={movieDisplay} />
      </div>
    </div>
  )
}

export default App
