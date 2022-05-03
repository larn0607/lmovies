import { useState, useEffect } from 'react'
import { useParams, useLocation, Navigate } from 'react-router-dom'
import { category as cate } from '../api/tmdbApi'
import CatalogList from '../components/CatalogList'
import HeroSlider from '../components/HeroSlider'

const Catalog = () => {
  const { category } = useParams()
  const [type, setType] = useState('')
  const { search } = useLocation()

  useEffect(() => {
    const type = new URLSearchParams(search).get('type') || 'popular'
    setType(type)
  }, [search])

  const title =
    category === cate.movie
      ? type === 'top_rated'
        ? 'Top Rated Movies'
        : type === 'now_playing'
        ? 'Now Playing Movies'
        : type === 'upcoming'
        ? 'Upcoming Movies'
        : 'Popular Movies'
      : type === 'top_rated'
      ? 'Top Rated TV Shows'
      : type === 'airing_today'
      ? 'TV Shows Airing Today'
      : type === 'on_the_air'
      ? 'Currently Airing TV Shows'
      : 'Popular TV Shows'

  return (
    <div className="catalog">
      {category !== 'movie' && category !== 'tv' && <Navigate replace to="/" />}
      <HeroSlider />
      <div className="catalog__title">{title}</div>
      <CatalogList category={category} type={type} />
    </div>
  )
}

export default Catalog
