import { useState, useEffect, useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Controller } from 'swiper'
import apiConfig from '../api/apiConfig'
import tmdbApi, { movieType, category } from '../api/tmdbApi'
import { useNavigate } from 'react-router-dom'
import Button, { ButtonGrey } from './Button'
import { ModalContext } from '../context/ModalProvider'

const HeroSlider = () => {
  const [movies, setMovies] = useState([])
  const [controlSlide, setControlSlide] = useState(null)

  useEffect(() => {
    const getList = async () => {
      const params = { page: 1 }
      try {
        const response = await tmdbApi.getMoviesList(movieType.popular, {
          params
        })
        setMovies(response.results.slice(0, 10))
      } catch (err) {
        console.log('error:' + err)
      }
    }
    getList()
  }, [])

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
            <HeroSliderItem item={item} />
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

const HeroSliderItem = ({ item }) => {
  const { setActive, setMovies } = useContext(ModalContext)
  const navigate = useNavigate()

  const background = apiConfig.originalImage(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  )

  const setModalDetail = async () => {
    const detail = await tmdbApi.detail(category.movie, item.id, { params: {} })
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
