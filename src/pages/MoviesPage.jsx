import { useEffect, useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { searchMovie } from '../api';
import { Link, useLocation, useSearchParams } from 'react-router-dom';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();

  const handleSubmit = e => {
    const inputVale = e.query;
    setQuery(inputVale);
    setSearchParams({ query: inputVale });
  };

  useEffect(() => {
    if (searchParams.size && searchParams.get('query') !== query) {
      setQuery(searchParams.get('query'));
    }
    if (!query) return;

    async function fetchedData() {
      try {
        const data = await searchMovie(query);
        setMovies(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    fetchedData();
  }, [query, searchParams]);

  return (
    <>
      <Formik
        initialValues={{
          query: '',
        }}
        onSubmit={handleSubmit}
      >
        <Form>
          <Field name="query" />
          <button type="submit">Search</button>
        </Form>
      </Formik>

      <ul>
        {movies.length > 0 &&
          movies.map(el => {
            return (
              <li key={el.id}>
                <Link to={`/movies/${el.id}`} state={{ from: location }}>
                  {el.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </>
  );
};

export default MoviesPage;
