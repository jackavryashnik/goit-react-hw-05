import { useState } from 'react';
import notFound from '../../images/notFound.png'
import css from './NotFoundPage.module.css'
import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const NotFoundPage = () => {
  const [counter, setCounter] = useState(10);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter(prevCounter => prevCounter - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return <div className={css.page}>
    <div className={css.imgWrapper}>
      <img className={css.sedness} src={notFound} alt="sedness" />
    </div>
    <div>
      <h2 className={css.title}>aww...don&apos;t cry.</h2>
      <p className={css.text}>It&apos;s just a 404 Error!</p>
      <p className={css.text}>What you&apos;re looking for may have been misplaced in Long Term Memory</p>
      <p className={css.text}>We&apos;ll back you home in <span className={css.counter}>{counter}</span> seconds</p>
    </div>
    {!counter && <Navigate to='/'/>}
  </div>;
};

export default NotFoundPage;
