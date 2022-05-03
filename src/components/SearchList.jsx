import apiConfig from '../api/apiConfig'
import { Link } from 'react-router-dom'

const SearchList = ({ list, category }) => {
  return (
    <div className="search-list">
      {list && list.length > 0 && list.map((item, index) => (
        <div className="search-list__item" key={index}>
          <div className="search-list__item__image">
            <Link to={`/${category}/${item.id}`}>
              <img src={apiConfig.w500Image(item.poster_path)} alt="poster" />
            </Link>
          </div>
          <div className="search-list__item__info">
            <div className="search-list__item__info__name">
              <Link to={`/${category}/${item.id}`}>
                {item.title || item.name}
              </Link>
            </div>
            <div className="search-list__item__info__release-date">
              {item.release_date || item.first_air_date}
            </div>
            <div className="search-list__item__info__overview">
              {category === 'movie' ? item.overview : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default SearchList
