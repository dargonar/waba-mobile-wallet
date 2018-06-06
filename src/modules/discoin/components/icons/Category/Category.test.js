import React from 'react';
import { shallow } from 'enzyme';
import Category from './Category';

describe('<Category />', () => {
  test('renders', () => {
    const wrapper = shallow(<Category />);
    expect(wrapper).toMatchSnapshot();
  });
});
