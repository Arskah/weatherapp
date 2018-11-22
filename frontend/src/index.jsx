import React from 'react';
import ReactDOM from 'react-dom';
import WeatherIcon from './components/WeatherIcon';

const baseURL = process.env.ENDPOINT;
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

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: [],
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
    const wIcons = weather.map(forecast => forecast[0].icon.slice(0, -1));
    this.updateState(wIcons, null);
  }

  updateState(wIcons, coords) {
    this.setState({
      icons: wIcons,
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
    const wIcons = weather.map(forecast => forecast[0].icon.slice(0, -1));
    this.updateState(wIcons, location.coords);
  }

  render() {
    return (
      <div className="icons">
        <div>Latitude: <span>{this.state.latitude}</span></div>
        <div>Longitude: <span>{this.state.longitude}</span></div>
        {this.state.icons.map((icon, index) => (
          <WeatherIcon key={index} icon={icon} /> // eslint-disable-line react/no-array-index-key
        ))}
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
