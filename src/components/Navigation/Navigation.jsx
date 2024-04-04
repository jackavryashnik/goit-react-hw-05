import { Link, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import css from './Navigation.module.css';
import logo from '../../images/EightFilmsLogo.png'
import Header from '../Header/Header'

const buildLinkClass = ({ isActive }) => {
  return clsx(css.navLink, isActive && css.active);
};

const Navigation = () => {
  return (
    <Header>
          <div className={css.navWrapper}>
      <Link to='/'><img src={logo} alt="logo" width={40} height={40}/></Link>
      <nav className={css.nav}>
        <NavLink to="/" className={buildLinkClass}>
          Home
        </NavLink>
        <NavLink to="/movies" className={buildLinkClass}>
          Movies
        </NavLink>
      </nav>
    </div>
    </Header>
  );
};

export default Navigation;
