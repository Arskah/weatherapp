import React from 'react';
import WeatherIcon from './WeatherIcon';

const baseURL = process.env.ENDPOINT || 'http://0.0.0.0:9000/api';
const defaultLocation = 'Helsinki,fi';

const getWeatherFromApiLoc = async (location) => {
  const response = await fetch(`${baseURL}/weather?n=5&location=${location}`);
  return response.json();
};

const getWeatherFromApiCoord = async (coords) => {
  const response = await fetch(`${baseURL}/weather?n=5&lon=${coords.longitude}&lat=${coords.latitude}`);
  return response.json();
};

const geoOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

function geoError(err) {
  console.warn(`ERROR('${err.code}): ${err.message}`);
}

export default class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: [],
      dt: 0,
      latitude: 0,
      longitude: 0,
    };
  }

  async componentDidMount() {
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(this.updateLoc.bind(this), geoError, geoOptions);
    } else {
      console.warn('No browser support for geolocation');
    }
    const weather = await getWeatherFromApiLoc(defaultLocation);
    const time = weather.map(forecast => forecast.time);
    const wIcons = weather.map(forecast => forecast.weather[0].icon.slice(0, -1));
    this.updateState(wIcons, time, null);
  }

  updateState(wIcons, time, coords) {
    this.setState({
      icons: wIcons,
      dt: time,
    });
    if (coords) {
      this.setState({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    }
  }

  async updateLoc(location) {
    const weather = await getWeatherFromApiCoord(location.coords);
    const time = weather.map(forecast => forecast.time);
    const wIcons = weather.map(forecast => forecast.weather[0].icon.slice(0, -1));
    this.updateState(wIcons, time, location.coords);
  }

  render() {
    return (
      <div className="container">
        <div className="icons">
          {this.state.icons.map((icon, index) => (
            <WeatherIcon
              key={index} // eslint-disable-line react/no-array-index-key
              icon={icon}
              time={this.state.dt[index]}
            />
          ))}
        </div>
        <div className="position">
          <div>Latitude: <span>{this.state.latitude}</span></div>
          <div>Longitude: <span>{this.state.longitude}</span></div>
        </div>
      </div>
    );
  }
}
