import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = () => {
  // Fetch user data from local storage
  const user = JSON.parse(localStorage.getItem('user'));

  if (!user) {
    // Handle the case when user data is not available
    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8">
            <div className="card p-4 border rounded shadow-lg">
              <div className="text-center">
                <h2>User not logged in</h2>
                <p>Please <Link to="/login">log in</Link> to view your profile.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5 profile-container">
      <div className="card profile-card p-4 border rounded shadow-lg">
        <div className="text-center">
          <img
            src={user.profileImage || 'https://i.imgur.com/QIdIFoC.png'} // Use actual image URL or default image
            alt="profile"
            className="img-fluid rounded-circle mb-4 profile-image"
          />
          <h2 className="card-title">{user.firstName} {user.lastName}</h2>
          <p className="text-muted">{user.email}</p>
          <div className="d-flex justify-content-center mt-4">
            <Link to="/edit-profile" className="btn btn-warning btn-lg">Edit Profile</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
