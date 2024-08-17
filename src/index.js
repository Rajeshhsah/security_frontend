import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';  // Import Bootstrap CSS
import '@fortawesome/fontawesome-free/css/all.min.css';  // Import FontAwesome CSS
import 'bootstrap-icons/font/bootstrap-icons.css'; // Import Bootstrap Icons

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
