import { useState, useEffect } from 'react'

import { Swiper, SwiperSlide } from 'swiper/react'
import tmdbApi, { category } from '../api/tmdbApi'
import MovieCard from './MovieCard'

const MovieList = props => {

  const [movies, setMovies] = useState([])

  useEffect(() => {
    const getMovieList = async () => {
      let response = null
      const params = {}
      if(props.type !== 'similar') {
        switch(props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, {params})
            break
          default:
            response = await tmdbApi.getTvList(props.type, {params})
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id)
      }
      setMovies(response.results)
    }
    getMovieList()
  }, [props.type, props.category, props.id])

  return (
    <div className="movie-list">
      <Swiper
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={"auto"}
      >
        {movies.map((item, index) => (
          <SwiperSlide key={index}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default MovieList