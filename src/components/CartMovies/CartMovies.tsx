import { MovieConfig } from 'src/types/movie.type'

interface Props {
  movie: MovieConfig
  selectMovie: (id: number) => void
}

export default function CartMovies(props: Props) {
  const { movie, selectMovie } = props
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'

  if (!movie) return null
  return (
    <div
      className={
        'my-1 w-full cursor-pointer  px-1 md:w-1/2 lg:my-4 lg:w-1/3 lg:px-4'
      }
      onClick={() => selectMovie(movie.id)}
    >
      <div className='movie-title hover:shadow-[0_0px_40px_6px_rgba(255,255,255,1)]'>
        {movie.poster_path && (
          <img src={IMAGE_PATH + movie.poster_path} alt={movie.title} />
        )}
        <div className={'between movie-infos flex'}>
          <h5 className={'movie-title'}>{movie.title}</h5>
        </div>
      </div>
    </div>
  )
}
