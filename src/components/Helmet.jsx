const Helmet = ({title, children}) => {
  document.title = 'lMovies | ' + title

  return (
    <>
      {children}
    </>
  )
}

export default Helmet