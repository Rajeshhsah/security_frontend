import React from 'react';
import PropTypes from 'prop-types';

const Alert = ({ message }) => (
  <div className="alert alert-success mt-4" role="alert">
    {message}
  </div>
);

Alert.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Alert;
