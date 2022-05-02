import { useContext } from 'react'
import apiConfig from '../api/apiConfig'
import Button, { ButtonGrey } from './Button'
import { ModalContext } from '../context/ModalProvider'
import tmdbApi from '../api/tmdbApi'

import { useNavigate } from 'react-router-dom'

const MovieCard = ({ item, category }) => {

  const navigate = useNavigate()
  const { setActive, setMovies } = useContext(ModalContext)

  const bg = apiConfig.w500Image(item.backdrop_path)

  const setModalDetail = async () => {
    const detail = await tmdbApi.detail(category, item.id, { params: {} })
    // const videos = await tmdbApi.getVideos(category, item.id)
    setMovies(detail)
    // setVideos(videos.results)
    setActive(true)
  }

  return (
    <div className="movie-card">
      <div className="movie-card__image">
        <img src={bg} alt="" />
      </div>
      <div className="movie-card__overlay">
        <Button className="small"  onClick={() => navigate(`/movie/${item.id}`)}>
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
