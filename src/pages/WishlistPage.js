// src/pages/WishlistPage.js
import React, { useState, useEffect } from 'react';
import '../styles/WishlistPage.css';

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);

  useEffect(() => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    setWishlist(savedWishlist);
  }, []);

  const handleRemoveFromWishlist = (id) => {
    const updatedWishlist = wishlist.filter(item => item.id !== id);
    setWishlist(updatedWishlist);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  return (
    <div className="wishlist-page">
      <h1>Wishlist</h1>
      <ul>
        {wishlist.length > 0 ? (
          wishlist.map(item => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => handleRemoveFromWishlist(item.id)}>Remove</button>
            </li>
          ))
        ) : (
          <p>No items in your wishlist.</p>
        )}
      </ul>
    </div>
  );
};

export default WishlistPage;
