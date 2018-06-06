import React from 'react';
import { shallow } from 'enzyme';
import QR from './QR';

describe('<QR />', () => {
  test('renders', () => {
    const wrapper = shallow(<QR />);
    expect(wrapper).toMatchSnapshot();
  });
});
