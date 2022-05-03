import { useState, useEffect, useRef } from 'react'
import MovieCard from './MovieCard'
import tmdbApi, { category as cate, movieType, tvType } from '../api/tmdbApi'
import { ButtonGrey } from './Button'

const CatalogList = ({ category, type }) => {
  const [movies, setMovies] = useState([])
  const [pages, setPages] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const listRef = useRef(null)

  useEffect(() => {
    const getListMovie = async () => {
      let res = null
      let params = {}
      const resp = await tmdbApi.search(category, {params: {query: 'batman'}})
      console.log(resp)
      if (category === cate.tv) {
        switch (type) {
          case tvType.top_rated:
            res = await tmdbApi.getTvList(tvType.top_rated, { params })
            break
          case tvType.airing_today:
            res = await tmdbApi.getTvList(tvType.airing_today, { params })
            break
          case tvType.on_the_air:
            res = await tmdbApi.getTvList(tvType.on_the_air, { params })
            break
          default:
            res = await tmdbApi.getTvList(tvType.popular, { params })
        }
      } else {
        switch (type) {
          case movieType.top_rated:
            res = await tmdbApi.getMoviesList(movieType.top_rated, {
              params
            })
            break
          case movieType.now_playing:
            res = await tmdbApi.getMoviesList(movieType.now_playing, {
              params
            })
            break
          case movieType.upcoming:
            res = await tmdbApi.getMoviesList(movieType.upcoming, {
              params
            })
            break
          default:
            res = await tmdbApi.getMoviesList(movieType.popular, { params })
        }
      }
      setMovies(res.results)
      setTotalPages(res.total_pages)
    }
    getListMovie()
  }, [category, type])

  const loadMore = async () => {
    let res = null
    let params = { page: pages + 1 }
    if (category === cate.tv) {
      switch (type) {
        case tvType.top_rated:
          res = await tmdbApi.getTvList(tvType.top_rated, { params })
          break
        case tvType.airing_today:
          res = await tmdbApi.getTvList(tvType.airing_today, { params })
          break
        case tvType.on_the_air:
          res = await tmdbApi.getTvList(tvType.on_the_air, { params })
          break
        default:
          res = await tmdbApi.getTvList(tvType.popular, { params })
      }
    } else {
      switch (type) {
        case movieType.top_rated:
          res = await tmdbApi.getMoviesList(movieType.top_rated, {
            params
          })
          break
        case movieType.now_playing:
          res = await tmdbApi.getMoviesList(movieType.now_playing, {
            params
          })
          break
        case movieType.upcoming:
          res = await tmdbApi.getMoviesList(movieType.upcoming, {
            params
          })
          break
        default:
          res = await tmdbApi.getMoviesList(movieType.popular, { params })
      }
    }
    setPages(pages + 1)
    setMovies([...movies, ...res.results])
  }

  return (
    <>
      <div className="catalog-list" ref={listRef}>
        {movies.map((item, index) => (
          <MovieCard item={item} key={index} cat={category} />
        ))}
      </div>
      {totalPages > pages && (
        <div className="catalog-list__loadmore" onClick={loadMore}>
          <ButtonGrey>Load more</ButtonGrey>
        </div>
      )}
    </>
  )
}

export default CatalogList
