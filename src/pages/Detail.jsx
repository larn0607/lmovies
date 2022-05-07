import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import apiConfig from '../api/apiConfig'
import PuffLoader from 'react-spinners/PuffLoader'
import tmdbApi from '../api/tmdbApi'
import CastList from '../components/CastList'
import VideoList from '../components/VideoList'
import MovieList from '../components/MovieList'
import Helmet from '../components/Helmet'

const Detail = () => {
  const [item, setItem] = useState(null)
  const [casts, setCasts] = useState([])
  const [videos, setVideos] = useState([])
  const { category, id } = useParams()

  useEffect(() => {
    const getDetail = async () => {
      const res = await tmdbApi.detail(category, id, { params: {} })
      setItem(res)
    }
    getDetail()
  }, [category, id])

  useEffect(() => {
    const getCast = async () => {
      const res = await tmdbApi.credits(category, id, { params: {} })
      setCasts(res.cast.slice(0, 8))
    }
    getCast()
  }, [category, id])

  useEffect(() => {
    const getVideos = async () => {
      const res = await tmdbApi.getVideos(category, id, { params: {} })
      setVideos(res.results.slice(0, 5))
    }
    getVideos()
  }, [category, id])

  return (
    <>
      {item ? (
        <Helmet title={item.name || item.title}>
          <div className="detail">
            <div
              className="detail__header"
              style={{
                backgroundImage: `url(${apiConfig.originalImage(
                  item.backdrop_path || item.poster_path
                )})`
              }}
            >
              <div className="detail__header__content">
                <div className="detail__header__content__image">
                  <img
                    src={apiConfig.w500Image(
                      item.poster_path || item.backdrop_path
                    )}
                    alt=""
                  />
                </div>
                <div className="detail__header__content__info">
                  <div className="detail__header__content__info__header">
                    <div className="detail__header__content__info__header__name">
                      {item.name || item.title}
                    </div>
                    <div className="detail__header__content__info__header__fact">
                      <span>{item.release_date}</span> &nbsp;
                      <span>&#x26AC;</span>
                      {item.length === 0
                        ? null
                        : item.genres.map(genre => (
                            <span key={genre.id}>{genre.name}</span>
                          ))}
                    </div>
                  </div>
                  <div className="detail__header__content__info__tagline">
                    {item.tagline}
                  </div>
                  <div className="detail__header__content__info__overview">
                    <div className="detail__header__content__info__overview__title">
                      Overview
                    </div>
                    <p>{item.overview}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="detail__cast">
              <div className="detail__cast__title">Top Billed Cast</div>
              <CastList casts={casts} />
            </div>
            <div className="detail__video">
              <VideoList videos={videos} />
            </div>
            <div className="detail__recommendations">
              <div className="section-heading">Recommended</div>
              <MovieList
                category={category}
                type="recommendations"
                id={item.id}
              />
            </div>
          </div>
        </Helmet>
      ) : (
        <div className="loading-detail">
          <PuffLoader color={'#e50914'} size={60} />
        </div>
      )}
    </>
  )
}

export default Detail
