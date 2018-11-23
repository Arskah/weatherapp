import React from 'react';
import test from 'ava';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Weather from './Weather';

const fetchMock = require('fetch-mock');

configure({ adapter: new Adapter() });

fetchMock.get('begin:http://localhost:9000/api/weather',
  [
    {
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '01n',
        },
      ],
      time: '2018-11-23 03:00:00',
    },
    {
      weather: [
        {
          id: 800,
          main: 'Clear',
          description: 'clear sky',
          icon: '02n',
        },
      ],
      time: '2018-11-23 06:00:00',
    },
    {
      weather: [
        {
          id: 801,
          main: 'Clouds',
          description: 'few clouds',
          icon: '02d',
        },
      ],
      time: '2018-11-23 09:00:00',
    },
    {
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10d',
        },
      ],
      time: '2018-11-23 12:00:00',
    },
    {
      weather: [
        {
          id: 500,
          main: 'Rain',
          description: 'light rain',
          icon: '10n',
        },
      ],
      time: '2018-11-23 15:00:00',
    },
  ],
);

test('Latitude is always rendered', (t) => {
  const wrapper = shallow(
    <Weather />
  );
  t.regex(wrapper.text(), /Latitude: 0/g);
  wrapper.setState({ latitude: 12 });
  t.regex(wrapper.text(), /Latitude: 12/g);
});

test('Longitude is always rendered', (t) => {
  const wrapper = shallow(
    <Weather />
  );
  t.regex(wrapper.text(), /Longitude: 0/g);
  wrapper.setState({ longitude: 12 });
  t.regex(wrapper.text(), /Longitude: 12/g);
});

test('There is 3 icons', (t) => {
  const wrapper = shallow(
    <Weather />
  );
  t.is(wrapper.render().find('.icons').children().length, 0);
  wrapper.setState(
    {
      icons: ['01', '02', '03'],
      dt: ['2018-11-22 21:00:00', '2018-11-23 00:00:00', '2018-11-23 3:00:00'],
      latitude: -24,
      longitude: 25,
    }
  );
  t.is(wrapper.render().find('.icons').children().length, 3);
});
