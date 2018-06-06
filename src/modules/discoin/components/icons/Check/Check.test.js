import React from 'react';
import { shallow } from 'enzyme';
import Check from './Check';

describe('<Check />', () => {
  test('renders', () => {
    const wrapper = shallow(<Check />);
    expect(wrapper).toMatchSnapshot();
  });
});
