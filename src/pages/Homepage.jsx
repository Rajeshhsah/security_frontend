import React, { useEffect, useState } from 'react';
import { getAllProductsApi, addToCartApi } from '../apis/Api';
import { Link, useNavigate } from 'react-router-dom';
import { handleAddToCart } from '../utils/cartUtils';
import './Home.css';

const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProductsApi();
        setProducts(res.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const user = JSON.parse(localStorage.getItem('user'));
  const userId = user ? user._id : null;

  const handleBuyNow = (productId) => {
    navigate(`/products/${productId}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className="container">
        {/* Slider Section */}
        <div id="productCarousel" className="carousel slide mb-4" data-bs-ride="carousel">
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img src="https://i.imgur.com/S6lsjMg.jpeg" className="d-block w-100" alt="Slide 1" />
            </div>
            <div className="carousel-item">
              <img src="https://i.imgur.com/S6lsjMg.jpeg" className="d-block w-100" alt="Slide 2" />
            </div>
            <div className="carousel-item">
              <img src="https://i.imgur.com/DVg4vJM.jpeg" className="d-block w-100" alt="Slide 3" />
            </div>
            <div className="carousel-item">
              <img src="https://i.imgur.com/bIFlHzv.jpeg" className="d-block w-100" alt="Slide 3" />
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#productCarousel" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#productCarousel" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        {/* Product Listings */}
        <div className="row">
          {products.map((product) => (
            <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
              <div className="card product-card">
                <img src={product.productImageUrl} className="card-img-top product-img" alt={product.productName} />
                <div className="card-body">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="card-text product-description">{product.productDescription}</p>
                  <p className="card-text">Price: Rs.{product.productPrice}</p>
                  <div className="btn-group">
                    <button onClick={() => handleAddToCart(userId, product._id)} className="btn btn-primary">Add to Cart</button>
                    <button onClick={() => handleBuyNow(product._id)} className="btn btn-success">Buy Now</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Homepage;
