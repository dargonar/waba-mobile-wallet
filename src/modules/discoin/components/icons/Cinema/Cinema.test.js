import React from 'react';
import { shallow } from 'enzyme';
import Cinema from './Cinema';

describe('<Cinema />', () => {
  test('renders', () => {
    const wrapper = shallow(<Cinema />);
    expect(wrapper).toMatchSnapshot();
  });
});
