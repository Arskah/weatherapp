import React from 'react';
import ReactDOM from 'react-dom';
import WeatherIcon from './components/WeatherIcon';

const navigator = require('navigator');

const baseURL = process.env.ENDPOINT;
const defaultLocation = 'Helsinki,fi';

const geoOptions = {
  enableHighAccuracy: true,
  maximumAge: 30000,
  timeout: 27000,
};

const getWeatherFromApiLoc = async (location) => {
  const response = await fetch(`${baseURL}/weather?n=5&location=${location}`);
  return response.json();
};

const getWeatherFromApiCoord = async (coords) => {
  const response = await fetch(`${baseURL}/weather?n=5&lon=${coords.longitude}&lat=${coords.latitude}`);
  return response.json();
};

class Weather extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      icons: [],
    };
  }

  async componentWillMount() {
    const weather = await getWeatherFromApiLoc(defaultLocation);
    const wIcons = weather.map(forecast => forecast[0].icon.slice(0, -1));
    this.setState({ icons: wIcons });
  }

  geoSuccess(position) {
    getWeatherFromApiCoord(position.coords).then(
      (result) => {
        const wIcons = result.map(forecast => forecast[0].icon.slice(0, -1));
        this.setState({
          icons: {
            icons: wIcons,
          },
        });
      }
    );
  }

  geoError(error) {
    console.log(error);
    const weather = getWeatherFromApiLoc(defaultLocation);
    const wIcons = weather.map(forecast => forecast[0].icon.slice(0, -1));
    this.setState({
      icons: {
        icons: wIcons,
      },
    });
  }

  render() {
    return (
      <div className="icons">
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
