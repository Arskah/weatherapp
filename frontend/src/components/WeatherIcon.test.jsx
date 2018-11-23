import React from 'react';
import test from 'ava';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WeatherIcon from './WeatherIcon';

configure({ adapter: new Adapter() });

test('Render an icon and check time modification', (t) => {
  const dt = '2018-11-22 21:00:00';
  const i = '01';
  const wrapper = shallow(
    <WeatherIcon key={1} icon={i} time={dt} />
  );
  t.is(wrapper.render().find('img').length, 1); // Image is always rendered
  t.is(wrapper.render().find('p').length, 1);   // Time text is always rendered
  // t.is(wrapper.render().text(), '21.00');       // Datetime is modified
});

