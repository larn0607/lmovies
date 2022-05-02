import { useState, useEffect } from 'react'
import logo from '../assets/images/logo.png'
import { Link } from 'react-router-dom'

const Header = () => {
  const menuHeader = [
    {
      display: 'Movie',
      path: 'movie',
      subMenu: [
        {
          subDisplay: 'Popular',
          subPath: 'movie/popular'
        },
        {
          subDisplay: 'Now Playing',
          subPath: 'movie/now_playing'
        },
        {
          subDisplay: 'Upcoming',
          subPath: 'movie/upcoming'
        },
        {
          subDisplay: 'Top Rated',
          subPath: 'movie/top_rated'
        }
      ]
    },
    {
      display: 'Tv Series',
      path: 'tv',
      subMenu: [
        {
          subDisplay: 'Popular',
          subPath: 'tv/popular'
        },
        {
          subDisplay: 'Airing Today',
          subPath: 'tv/airing_today'
        },
        {
          subDisplay: 'On the Air',
          subPath: 'tv/on_the_air'
        },
        {
          subDisplay: 'Top Rated',
          subPath: 'tv/top_rated'
        }
      ]
    }
  ]

  const [isActive, setIsActive] = useState(false)
  const [scrollHeader, setScrollHeader] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 100) {
        setScrollHeader(true)
      } else {
        setScrollHeader(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`header${scrollHeader ? ' scroll' : ''}`}>
      <div className="header__logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="header__menu">
        {menuHeader.map((item, index) => (
          <ul className="header__menu__item" key={index}>
            <li>{item.display}</li>
            <ul className="header__menu__item__submenu">
              {item.subMenu.map((subItem, subIndex) => (
                <li
                  className="header__menu__item__submenu__item"
                  key={subIndex}
                >
                  <Link to={`/${subItem.path}`}>{subItem.subDisplay}</Link>
                </li>
              ))}
            </ul>
          </ul>
        ))}
      </div>
      <div className="header__search">
        <div
          className="header__search__icon"
          onClick={() => setIsActive(!isActive)}
        >
          <i className={`bx bx-${isActive ? 'x' : 'search'}`}></i>
        </div>
        <div
          className={`header__search__input${isActive ? ' active' : ''}`}
        >
          <input type="text" />
        </div>
      </div>
    </header>
  )
}

export default Header
