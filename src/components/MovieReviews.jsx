import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../api';
import { useParams } from 'react-router-dom';

const MovieReviews = () => {
  const [review, setReview] = useState('');
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchedData() {
      try {
        const data = await fetchMovieReviews(movieId);
        setReview(data.results);
      } catch (error) {
        console.log('error');
      }
    }

    fetchedData();
  }, [movieId]);

  console.log(review);

  return (
    <>
      <p>MovieReviews</p>
      <p>{review}</p>
    </>
  );
};

export default MovieReviews;
