import React from 'react';
import { shallow } from 'enzyme';
import Friends from './Friends';

describe('<Friends />', () => {
  test('renders', () => {
    const wrapper = shallow(<Friends />);
    expect(wrapper).toMatchSnapshot();
  });
});
