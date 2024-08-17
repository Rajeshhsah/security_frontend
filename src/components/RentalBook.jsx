import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RentalBook = () => {
  const navigate = useNavigate();
  
  const [bookDetails, setBookDetails] = useState({
    title: '',
    author: '',
    publicationDate: '',
    genre: '',
    description: '',
    rentDuration: '',
    rentPrice: '',
    availability: 'Available'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookDetails({ ...bookDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Request Done');
    navigate('/home');
  };

  return (
    <div className="container mt-5">
      <h2>Rental Book Request Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Book Title</label>
          <input type="text" className="form-control" name="title" value={bookDetails.title} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Author</label>
          <input type="text" className="form-control" name="author" value={bookDetails.author} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Publication Date</label>
          <input type="date" className="form-control" name="publicationDate" value={bookDetails.publicationDate} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Genre</label>
          <input type="text" className="form-control" name="genre" value={bookDetails.genre} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Description</label>
          <textarea className="form-control" name="description" value={bookDetails.description} onChange={handleChange} required></textarea>
        </div>
        <div className="mb-3">
          <label className="form-label">Rent Duration (days)</label>
          <input type="number" className="form-control" name="rentDuration" value={bookDetails.rentDuration} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Rent Price</label>
          <input type="number" className="form-control" name="rentPrice" value={bookDetails.rentPrice} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Availability</label>
          <select className="form-control" name="availability" value={bookDetails.availability} onChange={handleChange}>
            <option value="Available">Available</option>
            <option value="Not Available">Not Available</option>
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Submit Request</button>
      </form>
    </div>
  );
};

export default RentalBook;
