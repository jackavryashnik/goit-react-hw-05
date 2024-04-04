import { Link } from "react-router-dom";
import css from './MovieListItem.module.css'

const MovieListItem = ({el, location}) => {
  return (
    <li key={el.id} className={css.item}>
    <Link to={`/movies/${el.id}`} state={location}>
      {el.title}
    </Link>
  </li>
  )
}

export default MovieListItem