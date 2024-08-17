import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { searchProductsApi } from '../apis/Api';

const SearchResults = () => {
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await searchProductsApi(query);
        setProducts(res.data.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setLoading(false);
      }
    };

    fetchSearchResults();
  }, [query]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2>Search Results for "{query}"</h2>
      <div className="row">
        {products.map((product) => (
          <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card">
              <img src={product.productImageUrl} className="card-img-top" alt={product.productName} />
              <div className="card-body">
                <h5 className="card-title">{product.productName}</h5>
                <p className="card-text">{product.productDescription}</p>
                <p className="card-text">Price: Rs.{product.productPrice}</p>
                <div className="btn-group">
                  <button className="btn btn-primary">Add to Cart</button>
                  <Link to={`/buy/${product._id}`} className="btn btn-success">Buy Now</Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
