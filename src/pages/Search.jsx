import { useState, useEffect } from 'react'
import bg from '../assets/images/bg.jpg'
import { Link, useParams, useLocation, Navigate } from 'react-router-dom'
import tmdbApi, { category } from '../api/tmdbApi'
import PuffLoader from 'react-spinners/PuffLoader'
import SearchList from '../components/SearchList'
import { ButtonGrey } from '../components/Button'

const Search = () => {
  const { cat } = useParams()
  const { search } = useLocation()
  const [keyword, setKeyword] = useState('')
  const [list, setList] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [totalResultMovies, setTotalResultMovies] = useState(0)
  const [totalResultTVs, setTotalResultTVs] = useState(0)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const keyword = new URLSearchParams(search).get('query') || ''
    setKeyword(keyword)
  }, [search])

  useEffect(() => {
    const getList = async () => {
      let res = null
      let resMovie = null
      let resTV = null
      if (keyword.length === 0) {
        return
      } else {
        setLoading(true)
        const params = {
          query: keyword
        }
        res = await tmdbApi.search(cat, { params })
        resMovie = await tmdbApi.search(category.movie, { params })
        resTV = await tmdbApi.search(category.tv, { params })
      }
      setList(res.results)
      setTotalPages(res.total_pages)
      setTotalResultMovies(resMovie.total_results)
      setTotalResultTVs(resTV.total_results)
      setLoading(false)
    }
    getList()
  }, [cat, keyword])

  const loadMore = async () => {
    let res = null
    if (keyword.length === 0) {
      return
    } else {
      const params = {
        query: keyword,
        page: page + 1
      }
      res = await tmdbApi.search(cat, { params })
    }
    setPage(page + 1)
    setList([...list, ...res.results])
  }

  return (
    <div className="search">
      {/* {cat !== 'movie' && cat !== 'tv' && <Navigate replace to="/search" />} */}
      <div className="search__title" style={{ backgroundImage: `url(${bg})` }}>
        <span>Search</span>
      </div>
      <div className="search__content">
        <div className="search__content__filter">
          <div className="search__content__filter__top">Result</div>
          <div className="search__content__filter__list">
            <Link to={`/search/movie?query=${keyword}`}>
              <div
                className={`search__content__filter__list__item${
                  cat === 'movie' ? ' active' : ''
                }`}
              >
                <span>Movies</span>
                <span>{totalResultMovies}</span>
              </div>
            </Link>
            <Link to={`/search/tv?query=${keyword}`}>
              <div
                className={`search__content__filter__list__item${
                  cat === 'tv' ? ' active' : ''
                }`}
              >
                <span>TV Shows</span>
                <span>{totalResultTVs}</span>
              </div>
            </Link>
          </div>
        </div>
        <div className="search__content__result">
          {keyword.length === 0 || list.length === 0 ? (
            'There are no results matched your query.'
          ) : (
            <>
              {loading ? (
                <div className="loading">
                  <PuffLoader color={'#e50914'} loading={loading} size={60} />
                </div>
              ) : (
                <>{<SearchList list={list} category={cat} />}</>
              )}
            </>
          )}
        </div>
      </div>
        {totalPages > page && (
          <div className="catalog-list__loadmore" onClick={loadMore}>
            <ButtonGrey>Load more</ButtonGrey>
          </div>
        )}
    </div>
  )
}

export default Search
