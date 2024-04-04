import { useLocation } from 'react-router-dom';
import css from './MovieList.module.css';
import MovieListItem from '../MovieListItem/MovieListItem';

const MovieList = ({ data }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {data.map(el => <MovieListItem key={el.id} location={location} el={el}/>)}
    </ul>
  );
};

export default MovieList;
