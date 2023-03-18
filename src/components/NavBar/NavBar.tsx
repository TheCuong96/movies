import React from 'react'
import { Link } from 'react-router-dom'
import path from './../../constants/path'

interface Props {
  selectStatusMovie: (status: string) => void
}
export default function NavBar({ selectStatusMovie }: Props) {
  return (
    <div>
      <Link
        to={path.now_playing}
        onClick={() => selectStatusMovie(path.now_playing)}
      >
        Now Playing
      </Link>
      <Link
        to={path.top_rated}
        onClick={() => selectStatusMovie(path.top_rated)}
      >
        Top Rated movies
      </Link>
    </div>
  )
}
