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

const fetchWeather = async (queryParams, count) => {
  let endpoint = '';
  if (queryParams.lon && queryParams.lat) {
    endpoint = `${mapURI}/forecast/daily?lon=${queryParams.lon}&lat=${queryParams.lat}&appid=${appId}&cnt=${count}`;
  } else if (queryParams.location) {
    endpoint = `${mapURI}/forecast/daily?q=${queryParams.location}&appid=${appId}&cnt=${count}`;
  } else {
    endpoint = `${mapURI}/forecast/daily?q=${defaultTargetCity}&appid=${appId}&cnt=${count}`;
  }
  console.error(endpoint);
  const response = await fetch(endpoint);
  return response ? response.json() : {};
};

router.get('/api/weather', async ctx => {
  var count = ctx.query.n ? ctx.query.n : 5;
  const weatherData = await fetchWeather(ctx.query, count);
  ctx.type = 'application/json; charset=utf-8';
  ctx.body = weatherData.list && weatherData.list[0].weather ? weatherData.list.map(data => data.weather) : { };
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(port);

console.log(`App listening on port ${port}`);
