import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = () => {
  // Fetch user data from local storage
  const storedUser = JSON.parse(localStorage.getItem('user')) || {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    profileImage: 'https://i.imgur.com/QIdIFoC.png' // Replace with the actual image URL or default image
  };

  const [user, setUser] = useState(storedUser);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({
      ...user,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', JSON.stringify(user));
    navigate('/profile');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card p-4 border rounded shadow-lg">
            <div className="row">
              <div className="col-md-4 text-center">
                <img
                  src={user.profileImage}
                  alt="profile"
                  className="img-fluid rounded-circle mb-4"
                />
                <h2 className="card-title">{user.firstName} {user.lastName}</h2>
              </div>
              <div className="col-md-8">
                <h3 className="mb-4">Edit Profile</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="firstName"
                      value={user.firstName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="lastName"
                      value={user.lastName}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      name="email"
                      value={user.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-success btn-lg" type="submit">Save Changes</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
