import { useState, useEffect } from 'react'

import tmdbApi from '../api/tmdbApi'

const SearchResult = ({ category, keyword }) => {

  const [list, setList] = useState([])

  useEffect(() => {
    const getList = async () => {
      if(keyword === undefined) return  
      const params = {
        query: keyword
      }
      const response = await tmdbApi.search(category, {params})
      console.log(response)
    }
    getList()
  }, [category, keyword])

  return (
    <div className="search__content__result">

    </div>
  )
}

export default SearchResult