import React, { useState } from 'react';
import { FaShoppingCart, FaHeart } from 'react-icons/fa'; // Import the cart and heart icons
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import Searchbar from './SearchComp'; // Import the Searchbar component

const Navbar = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    navigate('/login');
  };

  const handleSearchChange = (query) => {
    setSearchQuery(query);
    // Implement your search logic here, for example, filter products or navigate to a search results page
    if (query.trim()) {
      navigate(`/search?query=${query.trim()}`);
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <img src="https://i.imgur.com/mqmOnPT.png" alt="logo" style={{ width: '50px', marginRight: '10px' }} />
            <Link className="navbar-brand text-secondary fw-bold fs-4" to="#">
              Book Store
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav">
              {user && (
                <>
                  <li className="nav-item">
                    <Link className="nav-link active me-2 fw-bold" aria-current="page" to={"/home"} 
                    style={{ fontFamily: 'Tisa Offc Serif Pro'}}>
                      Home
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link fw-bold" to={"/products"}
                    style={{ fontFamily: 'Tisa Offc Serif Pro'}}>
                      Products
                    </Link>
                  </li>              
                  <li className="nav-item dropdown">
                    <Link
                      className="nav-link dropdown-toggle fw-bold"
                      to="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      style={{ fontFamily: 'Tisa Offc Serif Pro'}}
                    >
                      Top Selling
                    </Link>
                    <ul className="dropdown-menu">
                      <li>
                        <Link className="dropdown-item" to="rentalbook"
                        style={{ fontFamily: 'Tisa Offc Serif Pro'}}>
                          Rental Book
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider"></hr>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#"
                        style={{ fontFamily: 'Tisa Offc Serif Pro'}}>
                          Best Product
                        </Link>
                      </li>
                      <li>
                        <hr className="dropdown-divider"></hr>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="#"
                        style={{ fontFamily: 'Tisa Offc Serif Pro'}}>
                          Best Selling
                        </Link>
                      </li>
                    </ul>
                  </li>
                </>
              )}
            </ul>
          </div>
          <div className="d-flex align-items-center">
            {user && (
              <>
                <Searchbar placeholder="Search products..." handleChange={handleSearchChange} />
                <Link to="/favorites" className="btn btn-outline-lightblue me-2">
                  <FaHeart />
                </Link>
                <Link to="/cart" className="btn btn-outline-lightblue me-2">
                  <FaShoppingCart />
                </Link>
              </>
            )}
            {user ? (
              <div className="dropdown">
                <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Welcome, {user.firstName}!
                </button>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li><Link className="dropdown-item" to={"/profile"}>Profile</Link></li>
                  <li><Link className="dropdown-item" to={"/changepassword"}>Change Password</Link></li>
                  <li><button onClick={handleLogout} className="dropdown-item">Log Out</button></li>
                </ul>
              </div>
            ) : (
              <div className="d-flex">
                <Link className="btn btn-outline-lightblue me-2" to={'/login'}>Login</Link>
                <Link className="btn btn-outline-lightblue" to={'/register'}>Register</Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
