import React, { useState, useEffect } from 'react';
import '../styles/ProductsPage.css';

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await fetch('http://localhost:5000/products');
        const categoriesResponse = await fetch('http://localhost:5000/categories');

        if (!productsResponse.ok || !categoriesResponse.ok) {
          throw new Error('Network response was not ok');
        }

        const productsData = await productsResponse.json();
        const categoriesData = await categoriesResponse.json();

        setProducts(productsData);
        setCategories(categoriesData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  const handleRemoveFromWishlist = (productId) => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const updatedWishlist = savedWishlist.filter(item => item.id !== productId);
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
    alert('Product removed from wishlist!');
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.name : 'Unknown';
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="products-page">
      <h1>All Products</h1>
      <ul className="products-list">
        {products.map(product => (
          <li key={product.id} className="product-item">
            <div className="product-details">
              <h2>{product.name}</h2>
              <p>Price: ${product.price}</p>
              <p>Category: {getCategoryName(product.categoryId)}</p>
            </div>
            <button 
              onClick={() => handleAddToWishlist(product)} 
              className="add-to-wishlist-button">
              Add to Wishlist
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductsPage;
