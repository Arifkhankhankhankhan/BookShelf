import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>Personal Bookshelf</h1>
    <nav>
      <Link to="/">Search Books</Link>
      <Link to="/bookshelf">My Bookshelf</Link>
    </nav>
  </header>
);

export default Header;
