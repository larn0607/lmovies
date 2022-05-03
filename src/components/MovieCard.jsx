import { useContext } from 'react'
import apiConfig from '../api/apiConfig'
import Button, { ButtonGrey } from './Button'
import { ModalContext } from '../context/ModalProvider'
import tmdbApi, { movieType, category as cate } from '../api/tmdbApi'

import { useNavigate, useParams } from 'react-router-dom'

const MovieCard = ({ item, cat }) => {

  const navigate = useNavigate()
  const { setActive, setMovies } = useContext(ModalContext)
  const { category } = useParams()

  const link = `/${cate[cat]}/${item.id}`

  const bg = category ? apiConfig.originalImage(item.poster_path) : apiConfig.w500Image(item.backdrop_path)

  const setModalDetail = async () => {
    const detail = await tmdbApi.detail(cat, item.id, { params: {} })
    setMovies(detail)
    setActive(true)
  }

  return (
    <div className="movie-card">
      <div className="movie-card__image">
        <img src={bg} alt="" />
      </div>
      <div className="movie-card__overlay">
        <Button className="small"  onClick={() => navigate(link)}>
          <i className="bx bx-play"></i>
          <span>Play</span>
        </Button>
        <ButtonGrey className="small info" onClick={setModalDetail}>
          <i className="bx bxs-info-circle"></i>
          <span>Info</span>
        </ButtonGrey>
      </div>
    </div>
  )
}

export default MovieCard
