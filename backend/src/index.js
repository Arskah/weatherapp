// const debug = require('debug')('weathermap');

const Koa = require('koa');
const router = require('koa-router')();
const fetch = require('node-fetch');
const cors = require('kcors');

const appId = process.env.APPID || 'f79bc007c40b2f695be6da5d691fa83e';
const mapURI = process.env.MAP_ENDPOINT || 'http://api.openweathermap.org/data/2.5';
const defaultTargetCity = process.env.TARGET_CITY || 'Helsinki,fi';
const port = process.env.PORT || 9000;

const app = new Koa();

app.use(cors());

const fetchWeather = async (location) => {
  let endpoint = '';
  if (location === defaultTargetCity) {
    endpoint = `${mapURI}/forecast?q=${location}&appid=${appId}`;
  } else {
    endpoint = `${mapURI}/forecast?lon=${location[0]}&lat=${location[1]}&appid=${appId}`;
  }
  console.error(endpoint);
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

router.get('/api/weather', async ctx => {
  var location = '';
  if (ctx.query.lon && ctx.query.lat) {
    location = [ ctx.query.lon, ctx.query.lat, ];
  } else {
    location = defaultTargetCity;
  }
  const weatherData = await fetchWeather(location);

  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.list && weatherData.list[0].weather ? weatherData.list.map(data => data.weather) : { };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
