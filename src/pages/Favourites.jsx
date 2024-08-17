import React, { useEffect, useState } from 'react';
import { getFavouriteItemsApi } from '../apis/Api';
import './Favourites.css';

const Favourites = () => {
  const [favouriteItems, setFavouriteItems] = useState([]);

  useEffect(() => {
    const fetchFavouriteItems = async () => {
      try {
        const res = await getFavouriteItemsApi();
        setFavouriteItems(res.data.favouriteItems);
      } catch (error) {
        console.error('Error fetching favourite items:', error);
      }
    };

    fetchFavouriteItems();
  }, []);

  return (
    <div className="container">
      <h2>My Favourites</h2>
      <div className="row">
        {favouriteItems.map((item) => (
          <div key={item._id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
            <div className="card product-card">
              <img src={item.productImageUrl} className="card-img-top product-img" alt={item.productName} />
              <div className="card-body">
                <h5 className="card-title">{item.productName}</h5>
                <p className="card-text product-description">{item.productDescription}</p>
                <p className="card-text">Price: Rs.{item.productPrice}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favourites;
