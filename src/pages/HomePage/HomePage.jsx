import { useEffect, useState } from 'react';
import { fetchData } from '../../api';
import { Link, useLocation } from 'react-router-dom';
import css from './HomePage.module.css';

const HomePage = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function fetchedData() {
      try {
        setError(false);
        const data = await fetchData();
        setData(data.results);
      } catch (error) {
        setError(true);
      }
    }

    fetchedData();
  }, []);

  return (
    <main>
      <h1>Trending today</h1>
      {error && <div>Oops something went wrong! Try reload the page</div>}
      <ul className={css.list}>
        {data &&
          data.map(el => {
            return (
              <li key={el.id} className={css.item}>
                <Link to={`/movies/${el.id}`} state={{ from: location }}>
                  {el.title}
                </Link>
              </li>
            );
          })}
      </ul>
    </main>
  );
};

export default HomePage;
