import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getSingleProductApi, addToCartApi } from '../apis/Api';
import { toast } from 'react-toastify';

const BuyNow = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await getSingleProductApi(id);
        setProduct(res.data.product);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleBuyNow = async () => {
    try {
      const cartData = {
        user: JSON.parse(localStorage.getItem("user"))._id,
        products: [
          {
            product: product._id,
            quantity: 1 // assuming single quantity for now
          }
        ]
      };

      const res = await addToCartApi(cartData);
      if (res.data.success) {
        toast.success('Product added to cart successfully!');
        navigate('/cart');
      } else {
        toast.error('Failed to add product to cart.');
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      toast.error('Error adding to cart.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card p-4 border rounded shadow-lg">
            <img src={product.productImageUrl} className="card-img-top" alt={product.productName} />
            <div className="card-body">
              <h5 className="card-title">{product.productName}</h5>
              <p className="card-text">{product.productDescription}</p>
              <p className="card-text">Price: Rs.{product.productPrice}</p>
              <button className="btn btn-primary" onClick={handleBuyNow}>Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyNow;
