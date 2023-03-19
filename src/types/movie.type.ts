export interface MovieStatusConfig {
  now_playing?: string
  top_rated?: string
}

export interface MovieConfig {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}
export interface Genres {
  id?: number
  name?: string
}
export interface MovieDetail {
  poster_path: string
  title: string
  release_date: string
  runtime: string
  original_language: string
  overview: string
  genres: Genres[]
}
