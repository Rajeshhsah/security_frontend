import React from 'react';

const Searchbar = ({ placeholder, handleChange }) => {
  const handleInputChange = (event) => {
    const query = event.target.value;
    handleChange(query);
  };

  return (
    <div className="input-group mb-3" style={{ width: '300px' }}>
      <span className="input-group-text" id="search-icon">
        <i className="bi bi-search"></i>
      </span>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder || 'Search...'}
        aria-label="Search"
        aria-describedby="search-icon"
        onChange={handleInputChange}
      />
    </div>
  );
};

export default Searchbar;
