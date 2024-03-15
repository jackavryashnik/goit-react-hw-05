import HomePage from '../../pages/HomePage/HomePage';
import MoviesPage from '../../pages/MoviesPage';
import MovieDetailsPage from '../../pages/MovieDetailsPage';
import NotFoundPage from '../../pages/NotFoundPage';
import { NavLink, Route, Routes } from 'react-router-dom';
import clsx from 'clsx';
import css from './App.module.css';

const buildLinkClass = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.active);
};

function App() {
  return (
    <>
      <header className={css.header}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast">Cast</Route>
          <Route path="reviews">Reviews</Route>
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
