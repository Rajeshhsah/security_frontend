import React, { useEffect, useState } from 'react';
import { getCartByIdApi, deleteProductFromCartApi, createOrderApi } from '../apis/Api';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?._id;
        if (!userId) {
          throw new Error('User ID not found.');
        }

        const response = await getCartByIdApi(userId);
        setCartItems(response.data.cart.products);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching cart:', error);
        setLoading(false);
      }
    };

    fetchCartItems();
  }, []);

  const changeQuantity = (newQuantity, index) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = newQuantity;
    setCartItems(updatedCart);
  };

  const removeItem = async (index) => {
    try {
      const user = JSON.parse(localStorage.getItem('user'));
      const userId = user?._id;
      if (!userId) {
        throw new Error('User ID not found.');
      }

      const productId = cartItems[index].product._id;
      await deleteProductFromCartApi(userId, productId);
      const updatedCart = [...cartItems];
      updatedCart.splice(index, 1);
      setCartItems(updatedCart);
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };

  const handleProceedToCheckout = async () => {
    if (selectedPaymentMethod === 'cashOnDelivery') {
      try {
        const user = JSON.parse(localStorage.getItem('user'));
        const userId = user?._id;
        if (!userId) {
          throw new Error('User ID not found.');
        }

        const order = {
          userId: userId,
          products: cartItems.map((cartItem) => ({
            product: cartItem.product._id,
            quantity: cartItem.quantity,
          })),
          totalAmount: calculateTotalPrice(),
        };

        const response = await createOrderApi(order);

        if (response.data.success === false) {
          console.error(response.data.message);
        } else {
          setOrderSuccess(true);
          setCartItems([]); // Clear cart items after successful order placement
          setTimeout(() => {
            navigate('/home');
          }, 5000); // Redirect to home page after 5 seconds
        }
      } catch (error) {
        console.error('Error during checkout:', error);
      }
    } else {
      alert('Please select a payment method');
    }
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.product.productPrice * item.quantity,
      0
    );
  };

  const handlePaymentMethodChange = (method) => {
    setSelectedPaymentMethod(method);
  };

  return (
    <>
      <div className="container py-4">
        <h4>Your Cart</h4>
        <div className="row">
          <div className="col-md-7">
            <div className="card mb-3">
              <div className="card-body">
                {loading ? (
                  <p>Loading...</p>
                ) : cartItems.length > 0 ? (
                  cartItems.map((item, index) => (
                    <div key={index} className="mb-3 d-flex justify-content-between align-items-center">
                      <img src={item.product.productImageUrl} alt={item.product.productName} width={50} height={50} style={{ objectFit: 'cover' }} />
                      <div>
                        <h5 className="card-title">{item.product.productName}</h5>
                        <p className="card-text">Quantity: {item.quantity}</p>
                      </div>
                      <div>
                        <button
                          className="btn btn-danger me-2"
                          onClick={() => removeItem(index)}
                        >
                          Remove
                        </button>
                        <input
                          type="number"
                          className="form-control d-inline-block w-auto"
                          value={item.quantity}
                          onChange={(e) => changeQuantity(parseInt(e.target.value), index)}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>No items in cart</p>
                )}
              </div>
            </div>
          </div>
          <div className="col-md-5">
            <div className="card mb-3">
              <div className="card-body">
                <h5 className="card-title">Cart Summary</h5>
                <hr />
                <p className="card-text">
                  Total Price: Rs.{calculateTotalPrice().toFixed(2)}
                </p>
                <h6 className="card-title">Payment Method</h6>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="paymentMethod"
                    id="cashOnDelivery"
                    value="cashOnDelivery"
                    onChange={() => handlePaymentMethodChange('cashOnDelivery')}
                  />
                  <label className="form-check-label" htmlFor="cashOnDelivery">
                    Cash on Delivery
                  </label>
                </div>
                <button className="btn btn-primary mt-3" onClick={handleProceedToCheckout}>Proceed to Checkout</button>
              </div>
            </div>
          </div>
        </div>
        {orderSuccess && <Alert message="Order successfully placed! Redirecting to home page..." />}
      </div>
    </>
  );
};

export default Cart;
