import { useState, createContext } from 'react'

const ModalContext = createContext()

const ModalProvider = ({ children }) => {
  const [active, setActive] = useState(false)
  const [movies, setMovies] = useState([])
  // const [videos, setVideos] = useState([])
  // console.log(movies)
  const handleActive = () => {
    setActive(true)
  }

  return (
    <ModalContext.Provider
      value={{
        active,
        setActive,
        handleActive,
        movies,
        setMovies,
        // videos,
        // setVideos
      }}
    >
      {children}
    </ModalContext.Provider>
  )
}

export { ModalContext, ModalProvider }
