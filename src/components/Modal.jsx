import { useEffect, useContext, useRef } from 'react'
import apiConfig from '../api/apiConfig'
import { ModalContext } from '../context/ModalProvider'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const Modal = () => {

  const modalRef = useRef(null)

  const navigate = useNavigate()
  // const playerRef = useRef(null)
  const { active, setActive, movies, setMovies } =
    useContext(ModalContext)
  // let link =
  //   videos.length > 0 ? `http://youtube.com/embed/${videos[0].key}` : null

  const handleClose = () => {
    setActive(false)
    setMovies([])
  }

  useEffect(() => {
    const pressEsc = e => {
      if(e.keyCode === 27)
      {
        setActive(false)
      }
    }
    document.addEventListener('keydown', pressEsc)

    return () => {
      document.removeEventListener('keydown', pressEsc)
    }
  }, [setActive])

  useEffect(() => {
    const handleClickOutside = e => {
      if(active && modalRef.current && !modalRef.current.contains(e.target)) {
        setActive(false)
      }
    }   
    document.addEventListener('click', handleClickOutside)

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [active, setActive])

  // useEffect(() => {
  //   const height = (playerRef.current.offsetWidth * 9) / 16 + 'px'
  //   playerRef.current.setAttribute('height', height)
  // }, [])


  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [active])

  const redirect = () => {
    navigate(`/movie/${movies.id}`)
    setActive(false)
  }

  return (
    <div className={`modal${active ? ' active' : ''}`}>
      <div className="modal__content" ref={modalRef}>
        {/* <div className="modal__content__video">
          <p className="modal__content__video__title">Trailer</p>
          <iframe
            src={link}
            width="100%"
            frameBorder="0"
            title="modal"
            ref={playerRef}
          ></iframe>
        </div> */}
        <div className="modal__content__detail">
          <div className="modal__content__detail__left">
            <div className="modal__content__detail__left__poster">
              <img src={apiConfig.w500Image(movies.poster_path)} alt="" />
            </div>
          </div>
          <div className="modal__content__detail__right">
            <div className="modal__content__detail__right__name">
              {movies.name || movies.title || movies.original_title}
            </div>
            <div className="modal__content__detail__right__fact">
              <span>{movies.release_date}</span> &#x26AC;{' '}
              {movies.length === 0
                ? null
                : movies.genres.map(genre => (
                    <span key={genre.id}>{genre.name}</span>
                  ))}
            </div>
            <div className="modal__content__detail__right__tagline">
              {movies.tagline}
            </div>
            <div className="modal__content__detail__right__overview">
              {movies.overview}
            </div>
            <div className="modal__content__detail__right__button">
            <Button onClick={redirect}>
              <i className="bx bx-play"></i>
              <span>Play</span>
            </Button>
            </div>
          </div>
        </div>
        <div className="modal__content__close" onClick={handleClose}>
          <i className="bx bx-x"></i>
        </div>
      </div>
    </div>
  )
}

export default Modal
