import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
    };

    // Call your forgot password API here
    // Example:
    /*
    forgotPasswordApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          navigate('/login');
        }
      })
      .catch((err) => {
        toast.error('Server Error!');
      });
    */
    
    // For demonstration, we will just show a success message
    toast.success('Password reset link sent to your email.');
    navigate('/login');
  };

  return (
    <div className="main-container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 rounded shadow-lg" style={{ maxWidth: '400px' }}>
        <h1 className="mb-4 text-center">Forgot Password</h1>
        <form className="w-100">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              onChange={changeEmail}
              value={email}
              className="form-control"
              type="email"
              id="email"
              placeholder="Enter your email"
            />
          </div>

          <button onClick={handleSubmit} className="btn btn-light w-100" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
