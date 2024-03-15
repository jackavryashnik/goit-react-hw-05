import { useEffect, useState } from 'react';
import fetchData from '../../api';
import { Link } from 'react-router-dom';
import css from "./HomePage.module.css";

const HomePage = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchedData() {
      try {
        const data = await fetchData('trending/movie/day');
        setData(data.results);
      } catch (error) {
        console.log(error);
      }
    }

    fetchedData();
  }, []);
  console.log(data);

  if (!data) return;

  return (
    <main>
      <h1>Trending today</h1>
      <ul className={css.list}>
        {data.map(el => {
          return (
            <li key={el.id} className={css.item}>
              <Link to={`/movies/${el.id}`}>{el.title}</Link>
            </li>
          );
        })}
      </ul>
    </main>
  );
};

export default HomePage;
