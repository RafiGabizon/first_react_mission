// src/pages/CategoriesPage.js
import React, { useState, useEffect } from 'react';
import '../styles/CategoriesPage.css';

const CategoriesPage = () => {
  const [categories, setCategories] = useState([]);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoriesResponse = await fetch('http://localhost:5000/categories');
        const productsResponse = await fetch('http://localhost:5000/products');

        if (!categoriesResponse.ok || !productsResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const categoriesData = await categoriesResponse.json();
        const productsData = await productsResponse.json();

        setCategories(categoriesData);
        setProducts(productsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleToggleCategory = (categoryId) => {
    setExpandedCategory(prevCategoryId =>
      prevCategoryId === categoryId ? null : categoryId
    );
  };

  const handleAddToWishlist = (product) => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isProductInWishlist = savedWishlist.some(item => item.id === product.id);
    
    if (!isProductInWishlist) {
      savedWishlist.push(product);
      localStorage.setItem('wishlist', JSON.stringify(savedWishlist));
      alert('Product added to wishlist!');
    } else {
      alert('Product is already in wishlist.');
    }
  };

  const getProductsForCategory = (categoryId) => {
    return products.filter(product => product.categoryId === categoryId);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="categories-page">
      <h1>Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            <div className="category-header" onClick={() => handleToggleCategory(category.id)}>
              <h2>{category.name}</h2>
              <button>
                {expandedCategory === category.id ? 'Collapse' : 'Expand'}
              </button>
            </div>
            {expandedCategory === category.id && (
              <ul className="products-list">
                {getProductsForCategory(category.id).map(product => (
                  <li key={product.id} className="product-item">
                    <div className="product-details">
                      <p>{product.name}</p>
                      <p>Price: ${product.price}</p>
                      <p>Category: {categories.find(cat => cat.id === product.categoryId)?.name}</p>
                    </div>
                    <button onClick={() => handleAddToWishlist(product)} className="wishlist-button">
                      Add to Wishlist
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesPage;
