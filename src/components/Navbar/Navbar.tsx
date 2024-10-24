import { NavLink } from 'react-router-dom';
import './Navbar.scss';

export const Navbar = () => {
  return (
    <nav className='navbar'>
      <div className='navbar-brand'>
        <h1>Applitools vs Percy comparison</h1>
      </div>
      <ul className='nav-links'>
        <li>
          <NavLink to='/' end>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to='/ab-test'>A/B Testing</NavLink>
        </li>
        <li>
          <NavLink to='/accessibility'>Accessibility</NavLink>
        </li>
        <li>
          <NavLink to='/dynamic-content'>Dynamic Content</NavLink>
        </li>
        <li>
          <NavLink to='/login-form'>Login Form</NavLink>
        </li>
      </ul>
    </nav>
  );
};
