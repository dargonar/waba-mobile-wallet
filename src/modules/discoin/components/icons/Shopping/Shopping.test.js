import React from 'react';
import { shallow } from 'enzyme';
import Shopping from './Shopping';

describe('<Shopping />', () => {
  test('renders', () => {
    const wrapper = shallow(<Shopping />);
    expect(wrapper).toMatchSnapshot();
  });
});
