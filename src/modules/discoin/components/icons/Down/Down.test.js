import React from 'react';
import { shallow } from 'enzyme';
import Down from './Down';

describe('<Down />', () => {
  test('renders', () => {
    const wrapper = shallow(<Down />);
    expect(wrapper).toMatchSnapshot();
  });
});
