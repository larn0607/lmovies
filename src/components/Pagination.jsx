import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Pagination = ({ totalPages, page, keyword, list }) => {
  const [firstArr, setFirstArr] = useState([])
  const [lastArr, setLastArr] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const newArr = [...Array(totalPages)].map((_, i) => i + 1)
    if (totalPages - page >= 7) {
      setFirstArr(newArr.slice(page - 1, page + 4))
      setLastArr(newArr.slice(totalPages - 2))
    } else {
      setFirstArr(newArr.slice(totalPages - 7, totalPages))
      setLastArr([])
    }
  }, [totalPages, page])

  useEffect(() => {
    window.scrollTo(0,0)
  }, [page])

  const isActive = index => {
    if (index === page) return 'active'
    return ''
  }

  const prev = () => {
    const newPage = Math.max(page - 1, 1)
    navigate(`?query=${keyword}&page=${newPage}`)
  }
  const next = () => {
    const newPage = Math.min(page + 1, totalPages)
    navigate(`?query=${keyword}&page=${newPage}`)
  }
  const jump = num => {
    navigate(`?query=${keyword}&page=${num}`)
  }

  return (
    <>
      {list.length === 0 ? null : (
        <div className="pagination">
          {page !== 1 ? (
            <span className="prev" onClick={prev}>
              Previous
            </span>
          ) : null}
          {firstArr.map(num => (
            <span
              key={num}
              className={`${isActive(num)}`}
              onClick={() => jump(num)}
            >
              {num}
            </span>
          ))}
          {lastArr.length > 0 && <span className="dot">...</span>}
          {lastArr.map(num => (
            <span
              key={num}
              className={`${isActive(num)}`}
              onClick={() => jump(num)}
            >
              {num}
            </span>
          ))}
          {page === totalPages ? null : (
            <span className="next" onClick={next}>
              Next
            </span>
          )}
        </div>
      )}
    </>
  )
}

export default Pagination
