import { useEffect, useState } from 'react';
import { fetchMovieData } from '../api';
import { useParams } from 'react-router-dom';

const MovieCast = () => {
  const [cast, setCast] = useState('');
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchedData() {
      try {
        const data = await fetchMovieData(movieId);
        setCast(data.results);
      } catch (error) {
        console.log('error');
      }
    }

    fetchedData();
  }, [movieId]);

  return (
    <>
      <p>{cast}</p>
    </>
  );
};

export default MovieCast;
