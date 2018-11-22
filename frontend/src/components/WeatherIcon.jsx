import * as React from 'react';
import PropTypes from 'prop-types';

const options = {
  hour: 'numeric',
  minute: '2-digit',
};

const WeatherIcon = ({ icon, time }) => {
  const date = new Date(time);
  return (
    <div className="icon">
      <img src={`/img/${icon}.svg`} alt="" />
      <p className="icon-text">{date.toLocaleString('fi-FI', options)}</p>
    </div>
  );
};

WeatherIcon.propTypes = {
  icon: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
};

export default WeatherIcon;
