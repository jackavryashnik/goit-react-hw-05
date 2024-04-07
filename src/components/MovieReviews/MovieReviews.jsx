import { useEffect, useState } from 'react';
import { fetchMovieReviews } from '../../api';
import { useParams } from 'react-router-dom';
import { formatDate } from '../../formatDate'
import StarRate from '../StarRate/StarRate'
import css from './MovieReviews.module.css';
import manAvatar from '../../images/reviewersPlaceholders/man_avatar.webp'
import womanAvatar from '../../images/reviewersPlaceholders/woman_avatar.webp'

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
              author_details: { username, avatar_path, rating },
              created_at,
            }) => (
              <li key={id}>
                <div className={css.userInfoContainer}>
                  <div className={css.userInfo}>
                    {avatar_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${avatar_path}`}
                        alt={`user avatar`}
                        className={css.avatar}
                      />
                    )
                  :
                  (
                    <img
                        src={rating > 5 ? manAvatar : womanAvatar}
                        alt={`user avatar`}
                        className={css.avatar}
                      />
                  )}
                    <div>
                      <span className={css.username}>@{username}</span>
                    </div>
                  </div>
                  <span className={css.date}>{formatDate(created_at)}</span>
                </div>
                  <StarRate rating={rating}/>
                <div className={css.commentContainer}>
                  <p className={css.comment}>{content}</p>
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
