import NotFoundPage from '../../pages/NotFoundPage';
import { Route, Routes } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Loader from '../Loader/Loader';
import Layout from '../Layout/Layout';

const HomePage = lazy(() => import('../../pages/HomePage/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage/MovieDetailsPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));
const Navigation = lazy(() => import('../Navigation/Navigation'));

function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Navigation />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default App;
