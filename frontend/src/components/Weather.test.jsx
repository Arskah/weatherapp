import React from 'react';
import test from 'ava';
import { shallow, mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Weather from './Weather';

configure({ adapter: new Adapter() });

test('Latitude is always rendered', (t) => {
  const wrapper = shallow(
    <Weather />
  );
  t.regex(wrapper.text(), /Latitude:/g);
});

test('Longitude is always rendered', (t) => {
  const wrapper = shallow(
    <Weather />
  );
  t.regex(wrapper.text(), /Longitude:/g);
});

test('There is 3 icons', (t) => {
  let promise;
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
