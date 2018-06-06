import React from 'react';
import { shallow } from 'enzyme';
import Amount from './Amount';

describe('<Amount />', () => {
  test('renders', () => {
    const wrapper = shallow(<Amount />);
    expect(wrapper).toMatchSnapshot();
  });
});
