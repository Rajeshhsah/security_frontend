import React, { useEffect, useState } from 'react';
import { getAllProductsApi } from '../apis/Api'; // Removed `searchProductsApi` import
import { Link, useNavigate } from 'react-router-dom';
// import Searchbar from '../components/SearchComp'; // Commented out the Searchbar import

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getAllProductsApi();
        setProducts(res.data.products);
        const uniqueCategories = [...new Set(res.data.products.map(product => product.productCategory))];
        setCategories(['All', ...uniqueCategories]);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleCategoryClick = async (category) => {
    setSelectedCategory(category);
    // Handle category click logic here
  };

  // const handleSearch = async (query) => {
  //   try {
  //     if (query.trim() === '') {
  //       const res = await getAllProductsApi();
  //       setProducts(res.data.products);
  //     } else {
  //       const res = await searchProductsApi(query);
  //       setProducts(res.data.products);
  //     }
  //   } catch (error) {
  //     console.error('Error searching products:', error);
  //   }
  // };

  const handleBuyNow = (productId) => {
    navigate(`/products/${productId}`);
  };

  return (
    <>
      {/* <Searchbar placeholder="Enter your search product name" handleChange={handleSearch} /> */}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <div className="bg-light p-2">
              <h6 className="fw-bold">Categories</h6>
              <ul className="list-group">
                {categories && categories.map((category, index) => (
                  <li key={index} className="list-group-item" onClick={() => handleCategoryClick(category)}>
                    {category}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-md-9">
            <h6 className="fw-bold mt-4 mb-3">Products</h6>
            <div className="row">
              {products.length > 0 ? (
                products.map((product) => (
                  <div key={product._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-3">
                    <div className="card">
                      <img src={product.productImageUrl} className="card-img-top" alt={product.name} />
                      <div className="card-body">
                        <h5 className="card-title">{product.productName}</h5>
                        <p className="card-text">{product.productDescription}</p>
                        <p className="card-text">Price: Rs.{product.productPrice}</p>
                        <div className="btn-group">
                          <button className="btn btn-primary" onClick={() => handleBuyNow(product._id)}>Buy Now</button>
                          <Link to={`/products/${product._id}`} className="btn btn-success">Details</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
