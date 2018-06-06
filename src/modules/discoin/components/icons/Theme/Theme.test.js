import React from 'react';
import { shallow } from 'enzyme';
import Theme from './Theme';

describe('<Theme />', () => {
  test('renders', () => {
    const wrapper = shallow(<Theme />);
    expect(wrapper).toMatchSnapshot();
  });
});
