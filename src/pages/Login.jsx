import React, { useState } from 'react';
import { loginApi } from '../apis/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      email: email,
      password: password,
    };

    loginApi(data)
      .then((res) => {
        if (res.data.success === false) {
          toast.error(res.data.message);
        } else {
          toast.success(res.data.message);
          localStorage.setItem('token', res.data.token);

          const convertedJson = JSON.stringify(res.data.userData);
          localStorage.setItem('user', convertedJson);

          if (res.data.userData.isAdmin) {
            navigate('/admin/dashboard');
          } else {
            navigate('/home');
          }
        }
      })
      .catch((err) => {
        toast.error('Server Error!');
      });
  };

  return (
    <div className="main-container d-flex justify-content-center align-items-center vh-100">
      <div className="row align-items-center">
        <div className="col-md-6 image-section d-flex justify-content-center">
          <img src="https://i.imgur.com/h7aG3HU.png" alt="Book Store" />
        </div>
        <div className="col-md-6 card p-4 rounded shadow-lg">
          <h1 className="mb-4 text-center">Sign in to your account!</h1>
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

            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                onChange={changePassword}
                value={password}
                className="form-control"
                type="password"
                id="password"
                placeholder="Enter your password"
              />
            </div>

            <button onClick={handleSubmit} className="btn btn-light w-100" type="submit">
              Login
            </button>
            <div className="text-center mt-3">
              <a href="/forgot-password" className="text-decoration-none text-danger">
                Forgot Password?
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
