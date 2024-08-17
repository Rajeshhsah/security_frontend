import React, { useEffect, useState } from "react";
import { FaBookmark, FaShoppingCart } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getSingleProductApi } from "../apis/Api";
import { handleAddToCart } from "../utils/cartUtils";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user._id;

  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getSingleProductApi(id).then((res) => {
      setProductName(res.data.product.productName);
      setProductPrice(res.data.product.productPrice);
      setProductDescription(res.data.product.productDescription);
      setProductCategory(res.data.product.productCategory);
      setProductImage(res.data.product.productImageUrl);
    });
  }, [id]);

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Product link copied to clipboard!");
  };

  const handleBuyNowClick = async () => {
    await handleAddToCart(userId, id, quantity);
    navigate('/cart');
  };

  return (
    <div className="container mt-3">
      <div className="row">
        <div className="col-lg-5">
          <div className="card">
            <img src={`${productImage}`} className="card-img-top" alt="product thumbnail" />
          </div>
        </div>
        <div className="col-lg-7">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">{productName}</h4>
              <div className="d-flex align-items-center">
                {/* Add rating component here */}
                <p className="card-text">1K (4.5 rating)</p>
              </div>
              <p className="card-text">{productDescription}</p>
              <h5 className="card-text">Rs. {productPrice}</h5>
              <div className="d-flex align-items-center">
                <h6 className="me-2">Quantity:</h6>
                <button className="btn btn-outline-primary btn-sm" onClick={decreaseQuantity}>-</button>
                <p className="mx-1">{quantity}</p>
                <button className="btn btn-outline-primary btn-sm" onClick={increaseQuantity}>+</button>
              </div>
              <div className="d-flex flex-column align-items-center mt-3">
                <button className="btn btn-primary" onClick={handleShare}>
                  Share
                </button>
                <button className="btn btn-primary mt-2" onClick={() => handleAddToCart(userId, id, quantity)}>
                  Add to Cart
                </button>
                <button className="btn btn-success mt-2" onClick={handleBuyNowClick}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
