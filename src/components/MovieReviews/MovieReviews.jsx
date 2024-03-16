import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../api';
import { useParams } from 'react-router-dom';
import css from './MovieReviews.module.css';

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    async function fetchedData() {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data.results);
      } catch (error) {
        console.log('error');
      }
    }

    fetchedData();
  }, [movieId]);

  return (
    <>
      {reviews.length > 0 ? (
        <ul className={css.list}>
          {reviews?.map(
            ({
              id,
              content,
              author_details: { username, avatar_path },
              created_at,
            }) => (
              <li key={id}>
                <div className={css.userInfoContainer}>
                  <div className={css.userInfo}>
                    {avatar_path && (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${avatar_path}`}
                        alt={`user avatar`}
                        className={css.avatar}
                      />
                    )}
                    <div>
                      <span className={css.username}>@{username}</span>
                    </div>
                  </div>
                </div>
                <div className={css.commentContainer}>
                  <p className={css.comment}>{content}</p>
                  <span className={css.date}>{created_at}</span>
                </div>
              </li>
            )
          )}
        </ul>
      ) : (
        <div>There aren&apos;t any reviews yet.</div>
      )}
    </>
  );
};

export default MovieReviews;
