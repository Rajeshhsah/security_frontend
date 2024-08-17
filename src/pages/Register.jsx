import React, { useState } from 'react';
import { registerApi } from '../apis/Api';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const changeFirstName = (e) => {
    setFirstName(e.target.value);
  };

  const changeLastName = (e) => {
    setLastName(e.target.value);
  };

  const changeEmail = (e) => {
    setEmail(e.target.value);
  };

  const changePassword = (e) => {
    setPassword(e.target.value);
  };

  const changeConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  const validatePassword = (password) => {
    const minLength = 8;
    const maxLength = 12;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength || password.length > maxLength) {
      toast.error(`Password must be between ${minLength} and ${maxLength} characters long.`);
      return false;
    }

    if (!hasUpperCase) {
      toast.error('Password must contain at least one uppercase letter.');
      return false;
    }

    if (!hasLowerCase) {
      toast.error('Password must contain at least one lowercase letter.');
      return false;
    }

    if (!hasNumber) {
      toast.error('Password must contain at least one number.');
      return false;
    }

    if (!hasSpecialChar) {
      toast.error('Password must contain at least one special character (e.g., !, @, #, $).');
      return false;
    }

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Passwords do not match!');
      return;
    }

    if (!validatePassword(password)) {
      return;
    }

    const data = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password,
    };

    registerApi(data)
      .then((res) => {
        if (res.data.success === true) {
          toast.success(res.data.message);
          navigate('/login');
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        toast.error('Internal Server Error!');
      });
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        backgroundImage: `url('https://i.imgur.com/81ulPtx.png')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        paddingTop: '60px', // ensure it does not overlap with the navbar
      }}
    >
      <div className="header">
        <h1 className="text-black">Book Store</h1>
        <div className="header-buttons">
          <a href="/login" className="header-button">Login</a>
        </div>
      </div>

      <div className="text-center mb-4">
        <h1 className="text-black">Create new Account</h1>
        <p className="text-black">Already Registered? <a href="/login">Login</a></p>
      </div>

      <div className="card p-4 rounded shadow-lg" style={{ maxWidth: '400px' }}>
        <form className="w-100">
          <div className="mb-3">
            <label htmlFor="firstName" className="form-label text-black">
              First Name
            </label>
            <input
              onChange={changeFirstName}
              value={firstName}
              className="form-control"
              type="text"
              id="firstName"
              placeholder="Enter your first name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="lastName" className="form-label text-black">
              Last Name
            </label>
            <input
              onChange={changeLastName}
              value={lastName}
              className="form-control"
              type="text"
              id="lastName"
              placeholder="Enter your last name"
            />
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label text-black">
              Email
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
            <label htmlFor="password" className="form-label text-black">
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

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label text-black">
              Confirm Password
            </label>
            <input
              onChange={changeConfirmPassword}
              value={confirmPassword}
              className="form-control"
              type="password"
              id="confirmPassword"
              placeholder="Confirm your password"
            />
          </div>

          <button onClick={handleSubmit} className="btn btn-light w-100" type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
