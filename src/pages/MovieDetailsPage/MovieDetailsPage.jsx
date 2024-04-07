import { Suspense, useEffect, useRef, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import { fetchMovieData } from '../../api';
import Loader from '../../components/Loader/Loader';
import StarRate from '../../components/StarRate/StarRate'
import { IoMdArrowRoundBack } from "react-icons/io";
import css from './MovieDetailsPage.module.css'
import clsx from 'clsx';



const MovieDetailsPage = () => {
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const { movieId } = useParams();
  const backLinkHref = useRef(location.state ?? '/');

  useEffect(() => {
    async function fetchedData() {
      try {
        setIsLoading(true);
        setError(false);
        const data = await fetchMovieData(movieId);
        setMovie(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchedData();
  }, [movieId]);

  const showGenres = () =>
    movie.genres.reduce((acc, el) => (acc += ` ${el.name}`), '');

  const makeLinkClass = ({isActive}) => {
    return clsx(css.item, isActive && css.isActive)
  }

  if (!movie) return;

  return (
    <>
      <button className={css.back_btn}>
        <Link to={backLinkHref.current} style={{textDecoration: 'none', display: 'flex', gap: 8}}>
          <IoMdArrowRoundBack style={{width: 21, height: 21}}/><span> Go back</span>
        </Link>
      </button>

      {isLoading && <div>Loading...</div>}
      {error && <div>Oops something went wrong! Try reload the page</div>}

      <div className={css.movieInfo}>
        {movie.poster_path && (
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={`${movie.title} poster`}
          />
        )}
        <div>
          <h2 className={css.title}>{movie.title}</h2>
          <hr />
          <p className={css.overview}>{movie.overview ? movie.overview : 'There are no overview'}</p>
          <p className={css.genres}><b>Genres: </b>{showGenres() ? showGenres() : 'Genre not yet specified'}</p>
          <p><b>Release date:</b> {movie.release_date}</p>
          <div className={css.rating}>
            <StarRate rating={movie.vote_average} />
            <div className={css.votes}>{movie.vote_count}</div>
          </div>
        </div>
      </div>

      <ul className={css.list}>
        <li>
          <NavLink to="cast" className={makeLinkClass} style={{textDecoration: 'none'}}>Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews" className={makeLinkClass} style={{textDecoration: 'none'}}>Reviews</NavLink>
        </li>
      </ul>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
