import { useState, useEffect, useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Controller } from 'swiper'
import apiConfig from '../api/apiConfig'
import tmdbApi, { category as cate, movieType, tvType } from '../api/tmdbApi'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import Button, { ButtonGrey } from './Button'
import { ModalContext } from '../context/ModalProvider'

const HeroSlider = () => {
  const [movies, setMovies] = useState([])
  const [controlSlide, setControlSlide] = useState(null)
  const [type, setType] = useState('')
  const { search } = useLocation()

  const { category } = useParams()

  // useEffect(() => {
  //   const getList = async () => {
  //     const params = { page: 1 }
  //     try {
  //       const response = await tmdbApi.getMoviesList(movieType.popular, {
  //         params
  //       })
  //       setMovies(response.results.slice(0, 10))
  //     } catch (err) {
  //       console.log('error:' + err)
  //     }
  //   }
  //   getList()
  // }, [])

  useEffect(() => {
    const type = new URLSearchParams(search).get('type') || 'popular'
    setType(type)
  }, [search])

  useEffect(() => {
    const getListMovie = async () => {
      let res = null
      if (category === cate.tv) {
        switch (type) {
          case tvType.top_rated:
            res = await tmdbApi.getTvList(tvType.top_rated, { params: {} })
            break
          case tvType.airing_today:
            res = await tmdbApi.getTvList(tvType.airing_today, { params: {} })
            break
          case tvType.on_the_air:
            res = await tmdbApi.getTvList(tvType.on_the_air, { params: {} })
            break
          default:
            res = await tmdbApi.getTvList(tvType.popular, { params: {} })
        }
      } else {
        switch (type) {
          case movieType.top_rated:
            res = await tmdbApi.getMoviesList(movieType.top_rated, {
              params: {}
            })
            break
          case movieType.now_playing:
            res = await tmdbApi.getMoviesList(movieType.now_playing, {
              params: {}
            })
            break
          case movieType.upcoming:
            res = await tmdbApi.getMoviesList(movieType.upcoming, {
              params: {}
            })
            break
          default:
            res = await tmdbApi.getMoviesList(movieType.popular, { params: {} })
        }
      }
      setMovies(res.results)
    }
    getListMovie()
  }, [category, type])

  return (
    <div className="hero-slider">
      <Swiper
        modules={[Controller]}
        onSwiper={setControlSlide}
        slidesPerView={1}
        allowSlidePrev={false}
        allowSlideNext={false}
        className="hero-swiper"
      >
        {movies.map((item, index) => (
          <SwiperSlide className="hero-swiper__item" key={index}>
            <HeroSliderItem item={item} category={category} />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="hero-slider__card">
        <Swiper
          modules={[EffectCoverflow, Controller]}
          grabCursor={true}
          slidesPerView={2}
          centeredSlides={true}
          effect={'coverflow'}
          controller={{ control: controlSlide }}
          coverflowEffect={{
            rotate: 0,
            stretch: -30,
            depth: 150,
            modifier: 1,
            slideShadows: true
          }}
          className="hero-slider__card__swiper"
        >
          {movies.map((item, index) => (
            <SwiperSlide key={index}>
              <div className="hero-slider__card__item">
                <img src={apiConfig.w500Image(item.poster_path)} alt="poster" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}

const HeroSliderItem = ({ item, category }) => {
  const { setActive, setMovies } = useContext(ModalContext)
  const navigate = useNavigate()

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  )

  const setModalDetail = async () => {
    let detail
    if (category === 'tv') {
      detail = await tmdbApi.detail(cate.tv, item.id, { params: {} })
    } else {
      detail = await tmdbApi.detail(cate.movie, item.id, { params: {} })
    }
    // const videos = await tmdbApi.getVideos(category.movie, item.id)
    setMovies(detail)
    // setVideos(videos.results)
    setActive(true)
  }

  return (
    <div className="hero-slider__item">
      <div
        className="hero-slider__item__bg"
        style={{ backgroundImage: `url(${background})` }}
      ></div>
      <div className="hero-slider__item__content">
        <div className="hero-slider__item__content__info">
          <div className="hero-slider__item__content__info__name">
            {item.title || item.name}
          </div>
          <div className="hero-slider__item__content__info__overview">
            {item.overview}
          </div>
          <div className="hero-slider__item__content__info__button">
            <Button onClick={() => navigate(`/movie/${item.id}`)}>
              <i className="bx bx-play"></i>
              <span>Play</span>
            </Button>
            <ButtonGrey onClick={setModalDetail}>
              <i className="bx bxs-info-circle"></i>
              <span>Info</span>
            </ButtonGrey>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroSlider
