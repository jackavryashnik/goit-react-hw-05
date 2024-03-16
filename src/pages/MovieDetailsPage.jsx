import { useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import fetchData from '../api';

const MovieDetailsPage = () => {
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const { movieId } = useParams();
  const backLinkHref = location.state?.from ?? '/';

  useEffect(() => {
    async function fetchedData() {
      try {
        const data = await fetchData(`movie/${movieId}`);
        setMovie(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchedData();
  }, [movieId]);

  if (!movie) return;

  return (
    <>
      <button>
        <Link to={backLinkHref}>Go back</Link>
      </button>

      <div>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={`${movie.title} poster`}
        />
        <div>
          <h1>{movie.title}</h1>
          <p>User Score: {parseInt(movie.vote_average * 10)}%</p>
          <h2>
            <b>Overview</b>
          </h2>
          <p>{movie.overview}</p>
          <h3>
            <b>Genres</b>
          </h3>
          <p>{movie.genres.reduce((acc, el) => (acc += ` ${el.name}`), '')}</p>
        </div>
      </div>

      <hr />
      <p>Additional information</p>

      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>

      <hr />

      <Outlet />
    </>
  );
};

export default MovieDetailsPage;
