import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import MovieListItem from '../MovieListItem/MovieListItem';

const MovieList = ({ data }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {data.map(movie => {
        return (
          <li key={movie.id} className={css.item}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <MovieListItem movie={movie}/>
            </Link>
          </li>
        )
      })}
    </ul>
  );
};

export default MovieList;
