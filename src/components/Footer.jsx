import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer bg-dark text-white text-center py-3">
      <div className="container">
        <p className="mb-0">© 2024 Book Store. All Rights Reserved.</p>
        <div className="social-icons">
          <a href="#" className="text-white me-2"><i className="fab fa-facebook-f"></i></a>
          <a href="#" className="text-white me-2"><i className="fab fa-twitter"></i></a>
          <a href="#" className="text-white me-2"><i className="fab fa-instagram"></i></a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
