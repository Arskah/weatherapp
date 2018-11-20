import * as React from 'react';
import PropTypes from 'prop-types';

const WeatherIcon = ({ icon }) =>
  (<div className="icon">
    <img src={`/img/${icon}.svg`} alt="" />
  </div>);

WeatherIcon.propTypes = {
  icon: PropTypes.string.isRequired,
};

export default WeatherIcon;
