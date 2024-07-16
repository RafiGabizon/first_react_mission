// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar = () => {
  return (
    <nav className="navigation-bar">
      <ul>
        <li><Link to="/">Homepage</Link></li>
        <li><Link to="/products">Products</Link></li>
        <li><Link to="/categories">Categories</Link></li>
        <li><Link to="/wishlist">Wishlist</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  );
};


export default NavBar;
