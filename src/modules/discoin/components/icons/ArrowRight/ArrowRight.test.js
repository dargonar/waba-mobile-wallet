import React from 'react';
import { shallow } from 'enzyme';
import ArrowRight from './ArrowRight';

describe('<ArrowRight />', () => {
  test('renders', () => {
    const wrapper = shallow(<ArrowRight />);
    expect(wrapper).toMatchSnapshot();
  });
});
