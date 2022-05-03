import axiosClient from './axiosClient'

export const category = {
  movie: 'movie',
  tv: 'tv'
}

export const movieType = {
  popular: 'popular',
  now_playing: 'now_playing',
  upcoming: 'upcoming',
  top_rated: 'top_rated',
}

export const tvType = {
  popular: 'popular',
  airing_today: 'airing_today',
  on_the_air: 'on_the_air',
  top_rated: 'top_rated',
}

const tmdbApi = {
  getMoviesList: (type, params) => {
    const url = 'movie/' + movieType[type]
    return axiosClient.get(url, params)
  },
  getTvList: (type, params) => {
    const url = 'tv/' + tvType[type]
    return axiosClient.get(url, params)
  },
  getVideos: (cate, id) => {
    const url = category[cate] + '/' + id + '/videos'
    return axiosClient.get(url, {
      params: {}
    })
  },
  search: (cate, params) => {
    const url = 'search/' + category[cate];
    return axiosClient.get(url, params);
  },
  detail: (type, id, params) => {
    const url = category[type] + '/' + id
    return axiosClient.get(url, params)
  },
  credits: (type, id) => {
    const url = category[type] + '/' + id + '/credits'
    return axiosClient.get(url, {
      params: {}
    })
  },
  similar: (type, id) => {
    const url = category[type] + '/' + id + '/similar'
    return axiosClient.get(url, {
      params: {}
    })
  }
}

export default tmdbApi