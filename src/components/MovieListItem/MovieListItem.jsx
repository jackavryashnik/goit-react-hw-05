import css from './MovieListItem.module.css'
import StarRate from '../StarRate/StarRate'

const MovieListItem = ({ movie: { poster_path, title, vote_average, vote_count } }) => {
  return (
    <div className={css.movie_wrapper}>
      <div className={css.poster_wrapper}>
          <img className={css.poster} src={`https://image.tmdb.org/t/p/w500${poster_path}`} alt={`${title} poster`} width={335} height={500}/>
      </div>
      <div className={css.desc}>
        <p className={css.title}>{title}</p>
        <div className={css.rating}>
          <StarRate rating={vote_average} />
          <div className={css.votes}>{vote_count}</div>
        </div>
      </div>
    </div>
  )
}

export default MovieListItem