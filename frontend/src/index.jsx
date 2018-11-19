import React from 'react';
import ReactDOM from 'react-dom';

// const navigator = require('navigator');

const baseURL = process.env.ENDPOINT;
const defaultLocation = 'Helsinki,fi';

// function geoSuccess(position) {
//   const { latitude, longitude } = position.coords;
//   return [latitude, longitude];
// }

// function geoError() {
//   window.alert('Unable to retrieve your location');
// }

// const geoOptions = {
//   enableHighAccuracy: true,
//   maximumAge: 30000,
//   timeout: 27000,
// };

// const getLocation = () => {
//   console.log("test");
//   if (!navigator.geolocation) {
//     window.alert('Geolocation is not supported by your browser');
//     return;
//   }
//   navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);

  // try {
  //   if ('geolocation' in navigator && navigator.geolocation !== undefined) {
  //     navigator.geolocation.getCurrentPosition(geoSuccess, geoError, geoOptions);
  //   }
  // } catch (err) { return defaultLocation; }
// };

const getWeatherFromApi = async (location) => {
  const response = await fetch(`${baseURL}/weather?n=5&location=`.concat(location));
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
    // const location = await getLocation();
    // const weather = await getWeatherFromApi(location);
    const weather = await getWeatherFromApi(defaultLocation);
    console.log(weather);

    const wIcons = weather.map(forecast => forecast[0].icon.slice(0, -1));
    this.setState({ icons: wIcons });
  }

  render() {
    const { icons } = this.state;
    return (
      <div className="icons">
        {/* <p><button onClick="getLocation()">Show my location</button></p> */}
        {icons.map(icon => (
          <div className="icon">
            <img src={`/img/${icon}.svg`} alt="" />
          </div>
        ))}
      </div>
    );
  }
}

ReactDOM.render(
  <Weather />,
  document.getElementById('app')
);
