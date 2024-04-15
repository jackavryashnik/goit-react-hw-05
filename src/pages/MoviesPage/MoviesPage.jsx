import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { searchMovie } from '../../api';
import { useSearchParams } from 'react-router-dom';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import Error from '../../components/Error/Error';
import css from './MoviesPage.module.css'

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (values, actions) => {
    const inputVale = values.query;
    setSearchParams({ query: inputVale });
    actions.resetForm();
  };

  useEffect(() => {
    const searchQuery = searchParams.get('query');
    if (!searchQuery) return;

    async function fetchedData() {
      try {
        setEmpty(false);
        setMovies([]);
        setIsLoading(true);
        const data = await searchMovie(searchQuery);
        setMovies(data.results);
        if (!data.results.length) setEmpty(true);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    fetchedData();
  }, [searchParams]);

  return (
    <>
      <Formik
        initialValues={{
          query: '',
        }}
        onSubmit={handleSubmit}
      >
        <Form className={css.search}>
          <div className={css.formField}>
            <Field name="query" className={css.input} placeholder="What are you looking for?"/>
            <button className={css.button} type="submit">Search</button>
          </div>
        </Form>
      </Formik>

      {isLoading && <Loader />}
      {error && <Error />}
      {empty && <div>There are no movies at your request</div>}
      {!empty && <MovieList data={movies} />}
    </>
  );
};

export default MoviesPage;
