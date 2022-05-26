import { useState, useEffect, useCallback } from 'react'
import logo from '../assets/images/logo.png'
import { Link, useNavigate, useLocation } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate()
  const { pathname } = useLocation()

  const menuHeader = [
    {
      display: 'Movie',
      path: 'movie',
      subMenu: [
        {
          subDisplay: 'Popular',
          subPath: 'movie?type=popular'
        },
        {
          subDisplay: 'Now Playing',
          subPath: 'movie?type=now_playing'
        },
        {
          subDisplay: 'Upcoming',
          subPath: 'movie?type=upcoming'
        },
        {
          subDisplay: 'Top Rated',
          subPath: 'movie?type=top_rated'
        }
      ]
    },
    {
      display: 'Tv Series',
      path: 'tv',
      subMenu: [
        {
          subDisplay: 'Popular',
          subPath: 'tv?type=popular'
        },
        {
          subDisplay: 'Airing Today',
          subPath: 'tv?type=airing_today'
        },
        {
          subDisplay: 'On the Air',
          subPath: 'tv?type=on_the_air'
        },
        {
          subDisplay: 'Top Rated',
          subPath: 'tv?type=top_rated'
        }
      ]
    }
  ]

  const [isActive, setIsActive] = useState(false)
  const [scrollHeader, setScrollHeader] = useState(false)

  const [keyword, setKeyword] = useState('')

  const gotoSearch = useCallback(() => {
    if(keyword.trim().length > 0) {
      navigate(`/search/movie?query=${keyword}`)
    }
  }, [keyword, navigate])

  useEffect(() => {
    const enterEvent = e => {
      e.preventDefault()
      if(e.keyCode === 13)
      {
        gotoSearch()
        setIsActive(false)
        setKeyword('')
      }
    }
    document.addEventListener('keyup', enterEvent)

    return () => {
      document.removeEventListener('keyup', enterEvent)
    }
  }, [gotoSearch])

  useEffect(() => {
    setIsActive(false)
    setKeyword('')
  }, [pathname])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
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
                <Link to={`/${subItem.subPath}`} key={subIndex}>
                  <li className="header__menu__item__submenu__item">
                    {subItem.subDisplay}
                  </li>
                </Link>
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
        <div className={`header__search__input${isActive ? ' active' : ''}`}>
          <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} />
          <div className="mobile__btn" onClick={gotoSearch}>
            <i className={`bx bx-search`}></i>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
