// src/pages/HomePage.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const location = useLocation();
  const user = location.state?.user;

  return (
    <div className="home-page">
      <h1>Welcome, {user?.fullName}</h1>
      <h1>שלום וברוך הבא לחנות האינטרנטית שלנו!</h1>
      <p>כאן תוכלו למצוא את כל המוצרים שאתם חפצים בהם!</p>
    </div>
  );
};

export default HomePage;
