import React from 'react';
import { shallow } from 'enzyme';
import Restaurant from './Restaurant';

describe('<Restaurant />', () => {
  test('renders', () => {
    const wrapper = shallow(<Restaurant />);
    expect(wrapper).toMatchSnapshot();
  });
});
