import React from 'react';
import { shallow } from 'enzyme';
import Logout from './Logout';

describe('<Logout />', () => {
  test('renders', () => {
    const wrapper = shallow(<Logout />);
    expect(wrapper).toMatchSnapshot();
  });
});
