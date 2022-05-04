import HeroSlider from '../components/HeroSlider'
import MovieList from '../components/MovieList'

import { category, movieType, tvType } from '../api/tmdbApi'
import Helmet from '../components/Helmet'

const Home = () => {
  return (
    <Helmet title="Homepage">
      <div className="home">
        <HeroSlider />
        <div className="container">
          <section>
            <div className="section-heading">Trending Movies</div>
            <MovieList category={category.movie} type={movieType.popular} />
          </section>
          <section>
            <div className="section-heading">Top Rated Movies</div>
            <MovieList category={category.movie} type={movieType.top_rated} />
          </section>
          <section>
            <div className="section-heading">Trending TV</div>
            <MovieList category={category.tv} type={tvType.popular} />
          </section>
          <section>
            <div className="section-heading">Airing Today</div>
            <MovieList category={category.tv} type={tvType.airing_today} />
          </section>
        </div>
      </div>
    </Helmet>
  )
}

export default Home
