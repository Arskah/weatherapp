import test from 'ava';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import WeatherIcon from '../src/components/WeatherIcon';

configure({ adapter: new Adapter() });

test('Render an icon', (t) => {
  const dt = '2018-11-22 21:00:00';
  const i = '01';
  const wrapper = shallow(
    <WeatherIcon key={1} icon={i} time={dt} />
  );
  t.is(wrapper.render().text(), '21.00');
});
