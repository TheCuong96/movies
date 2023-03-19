import React from 'react'
import { NavLink } from 'react-router-dom'
import path from './../../constants/path'
import classNames from 'classnames'

interface Props {
  selectStatusMovie: (status: string) => void
}
export default function NavBar({ selectStatusMovie }: Props) {
  return (
    <div className='flex flex-row justify-between gap-x-8'>
      <NavLink
        to={path.now_playing}
        onClick={() => selectStatusMovie(path.now_playing)}
        className={({ isActive }) =>
          classNames('flex items-center capitalize  transition-colors', {
            'text-skyblue': isActive,
            'text-gray-600': !isActive
          })
        }
      >
        Now Playing
      </NavLink>
      <NavLink
        to={path.top_rated}
        onClick={() => selectStatusMovie(path.top_rated)}
        className={({ isActive }) =>
          classNames('flex items-center capitalize  transition-colors', {
            'text-skyblue': isActive,
            'text-gray-600': !isActive
          })
        }
      >
        Top Rated movies
      </NavLink>
    </div>
  )
}
