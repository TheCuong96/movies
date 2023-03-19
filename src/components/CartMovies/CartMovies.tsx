import { MovieConfig } from 'src/types/movie.type'

interface Props {
  movie: MovieConfig
}

export default function CartMovies(props: Props) {
  const { movie } = props
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'
  return (
    <div className={'my-1 w-full px-1 md:w-1/2 lg:my-4 lg:w-1/3 lg:px-4'}>
      <div className='movie-title'>
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
