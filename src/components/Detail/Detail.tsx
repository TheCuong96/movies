import { createPortal } from 'react-dom'
import styles from './detail.module.scss'

interface DetailProps {
  cancel: () => void
  inforMovie?: any
}

const root = document.getElementById('root') as HTMLElement

export default function Detail({ cancel, inforMovie }: DetailProps) {
  const visible = inforMovie !== null
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'
  console.log('inforMovie', inforMovie)

  const handleCancel = () => {
    cancel()
  }
  if (!inforMovie) return null
  return createPortal(
    <div
      className={styles.modalRoot}
      style={{ visibility: visible ? 'visible' : 'hidden' }}
      onClick={handleCancel}
    >
      <div className={styles.container}>
        <div className={styles.detail}>
          <div className='w-full max-w-sm lg:flex lg:max-w-full'>
            <div
              className='h-48 flex-none overflow-hidden rounded-t bg-cover text-center lg:h-auto lg:w-48 lg:rounded-t-none lg:rounded-l'
              style={{ backgroundImage: 'url("/img/card-left.jpg")' }}
              title='Woman holding a mug'
            >
              <img
                src={IMAGE_PATH + inforMovie.poster_path}
                alt={inforMovie.title}
              />
            </div>
            <div className='flex flex-col justify-between rounded-b border-r border-b border-l border-gray-400 bg-white p-4 leading-normal lg:rounded-b-none lg:rounded-r lg:border-l-0 lg:border-t lg:border-gray-400'>
              <h1 className='font-black text-gray-900'>{inforMovie.title}</h1>
              <div className={styles.labelGroup}>
                <div className='  font-bold text-gray-900'>genres:</div>
                <div className='text-base text-gray-700'>genres</div>
              </div>
              <div className={styles.labelGroup}>
                <div className='  font-bold text-gray-900'>release_date:</div>
                <div className='text-base text-gray-700'>
                  {inforMovie.release_date}
                </div>
              </div>
              <div className={styles.labelGroup}>
                <div className='  font-bold text-gray-900'>runtime:</div>
                <div className='text-base text-gray-700'>
                  {inforMovie.runtime}
                </div>
              </div>

              <div className={styles.labelGroup}>
                <div className='  font-bold text-gray-900'>language:</div>
                <div className='text-base text-gray-700'>
                  {inforMovie.original_language}
                </div>
              </div>

              <div className={styles.labelGroup}>
                <div className='  font-bold text-gray-900'>overview:</div>
                <div className='text-base text-gray-700'>
                  {inforMovie.overview}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>,
    root
  )
}
